import React from 'react';
import Section, {SectionProps} from "./Section";
import './Report.css';

type WordReport = {
    type: string,
    filename?: string,
    summary: SectionProps[]
    scores: {
        [key: string]: [number, number, number]
    }
};

type ReportProps = {
    report: WordReport,
}

const Word: React.FC<ReportProps> = (props) => {
    const report = props.report;
    const [showAllScores, setShowAllScores] = React.useState(false);

    // map scores
    const successCount = report.scores.total[0]
    const warningCount = report.scores.total[1]
    const errorCount = report.scores.total[2]
    const total = successCount + warningCount + errorCount
    const successPercent = Math.round((successCount / total) * 100);
    const warningPercent = Math.round((warningCount / total) * 100);
    const errorPercent = Math.round((errorCount / total) * 100);

    return (
        <div>
            {report.filename &&
                <h2 className="title">Report for {report.filename}</h2>
            }
            <div className={"mb-2"}>
                <a href="https://www.jacow.org/Authors/CSEHelp" title="Author Help" rel="noreferrer" target="_blank">
                    Cat Scan Word Validator - Help and Usage Guidelines</a>
            </div>


            <div className={"score-type"}>
                <h3><i className={"fas fa-chart-pie"}></i>{' '} Score</h3>
            </div>

            {showAllScores &&
            <div>
                {Object.entries(report.scores).map((section) => {
                    if (section[0] === 'total') {
                        return null;
                    }
                    const successCount = section[1][0]
                    const warningCount = section[1][1]
                    const errorCount = section[1][2]
                    const total = successCount + warningCount + errorCount
                    const successPercent = Math.round((successCount / total) * 100);
                    const warningPercent = Math.round((warningCount / total) * 100);
                    const errorPercent = Math.round((errorCount / total) * 100);

                    return <div key={section[0]} className={"scores"}>
                        <div>{section[0]}</div>
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar"
                                 style={{width: successPercent + '%'}}
                                 aria-valuenow={successPercent}
                                 aria-valuemin={0} aria-valuemax={100}>
                                {successCount} Ok
                            </div>
                            <div className="progress-bar bg-warning" role="progressbar"
                                 style={{width: warningPercent + '%'}}
                                 aria-valuenow={warningPercent}>
                                {warningCount} Warnings
                            </div>

                            <div className="progress-bar bg-danger" role="progressbar"
                                 style={{width: errorPercent + '%'}}
                                 aria-valuenow={errorPercent}
                                 aria-valuemin={0} aria-valuemax={100}>
                                {errorCount} Errors
                            </div>
                        </div>
                    </div>
                })}
            </div>}

            <div className={"scores"}>
                <div>Overall</div>
                <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar"
                         style={{width: successPercent + '%'}}
                         aria-valuenow={successPercent}
                         aria-valuemin={0} aria-valuemax={100}>
                        {successCount} Ok
                    </div>
                    <div className="progress-bar bg-warning" role="progressbar"
                         style={{width: warningPercent + '%'}}
                         aria-valuenow={warningPercent}>
                        {warningCount} Warnings
                    </div>

                    <div className="progress-bar bg-danger" role="progressbar"
                         style={{width: errorPercent + '%'}}
                         aria-valuenow={errorPercent}
                         aria-valuemin={0} aria-valuemax={100}>
                        {errorCount} Errors
                    </div>
                </div>
            </div>

            <div className={"mt-2"}>
                <button onClick={(e) =>
                    setShowAllScores(!showAllScores)
                } className="btn btn-sm btn-outline-secondary" type="button" data-toggle="collapse" data-target="#all-scores"
                        aria-expanded="false" aria-controls="all-scores">
                    {!showAllScores && <><i className={"fas fa-chevron-down"}></i> Show all scores</>}
                    {showAllScores && <><i className={"fas fa-chevron-up"}></i> Hide scores</>}
                </button>
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

export default Word;
