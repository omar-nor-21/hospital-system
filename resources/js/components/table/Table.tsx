import TableHeader, { ColumnDefinitionType } from "./TableHeader";
import TableRows from "./TableRows";

type TableProps<T, K extends keyof T>={
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
}

export default function Table  <T, K extends keyof T> ({data, columns} : TableProps<T, K>): JSX.Element  {
    return(
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <TableHeader columns={columns}/>
            <TableRows data={data} columns={columns}/>
        </table>
    )
}