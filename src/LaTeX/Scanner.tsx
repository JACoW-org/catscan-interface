import React from "react";


const Scanner: React.FC = () => {
    const placeholder = "\\documentclass[a4paper]{jacow}\n" +
        "\\begin{document}\n" +
        "\\title{Paste your full LaTeX file}\n" +
        "\\author{J. Peters \\thanks{catscan@joshp.me} and D. Button}\t\n" +
        "\\maketitle\n" +
        "\\begin{abstract}\n" +
        "Make sure you include the whole file, including the references (bibtex currently not supported).\n" +
        "You can also just paste in a \\bibitem to check for issues.\n" +
        "For example:\n" +
        "\\bibitem{Example}\n" +
        "D. Button, “Reasons why people often format references incorrect.”, \\emph{Human Nature}, p. 1, Jan. 10,000 BC.\n" +
        "\\end{abstract}\n" +
        "\\end{document}\n";

    return (
        <div>
            <h2>LaTeX Validator</h2>
            <div className={"form-group"}>
                <div>
                    <label>Paste in your LaTeX file below.</label>
                </div>
                <textarea className={"form-control"} placeholder={placeholder} rows={13}></textarea>
            </div>
            <button className={"btn btn-primary btn-block btn-lg"}>Scan</button>
        </div>
    );
}

export default Scanner;