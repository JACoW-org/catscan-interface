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
    styles: string[]
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
    space_after: number
    space_before?: number
    style: string
    style_ok: OkType
    text: string
    title_style_ok: OkType
    url: string
}


type SectionProps = {
    anchor: string
    title: string
    ok: OkType
    extra_rules: string[]
    help_info: string
    rules: { [key: string]: Rule; }
    details: { [key: string]: Detail; }
}

const Section: React.FC<SectionProps> = (props) => {
    const columnHeaders: {[key: string] : string} = {
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
                        <table className="table is-bordered is-fullwidth">
                            <thead>
                            <tr>
                                <th>Type</th>
                                <th>Details</th>
                                {props.rules[Object.keys(props.rules)[0]] && Object.keys(props.rules[Object.keys(props.rules)[0]]).map((rule) => {
                                    console.log("Rule: ", rule);
                                    if (rule !== 'type' && rule !== 'styles') {
                                        return (<th key={rule}>{columnHeaders[rule]}</th>)
                                    }
                                    return null;
                                })}
                            </tr>
                            </thead>
                            {/*<tbody>*/}
                            {/*    {Object.entries(props.rules).map((rule) => {*/}
                            {/*        return (<tr key={rule[0]}>*/}
                            {/*            <td>{rule[1].type}</td>*/}
                            {/*            <td>'{rule[1].styles}' or equivalent style</td>*/}
                            {/*            {Object.entries(rule).map((rule) => {*/}
                            {/*                if (rule[0] !== 'type' && rule[0] !== 'styles') {*/}
                            {/*                    return (<td key={rule[0]}>{rule[1]}</td>)*/}
                            {/*                }*/}
                            {/*                return null;*/}
                            {/*            })}*/}
                            {/*        </tr>)*/}
                            {/*    })}*/}
                            {/*</tbody>*/}
                        </table>
                    }
                    {/*{% if section.rules %}*/}
                    {/*<table className="table is-bordered is-fullwidth">*/}
                    {/*    <thead>*/}
                    {/*    <tr>*/}
                    {/*        <th>Type</th>*/}
                    {/*        <th>Details</th>*/}
                    {/*        {% set rule_list = section.rules|first_value_in_dict %}*/}
                    {/*        {% for rule, value in rule_list.items() %}*/}
                    {/*        {% if rule not in ['type','styles'] %}*/}
                    {/*        <th>{{get_style_column_header(rule)}}</th>*/}
                    {/*        {% endif %}*/}
                    {/*        {% endfor %}*/}
                    {/*    </tr>*/}
                    {/*    </thead>*/}
                    {/*    <tbody>*/}
                    {/*    {% for name, style in section.rules.items() %}*/}
                    {/*    <tr>*/}
                    {/*        <td>{{style['type']}}</td>*/}
                    {/*        <td>'{{style['styles']['jacow']}}' or equivalent style</td>*/}
                    {/*        {% for rule, value in style.items() %}*/}
                    {/*        {% if rule not in ['type','styles'] %}*/}
                    {/*        <td> {{value}} </td>*/}
                    {/*        {% endif %}*/}
                    {/*        {% endfor %}*/}
                    {/*    </tr>*/}
                    {/*    {% endfor %}*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}
                </details>
            }
        </div>
        //     {% if section.rules or section.extra_rules %}
        //     <details className="details-jacow">
        //         <summary className="details-summary-jacow">Rules for {{section.title}}</summary>
        //         {% if section.extra_rules %}
        //         <div className="div-jacow-rules">
        //             <ul>
        //                 {% for rule in section.extra_rules %}
        //                 <li>{{rule | safe}}</li>
        //                 {% endfor %}
        //             </ul>
        //         </div>
        //         {% endif %}

        //         {% endif %}
        //     </details>
        //     <br/>
        //     {% endif %}
        //     {% if 'extra_info' in section %}
        //     {% set extra_info = section.extra_info %}
        //     {% if 'title' in extra_info %}
        //     {% if not (section.show_total and section.details|length == 0) %}
        //     <details {% if section.ok == false %} open {% endif %} className="details-jacow">
        //         <summary className="details-summary-jacow">{{extra_info.title}} for {{section.title}}</summary>
        //         {% if extra_info['multi'] %}
        //         {{make_table_multi(section.details, extra_info.headers, extra_info.columns, args)}}
        //         {%  else %}
        //         {{make_table(section.details, extra_info.headers, extra_info.columns, args)}}
        //         {% endif %}
        //     </details>
        //     <br/>
        //     {% endif %}
        //     {% elif extra_info %}
        //     {{extra_info | safe}}
        //     {% endif %}
        //     {% endif %}
        //     {% if section.rules %}
        //     {% if section.details|length > 0 %}
        //     <details {% if section.ok == false %} open {% endif %} className="details-jacow">
        //         <summary className="details-summary-jacow">Style Breakdown for {{section.title}}</summary>
        //         {% if args['style_multi'] %}
        //         {{make_table_multi(section.details, false, false, args, section.rules)}}
        //         {% else %}
        //         {{make_table(section.details, false, false, args, section.rules)}}
        //         {% endif %}
        //     </details>
        //     {% else %}
        //     <div style="width:100%">
        //         <div className="{{ False|pastel_background_style }} jacow-not-found">
        //             No {{section.title}} found. Please check formatting if there should be some.
        //         </div>
        //     </div>
        //     {% endif %}
        //     {% endif %}
        // </div>
    );
}

export type {SectionProps, OkType};
export default Section;