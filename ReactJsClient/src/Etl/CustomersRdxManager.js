import { createStore } from 'redux';

class CustomersRdxManager{ //SINGLETON

    static get initialState() {
        //action date/time for insert and update
        // eslint-disable-next-line
        let nowFormatedDate = new Date().toISOString();
        // eslint-disable-next-line
        nowFormatedDate = nowFormatedDate.split('T')[0] + ' ' + nowFormatedDate.split('T')[1].split('.')[0];

        return {
            //Customers
            customers: [
                //Example
                // {
                //     id:-1,
                //     email: "noemail@email.com",
                //     first_name: "dummy",
                //     last_name: "dummy",
                //     ip: "127.0.0.1",
                //     latitude: 0,
                //     longitude: 0,
                //     created_at: nowFormatedDate,
                //     updated_at: nowFormatedDate
                // }
            ],
            //Cart Products
            deletedCusts:[],

            /*********ADMINISTRATION(TO BE IMPLEMENTED)*************/
            //User logged in
            // userLoggedInId:1,
            // //user list
            // users:[
            //     { id:1, userName:'admin', password:'Passw0rd' },
            // ]
            /*********ADMINISTRATION(TO BE IMPLEMENTED)*************/
        };
    }
    static get actionTypes() {
        return Object.freeze({
            ADD_NEW_CUSTOMER:'ADD_NEW_CUSTOMER',
            ADD_CUSTOMER_SET:'ADD_CUSTOMER_SET',
            UPDATE_CUSTOMER:'UPDATE_CUSTOMER',
            DELETE_CUSTOMER:'DELETE_CUSTOMER',
            CLEANUP:'CLEANUP',
        });
    }
    static get customersReducer() {
        return (
            state=CustomersRdxManager.initialState,
            action
        ) => {
            const { customers, deletedCusts } = state;

            //action date/time for insert and update
            // eslint-disable-next-line
            let nowFormatedDate = new Date().toISOString();
            // eslint-disable-next-line
            nowFormatedDate = nowFormatedDate.split('T')[0] + ' ' + nowFormatedDate.split('T')[1].split('.')[0];

            switch (action.type) {
                case CustomersRdxManager.actionTypes.ADD_NEW_CUSTOMER: {
                    //no validation done UI should be consistent
                    const {newCustInfo} = action.data; //no id included => generated

                    //if store contains newCust already => do nothing ? or update (now => do nothing)(see UPDATE_CUSTOMER)
                    if(customers.some(c => c.email === newCustInfo.email)) return state;

                    return { //new state with the new cust
                        ...state,
                        //adding the new cust
                        customers: [
                            ...customers,
                            // new customer
                            {
                                ...newCustInfo,
                                //if brings id and id is not in use yet else generate it max+1
                                id: newCustInfo.id
                                    &&
                                    customers.findIndex(c => +c.id === newCustInfo.id) < 0
                                    ?
                                        newCustInfo.id
                                    :
                                        // calculation generating next id (max + 1)
                                        +customers.reduce(
                                            (max,next) => (+max.id > +next.id) ? max : next
                                        ).id + 1,
                                // now date formating
                                created_at: nowFormatedDate,
                                updated_at: nowFormatedDate
                            }
                        ]
                    };
                }
                case CustomersRdxManager.actionTypes.UPDATE_CUSTOMER: {

                    const {updCustInfo} = action.data; //id included

                    const updatedIndex = customers.findIndex(c => +c.id === +updCustInfo.id);
                    if(updatedIndex < 0) return state; //do nothing no error

                    //make sure at LEAST ONE of the editable field has changed else do nothing
                    for(let key in updCustInfo) {
                        if(updCustInfo[key] !== customers[updatedIndex][key]) //change found
                        return {
                            ...state,
                            customers: [
                                ...customers.slice(0,updatedIndex),
                                { //updated cust
                                    ...customers[updatedIndex],
                                    ...updCustInfo, //overwrite what changed
                                    updated_at: nowFormatedDate
                                },
                            ]
                        };
                    }
                    return state;
                }
                case CustomersRdxManager.actionTypes.DELETE_CUSTOMER: {

                    const {id} = action.data;

                    const deleteIndex = customers.findIndex(curr => +curr.id === +id);
                    if(deleteIndex < 0) return state; //do nothing no error

                    return {
                        ...state,
                        //add it to deletedCusts
                        deletedCusts:[
                            ...deletedCusts,
                            { ...customers[deleteIndex] }
                        ],
                        //remove it from customers
                        customers:[
                            ...customers.slice(0,deleteIndex),
                            ...customers.slice(deleteIndex + 1)
                        ],
                    };
                }
                case CustomersRdxManager.actionTypes.CLEANUP: {
                    return { ...CustomersRdxManager.initialState };
                }
                case CustomersRdxManager.actionTypes.ADD_CUSTOMER_SET: {
                    /**
                     * AVOID TO COMBINE SETs FROM DIFFERENT DATASOURCES INSIDE THE STORE
                     */

                    const {dataSetArr} = action.data;

                    return {
                        //cleanup first
                        ...CustomersRdxManager.initialState,
                        customers: [
                            //...CustomersRdxManager.initialState.customers, //should be empty
                            ...dataSetArr
                        ]
                    };
                }
                default:
                    return state;
            }
        }
    }
    static get ActionAddNewCustomer(){
        return (newCustInfo) => ({
            type:CustomersRdxManager.actionTypes.ADD_NEW_CUSTOMER,
            data:{newCustInfo:newCustInfo},
        });
    }
    static get ActionUpdateCustomer(){
        return (updCustInfo) => ({
            type:CustomersRdxManager.actionTypes.UPDATE_CUSTOMER,
            data:{ updCustInfo:updCustInfo },
        });
    }
    static get ActionDeleteCustomer(){
        return (id) => ({
            type:CustomersRdxManager.actionTypes.DELETE_CUSTOMER,
            data:{ id:id },
        });
    }
    static get ActionStoreCleanup(){
        return () => ({
            type:CustomersRdxManager.actionTypes.CLEANUP,
            data:{},
        });
    }
    static get ActionAddCustomerSet(){
        return (dataSetArr) => ({
            type:CustomersRdxManager.actionTypes.ADD_CUSTOMER_SET,
            data:{dataSetArr:dataSetArr},
        });
    }

    constructor (){
        this.reduxStore = createStore(CustomersRdxManager.customersReducer);

        this.AddNewCustomer = (newCustInfo) => this.reduxStore.dispatch(
            CustomersRdxManager.ActionAddNewCustomer(newCustInfo)
        );

        this.UpdateCustomer = (updCustInfo) => this.reduxStore.dispatch(
            CustomersRdxManager.ActionUpdateCustomer(updCustInfo)
        );

        this.DeleteCustomer = (id) => this.reduxStore.dispatch(
            CustomersRdxManager.ActionDeleteCustomer(id)
        );

        this.StoreCleanup = () => this.reduxStore.dispatch(
            CustomersRdxManager.ActionStoreCleanup()
        );

        this.AddCustomerSet = (dataSetArr) => this.reduxStore.dispatch(
            CustomersRdxManager.ActionAddCustomerSet(dataSetArr)
        );

        this.subscribe = (callback) => this.reduxStore.subscribe(callback);

        Object.freeze(this); //set "final" the redux
    }

    get state () {
        return this.reduxStore.getState();
    }
}

//SINGLETON
const RdxManager = new CustomersRdxManager();
export default RdxManager;