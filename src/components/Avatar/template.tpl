export default function template({
    name,
    noAvatarImage
}) {
    return (
        <>
            <div className="avatar">
                <div className="user-photo no-avatar">
                    <img src={noAvatarImage} alt="no-avatar" />
                </div>
                <div className="user-name">{name}</div>
            </div>
        </>
    );
}
