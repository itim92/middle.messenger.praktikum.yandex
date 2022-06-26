export default function template({
    title,
    subtitle
}) {
    return (
        <>
            <div className="page-error">
                <div className="header">
                    <div className="title">{title}</div>
                    <div className="subtitle">{subtitle}</div>
                </div>
                <div className="back-button">
                    <a href="#">назад к чатам</a>
                </div>
            </div>
        </>
    );
}
