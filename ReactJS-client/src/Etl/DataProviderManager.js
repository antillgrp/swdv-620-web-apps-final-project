//import fakeDataProvider from 'ra-data-fakerest';

import rdxDataProvider from './rdxfy-observable-data-fakerest';

class DataManager { //SINGLETON

    dataProvider = null;

    constructor(){
        this.loadDataProvider({});
    }

    loadDataProvider(dataSet){
        this.dataProvider = rdxDataProvider(
            dataSet,
            false //logging
        );
    }
}

//SINGLETON
const DataProviderManager = new DataManager();
export default DataProviderManager;