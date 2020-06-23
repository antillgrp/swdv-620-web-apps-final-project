import React from 'react';

import { Admin, Resource } from 'react-admin';

import UserIcon from '@material-ui/icons/Group';

import Dashboard from './Dashboard/Dashboard';

import {
    CustList,
    CustEdit,
    CustCreate,
    //CustShow
} from './CustomerView/Customers';

// import Dataloader from './Etl/Dataloader';

import DataProviderManager from './Etl/DataProviderManager';

DataProviderManager.loadDataProvider({
    customers: [
        {
            "id":1,
            "email":"jhamilton0@usda.gov",
            "first_name":"Hard Coded",
            "last_name":"Data",
            "ip":"135.75.95.238",
            "latitude":-27.634171,
            "longitude":-52.273891,
            "created_at":"2015-01-21 03:20:11",
            "updated_at":null
        },
        {"id":2,"email":"anichols1@addtoany.com","first_name":"Anthony","last_name":"Nichols","ip":"147.3.15.197","latitude":56.47633,"longitude":53.797821,"created_at":"2015-01-16 00:10:27","updated_at":null},{"id":3,"email":"lmurphy2@sina.com.cn","first_name":"Lawrence","last_name":"Murphy","ip":"70.210.188.75","latitude":16.58333,"longitude":121.5,"created_at":"2015-01-20 20:19:37","updated_at":null},{"id":4,"email":"sburke3@lycos.com","first_name":"Scott","last_name":"Burke","ip":"104.203.83.37","latitude":37.692478,"longitude":120.971481,"created_at":"2015-01-01 13:43:44","updated_at":null},{"id":5,"email":"hjackson4@nsw.gov.au","first_name":"Howard","last_name":"Jackson","ip":"59.197.227.237","latitude":37.578499,"longitude":26.48069,"created_at":"2015-01-27 13:43:37","updated_at":null},{"id":6,"email":"hcastillo5@youtu.be","first_name":"Harold","last_name":"Castillo","ip":"169.236.141.105","latitude":25.2407,"longitude":115.7444,"created_at":"2015-01-07 19:26:28","updated_at":null},{"id":7,"email":"tfuller6@360.cn","first_name":"Tammy","last_name":"Fuller","ip":"114.34.134.46","latitude":57.00993,"longitude":61.45776,"created_at":"2015-01-23 18:34:38","updated_at":null},{"id":8,"email":"eperez7@google.co.jp","first_name":"Emily","last_name":"Perez","ip":"183.236.227.181","latitude":29.51889,"longitude":112.54837,"created_at":"2015-01-07 08:52:38","updated_at":null},{"id":9,"email":"vwells8@ning.com","first_name":"Virginia","last_name":"Wells","ip":"136.128.49.18","latitude":-23.193609,"longitude":-49.383888,"created_at":"2015-01-13 22:14:28","updated_at":null},{"id":10,"email":"mpayne9@geocities.jp","first_name":"Marilyn","last_name":"Payne","ip":"200.252.227.193","latitude":15.38989,"longitude":104.550827,"created_at":"2015-01-05 08:36:52","updated_at":null},{"id":11,"email":"shicksa@goodreads.com","first_name":"Sara","last_name":"Hicks","ip":"206.68.211.203","latitude":22.835991,"longitude":114.804871,"created_at":"2015-01-05 16:41:16","updated_at":null},{"id":12,"email":"rgordonb@surveymonkey.com","first_name":"Ruby","last_name":"Gordon","ip":"125.219.84.66","latitude":-8.104,"longitude":113.419998,"created_at":"2015-01-02 02:22:44","updated_at":null},{"id":13,"email":"jpaynec@loc.gov","first_name":"Johnny","last_name":"Payne","ip":"207.164.155.110","latitude":-8.88202,"longitude":-36.502159,"created_at":"2015-01-29 16:49:38","updated_at":null},{"id":14,"email":"jedwardsd@parallels.com","first_name":"Joe","last_name":"Edwards","ip":"20.32.63.226","latitude":32.977711,"longitude":98.097954,"created_at":"2015-01-20 06:51:13","updated_at":null},{"id":15,"email":"pwilsone@hud.gov","first_name":"Peter","last_name":"Wilson","ip":"28.212.184.49","latitude":37.6917,"longitude":-8.2167,"created_at":"2015-01-20 20:36:27","updated_at":null},{"id":16,"email":"jwatsonf@ocn.ne.jp","first_name":"Juan","last_name":"Watson","ip":"130.51.21.38","latitude":11.74697,"longitude":11.96083,"created_at":"2015-01-11 00:57:25","updated_at":null},{"id":17,"email":"bburkeg@utexas.edu","first_name":"Brenda","last_name":"Burke","ip":"115.107.50.25","latitude":48.719391,"longitude":44.501839,"created_at":"2015-01-09 01:46:07","updated_at":null},{"id":18,"email":"vfernandezh@dagondesign.com","first_name":"Victor","last_name":"Fernandez","ip":"131.66.212.201","latitude":-8.3111,"longitude":112.142899,"created_at":"2015-01-09 13:09:57","updated_at":null},{"id":19,"email":"jortizi@opensource.org","first_name":"Jeffrey","last_name":"Ortiz","ip":"218.176.0.251","latitude":45.868698,"longitude":5.9365,"created_at":"2015-01-16 14:44:51","updated_at":null},{"id":20,"email":"gclarkj@hc360.com","first_name":"Gloria","last_name":"Clark","ip":"195.207.249.82","latitude":-10.71484,"longitude":25.46674,"created_at":"2015-01-16 16:32:29","updated_at":null}
    ]
});

const App = () => (
    <Admin
        title="People10 code challenge"
        
        dataProvider={DataProviderManager.dataProvider}
        dashboard={Dashboard}
    >
        <Resource
            icon={UserIcon}
            name="customers"
            options={{ label: 'Customers List' }}
            list={CustList}
            edit={CustEdit}
            //show={CustShow}
            create={CustCreate}
        />
        {/* <Resource
            name='Loader'
            options={{ label: 'Data Loader(Etl)' }}
            list={Dataloader}
        /> */}
    </Admin>
);
export default App;
