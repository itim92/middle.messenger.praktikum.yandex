export default function template({
    width,
    avatarUrl
}) {
    return (
        <>
            <div className="avatar">
                <img src={avatarUrl} width={width} alt="avatar" />
            </div>
        </>
    );
}
