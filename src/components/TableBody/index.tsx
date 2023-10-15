import { RowData } from "../../utils/constants";
import { mean, median, mode } from "../../utils/helper";

const TableBody = (props: any) => {
    const {alcoholClass, tableType, resultType} = props;

    return (
        <>
            {
                resultType===RowData[0] && 
                <td>
                    {mean(alcoholClass, tableType)}
                </td>
            }
            {
                resultType===RowData[1] && 
                <td>
                    {median(alcoholClass, tableType)}
                </td>
            }
            {
                resultType===RowData[2] &&
                <td>
                    {mode(alcoholClass, tableType)}
                </td>
            }
        </>
    )
}
export default TableBody;