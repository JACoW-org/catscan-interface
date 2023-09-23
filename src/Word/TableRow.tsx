import react from 'react';
import TableHeader from "./TableHeader";

type TableRowProps = {
    id: number,
    data: any
    columns: any
    args: any
    rules?: string[],
    headers: string | boolean
};

const TableRow: React.FC<TableRowProps> = (props) => {

    // <tr>
    //     {% if rules %}
    //     {% set rule_list = rules|first_value_in_dict %}
    //     {{ make_cell('text', row['text'], loop, args) }}
    //     {{ make_cell('style', row['style'], loop, args) }}
    //     {% for rule, value in rule_list.items() %}
    //     {% if rule not in ['type','styles'] %}
    //     {% set value = row[rule] %}
    //     {{ make_cell(rule, value, loop, args) }}
    //     {% endif %}
    //     {% endfor %}
    //     {{ make_cell('style_ok', row['style_ok'], loop, args) }}
    //     {% else %}
    //     {% for col in columns %}
    //     {% set value = row[col] %}
    //     {% if col == 'id' %}
    //     {% set value = id %}
    //     {% endif %}
    //     {{ make_cell(col, value, loop, args) }}
    //     {% endfor %}
    //     {% endif %}
    // </tr>
    return (
        <tr>
        </tr>
    )
}

export default TableRow;