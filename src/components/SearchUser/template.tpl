export default function template({
    onFieldChange,
    onSearch,
    searchValue,
    searchedUsers,
    onFindedUserClick,
}) {

    const userSearchParams = {
        placeholder: "Добавить пользователя в чат"
    };

    const drawFindedUsers = () => {
        searchedUsers = searchedUsers ?? [];

        return searchedUsers.map((user) => {
            const onClick = (event) => onFindedUserClick(event, user);
            return (
                <>
                    <span className="search-item" onClick={onClick}>{user.login}</span>
                </>
            );
        });
    };

    return (
        <>
            <div className="search-users-wrapper">
                <div className="search-users-form">
                    <input
                        type="text"
                        value={searchValue}
                        onBlur={onFieldChange}
                        onKeyPress={onFieldChange}
                        placeholder={userSearchParams.placeholder}
                    />
                    <button onClick={onSearch}>Найти</button>
                </div>
                <div className="search-result">
                    {drawFindedUsers()}
                </div>
            </div>
        </>
    );
}
