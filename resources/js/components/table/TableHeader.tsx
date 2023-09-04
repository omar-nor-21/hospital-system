export type ColumnDefinitionType<T, K extends keyof T> = {
    key: K;
    header: string;
}
type TableHeaderProps<T, K extends keyof T> = {
    columns: Array<ColumnDefinitionType<T, K>>
}

export default function TableHeader<T, K extends keyof T>({ columns }: TableHeaderProps<T, K>): JSX.Element {
    const headers = columns.map((column, index) => {
        return (
            <th key={`headCell-${index}`} scope="col" className="px-4 py-3">
                {column.header}
            </th>
        )
    })
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>{headers}</tr>
        </thead>
    )
}