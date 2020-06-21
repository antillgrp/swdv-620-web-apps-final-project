import FakeRest from 'fakerest';

import CustomersRdxManager from './CustomersRdxManager'

import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin';

/* eslint-disable no-console */
function log(type, resource, params, response) {
    if (console.group) {
        // Better logging in Chrome
        console.groupCollapsed(type, resource, JSON.stringify(params));
        console.log(response);
        console.groupEnd();
    } else {
        console.log('FakeRest request ', type, resource, params);
        console.log('FakeRest response', response);
    }
}

export default (data, loggingEnabled = false) => {

    //making sure is empty
    CustomersRdxManager.StoreCleanup();

    //load data into store => no subscribers yet at this point
    CustomersRdxManager.AddCustomerSet(
        data.customers && Array.isArray(data.customers) ? data.customers : []
    );

    function getRestServerFromData(data){
        const restSrv = new FakeRest.Server();
        restSrv.init(data);
        return restSrv;
    }

    var restServer = null;

    function reloadRestSrvFromRedux() {
        restServer = getRestServerFromData(CustomersRdxManager.state);
    }

    //creating a FakerestServer with data for ReduxStore state
    reloadRestSrvFromRedux();

    //creates a new server every time rdx state changes
    CustomersRdxManager.subscribe(reloadRestSrvFromRedux);

    function RdxCreateCustomer(record){
        CustomersRdxManager.AddNewCustomer(record);
        //TODO: Debug comment
        console.log(record);
        console.log(CustomersRdxManager.state);
    }
    function RdxUpdateCustomer(record){
        CustomersRdxManager.UpdateCustomer(record);
        //TODO: Debug comment
        console.log(CustomersRdxManager.state);
    }
    function RdxRemoveCustomer(id){
        CustomersRdxManager.DeleteCustomer(id);
        //TODO: Debug comment
        console.log(CustomersRdxManager.state);
    }

    function getResponse(type, resource, params) {
        switch (type) {
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    sort: [field, order],
                    range: [(page - 1) * perPage, page * perPage - 1],
                    filter: params.filter,
                };
                return {
                    data: restServer.getAll(resource, query),
                    total: restServer.getCount(resource, {
                        filter: params.filter,
                    }),
                };
            }
            case GET_ONE: {
                return {
                    data: restServer.getOne(resource, params.id, { ...params }),
                };
            }
            case GET_MANY: {
                return {
                    data: restServer.getAll(resource, {
                        filter: { id: params.ids },
                    }),
                };
            }
            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    sort: [field, order],
                    range: [(page - 1) * perPage, page * perPage - 1],
                    filter: { ...params.filter, [params.target]: params.id },
                };
                return {
                    data: restServer.getAll(resource, query),
                    total: restServer.getCount(resource, {
                        filter: query.filter,
                    }),
                };
            }
            case CREATE: {
                const result = {
                    data: restServer.addOne(resource, { ...params.data }),
                };
                RdxCreateCustomer({ ...result.data });// reload restserver
                return result;
            }
            case UPDATE: {
                const result = {
                    data: restServer.updateOne(
                        resource,
                        params.id,
                        { ...params.data, }
                    ),
                };
                RdxUpdateCustomer({ ...result.data });// reload restserver
                return result;
            }
            case UPDATE_MANY: {
                const result = { data: params.ids };
                params.ids.forEach(
                    id => {
                        RdxUpdateCustomer({// reload restserver
                            ...restServer.updateOne(
                                resource,
                                id,
                                { ...params.data, }
                            )
                        });
                    }
                );
                return result;
            }
            case DELETE: {
                const result = {
                    data: restServer.removeOne(resource, params.id)
                };
                RdxRemoveCustomer(result.data.id);// reload restserver
                return result;
            }
            case DELETE_MANY: {
                const result = { data: params.ids };
                params.ids.forEach(
                    id => {
                        restServer.removeOne(resource, id);
                        RdxRemoveCustomer(id); // reload restserver
                    }
                );
                return result;
            }
            default:
                return false;
        }
    }

    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Promise} The response
     */
    return (type, resource, params) => {
        const collection = restServer.getCollection(resource);
        if (!collection) {
            return new Promise((_, reject) =>
                reject(new Error(`Undefined collection "${resource}"`))
            );
        }
        let response;
        try {
            response = getResponse(type, resource, params);
        } catch (error) {
            return new Promise((_, reject) => reject(error));
        }
        if (response === false) {
            return new Promise((_, reject) =>
                reject(new Error(`Unsupported fetch action type ${type}`))
            );
        }
        if (loggingEnabled) {
            log(type, resource, params, response);
        }
        return new Promise(resolve => resolve(response));
    };
};