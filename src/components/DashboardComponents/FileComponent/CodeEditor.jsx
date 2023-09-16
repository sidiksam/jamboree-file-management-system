

import "./CodeEditor.css";
import { Content } from "antd/es/layout/layout";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CodeEditor = ({ fileName, data, setData }) => {
  // const [data, setData] = useState("\n");

  const handleKeyDown = (evt) => {
    let value = Content,
      selStartPos = evt.currentTarget.selectionStart;
    console.log(evt.currentTarget);

    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "  " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();
      setData(value);
    }
  };

  const modules = {
    toolbar: [
      "bold",
      "italic",
      "underline",
      "strike",
      "code-block",
      "image",
      "link",
      "video",
      "formula",
      "clean",
      "blockquote",
      "header",
      "list",
      "indent",
      "align",
      "color",
      "background",
      "font",
      "size",
      "direction",
      "code",
      "script",
      { header: [1, 2, 3, 4, 5, 6, false] },
      { font: [] },
      { size: ["small", false, "large", "huge"] },
      { align: [] },
      { color: [] },
      { background: [] },
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { direction: "rtl" },
      { script: "sub" },
      { script: "super" },
      { code: "code" },
      { formula: [] },
      { image: [] },
      { video: [] },
      { blockquote: [] },
    ],
  };
  return (
    <div className=" mt-3 md:px-5">
      <div className="md:mx-auto  p-3">
  
        <ReactQuill
          theme="snow"
          value={data}
          onChange={setData}
          onKeyDown={handleKeyDown}
          className=" h-auto md:w-100"
          modules={modules}
        />
        
        < div className="pt-8 mt-4 bg-gray-50  md:w-100 md:px-5 py-2 " 
        dangerouslySetInnerHTML={{ __html: data }}
        />
          
        
      </div>
    </div>
  );
};

export default CodeEditor;