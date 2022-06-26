import { connect } from "@/store";

export default connect((state) => {
    return {
        user: state["user"],
    };
});
