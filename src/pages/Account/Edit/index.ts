import { Component } from "@/lib/templator";
import { FormElementType } from "@/components/Form";
import {
    FormElementEventHandlerType,
    FormEventHandlerType,
} from "@/components/Form/types";
import template from "./template.tpl";
import withUser from "@/store/helpers/withUser";
import { Indexed } from "@/shared/types/Indexed";

type EditPropsType = {
    submit: string;
    profileFormElements: FormElementType[];
    avatarFormElements: FormElementType[];
    passwordFormElements: FormElementType[];
    onSubmitChangeProfile: FormEventHandlerType;
    onSubmitChangePassword: FormEventHandlerType;
    onSubmitChangeAvatar: FormEventHandlerType;
    onFieldBlur: FormElementEventHandlerType;
    onFieldChange: FormElementEventHandlerType;
    cancelEdit: CallableFunction;
    user: Indexed;
};

class Edit extends Component<EditPropsType> {
    render() {
        const { profileFormElements, user } = this.props;
        profileFormElements.forEach((element) => {
            const name = element.name;
            element.value = (user as Record<string, string>)[name] ?? "";
        });

        return template({ ...this.props });
    }
}

export default withUser(Edit as typeof Component);
