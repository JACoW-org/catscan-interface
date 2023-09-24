import React from "react";
import Rules from "./Rules";
import ExtraInfo from "./ExtraInfo";
import Details from "./Details";

type OkType = true | false | 2;

type ExtraInfoType = {
    columns?: string[]
    headers?: string
    title?: string,
    multi?: boolean
};

type Rule = {
    alignment: string
    bold: boolean
    font_size: number
    italic?: boolean
    space_after: number | [string | number],
    space_before: number | [string | number],
    type: string
    styles: { [key: string]: string; }
};

type Detail = boolean | string[] | number | number[] | string | null;

type SectionProps = {
    name?: string
    anchor: string
    title: string
    ok: OkType
    rules: { [key: string]: Rule; }
    extra_rules: string[] | string
    help_info: string
    details: { [key: string]: Detail }[]
    extra_info?: string | ExtraInfoType
    show_total?: boolean
}

type SectionArgs = {
    truncate_text?: number
    style_multi?: boolean
    section_header?: string
}

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
const Section: React.FC<SectionProps> = (props) => {

    const getSectionArgs = (): SectionArgs => {
        switch (props.name) {
            case 'Paragraphs':
                return {'truncate_text': 200}
            case 'References':
                return {'truncate_text': 50}
            case 'Figures':
                return {'style_multi': true}
            case 'Abstract Submission':
                return {'section_header': 'Conformance with Abstract Submission'}
            default:
                return {}
        }
    }

    const sectionArgs = getSectionArgs();

    return (<div className={"section card"}>
            <div className={"card-header"}>
                <div className={"title-icons"}>
                    {props.ok === true && <i className={"text-success fas fa-check-circle"}></i>}
                    {props.ok === false && <i className={"text-danger fas fa-times-circle"}></i>}
                    {props.ok === 2 && <i className={"text-warning fas fa-exclamation-triangle"}></i>}
                    {(typeof sectionArgs.section_header === 'undefined') && <h4>{props.title}</h4>}
                    {(typeof sectionArgs.section_header === 'string') &&
                        <h4 dangerouslySetInnerHTML={{__html: sectionArgs.section_header}}></h4>}
                </div>
                {props.help_info &&
                    <a href={`https://www.jacow.org/Authors/${props.help_info}`} target="_target">
                        <i className={"fas fa-question-circle"}></i>{' '}
                        Help
                    </a>
                }
            </div>

            <Rules rules={props.rules} extra_rules={props.extra_rules} title={props.title}/>
            {props.extra_info &&
                <ExtraInfo title={props.title} extra_info={props.extra_info} show_total={props.show_total ?? false}
                           details={props.details} ok={props.ok} args={sectionArgs}/>}

            {props.rules && (props.details.length > 0) &&
                <Details ok={props.ok} args={sectionArgs} details={props.details} rules={props.rules}
                         title={props.title}/>}

            {props.rules && (props.details.length === 0) && <div>
                <div className="{jacow-not-found">
                    No {props.title} found. Please check formatting if there should be some.
                </div>
            </div>}
        </div>
    );
}

export {columnHeaders};
export type {SectionProps, OkType, SectionArgs, Rule, Detail, ExtraInfoType};
export default Section;