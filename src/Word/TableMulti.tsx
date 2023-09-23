import TableHeader from "./TableHeader";
import React from "react";
import TableRow from "./TableRow";
import {Detail} from "./Section";

type TableMultiProps = {
    data: { [key: string]: Detail; }[]
};

const TableMulti: React.FC<TableMultiProps> = (props) => {
    const firstRow = props.data[0];
    return (
        <div className={"full-width-table"}>
        {/*<table className="table">*/}
        {/*    <TableHeader rules={firstRow.rules} headers={firstRow.headers} />*/}
        {/*    <tbody>*/}
        {/*    {props.data.map((row) => {*/}
        {/*        return <>{Object.values(row).map((r, index) => {*/}
        {/*            return <TableRow id={index} data={r.data} columns={r.columns} headers={r.headers} args={r.args} rules={r.rules}/>*/}
        {/*        })}</>*/}
        {/*    })}*/}
        {/*    </tbody>*/}
        {/*</table>*/}
        </div>
    )
}

export default TableMulti;