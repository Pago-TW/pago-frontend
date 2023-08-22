import { forwardRef } from "react";
import NextLink from "next/link";

import { Link as MuiLink, type LinkProps as MuiLinkProps } from "@mui/material";

export const Link = forwardRef<HTMLAnchorElement, MuiLinkProps>(
  function ComposedLink(
    { href = "#", rel, color = "inherit", underline = "none", ...rest },
    ref
  ) {
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
          color={color}
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
        color={color}
        underline={underline}
        ref={ref}
        {...rest}
      />
    );
  }
);
