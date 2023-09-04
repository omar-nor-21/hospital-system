
export default function TableHead({name, phone, blood, doj,emgr} : { name: string, phone:string, blood:string, doj:string, emgr:string}) {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-4 py-3">{name}</th>
                <th scope="col" className="px-4 py-3">{phone}</th>
                <th scope="col" className="px-4 py-3">{blood}</th>
                <th scope="col" className="px-4 py-3">{doj}</th>
                <th scope="col" className="px-4 py-3">{emgr}</th>
                <th scope="col" className="px-12 py-3">
                    Actions
                </th>
            </tr>
        </thead>
    )
}