import React from "react";

const ButtonBox = (props: any) => {
  const { children, p, pb, pt, bg, ai, jc, fd } = props;
  return (
    <div
      style={{
        padding: p,
        paddingBottom: pb,
        paddingTop: pt,
        backgroundColor: bg,
        alignItems: ai,
        justifyContent: jc,
        flexDirection: fd,
        display: "flex",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default ButtonBox;
