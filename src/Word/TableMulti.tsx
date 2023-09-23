import React from "react";
import {Detail, Rule, SectionArgs} from "./Section";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

type TableMultiProps = {
    data: { [key: string]: Detail}[]
    columns?: string[]
    headers?: string
    args: SectionArgs
    rules?: { [key: string]: Rule; }
};

const TableMulti: React.FC<TableMultiProps> = (props) => {

    return (
        <div className={"full-width-table"}>
            <table className="table">
                <TableHeader rules={props.rules} headers={props.headers} />
                <tbody>
                {props.data.map((row) => {
                    return <>{props.data.map((r, index) => {
                        return <TableRow id={index} data={r} columns={props.columns} args={props.args} rules={props.rules}/>
                    })}</>
                })}
                </tbody>
            </table>
        </div>
    )
}

export type {TableMultiProps};
export default TableMulti;