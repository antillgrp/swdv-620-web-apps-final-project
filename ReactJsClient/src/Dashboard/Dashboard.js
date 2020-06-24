import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import ReactMarkdown from "react-markdown";

// How to bypass create-react-app imports restriction outside of src directory 
// https://stackoverflow.com/a/55298684/11082043
// https://github.com/timarney/react-app-rewired
import README from "../../../README.md";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      showMarkDown: true,
      markdownText: "# loading..." 
    };

    // https://stackoverflow.com/a/50570949/11082043
    fetch(README)
      .then((r) => r.text())
      .then(text  => {
        console.log(text); 
        this.setState({showMarkDown: false});
        this.setState({showMarkDown: true, markdownText: text});        
      });   
  }

  render() {
    
    // const { props } = this;

    return (
      <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent> 
          {
            this.state.showMarkDown
            &&
            <ReactMarkdown source={this.state.markdownText} />
          }
        </CardContent>
      </Card>
      
    );
  }
}

export default Dashboard;
