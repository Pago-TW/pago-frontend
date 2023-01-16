import { Link as MuiLink } from "@mui/material";
import type { LinkProps as MuiLinkProps } from "@mui/material/Link";
import NextLink from "next/link";
import React from "react";

export const Link = React.forwardRef<HTMLAnchorElement, MuiLinkProps>(
  function ComposedLink({ href = "/", rel, underline = "none", ...rest }, ref) {
    const isExternal =
      typeof href === "string" &&
      (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

    const relValue = isExternal
      ? ["noopener", "noreferrer", rel].filter(Boolean).join(" ")
      : rel;
    if (isExternal) {
      return (
        <MuiLink
          href={href}
          rel={relValue}
          underline={underline}
          ref={ref}
          {...rest}
        />
      );
    }

    return (
      <MuiLink
        component={NextLink}
        href={href}
        rel={relValue}
        underline={underline}
        ref={ref}
        {...rest}
      />
    );
  }
);
