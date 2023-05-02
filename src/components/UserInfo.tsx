import { useCountryCity } from "@/hooks/api/useCountryCity";
import type { PublicUser } from "@/types/user";
import { extractCountries } from "@/utils/extractCountriesCities";
import { Grid, Paper, Stack } from "@mui/material";
import { useMemo, type FC } from "react";
import { Typography } from "./ui/Typography";

type ItemProps = {
  label: string;
  value: string;
  valueBlock?: boolean;
  isDesktop?: boolean;
};

const Item: FC<ItemProps> = ({ label, value, valueBlock, isDesktop }) => {
  return (
    <Stack spacing={0.5}>
      <Typography variant={isDesktop ? "h4" : "h6"} color="base.500">
        {label}
      </Typography>
      {valueBlock ? (
        <Typography
          variant={isDesktop ? "h3" : "h6"}
          color="base.500"
          sx={{ p: 1, backgroundColor: "base.50", wordWrap: "break-word" }}
        >
          {value}
        </Typography>
      ) : (
        <Typography variant={isDesktop ? "h3" : "h5"}>{value}</Typography>
      )}
    </Stack>
  );
};

export type UserInfoProps = Pick<
  PublicUser,
  "email" | "phone" | "country" | "aboutMe"
>;

export const UserInfo: FC<UserInfoProps> = ({
  email,
  phone,
  country: countryCode,
  aboutMe,
}) => {
  const { data: countryCityOptions = [] } = useCountryCity({
    enabled: !!countryCode,
  });

  const countries = useMemo(
    () => extractCountries(countryCityOptions),
    [countryCityOptions]
  );
  const countryName =
    countries[countryCode as string]?.chineseName ?? (countryCode as string);

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: 336, md: "100%" },
        p: { xs: 2, md: 6 },
        borderRadius: 2,
      }}
    >
      <Grid container spacing={1.5}>
        <Grid item xs={12} md={6}>
          <Stack spacing={1.5}>
            <Item label="Email" value={email} />
            <Item label="手機電話" value={phone} />
            {!!countryCode && <Item label="居住國家" value={countryName} />}
          </Stack>
        </Grid>
        <Grid item xs md={6}>
          {!!aboutMe && <Item label="自我介紹" value={aboutMe} valueBlock />}
        </Grid>
      </Grid>
    </Paper>
  );
};
