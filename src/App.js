import { useState } from "react";
import "./App.css";
import data from "./data.json";

const FolderRecursion = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState({});
    return (
        <div>
            {data.map((item, index) => {
                return (
                    <div className="container" key={index}>
                        {item.type == "folder" && (
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
                        {isExpanded?.[item.name] && item?.children && (
                            <FolderRecursion data={item.children} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

function App() {
    const [folderData, setFolderData] = useState(data);
    console.log("Folder Data:", folderData);
    return (
        <div className="App">
            <h1>Folder Structure</h1>
            <FolderRecursion data={folderData} />
        </div>
    );
}

export default App;
