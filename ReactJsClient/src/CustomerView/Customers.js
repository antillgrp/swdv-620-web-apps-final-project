import React from 'react';

import RoomIcon from '@material-ui/icons/Room';

import {
    DateField,
    List,
    Edit,
    Create,
    Datagrid,
    NumberInput,
    TextField,
    EditButton,
    DisabledInput,
    SimpleForm,
    TextInput,
    Filter,
    EmailField,
    FunctionField,
} from 'react-admin';

const CustFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

const Location = ({ record }) => {
    //console.log(JSON.stringify(record));
    return (
        record && record.latitude && record.longitude
        ?
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={
                    "http://www.google.com/maps/place/"
                    + record.latitude +","+ record.longitude
                }
                style={{
                    textDecoration: 'none',
                    color:'black',
                    whiteSpace:'nowrap'
                }}
            >
                <RoomIcon style={{color:'red', verticalAlign: 'middle'}} />
                {" (" + record.latitude +","+ record.longitude + ")" }
            </a>
        :
            ''
    );
};

export const CustList = props => (
    <List {...props}
        filters={<CustFilter />}
        sort={{ field: 'id', order: 'ASC' }}
    >
        <Datagrid>
            <TextField source="id" />
            <FunctionField
                label="Full Name"
                sortBy="last_name"
                render={record => `${record.first_name} ${record.last_name}`}
            />
            <EmailField source="email" />
            <TextField source="ip" />
            <Location label="Location (link)"/>
            <DateField locales="en-US" label="Since" source="created_at" />
            <FunctionField
                label="Last Edit"
                sortBy="updated_at"
                render={
                    record =>   record.updated_at
                                &&
                                new Date(
                                    `${record.updated_at.split(" ")[0]}T${record.updated_at.split(" ")[1]}.167Z`
                                ).toLocaleString()
                }
            />
            <EditButton />
        </Datagrid>
    </List>
);


const CustTitle = ({ record }) => {
    return (
        record && record.first_name && record.last_name
        ?
        <span>
            Customer:
            { ` ${record.first_name} ${record.last_name}` }
        </span>
        :
        ''
    );
};

export const CustEdit = props => (
    <Edit title={<CustTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="email" />
            <TextInput source="ip" />
            <NumberInput source="latitude" />
            <NumberInput source="longitude" />
        </SimpleForm>
    </Edit>
);

export const CustCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="email" />
            <TextInput source="ip" />
            <NumberInput source="latitude" />
            <NumberInput source="longitude" />
        </SimpleForm>
    </Create>
);

