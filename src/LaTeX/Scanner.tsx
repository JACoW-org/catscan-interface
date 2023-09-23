import React from "react";


const Scanner: React.FC = () => {
    const placeholder = "\\documentclass[a4paper]{jacow}\n" +
        "\\begin{document}\n" +
        "\\title{Paste your full LaTeX file}\n" +
        "\\author{J. Peters\\thanks{catscan@joshp.me}}\t\n" +
        "\\maketitle\n" +
        "\\begin{abstract}\n" +
        "Make sure you include the whole file, including the references (bibtex currently not supported).\n" +
        "\\bibitem{Example}\n" +
        "J. Peters, \"Top 10 common formatting mistakes with JACoW conference papers\", \\emph{Nature}, vol. 1, p. 1, Sep. 2023.\n" +
        "\\end{abstract}\n" +
        "\\end{document}\n";
    return (
        <div>
            <h2>LaTeX Validator</h2>
            <div className={"form-group"}>
                <div>
                    <label>Paste in your LaTeX file below.</label>
                </div>
                <textarea className={"form-control"} placeholder={placeholder} rows={11}></textarea>
            </div>
            <button className={"btn btn-primary btn-block btn-lg"}>Scan</button>
        </div>
    );
}

export default Scanner;