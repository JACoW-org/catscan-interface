import React, {ReactChild, RefObject, useEffect, useLayoutEffect, useRef} from "react";
import './Report.css';

type Location = {
    start: number,
    end: number
}

type Issue = {
    type: string,
    location: Location,
};

type BibItem = {
    name: string,
    ref: string,
    location: Location
}

type LaTeXReport = {
    document: { location: Location },
    comments: { location: Location }[],
    filename: string,
    issues?: Issue[]
    content: string,
    bibItems: BibItem[]
};

type ReportProps = {
    report: LaTeXReport,
}

type IssueType = {
    description: string,
    example: {
        before: string,
        after: string
    }
}

const issueTypes: { [key: string]: IssueType } = {
    'DOI_NOT_WRAPPED': {
        description: 'DOI not wrapped in \\url{} macro.',
        example: {
            before: 'doi:10.18429/JACoW-IPAC2023-XXXX',
            after: '\\url{doi:10.18429/JACoW-IPAC2023-XXXX}'
        }
    },
    'ET_AL_NOT_WRAPPED': {
        description: 'et al. not wrapped in \\textit{} or \\emph{} macro.',
        example: {
            before: 'et al.',
            after: '\\textit{et al.}'
        }
    },
    'DOI_CONTAINS_SPACE': {
        description: 'DOI contains space.',
        example: {
            before: 'doi: 10.18429/JACoW-IPAC2023-XXXX',
            after: 'doi:10.18429/JACoW-IPAC2023-XXXX'
        }
    },
    "NO_DOI_PREFIX": {
        description: 'DOI does not contain "doi:" prefix.',
        example: {
            before: '\\url{10.18429/JACoW-IPAC2023-XXXX}',
            after: '\\url{doi:10.18429/JACoW-IPAC2023-XXXX}'
        }
    },
    "DOI_IS_URL": {
        description: 'DOI is a URL.',
        example: {
            before: '\\url{https://doi.org/10.18429/JACoW-IPAC2023-XXXX}',
            after: '\\url{doi:10.18429/JACoW-IPAC2023-XXXX}'
        }
    }
}

function LaTeXEditor({ report, issueRender }: {
    report: LaTeXReport;
    issueRender: (id: string, content: string) => React.JSX.Element;
}) {
    const content = report.content;
    const issues = report.issues?.sort((a: Issue, b: Issue) => a.location.start - b.location.start);

    if (!issues) {
        return <>{content}</>;
    }


    let out: (JSX.Element | Element)[] = [];
    let currStart = 0;
    for (let i = 0; i < issues.length; i++) {
        const issue = issues[i];
        const start = issue.location.start;
        const end = issue.location.end;
        const id = `issue-${i}`;
        if (currStart < start) {
            out.push(<>{content.substring(currStart, start)}</>);
        }
        out.push(issueRender(id, content.substring(start, end)));
        currStart = end;
    }
    if (currStart < content.length) {
        out.push(<>{content.substring(currStart)}</>);
    }
    return <>
        {out.map((child) => child)}
    </>;
}


const LaTeX: React.FC<ReportProps> = (props) => {
    const report = props.report;
    const [currentIssue, setCurrentIssue] = React.useState(0);

    useLayoutEffect(() => {
        const element = document.getElementById("issue-" + currentIssue);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentIssue]);

    const start = report.issues ? report.issues[currentIssue].location.start : 0;
    const end = report.issues ? report.issues[currentIssue].location.end : 0;

    if (!report.issues) {
        return (
            <div>
                {report.filename &&
                    <h2 className="title">Report for {report.filename}</h2>
                }
                <div className={"mb-2"}>
                    <a href="https://www.jacow.org/Authors/CSEHelp" title="Author Help" rel="noreferrer"
                       target="_blank">
                        Cat Scan LaTeX Validator - Help and Usage Guidelines</a>
                </div>
                <div>No issues detected!</div>
            </div>
        )
    }

    const issue = report.issues[currentIssue];
    const issueType = issueTypes[issue.type];

    return (
        <div>
            {report.filename &&
                <h2 className="title">Report for {report.filename}</h2>
            }
            <div className={"mb-2"}>
                <a href="https://www.jacow.org/Authors/CSEHelp" title="Author Help" rel="noreferrer" target="_blank">
                    Cat Scan LaTeX Validator - Help and Usage Guidelines</a>
            </div>


            <div className={"issue-description card card-body mb-2"}>
                <div className={"text-left"}>
                    <div className={"font-weight-bold"}>Issue: {currentIssue + 1}:</div>
                    <div>{issueType.description}</div>
                </div>
                <div className={"example"}>
                    <div>
                        <div>Before:</div>
                        <div>{issueType.example.before}</div>
                    </div>
                    <div>
                        <div>&nbsp;</div>
                        <i className={"fas fa-arrow-right"}></i>
                    </div>
                    <div>
                        <div>After:</div>
                        <div>{issueType.example.after}</div>
                    </div>
                </div>
            </div>

            <div className={"issue-nav"}>
                <div>Total issues: {report.issues.length}</div>

                <div>
                    <button onClick={
                        (e) => {
                            if (currentIssue > 0) {
                                setCurrentIssue(currentIssue - 1);
                            } else {
                                setCurrentIssue(0)
                            }
                        }
                    }>Previous
                    </button>
                    <button onClick={
                        (e) => {
                            if (report.issues && currentIssue < report.issues.length - 1) {
                                setCurrentIssue(currentIssue + 1);
                            } else {
                                setCurrentIssue(0)
                            }
                        }
                    }>Next
                    </button>
                </div>
            </div>

            <div className={"editor"} contentEditable={true}>
                <LaTeXEditor
                    report={props.report}
                    issueRender={(id: string, text: string): React.JSX.Element => (<span className={"issue"} id={id}>{text}</span>) }
                />
            </div>

            <div className={"alert alert-warning mt-2"}>
                <div>New LaTeX scanner is a work in progress. Updates will be steadily rolled out.</div>
            </div>
        </div>
    );

}

export type {LaTeXReport};

export default LaTeX;