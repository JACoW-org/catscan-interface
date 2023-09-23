import React from "react";
import {Detail, OkType, Rule, SectionArgs} from "./Section";
import TableMulti from "./TableMulti";
import Table from "./Table";

type DetailsProps = {
    ok: OkType
    title: string
    args: SectionArgs
    details: { [key: string]: Detail}[]
    rules: { [key: string]: Rule; }
}
const Details: React.FC<DetailsProps> = (props) => {
    return (
        <details open={props.ok !== true} className="details-jacow">
            <summary className="details-summary-jacow">Style Breakdown for {props.title}</summary>
            {props.args.style_multi ?
                <TableMulti data={props.details} args={props.args} rules={props.rules} />
                :
                <Table data={props.details} args={props.args} rules={props.rules} />
            }
        </details>
    );
}

export default Details;