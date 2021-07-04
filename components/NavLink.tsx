
import React, { Children } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import Link, { LinkProps } from "next/link";

type NavLinkProps = React.PropsWithChildren<LinkProps> & {
    activeClassName?: string;
  };

  export const NavLink = ({
    children,
    activeClassName = "active",
    ...props
  }: NavLinkProps) => {

   
    const router = useRouter();

    const child = Children.only(children) as React.ReactElement;
    const childClassName = child.props.className || "";
  
    const isActive = router != null && (router.asPath === props.href || router.asPath === props.as);
  
    const className = cx(childClassName, { [activeClassName]: isActive });
  
    return (
      <Link {...props}>
        {React.cloneElement(child, {
          className: className || null
        })}
      </Link>
    );
  };