import React, { Component } from "react";

import ReactFileReader from "react-file-reader";

import CustomersRdxManager from "./CustomersRdxManager";

export default class Dataloader extends Component {
  
  constructor(props) {
    
    super(props);

    //this.reloaded = this.props.

    this.state = {
      //remounting:true,
      dataSource: 0, // 0: empty, 1:json, 2:csv, 3: database/api
      jsonDataFile: null,
      csvDataFile: null,
      csvMapFile: null,
      restApiIdx: 0,
      restApiArr: [        
        "(SPRINGB) [" + window.location.protocol
        + "//" + window.location.hostname 
        + ":" + 4001 + "]",
        "(EXPRESS) [" + window.location.protocol
        + "//" + window.location.hostname
        + ":" + 4002 + "]"
      ],
    };
    //ReduxEngine.reduxStore.subscribe(() => { ???
    //    this.setState({remounting:true});
    //});
  }

  render() {
    const fontStyle = (f, v) => ({ fontSize: `calc(${f}px + ${v}vmin)` });

    return (
      <>
        <fieldset style={{ border: "2px solid black" }}>
          <legend
            style={{
              border: "2px solid black",
              padding: "0 2vmin 0 2vmin",
              ...fontStyle(14, 5),
            }}
            key={"legend"}
          >
            Data loader
          </legend>
          <>
            <form onSubmit={(e) => e.preventDefault()} key={"form"}>
              <label>
                <br />
                <strong>Select the source of the data:</strong>
                <br />
                <select
                  value={this.state.dataSource}
                  onChange={(e) =>
                    this.setState({ dataSource: e.target.value })
                  }
                >
                  {[
                    "",
                    "json file",
                    "csv map/data files",
                    "REST-API (database)",
                  ].map((dataSource, index) => (
                    <option value={index}>{dataSource}</option>
                  ))}
                </select>
              </label>
              <br />
              <br />
              {+this.state.dataSource === 1 ? (
                <ReactFileReader //https://www.npmjs.com/package/react-file-reader
                  fileTypes={[".json"]}
                  handleFiles={(files) => {
                    //TODO: validate?: file[0].type === "application/json"
                    this.setState({
                      jsonDataFile: files.length > 0 ? files[0] : null,
                    });
                  }}
                >
                  <label>
                    <strong>
                      Select <span style={{ color: "orange" }}>JSON</span> file:{" "}
                    </strong>
                    <strong style={{ color: "green" }}>
                      {this.state.jsonDataFile && this.state.jsonDataFile.name}
                    </strong>
                    <br />
                    <button>Open</button>
                  </label>
                </ReactFileReader>
              ) : +this.state.dataSource === 2 ? (
                <>
                  <ReactFileReader
                    fileTypes={[".csv"]}
                    handleFiles={(files) => {
                      this.setState({
                        csvDataFile: files.length > 0 ? files[0] : null,
                      });
                    }}
                  >
                    <label>
                      <strong>
                        Select <span style={{ color: "orange" }}>CSV</span> ({" "}
                        <span style={{ color: "red" }}>Data</span> ) file:{" "}
                      </strong>
                      <strong style={{ color: "green" }}>
                        {this.state.csvDataFile && this.state.csvDataFile.name}
                      </strong>
                      <br />
                      <button>Open Data File</button>
                    </label>
                  </ReactFileReader>
                  <br />
                  <ReactFileReader
                    fileTypes={[".csv"]}
                    handleFiles={(files) => {
                      this.setState({
                        csvMapFile: files.length > 0 ? files[0] : null,
                      });
                    }}
                  >
                    <label>
                      <strong>
                        Select <span style={{ color: "orange" }}>CSV</span> ({" "}
                        <span style={{ color: "red" }}>Map</span> ) file:{" "}
                      </strong>
                      <strong style={{ color: "green" }}>
                        {this.state.csvMapFile && this.state.csvMapFile.name}
                      </strong>
                      <br />
                      <button>Open Map File</button>
                    </label>
                  </ReactFileReader>
                </>
              ) : +this.state.dataSource === 3 ? (
                <label>
                      <strong>
                        Select the {" "} 
                        <span style={{ color: "orange" }}>Rest API URL</span>
                        {" "} for fetching the data:
                      </strong>
                  <br />
                  <select
                    value={this.state.restApiIdx}
                    onChange={(e) =>
                      this.setState({
                        restApiIdx: e.target.value
                      })
                    }
                  >
                    {
                      this.state.restApiArr.map(
                        (elem, index) => (
                          <option value={index}>{elem}</option>
                        )
                      )
                    }
                  </select>
                  <br />
                </label>
              ) : null}
              <br />
              <input type="submit" value="Load..." onClick={this.onLoadClick} />
            </form>
          </>
        </fieldset>
      </>
    );
  }

