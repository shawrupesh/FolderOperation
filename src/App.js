import { useState } from "react";
import data from "../src/data.json";
import "../src/App.css";

const DisplayList = ({ filedata, setFileData }) => {
  const [expand, setExpanded] = useState({});
  const addNode = (id) => {
    const folderName = prompt("Enter Folder Name");
    function upDateTree(list) {
      return list.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                name: folderName,
                type: "folder",
                id: Math.ceil(Math.random * 1000),
                children: [],
              },
            ],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: upDateTree(node.children),
          };
        }
        return node;
      });
    }

    setFileData((prev) => upDateTree(prev));
  };

  const deleteNode = (id) => {
    function deleteTree(list) {
      console.log("inside delete tree", list);
      return list
        .filter((node) => node.id !== id)
        .map((node) => {
          if (node.children) {
            return {
              ...node,
              children: deleteTree(node.children),
            };
          }
          return node;
        });
    }
    setFileData((prev) => deleteTree(prev));
  };

  const handleExpand = (item) => {
    setExpanded((prev) => ({ ...prev, [item.name]: !prev[item.name] }));
  };
  console.log("expanded", expand);

  return (
    <>
      {filedata.map((item) => {
        return (
          <div className="parent">
            {item.type === "folder" && (
              <span
                onClick={() => {
                  handleExpand(item);
                }}
              >
                {!expand[item.name] && (
                  <svg
                    className="svg-down"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                  </svg>
                )}

                {expand[item.name] && (
                  <svg
                    className="svg-down"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
                  </svg>
                )}
              </span>
            )}
            <span key={item.id}>{item.name} </span>
           
            {item.type === "folder" && (
              <>
               <span>({item?.children?.length})</span>
              <span
                onClick={() => {
                  addNode(item?.id);
                }}
              >
                +
              </span>
              </>
              
            )}
            <span
              onClick={() => deleteNode(item.id)}
              style={{ marginLeft: "10px", cursor: "pointer" }}
            >
              Delete
            </span>
            {item?.children?.length > 0 && (
              <div className="children">
                {expand[item.name] && (
                  <DisplayList
                    key={item.id}
                    filedata={item?.children}
                    setFileData={setFileData}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default function App() {
  const [filedata, setFileData] = useState(data);
  console.log("fileData", filedata);

  return (
    <>
      <div className="parent">
        <h1>File Explorer</h1>
      </div>
      <DisplayList filedata={filedata} setFileData={setFileData} />
    </>
  );
}
