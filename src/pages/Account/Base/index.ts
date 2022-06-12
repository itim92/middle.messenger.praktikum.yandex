import template from "./template.tpl";
import { Component } from "@/lib/templator";
import { Indexed } from "@/shared/types/Indexed";
import withUser from "@/store/helpers/withUser";

type PropsType = {
    goToEdit: CallableFunction;
    user: Indexed;
};

class Base extends Component<PropsType> {
    render() {
        return template({ ...this.props });
    }
}

export default withUser(Base as typeof Component);