  onLoadClick = (e) => {
    e.preventDefault();

    //TODO: comment
    //console.log(this.state);

    switch (+this.state.dataSource) {
      case 1: {
        //JSON FILE
        if (!this.state.jsonDataFile)
          alert("Json data file not properly selected, pls try again.");
        else this.loadJsonFile();        
        break;
      }
      case 2: {
        //CSV FILES
        if (!this.state.csvDataFile || !this.state.csvMapFile)
          alert("CSV Data or Map not properly selected, pls try again.");
        else this.loadCSVFiles();        
        break;
      }
      case 3: {        
        //FETCH FROM API / DB
        this.fetchFromAPI();        
        break;
      }
      default:
        break;
    }
  };

  refillCustRdxStore = (dataSetArr) => {

    console.log(dataSetArr);

    CustomersRdxManager.AddCustomerSet(dataSetArr);

    //TODO: redirect/navegate to /customers
    this.props.history && this.props.history.push("/customers");

    //TODO: Debug: Comment
    console.log(CustomersRdxManager.state);
  };

  loadJsonFile = () => {
    const reader = new FileReader();

    reader.onabort = () => console.log("JsonFile reading was aborted");
    reader.onerror = () => console.log("JsonFile reading has failed");
    reader.onload = () => {
      let dataSetArr = JSON.parse(reader.result);
      dataSetArr = Array.isArray(dataSetArr) ? Array.from(dataSetArr) : [];

      //TODO: comment
      console.log(" from JSON:");
      console.log(dataSetArr);

      this.refillCustRdxStore(dataSetArr);
    };
    reader.readAsBinaryString(this.state.jsonDataFile);
  };

  loadCSVFiles = () => {
    const csvParser = require("csvtojson");

    const reader = new FileReader();

    reader.onabort = () => console.log("CsvFile reading was aborted");
    reader.onerror = () => console.log("CsvFile reading has failed");
    reader.onload = () => {
      csvParser()
        .fromString(reader.result)
        .then(([Mapper]) => {
          reader.onload = () => {
            csvParser()
              .fromString(reader.result)
              .then((dataSetArr) => {
                dataSetArr = dataSetArr.map((entry, i) => {
                  const resultObj = { id: i + 1, updated_at: null };
                  for (let key in Mapper) resultObj[key] = entry[Mapper[key]];
                  return resultObj;
                });

                //TODO: comment
                console.log("from CSV:");
                console.log(dataSetArr);

                this.refillCustRdxStore(dataSetArr);
              });
          };
          reader.readAsBinaryString(this.state.csvDataFile);
        });
    };
    reader.readAsBinaryString(this.state.csvMapFile);
  };

  fetchFromAPI = () => {    
    
    let REST_API_URL =
      this.state.restApiArr[this.state.restApiIdx]
        .split("[")[1]
        .split("]")[0]
        .concat("/customers");
    
    fetch(REST_API_URL)      
      .then((res) => {
        //console.log(res);
        if (res.ok) return res.json();
        alert("ERROR Fetching from: " + REST_API_URL);
        return [];
      })
      .then((json) => this.refillCustRdxStore(json))
      .catch((err) => console.error(err));      
  };
}
