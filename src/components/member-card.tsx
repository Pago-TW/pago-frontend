import NextImage, { type ImageProps } from "next/image";
import Link from "next/link";

import {
  alpha,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  type CardContentProps,
  type CardProps,
  type IconButtonProps,
} from "@mui/material";

import { Typography, type TypographyProps } from "@/components/ui/typography";

type MemberCardRootProps = CardProps;

const MemberCardRoot = ({ sx, ...props }: MemberCardRootProps) => {
  return (
    <Card
      sx={{
        width: 336,
        display: "flex",
        boxShadow: (theme) =>
          `0 2px 4px ${alpha(theme.palette.pago.main, 0.5)}`,
        borderRadius: 2,
        backgroundColor: "#e9e9e9",
        ...sx,
      }}
      {...props}
    />
  );
};

MemberCardRoot.displayName = "MemberCardRoot";

type MemberCardImageProps = ImageProps;

const MemberCardImage = ({ style, ...props }: MemberCardImageProps) => {
  return (
    <CardMedia
      sx={{
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 3,
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <NextImage
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

MemberCardImage.displayName = "MemberCardImage";

type MemberCardContentProps = CardContentProps;

const MemberCardContent = ({ sx, ...props }: MemberCardContentProps) => {
  return (
    <CardContent
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        px: 2,
        py: 3,
        ...sx,
      }}
      {...props}
    />
  );
};

MemberCardContent.displayName = "MemberCardContent";

const MemberCardTitle = (props: TypographyProps) => {
  return <Typography variant="h5" {...props} />;
};

MemberCardTitle.displayName = "MemberCardTitle";

const MemberCardDescription = (props: TypographyProps) => {
  return <Typography variant="h6" {...props} />;
};

MemberCardDescription.displayName = "MemberCardDescription";

const MemberCardLinkButton = ({
  sx,
  ...props
}: IconButtonProps<typeof Link>) => {
  return (
    <IconButton
      component={Link}
      rel="noopener noreferrer"
      target="_blank"
      sx={{ p: 0, ...sx }}
      disableRipple
      {...props}
    />
  );
};

MemberCardLinkButton.displayName = "MemberCardLinkButton";

const Root = MemberCardRoot;
const Image = MemberCardImage;
const Content = MemberCardContent;
const Title = MemberCardTitle;
const Description = MemberCardDescription;
const LinkButton = MemberCardLinkButton;

export {
  MemberCardRoot,
  MemberCardImage,
  MemberCardContent,
  MemberCardTitle,
  MemberCardDescription,
  MemberCardLinkButton,
  //
  Root,
  Image,
  Content,
  Title,
  Description,
  LinkButton,
};
