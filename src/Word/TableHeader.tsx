import React from "react";

type TableHeadersProps = {
    rules?: string[],
    headers: string | boolean
};
const TableHeader: React.FC<TableHeadersProps> = (props) => {
    return (<>
        {(typeof props.headers === 'boolean') && !props.headers && props.rules !== undefined &&
            <thead>
            <tr>
                <th rowSpan={2}>Text</th>
                <th colSpan={9}>Style</th>
            </tr>
            <tr>
                <th>Text Style Name</th>
                {props.rules.map((rule: any, index: number) => {
                    return ['type', 'styles'].indexOf(rule) === -1 ? <th>{rule}</th> : null;
                })}
            </tr>
            </thead>
        }
        {(typeof props.headers === 'string') && <thead dangerouslySetInnerHTML={{__html: props.headers}}></thead>}
    </>);
}

export default TableHeader;