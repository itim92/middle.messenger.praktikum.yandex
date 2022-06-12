export default function template({
    src,
    width,
    noAvatarImage
}) {
    const avatarUrl = src ? `https://ya-praktikum.tech/api/v2/resources${src}` : noAvatarImage;

    return (
        <>
            <div className="avatar">
                <img src={avatarUrl} width={width} alt="avatar" />
            </div>
        </>
    );
}
