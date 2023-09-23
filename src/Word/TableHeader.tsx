import React from "react";
import {Rule} from "./Section";

type TableHeadersProps = {
    headers?: string
    rules?: { [key: string]: Rule; }
};
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
                    return ['type', 'styles'].indexOf(rule) === -1 ? <th>{rule}</th> : null;
                })}
            </tr>
            </thead>
        }
        {(typeof props.headers === 'string') && <thead dangerouslySetInnerHTML={{__html: props.headers}}></thead>}
    </>);
}

export default TableHeader;