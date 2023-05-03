import { useLanguage } from "@/hooks/useLanguage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Review } from "@/types/review";
import type { Breakpoints } from "@mui/material";
import { Avatar, Box, Rating, Stack, styled } from "@mui/material";
import { intlFormat, parseISO } from "date-fns";
import Image from "next/image";
import { type FC } from "react";
import SimpleBar from "simplebar-react";
import { Paper } from "./ui/Paper";
import { Typography } from "./ui/Typography";

import "simplebar-react/dist/simplebar.min.css";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty": {
    color: theme.palette.pago.main,
  },
  "& .MuiRating-iconFilled": {
    color: theme.palette.pago.main,
  },
}));

const avatarSize: Partial<Record<Breakpoints["keys"][number], number>> = {
  xs: 44,
  md: 100,
};

export type ReviewItemProps = Review;

export const ReviewItem: FC<ReviewItemProps> = ({
  order: {
    orderItem: { name: itemName },
  },
  creator: { avatarUrl, fullName },
  rating,
  createDate,
  content,
  fileUrls,
}) => {
  const lang = useLanguage();

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const formattedCreateDate = intlFormat(
    parseISO(createDate),
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric", // 24 hour here?
      minute: "numeric",
    },
    { locale: lang }
  );

  return (
    <Paper sx={{ px: { xs: 2, md: 4 }, py: { xs: 1, md: 2 } }}>
      <Typography variant={isDesktop ? "h3" : "h5"} weightPreset="bold" as="p">
        {itemName}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        gap={{ xs: 1, md: 2.5 }}
        mt={{ xs: 1, md: 4 }}
      >
        <Avatar
          src={avatarUrl}
          sx={{ width: avatarSize, height: avatarSize }}
        />
        <Stack spacing={{ xs: 0.5, md: 2 }} flexGrow={1}>
          <Typography variant={isDesktop ? "h3" : "h4"} as="p">
            {fullName}
          </Typography>
          <StyledRating value={rating} precision={0.1} readOnly />
        </Stack>
      </Box>
      <Box
        width="100%"
        pl={{
          xs: `calc(${avatarSize["xs"]}px + 1 * 8px)`,
          md: `calc(${avatarSize["md"]}px + 2.5 * 8px)`,
        }}
      >
        <Typography color="base.500" sx={{ fontSize: 12, mt: 1 }}>
          {formattedCreateDate}
        </Typography>
        <Typography variant={isDesktop ? "h4" : "h5"} as="p" sx={{ mt: 2 }}>
          {content}
        </Typography>
        <Box mt={{ xs: 1, md: 2 }}>
          <SimpleBar>
            <Box display="flex" gap={0.5}>
              {fileUrls.map((url, idx) => (
                <Box
                  key={url}
                  width={{ xs: 64, md: 92 }}
                  height={{ xs: 72, md: 104 }}
                  position="relative"
                  flexShrink={0}
                >
                  <Image
                    src={url}
                    alt={`Image ${idx} of the review`}
                    fill
                    sizes="(max-width: 600px) 64px, 92px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: 4,
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </SimpleBar>
        </Box>
      </Box>
    </Paper>
  );
};
