import { Component } from "@/lib/templator";
import template from "./template.tpl";
import { debounce } from "@/shared/lib/debounce";
import withSearchedUsers from "@/store/helpers/withSearchedUsers";
import { User } from "@/shared/types/User";
import { userController } from "@/controllers/UserController";

type Props = {
    onFindedUserClick?: (event: MouseEvent, user: User) => void;
    searchValue: string;
    searchedUsers: User[];
};

class SearchUserClass extends Component<Props> {
    onFindedUserClick(event, user) {
        if (typeof this.props.onFindedUserClick === "function") {
            this.props.onFindedUserClick(event, user);
        }
    }

    onFieldChange(event) {
        const searchRequest = event.target.value.trim();

        this.setProps({
            searchValue: searchRequest,
        });

        this.onSearch();
    }

    onSearch() {
        userController.findUsers(this.props.searchValue);
    }

    render() {
        return template({
            ...this.props,
            onFindedUserClick: this.onFindedUserClick.bind(this),
            onFieldChange: debounce(this.onFieldChange.bind(this), 200),
            onSearch: this.onSearch.bind(this),
        });
    }
}

const SearchUser = withSearchedUsers(SearchUserClass as typeof Component);

export { SearchUser };
