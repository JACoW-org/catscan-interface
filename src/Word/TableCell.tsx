import {OkType, SectionArgs} from "./Section";

type TableCellProps = {
    col: boolean | string,
    value: string | OkType | string[],
    loop: { index: number },
    args: SectionArgs
};

const TableCell: React.FC<TableCellProps> = (props) => {

    if (typeof props.col === 'string') {
        if (props.col === 'loop.index') {
            return <td>{props.loop.index}</td>;
        } else if (props.col === 'in_table' && typeof props.value === 'string') {
            return <td dangerouslySetInnerHTML={{__html: props.value}}></td>
        } else if (props.col === 'text' && typeof props.value === 'string') {
            return <td
                title={props.value}>{props.args.truncate_text ? props.value.substring(0, props.args.truncate_text) : props.value}</td>
        } else if (props.col.indexOf("_ok") !== -1) {
            switch (props.value) {
                case 2:
                    return <td className="text-warning">
                        <i className={"fas fa-exclamation-triangle"}></i>
                    </td>;
                case true:
                    return <td className="text-success">
                        <i className={"fas fa-check-circle"}></i>
                    </td>;
                case false:
                    return <td className="text-danger">
                        <i className={"fas fa-times-circle"}></i>
                    </td>;
            }
        } else if (Array.isArray(props.value)) {
            return <td>
                <ul className="list-jacow">
                    {props.value.map((item) => {
                        return <li>{item}</li>
                    })}
                </ul>
            </td>
        } else if (typeof props.value === 'string' && props.value.indexOf('should be') !== -1) {
            return <td className={"text-warning"}>{props.value}</td>
        } else {
            return <td>{props.value}</td>
        }
    }
    return <></>;
}

export default TableCell;