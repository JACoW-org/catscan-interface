import React from 'react';
import Section, {SectionProps} from "./Section";
import './Report.css';

type WordReport = {
    filename?: string,
    summary: SectionProps[]
};

type ReportProps = {
    report: WordReport,
}

const Report: React.FC<ReportProps> = (props) => {
    const report = props.report;
    return (
        <div>
            {report.filename &&
                <h2 className="title">Report for {report.filename}</h2>
            }
            <div className={"mb-2"}>
                <a href="https://www.jacow.org/Authors/CSEHelp" title="Author Help" rel="noreferrer" target="_blank">
                    Cat Scan Word Validator - Help and Usage Guidelines</a>
            </div>

            <div className={"ok-type"}>
                <div>
                    <h3 className={"text-danger"}>
                        <i className={"fas fa-times-circle"}></i>{' '}
                        Errors
                    </h3>
                    <div>
                        {Object.entries(report.summary).map((section) => {
                            return (<React.Fragment key={section[0]}>{section[1].ok === false &&
                                <Section name={section[0]} {...section[1]} />
                            }</React.Fragment>)
                        })}
                    </div>
                </div>
                <div>
                    <h3 className={"text-warning"}>
                        <i className={"fas fa-exclamation-triangle"}></i>{' '}
                        Warnings
                    </h3>
                    <div>
                        {Object.entries(report.summary).map((section) => {
                            return (<React.Fragment key={section[0]}>{section[1].ok === 2 &&
                                <Section name={section[0]} {...section[1]} />
                            }</React.Fragment>)
                        })}
                    </div>
                </div>
                <div>
                    <h3 className={"text-success"}>
                        <i className={"fas fa-check-circle"}></i>{' '}
                        Ok
                    </h3>
                    <div>
                        {Object.entries(report.summary).map((section) => {
                            return (<React.Fragment key={section[0]}>{section[1].ok === true &&
                                <Section name={section[0]} {...section[1]} />
                            }</React.Fragment>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export type {WordReport};

export default Report;
