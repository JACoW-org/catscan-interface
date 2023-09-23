import React from "react";

type OkType = true | false | 2;

type Rule = {
    alignment: string
    bold: boolean
    font_size: number
    italic?: boolean
    space_after: number,
    space_before: number,
    type: string
    styles: { [key: string]: string; }
};

type Detail = {
    alignment: string
    all_caps: boolean
    bold: boolean
    case_ok: OkType
    first_line_indent: string
    font_name: string
    font_size: number
    hanging_indent: string
    italic?: boolean
    left_indent: string
    original_text: string
    space_after: number | [string | number]
    space_before?: number | [string | number]
    style: string
    style_ok: OkType
    text: string
    title_style_ok: OkType
    url: string
}

type ExtraIntoType = {
    columns: string[]
    headers: string
    title: string
};

type SectionProps = {
    anchor: string
    title: string
    ok: OkType
    extra_rules: string[]
    help_info: string
    rules: { [key: string]: Rule; }
    details: { [key: string]: Detail; }
    extra_info?: string | ExtraIntoType
}

const Section: React.FC<SectionProps> = (props) => {
    const columnHeaders: { [key: string]: string } = {
        'alignment': 'Alignment',
        'font_size': 'Font Size',
        'all_caps': 'All Caps',
        'case': 'Case',
        'bold': 'Bold',
        'italic': 'Italic',
        'space_before': 'Space Before',
        'space_after': 'Space After',
        'first_line_indent': 'First Line Indent',
        'hanging_indent': 'Hanging Indent',
    };

    return (<div className={"section card"}>
            {props.anchor && <a id={props.anchor.replace(" ", "_")}></a>}
            <div className={"card-header"}>
                <h4>{props.title}</h4>
                {props.help_info &&
                    <a href={`https://www.jacow.org/Authors/${props.help_info}`} target="_target">
                        <i className={"fas fa-question-circle"}></i>{' '}
                        Help
                    </a>
                }
            </div>
            {(props.rules || props.extra_rules) &&
                <details className="details-jacow">
                    <summary className="details-summary-jacow">Rules for {props.title}</summary>
                    {props.extra_rules &&
                        <div className="extra-jacow-rules">
                            {props.extra_rules.map((rule) => {
                                return (<div key={rule}>{rule}</div>)
                            })}
                        </div>
                    }
                    {props.rules &&
                        <table className="table rule-table">
                            <thead>
                            <tr>
                                <th>Type</th>
                                <th>Details</th>
                                {props.rules[Object.keys(props.rules)[0]] && Object.keys(props.rules[Object.keys(props.rules)[0]]).map((rule) => {
                                    if (rule !== 'type' && rule !== 'styles') {
                                        return (<th key={rule}>{columnHeaders[rule]}</th>)
                                    }
                                    return null;
                                })}
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(props.rules).map((rule) => {
                                return (<tr key={rule[0]}>
                                    <td>{rule[1].type}</td>
                                    <td>'{rule[1].styles['jacow']}' or equivalent style</td>
                                    {Object.entries(rule[1]).map((r) => {
                                        return ((r[0] !== 'type' && r[0] !== 'styles') ?
                                            <td key={r[0]}>
                                                {(typeof r[1] === 'string') && r[1]}
                                                {(typeof r[1] === 'number') && r[1]}
                                                {(r[1] === null) && <>None</>}
                                                {(typeof r[1] === 'boolean') && <>{r[1] ? "Yes" : "No"}</>}
                                                {(typeof r[1] === 'object') && r[1] !== null && Object.entries(r[1]).map((a: ([string, string | number])) => {
                                                    return (<>{a[1]}</>);
                                                })}
                                            </td> : null)
                                    })}
                                </tr>)
                            })}
                            </tbody>
                        </table>
                    }
                </details>
            }

            {props.extra_info && typeof props.extra_info === 'string' &&
                <div className="extra-jacow-info" dangerouslySetInnerHTML={{__html: props.extra_info}}></div>}

            {props.extra_info && typeof props.extra_info !== 'string' &&
                <details className="details-jacow">
                    <summary className="details-summary-jacow">{props.extra_info.title} for {props.title}</summary>
                </details>
            }
        </div>
    );
}

export type {SectionProps, OkType};
export default Section;