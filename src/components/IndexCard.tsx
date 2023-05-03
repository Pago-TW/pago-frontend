import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const IndexCard = () => {
  return (
    <Card sx={{ maxWidth: 848, width: 336, height: 243, display: "flex" }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <CardMedia
              sx={{
                width: 94.24,
                height: 52.69,
                // position: 'absolute',
                left: "-6px",
                top: "8px",
                transform: "rotate(8.63deg)",
              }}
              image="https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/a67a7d4610ae427897ade65c3042c63e_Step1.svg"
            />
          </Box>
          <Box>
            <CardContent>
              <Typography
                sx={{ color: "#335891" }}
                gutterBottom
                variant="h5"
                component="div"
              >
                發布旅途
              </Typography>
              <Typography variant="body2" color="text.secondary">
                將您計畫好的旅途，發佈在 Pago，您將看到符合您旅途範圍的委託單。
              </Typography>
            </CardContent>
          </Box>
        </Box>
        <Box>
          <CardMedia
            sx={{ height: 243, width: 160 }}
            image="https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/89c47d5405504745bbdd013848d7e705_Step1%20-%20%E7%99%BC%E5%B8%83%E6%97%85%E9%80%94.png"
            title="green iguana"
          />
        </Box>
      </Box>
    </Card>
  );
};
