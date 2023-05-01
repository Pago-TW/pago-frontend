import { useLanguage } from "@/hooks/useLanguage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Review } from "@/types/review";
import type { User } from "@/types/user";
import { Avatar, Box, Paper, Rating, Stack, styled } from "@mui/material";
import { intlFormat, parseISO } from "date-fns";
import type { FC } from "react";
import { Typography } from "./ui/Typography";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty": {
    color: theme.palette.pago.main,
  },
  "& .MuiRating-iconFilled": {
    color: theme.palette.pago.main,
  },
}));

const UserRating: FC<Review> = ({ averageRating, totalReview, reviewType }) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const typeText = reviewType === "FOR_SHOPPER" ? "代購者" : "消費者";

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Typography variant={isDesktop ? "h3" : "h5"} as="span" color="pago.main">
        {typeText}評價
      </Typography>
      <StyledRating
        value={averageRating}
        precision={0.1}
        size={isDesktop ? "large" : "medium"}
        readOnly
      />
      <Typography variant={isDesktop ? "h3" : "h5"} as="span" color="pago.main">
        ({totalReview})
      </Typography>
    </Stack>
  );
};

const StyledCompletionRatingChip = styled("span")(({ theme }) => ({
  display: "inline-block",
  padding: theme.spacing(0.25, 2),
  color: theme.palette.common.white,
  borderRadius: 8,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0.25, 1.25),
  },
}));

const completionRatingChipMap: Record<
  Pick<User, "completionRating">["completionRating"],
  { label: string; backgroundColor: string }
> = {
  EXCELLENT: { label: "極優", backgroundColor: "success.main" },
  VERY_GOOD: { label: "優良", backgroundColor: "pago.main" },
  GOOD: { label: "良好", backgroundColor: "warning.main" },
  POOR: { label: "不良", backgroundColor: "error.main" },
};

const UserCompletionRating: FC<Pick<User, "completionRating">> = ({
  completionRating,
}) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { label, backgroundColor } = completionRatingChipMap[completionRating];

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant={isDesktop ? "h3" : "h5"} as="span">
        交易成立率
      </Typography>
      <StyledCompletionRatingChip sx={{ backgroundColor }}>
        <Typography variant={isDesktop ? "h3" : "h5"} as="span">
          {label}
        </Typography>
      </StyledCompletionRatingChip>
    </Stack>
  );
};

export type UserSummaryProps = Pick<
  User,
  | "fullName"
  | "avatarUrl"
  | "createDate"
  | "shopperReview"
  | "consumerReview"
  | "completionRating"
>;

export const UserSummary: FC<UserSummaryProps> = ({
  fullName,
  avatarUrl,
  createDate,
  shopperReview,
  consumerReview,
  completionRating,
}) => {
  const lang = useLanguage();

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const formattedCreateDate = intlFormat(
    parseISO(createDate),
    { year: "numeric", month: "numeric", day: "numeric" },
    { locale: lang }
  );

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: 336, md: "100%" },
        p: { xs: 2, md: 6 },
        borderRadius: 2,
      }}
    >
      <Box
        display="flex"
        gap={2}
        justifyContent={{ md: "space-between" }}
        alignItems="center"
      >
        <Avatar
          src={avatarUrl}
          sx={{
            width: { xs: 125, md: 300 },
            height: { xs: 125, md: 300 },
          }}
        />
        <Stack spacing={2} justifyContent="center">
          <Typography variant="h3">{fullName}</Typography>
          {/* <Button size="small">傳送訊息</Button> */}
        </Stack>
      </Box>
      <Stack
        direction={{ md: "row" }}
        gap={1}
        mt={{ xs: 2, md: 5 }}
        justifyContent={{ md: "space-between" }}
      >
        <Stack spacing={{ xs: 1, md: 2 }} order={{ md: 2 }}>
          <Typography variant={isDesktop ? "h3" : "h5"} as="span">
            成為 Pago 會員的時間
          </Typography>
          <Typography variant={isDesktop ? "h4" : "h6"} as="span">
            {formattedCreateDate}
          </Typography>
        </Stack>
        <Stack spacing={{ xs: 1, md: 2 }}>
          <UserRating {...shopperReview} />
          <UserRating {...consumerReview} />
          <UserCompletionRating completionRating={completionRating} />
        </Stack>
      </Stack>
    </Paper>
  );
};
