import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Word, {WordReport} from "./Word/Word";
import LaTeX, {LaTeXReport} from "./LaTeX/LaTeX";
import Nav from "./Nav";
import Resources from "./Resources/Resources";
import Header from "./Header";
import Upload from "./Upload";

enum Pages {
    Upload,
    Resources
}

type ReportType = "word" | "latex";

type Report = {
    type: ReportType,
    report: WordReport | LaTeXReport
};

function App() {
    const [report, setReport] = React.useState(null as Report | null);
    const [page, setPage] = React.useState(Pages.Upload);

    const changePage = (page: Pages) => {
        setReport(null);
        setPage(page);
    };

    return (
        <div>
            <Header />
            <Nav page={page} changePage={changePage} />
            <div className="container">
                {page === Pages.Upload && report === null && <Upload setReport={setReport} />}
                {page === Pages.Upload && report !== null && report.type === 'word' && <Word report={report.report as WordReport} />}
                {page === Pages.Upload && report !== null && report.type === 'latex' && <LaTeX report={report.report as LaTeXReport} />}
                {page === Pages.Resources && <Resources />}
            </div>
        </div>);
}

export type {Report};

export {Pages};

export default App;
