import React, { Component } from 'react';

import ReactFileReader from 'react-file-reader';

import CustomersRdxManager from './CustomersRdxManager';

export default class Dataloader extends Component {

    constructor(props){
        super(props);
        this.state={
            //remounting:true,
            dataSource: 0, // 0: empty, 1:json, 2:csv, 3: database/api
            jsonDataFile: null,
            csvDataFile: null,
            csvMapFile:null,
        };
        //ReduxEngine.reduxStore.subscribe(() => { ???
        //    this.setState({remounting:true});
        //});
    }

    render() {
        const fontStyle = (f,v) => ({fontSize:`calc(${f}px + ${v}vmin)`});

        return (
            <>
                <fieldset style={{border: '2px solid black'}}>
                    <legend
                        style={{
                            border: '2px solid black',
                            padding: '0 2vmin 0 2vmin',
                            ...fontStyle(14,5)
                        }}
                    >
                        Data loader
                    </legend>
                    <>
                        <form
                            onSubmit={ e => e.preventDefault() }
                        >
                            <label>
                                <br/>
                                <strong>Select the source of the data:</strong>
                                <br/>
                                <select
                                    value={this.state.dataSource}
                                    onChange={e => this.setState({dataSource:e.target.value})}
                                >
                                    {
                                        ['', 'json file', 'csv map/data files','database']
                                        .map((dataSource,index) =>
                                            <option value={index} >
                                                {dataSource}
                                            </option>
                                        )
                                    }
                                </select>
                            </label>
                            <br/>
                            <br/>
                            {
                                (+this.state.dataSource === 1)
                                ?
                                    <ReactFileReader //https://www.npmjs.com/package/react-file-reader
                                        fileTypes={[".json"]}
                                        handleFiles = {
                                            files => {
                                                //TODO: validate?: file[0].type === "application/json"
                                                this.setState({
                                                    jsonDataFile: files.length > 0 ? files[0] : null
                                                });
                                            }
                                        }
                                    >
                                        <label>
                                            <strong>
                                                Select <span style={{color:"orange"}}>JSON</span> file:{" "}
                                            </strong>
                                            <strong style={{color:"green"}}>
                                                {this.state.jsonDataFile && this.state.jsonDataFile.name}
                                            </strong>
                                            <br/>
                                            <button>Open</button>
                                        </label>
                                    </ReactFileReader>
                                :
                                (+this.state.dataSource === 2)
                                ?
                                    <>
                                        <ReactFileReader
                                            fileTypes={[".csv"]}
                                            handleFiles = {
                                                files => {
                                                    this.setState({
                                                        csvDataFile: files.length > 0 ? files[0] : null
                                                    });
                                                }
                                            }
                                        >
                                            <label>
                                                <strong>
                                                    Select <span style={{color:"orange"}}>CSV</span>{" "}
                                                    ( <span style={{color:"red"}}>Data</span> ) file:{" "}
                                                </strong>
                                                <strong style={{color:"green"}}>
                                                    {this.state.csvDataFile && this.state.csvDataFile.name}
                                                </strong>
                                                <br/>
                                                <button>Open Data File</button>
                                            </label>
                                        </ReactFileReader>
                                        <br/>
                                        <ReactFileReader
                                            fileTypes={[".csv"]}
                                            handleFiles = {
                                                files => {
                                                    this.setState({
                                                        csvMapFile: files.length > 0 ? files[0] : null
                                                    });
                                                }
                                            }
                                        >
                                            <label>
                                                <strong>
                                                    Select <span style={{color:"orange"}}>CSV</span>{" "}
                                                    ( <span style={{color:"red"}}>Map</span> ) file:{" "}
                                                </strong>
                                                <strong style={{color:"green"}}>
                                                    {this.state.csvMapFile && this.state.csvMapFile.name}
                                                </strong>
                                                <br/>
                                                <button>Open Map File</button>
                                            </label>
                                        </ReactFileReader>
                                    </>
                                :
                                (+this.state.dataSource === 3)
                                ?
                                    <>
                                        <strong>
                                            Load data from API (URL):
                                            <br/><br/>
                                                <a 
                                                    href={"http://localhost:8080/customers"}
                                                    style={{color:"orange"}}
                                                >
                                                    http://localhost:8080/customers
                                                </a>
                                            <br/>
                                        </strong>
                                    </>
                                :
                                    null
                            }
                            <br/>
                            <input
                                type="submit"
                                value="Load..."
                                onClick={ this.onLoadClick }
                            />
                        </form>
                    </>
                </fieldset>
            </>
        );
    }

    onLoadClick = e => {
        e.preventDefault();

        //TODO: comment
        //console.log(this.state);

        switch (+this.state.dataSource) {
            case 1:{ //JSON FILE
                if(!this.state.jsonDataFile)
                    alert("Json data file not properly selected, pls try again.");
                else
                    this.loadJsonFile();
                break;
            }
            case 2:{ //CSV FILES
                if(!this.state.csvDataFile || !this.state.csvMapFile)
                    alert("CSV Data or Map not properly selected, pls try again.");
                else
                    this.loadCSVFiles();
                break;
            }
            case 3:{ //FETCH FROM DB/AP
                this.fetchFromAPI();
                break;
            }
            default:
                break;
        }
    }

    refillCustRdxStore = (dataSetArr) => {

        CustomersRdxManager.AddCustomerSet(dataSetArr);

        //TODO: redirect/navegate to /customers
        this.props.history && this.props.history.push('/customers');

        //TODO: Debug: Comment
        console.log(CustomersRdxManager.state);
    }

    loadJsonFile = () => {
        const reader = new FileReader();

        reader.onabort = () => console.log('JsonFile reading was aborted');
        reader.onerror = () => console.log('JsonFile reading has failed');
        reader.onload = () => {
            let dataSetArr = JSON.parse(reader.result);
            dataSetArr = Array.isArray(dataSetArr) ? Array.from(dataSetArr) : [];

            //TODO: comment
            console.log(" from JSON:");
            console.log(dataSetArr);

            this.refillCustRdxStore(dataSetArr);
        };
        reader.readAsBinaryString(this.state.jsonDataFile);
    }

    loadCSVFiles = () => {
        const csvParser = require('csvtojson');

        const reader = new FileReader();

        reader.onabort = () => console.log('CsvFile reading was aborted');
        reader.onerror = () => console.log('CsvFile reading has failed');
        reader.onload = () => {
            csvParser().fromString(reader.result)
            .then(
                ([Mapper]) => {
                    reader.onload = () => {
                        csvParser().fromString(reader.result)
                        .then(
                            dataSetArr => {
                                dataSetArr = dataSetArr
                                .map((entry,i) => {
                                    const resultObj = { id:i+1, updated_at:null };
                                    for(let key in Mapper) resultObj[key] = entry[Mapper[key]];
                                    return resultObj;
                                });

                                //TODO: comment
                                console.log("from CSV:");
                                console.log(dataSetArr);

                                this.refillCustRdxStore(dataSetArr);
                            }
                        );
                    }
                    reader.readAsBinaryString(this.state.csvDataFile);
                }
            );
        };
        reader.readAsBinaryString(this.state.csvMapFile);
    }

    fetchFromAPI = () => {
        fetch("http://localhost:8080/customers")
        .then(  response => {
            if(response.ok)
                return response.json();
            else {
                alert("ERROR Fetching from:http://localhost:8080/customers");
                return [];
            }
        })
        .then(json => this.refillCustRdxStore(json))
        .catch(error => {
            console.error(error);
        });
    }
}