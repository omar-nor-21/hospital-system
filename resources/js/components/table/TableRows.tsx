import { ColumnDefinitionType } from "./TableHeader";

type TableRowsProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
}

export default function TableRows<T, K extends keyof T>({ data, columns }: TableRowsProps<T, K>): JSX.Element {
    console.log(data.length)
    const rows = data.map((row, index) => {
        return (
            <tr key={`row-${index}`} className="border-b dark:border-gray-700">
                {columns.map((column, index2) => {
                    return (
                        <td key={`cell-${index2}`} className="px-4 py-3">
                            {row[column.key]}
                        </td>
                    )
                })}

            </tr>
        )
    })
    return (
        <tbody>
            {rows}
        </tbody>
    )
}