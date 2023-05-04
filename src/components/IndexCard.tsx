import { Typography } from "@/components/ui/Typography";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import type { ImageProps } from "next/image";
import Image from "next/image";
import step1Label from "../../public/images/how-it-works/labels/step1.svg";
import step2Label from "../../public/images/how-it-works/labels/step2.svg";
import step3Label from "../../public/images/how-it-works/labels/step3.svg";
import step4Label from "../../public/images/how-it-works/labels/step4.svg";

const stepSvgList = [step1Label, step2Label, step3Label, step4Label];

type IndexCardProps = {
  step: number;
  title: string;
  content: string;
  ImageProps: Pick<ImageProps, "src" | "alt" | "blurDataURL">;
};

export const IndexCard = ({
  step,
  title,
  content,
  ImageProps,
}: IndexCardProps) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const isEven = step % 2 === 0;

  return (
    <Box
      position="relative"
      width={{ xs: "100%", md: "80%" }}
      height={{ xs: 250, md: 300 }}
      alignSelf={isEven ? "start" : "end"}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      <Image
        src={stepSvgList[step]}
        alt="Step label"
        width={108.24}
        height={52.69}
        style={{
          position: "absolute",
          transform: "scale(1.25)",
          top: 5,
          left: -12,
        }}
      />
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          boxShadow: (theme) =>
            `0 2px 4px ${alpha(theme.palette.pago.main, 0.5)}`,
          borderRadius: 2.5,
        }}
      >
        <Box width="50%">
          <CardContent
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mt: 2,
              ml: { xs: 1, md: 2 },
              pr: 0,
            }}
          >
            <Typography
              variant={isDesktop ? "h3" : "h5"}
              color="primary.main"
              weightPreset="bold"
            >
              {title}
            </Typography>
            <Typography
              variant={isDesktop ? "h4" : "h6"}
              color="base.800"
              weightPreset="normal"
              sx={{ pt: { xs: 1, md: 3 } }}
            >
              {content}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          sx={{
            width: "50%",
            height: "100%",
            position: "relative",
            clipPath: isEven
              ? "polygon(25% 0, 100% 0%, 100% 100%, 0 100%)"
              : "polygon(0 0, 100% 0%, 100% 100%, 25% 100%)",
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            {...ImageProps}
            placeholder="blur"
            fill
            sizes="50vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </CardMedia>
      </Card>
    </Box>
  );
};
