import NextLink from 'next/link';

export { Link };

interface MyProps {
    href: any,
    children: any,
    props: any
    // any props that come into the component
}

const Link: React.FC<MyProps> = ({ href, children, ...props }) => {
    return (
        <NextLink href={href}>
            <a {...props}>
                {children}
            </a>
        </NextLink>
    );
}