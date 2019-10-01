import React from "react";

export default (color = "blue") => Component => props => (
  <div style={{ backgroundColor: color }}>
    <Component {...props} />
  </div>
);
