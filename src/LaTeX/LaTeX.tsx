import React from "react";
import './Report.css';
import ReactMarkdown from 'react-markdown';

type ReportProps = {
    report: LaTeXReport,
}

type LaTeXReport = {
    filename: string,
    content: string,
    isAbbreviated: boolean,
    unabbreviated: string,
    issuesFound: number,
}

const LaTeX: React.FC<ReportProps> = (props) => {
    return (
        <div>
            {props.report.filename &&
                <h2 className="title">Report for {props.report.filename}</h2>
            }

            <div className={"mb-2"}>
                <a href="https://www.jacow.org/Authors/CSEHelp" title="Author Help" rel="noreferrer"
                   target="_blank">
                    Cat Scan LaTeX Validator - Help and Usage Guidelines</a>
            </div>

            {props.report.content !== "No issues found" ? <div>
                <p>CatScan detected the following issues in your references:</p>
                {props.report.isAbbreviated && <ReactMarkdown>{props.report.content}</ReactMarkdown>}
                {!props.report.isAbbreviated && props.report.content.trim().split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        <p>{line}</p>
                    </React.Fragment>
                ))}
                <p>
                    <a href={"https://scan.jacow.org/"}>Re-check your paper @ CatScan</a>
                    &nbsp;|&nbsp;
                    <a href={"https://www.jacow.org/Authors/FormattingCitations"} target={"_blank"}> Citation Guidelines</a>
                    &nbsp;|&nbsp;
                    <a href={"https://refs.jacow.org/"} target={"_blank"}>Reference Search</a>
                </p>

                {props.report.isAbbreviated && <div>
                    <p>
                        CatScan has detected <strong>{props.report.issuesFound} issues</strong> in your paper. These issues were summarized in the text above.</p>
                    <p>
                        <a data-toggle="collapse" href="#expandableContent" role="button" aria-expanded="false" aria-controls="expandableContent">
                            See unabbreviated issues
                        </a>
                    </p>

                    <div id="expandableContent" className="collapse expandable">
                        {props.report.unabbreviated && props.report.unabbreviated.trim().split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                <p>{line}</p>
                            </React.Fragment>
                        ))}
                    </div>
                </div>}
            </div> : <div>No issues found.</div>}

        </div>
    )

}

export type {LaTeXReport};

export default LaTeX;