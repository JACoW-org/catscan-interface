import React from "react";
import "./Header.css";

const Header: React.FC = () => {
    return <div className="header">
        <div className="container header-row">
            <a href="https://www.jacow.org/" target="_blank">
                <img alt="JaCoW Logo" height="50" width={316} src={"jacow_image.png"}/>
            </a>
            <a href="https://scan.jacow.org/"><h1>Cat Scan</h1></a>
        </div>
    </div>
}

export default Header;