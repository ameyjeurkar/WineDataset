import { HeadingProps } from "../../types";

const Heading = (props: HeadingProps) => {
    return <h3>{props.tableName}</h3>
}
export default Heading;