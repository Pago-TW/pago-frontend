import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@/components/ui/Typography";

type IndexCardProps = {
  step: number;
  title: string;
  content: string;
  imageUrl: string;
};

const stepSvgList: string[] = [
  "https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/f49d7a466b8f4e39b98af23c1630adb5_Step1.svg",
  "https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/c6e629c93b8942adab72147a1b2777b1_Step2.svg",
  "https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/eb63ef4954764270aa1923d59b913962_Step3.svg",
  "https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/e1da7444cbb3431d8214c562401f5974_Step4.svg",
];

export const IndexCard = ({
  step,
  title,
  content,
  imageUrl,
}: IndexCardProps) => {
  return (
    <Card sx={{ maxWidth: 848, width: 336, height: 243, display: "flex" }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <CardMedia
              sx={{
                width: 94.24,
                height: 52.69,
                left: "-6px",
                top: "8px",
                transform: "rotate(8.63deg)",
              }}
              image={stepSvgList[step]}
            />
          </Box>
          <Box>
            <CardContent>
              <Typography
                variant="h5"
                color="primary.main"
                weightPreset="bold"
                sx={{ paddingBottom: 2 }}
              >
                {title}
              </Typography>
              <Typography variant="h6" color="base.800" weightPreset="normal">
                {content}
              </Typography>
            </CardContent>
          </Box>
        </Box>
        <Box>
          <CardMedia
            sx={{ height: 243, width: 160 }}
            image={imageUrl}
            title="Pago"
          />
        </Box>
      </Box>
    </Card>
  );
};
