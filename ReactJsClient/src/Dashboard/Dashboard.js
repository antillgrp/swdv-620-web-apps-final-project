import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import ReactMarkdown from "react-markdown";

import README from "@readme";

export default () => (
  <Card>
    <CardHeader title="Welcome to the administration" />
    <CardContent>
      {/* Lorem ipsum sic dolor amet... */}
      <ReactMarkdown source="### Your markdown here" />
    </CardContent>
  </Card>
);
