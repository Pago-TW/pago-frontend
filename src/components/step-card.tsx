import type { PropsWithChildren } from "react";
import NextImage, { type ImageProps } from "next/image";

import {
  alpha,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  type CardContentProps,
  type CardProps,
} from "@mui/material";

import { Typography } from "@/components/ui/typography";
import { useMediaQuery } from "@/hooks/use-media-query";

type StepCardRootProps = CardProps;

const StepCardRoot = ({ sx, ...props }: StepCardRootProps) => {
  return (
    <Card
      sx={{
        position: "relative",
        overflow: "visible",
        display: "flex",
        height: { xs: 250, md: 300 },
        boxShadow: (theme) =>
          `0 2px 4px ${alpha(theme.palette.pago.main, 0.5)}`,
        borderRadius: 2.5,
        ...sx,
      }}
      {...props}
    />
  );
};

StepCardRoot.displayName = "StepCardRoot";

type StepCardLabelProps = Omit<ImageProps, "width" | "height" | "style">;

const StepCardLabel = (props: StepCardLabelProps) => {
  const theme = useTheme();

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <NextImage
      width={108.24}
      height={52.69}
      style={{
        position: "absolute",
        transform: "scale(1.25)",
        top: 5,
        left: -12,
        [theme.breakpoints.up("md")]: {
          top: 12,
        },
      }}
      {...props}
    />
  );
};

StepCardLabel.displayName = "StepCardLabel";

const StepCardContent = ({ sx, ...props }: CardContentProps) => {
  return (
    <CardContent
      sx={{
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ml: { xs: 1, md: 2 },
        pr: 0,
        ...sx,
      }}
      {...props}
    />
  );
};

StepCardContent.displayName = "StepCardContent";

const StepCardTitle = (props: PropsWithChildren) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Typography
      variant={isDesktop ? "h3" : "h5"}
      color="primary.main"
      weightPreset="bold"
      {...props}
    />
  );
};

StepCardTitle.displayName = "StepCardTitle";

const StepCardDescription = (props: PropsWithChildren) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Typography
      variant={isDesktop ? "h4" : "h6"}
      color="base.800"
      weightPreset="normal"
      sx={{
        pt: { xs: 1, md: 3 },
      }}
      {...props}
    />
  );
};

StepCardDescription.displayName = "StepCardDescription";

type StepCardImageProps = ImageProps;

const StepCardImage = ({ style, ...props }: StepCardImageProps) => {
  return (
    <CardMedia
      sx={{
        width: "50%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: 2.5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <NextImage
        fill
        sizes="50vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          ...style,
        }}
        {...props}
      />
    </CardMedia>
  );
};

StepCardImage.displayName = "StepCardImage";

const Root = StepCardRoot;
const Label = StepCardLabel;
const Content = StepCardContent;
const Title = StepCardTitle;
const Description = StepCardDescription;
const Image = StepCardImage;

export {
  StepCardRoot,
  StepCardLabel,
  StepCardContent,
  StepCardTitle,
  StepCardDescription,
  StepCardImage,
  //
  Root,
  Label,
  Content,
  Title,
  Description,
  Image,
};
