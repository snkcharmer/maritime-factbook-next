import React from "react";
import DOMPurify from "dompurify";

const HTMLRenderer = ({ htmlContent }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      style={{ whiteSpace: "pre-wrap" }}
    />
  );
};

export default HTMLRenderer;
