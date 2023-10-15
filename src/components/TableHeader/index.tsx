import { TableHeaders } from "../../utils/constants";

const TableHeader = (props: any) => {
    const {heading} = props;
    return (
        <>
            {
                heading===-99 ? <th className="tableHeaders">{TableHeaders.MEASURE}</th> : <th className="tableHeaders">{`${TableHeaders.CLASS} ${heading}`}</th> 
            }
        </>
    )
}
export default TableHeader;