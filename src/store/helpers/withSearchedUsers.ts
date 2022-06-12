import { connect } from "@/store";

export default connect((state) => {
    return {
        searchedUsers: state["searchedUsers"],
    };
});
