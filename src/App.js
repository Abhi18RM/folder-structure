import { useState } from "react";
import "./App.css";
import data from "./data.json";
import { v4 as uuidv4 } from "uuid";

const FolderRecursion = ({ data, addFolder, deleteFolder }) => {
    const [isExpanded, setIsExpanded] = useState({});
    return (
        <div>
            {data.map((item, index) => {
                return (
                    <div className="container" key={index}>
                        {item.type === "folder" && (
                            <span
                                className="symbol"
                                onClick={() => {
                                    setIsExpanded((prev) => ({
                                        ...prev,
                                        [item.name]: !prev[item.name],
                                    }));
                                }}
                            >
                                {isExpanded?.[item.name] ? "-" : "+"}
                            </span>
                        )}
                        <span>{item.name}</span>
                        {item?.type === "folder" && (
                            <span onClick={() => addFolder(item.id)}>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMt43f5llkF5OgPwtIozkZk38jQu2r-3XCg&s"
                                    alt="add"
                                    className="folder"
                                />
                            </span>
                        )}
                        <span onClick={() => deleteFolder(item.id)}>
                            <img
                                src="https://www.svgrepo.com/show/21045/delete-button.svg"
                                alt="delete"
                                className="folder"
                            ></img>
                        </span>
                        {isExpanded?.[item.name] && item?.children && (
                            <FolderRecursion
                                data={item.children}
                                addFolder={addFolder}
                                deleteFolder={deleteFolder}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

function App() {
    const [folderData, setFolderData] = useState(data);
    console.log(folderData);
    const addFolder = (itemId) => {
        const name = prompt("Name: ");
        const isFolder = window.confirm(
            "Do you want to add a folder?\nClick 'Cancel' to add a file instead."
        );
        const updateTree = (list) => {
            {
                return list.map((item) => {
                    if (item.id === itemId) {
                        const newItem = isFolder
                            ? {
                                  name: name,
                                  type: "folder",
                                  id: uuidv4(),
                                  children: [],
                              }
                            : {
                                  name: name,
                                  type: "file",
                                  id: uuidv4(),
                              };
                        return {
                            ...item,
                            children: [...item.children, newItem],
                        };
                    }
                    if (item?.children) {
                        return { ...item, children: updateTree(item.children) };
                    }
                    return item;
                });
            }
        };
        setFolderData((prev) => updateTree(prev));
    };

    const deleteFolder = (itemId) => {
        const updateTree = (list) => {
            return list
                .filter((item) => item.id !== itemId)
                .map((item) => {
                    if (item.children) {
                        return { ...item, children: updateTree(item.children) };
                    }
                    return item;
                });
        };
        setFolderData((prev) => updateTree(prev));
    };
    return (
        <div className="App">
            <h1>Folder Structure</h1>
            <FolderRecursion
                data={folderData}
                addFolder={addFolder}
                deleteFolder={deleteFolder}
            />
        </div>
    );
}

export default App;
