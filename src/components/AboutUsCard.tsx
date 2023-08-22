import type { ImageProps } from "next/image";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";

import { Typography } from "@/components/ui/Typography";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface AboutUsCardProps {
  name: string;
  job: string;
  ImageProps: Pick<ImageProps, "src" | "alt" | "blurDataURL">;
}

export const AboutUsCard = ({ name, job, ImageProps }: AboutUsCardProps) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: "#e9e9e9",
        boxShadow: "0px 2px 4px rgba(51, 88, 145, 0.5)",
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box>
          <CardMedia
            component="img"
            sx={{
              width: "100px",
              height: "106px",
              marginTop: "24px",
              marginBottom: "24px",
              marginLeft: "16px",
            }}
            image={ImageProps.src as string}
            alt="Teammate"
          />
        </Box>
      </Box>
      {/* TODO HELP_ME: 我想把IconButton 那一列，離 {job} 近一點，讓他更像 Figma的排版 */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            variant={isDesktop ? "h3" : "h5"}
            color="base.800"
            weightPreset="bold"
          >
            {name}
          </Typography>
          <Typography
            variant={isDesktop ? "h4" : "h6"}
            color="text.secondary"
            weightPreset="normal"
            sx={{ pt: { xs: 2, md: 3 } }}
          >
            {job}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "left", pl: 1, pb: 1 }}>
          <IconButton>
            <LinkedInIcon sx={{ height: 32, width: 32 }} />
          </IconButton>
          <IconButton>
            <GitHubIcon sx={{ height: 32, width: 32 }} />
          </IconButton>
          <IconButton>
            <InstagramIcon sx={{ height: 32, width: 32 }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};
