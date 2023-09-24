import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {WordReport} from "./Word/Report";
import LaTeX from "./LaTeX/Scanner";
import { useCookies } from "react-cookie";
import Nav from "./Nav";
import Resources from "./Resources/Resources";
import Word from "./Word/Word";
import Header from "./Header";

enum Pages {
    Word,
    LaTeX,
    Resources
}

function App() {
    const [report, setReport] = React.useState(null as WordReport | null);
    const [cookies, setCookie] = useCookies(["page"]);
    const [page, setPage] = React.useState(cookies["page"] as Pages || Pages.Word);

    const changePage = (page: Pages) => {
        setCookie("page", page);
        setReport(null);
        setPage(page);
    };

    return (
        <div>
            <Header />
            <Nav page={page} changePage={changePage} />
            <div className="container">
                {page === Pages.Word && <Word changePage={changePage} report={report} setReport={setReport}/>}
                {page === Pages.LaTeX && <LaTeX />}
                {page === Pages.Resources && <Resources />}
            </div>
        </div>);
}

export {Pages};

export default App;
