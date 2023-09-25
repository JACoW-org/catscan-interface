import React from "react";
import {Rule} from "./Section";

type TableHeadersProps = {
    headers?: string
    rules?: { [key: string]: Rule; }
};

const sentenceCase = (str: string) => {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();

    return str.replace(/\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() +
                txt.substring(1).toLowerCase();
        });
}
const TableHeader: React.FC<TableHeadersProps> = (props) => {
    const firstRule = props.rules && Object.entries(props.rules)[0][1];
    return (<>
        {firstRule &&
            <thead>
            <tr>
                <th rowSpan={2}>Text</th>
                <th colSpan={9}>Style</th>
            </tr>
            <tr>
                <th>Text Style Name</th>
                {Object.keys(firstRule).map((rule) => {
                    return ['type', 'styles'].indexOf(rule) === -1 ? <th>{sentenceCase(rule.replace("_", " "))}</th> : null;
                })}
                <th>Ok</th>
            </tr>
            </thead>
        }
        {(typeof props.headers === 'string') && <thead dangerouslySetInnerHTML={{__html: props.headers}}></thead>}
    </>);
}

export default TableHeader;