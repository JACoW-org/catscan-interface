import React from "react";

const Resources: React.FC = () => {
    return (<>
        <h2>Resources</h2>
        <ul>
            <li><a href={"https://www.jacow.org/Authors/MSWord"}>Word Templates</a></li>
            <li><a href={"https://www.jacow.org/Authors/LaTeX"}>LaTeX Templates</a></li>
            <li><a href={"https://www.jacow.org/Authors/CSEHelp"}>Author Help</a></li>
        </ul>
        <p>
            The Cat Scan tool was originally developed by
            <a rel="noreferrer" target={"_blank"} href={"https://www.ansto.gov.au/"}>ANSTO</a>,
            and is now maintained by
            <a rel="noreferrer" target={"_blank"} href={"https://github.com/joshpme/"}>Josh Peters</a>.
        </p>
    </>);
};

export default Resources;