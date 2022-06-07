import { Link } from "@/router/Link";

export default function template({ routes }) {
    const li = ({
        title,
        url
    }) => {
        return (
            <>
                <li><Link title={title} to={url}></Link></li>
            </>
        );
    };

    return (
        <>
            <nav>
                <ul className="menu">
                    {routes.map(li)}
                </ul>
            </nav>
        </>
    );
}
