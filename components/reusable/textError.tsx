import React from "react";

function TextError({ children }: React.PropsWithChildren<{}>) {
  return <div style={{ color: "red", fontSize: "14px" }}>{children}</div>;
}

export default TextError;
