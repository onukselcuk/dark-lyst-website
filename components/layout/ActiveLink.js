import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

const ActiveLink = ({ router, children, ...props }) => {
    const child = Children.only(children);

    let className = child.props.className || "";

    if (
        props.activeLinkSlug &&
        router.asPath === props.activeLinkSlug &&
        props.activeClassName
    ) {
        className = `${className} ${props.activeClassName}`.trim();
    } else if (
        router.pathname === props.href &&
        props.activeClassName &&
        !props.activeLinkSlug
    ) {
        className = `${className} ${props.activeClassName}`.trim();
    }

    delete props.activeClassName;

    return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
