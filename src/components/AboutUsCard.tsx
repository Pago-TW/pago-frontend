import { Typography } from "@/components/ui/Typography";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import type { ImageProps } from "next/image";
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

export const AboutUsCard = ({
  step,
  title,
  content,
  ImageProps,
}: IndexCardProps) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const isEven = step % 2 === 0;
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex", width: "100%" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/6f0938d16a7c4c44aea2efcbcae02f51_%E9%82%B1%E5%A5%95%E5%8B%B3%E9%A0%AD%E5%83%8F%201.svg"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            邱奕勳
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            PM、後端開發
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? <LinkedInIcon /> : <LinkedInIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <GitHubIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? <InstagramIcon /> : <InstagramIcon />}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};
