export default function template({
    title,
    to,
    onClick
}) {
    return (
        <>
            <a href={to} onClick={onClick}>{title}</a>
        </>
    );
}
