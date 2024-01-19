import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import "react-quill/dist/quill.snow.css"; // Import the styles

interface RichTextEditorProps {
  setEditorContent: (content: string) => void;
}

const DynamicQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Quill...</p>,
});

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  setEditorContent,
}) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image", "video"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div>
      <div className="mb-4">
        <DynamicQuill
          theme="snow"
          onChange={(content: string) => setEditorContent(content)}
          style={{ height: "60vh" }}
          modules={modules}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
