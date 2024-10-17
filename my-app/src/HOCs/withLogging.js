import React, { useEffect } from "react";

function withLogging(WrappedComponent) {
  return function EnhancedComponent(props) {
    useEffect(() => {
      console.log("Component rendered with props:", props);
    });

    return <WrappedComponent {...props} />;
  };
}

export default withLogging;
