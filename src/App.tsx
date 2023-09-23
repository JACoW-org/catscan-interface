import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Report, {WordReport} from "./Word/Report";
import WordUpload from "./Word/WordUpload";

function App() {
    const [report, setReport] = React.useState(null as WordReport | null);

    return (
        <div>
            <div className="header">
                <div className="container">
                    <a href="https://www.jacow.org/" target="_blank">
                        <img alt="JaCoW Logo" className="float-md-right" height="50"
                             src="https://www.jacow.org/pub/images/header.png"/>
                    </a>
                    <a href="/"><h1>Cat Scan</h1></a>
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
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Word</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link" href="#">LaTeX</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {report === null && <WordUpload setReport={setReport} />}
                {report !== null && <Report {...report} />}
            </div>
        </div>);
}

export default App;
