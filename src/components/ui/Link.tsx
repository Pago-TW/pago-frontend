import type { LinkProps as MuiLinkProps } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import { forwardRef } from "react";

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
