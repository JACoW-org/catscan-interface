import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Report, {WordReport} from "./Word/Report";
import WordUpload from "./Word/WordUpload";

enum Pages {
    Word,
    LaTeX,
    Resources
}

function App() {
    const [report, setReport] = React.useState(null as WordReport | null);
    const [page, setPage] = React.useState(Pages.Word);

    return (
        <div>
            <div className="header">
                <div className="container header-row">
                    <a href="https://www.jacow.org/" target="_blank">
                        <img alt="JaCoW Logo" height="50" width={316} src={"jacow_image.png"}/>
                    </a>
                    <a href="https://scan.jacow.org/"><h1>Cat Scan</h1></a>
                </div>
            </div>
            <div className="nav-area">
                <div className="container">
                    <div className="navbar navbar-expand-lg">
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarContent"
                                aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarContent">
                            <ul className="navbar-nav mr-auto">
                                <li className={`nav-item ${page === Pages.Word ? "active" : ""}`}>
                                    <a onClick={(e) => setPage(Pages.Word)} className="nav-link" href="#">Word</a>
                                </li>
                                <li className={`nav-item ${page === Pages.LaTeX ? "active" : ""}`}>
                                    <a onClick={(e) => setPage(Pages.LaTeX)} className="nav-link" href="#">LaTeX</a>
                                </li>
                                <li className={`nav-item ${page === Pages.Resources ? "active" : ""}`}>
                                    <a onClick={(e) => setPage(Pages.Resources)} className="nav-link" href="#">Resources</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {page === Pages.Word && <>
                    {report === null && <WordUpload setReport={setReport} />}
                    {report !== null && <Report {...report} />}
                </>}

                {page === Pages.Resources && <>
                    <h2>Resources</h2>
                    <ul>
                        <li><a href={"https://www.jacow.org/Authors/MSWord"}>Word Templates</a></li>
                        <li><a href={"https://www.jacow.org/Authors/LaTeX"}>LaTeX Templates</a></li>
                        <li><a href={"https://www.jacow.org/Authors/CSEHelp"}>Author Help</a></li>
                    </ul>
                    <p>The Cat Scan tool was originally developed by <a href={"https://www.ansto.gov.au/"}>ANSTO</a>, and is now maintained by <a target={"_blank"} href={"https://github.com/joshpme/"}>Josh Peters</a>.</p>
                </>}
            </div>
        </div>);
}

export default App;
