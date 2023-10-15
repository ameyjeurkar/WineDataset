import { TableProps } from "../../types";
import { RowData } from "../../utils/constants";
import TableBody from "../TableBody";
import TableHeader from "../TableHeader";
import "./index.css";

const Table = (props: TableProps) => {
    const {wineClasses, tableType} = props;
    return (
        <>
            <table>
                <thead>
                    <tr>
                        {
                            wineClasses.map((heading: number) => {
                                return <TableHeader key={heading} heading={heading}/>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        RowData.map((resultType: string) => {
                            return (
                                <tr key={resultType}>
                                    {
                                        wineClasses.map((alcoholClass:number) => {
                                            return  <TableBody key={alcoholClass} alcoholClass={alcoholClass} tableType={tableType} resultType={resultType}/>;
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
export default Table;