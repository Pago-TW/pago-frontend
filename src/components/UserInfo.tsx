import { useMemo, type FC } from "react";

import { Grid, Stack } from "@mui/material";

import { Paper } from "@/components/ui/Paper";
import { Typography } from "@/components/ui/Typography";
import { useCountryCity } from "@/hooks/api/useCountryCity";
import type { User } from "@/types/user";
import { extractCountries } from "@/utils/extractCountriesCities";

interface ItemProps {
  label: string;
  value: string;
  valueBlock?: boolean;
  isDesktop?: boolean;
}

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
  User,
  "email" | "phone" | "country" | "aboutMe"
>;

export const UserInfo: FC<UserInfoProps> = ({
  email,
  phone,
  country: countryCode,
  aboutMe,
}) => {
  const { data: countryCityOptions = [] } = useCountryCity(undefined, {
    enabled: !!countryCode,
  });

  const countries = useMemo(
    () => extractCountries(countryCityOptions),
    [countryCityOptions]
  );
  const countryName =
    countries[countryCode!]?.chineseName ?? (countryCode!);

  return (
    <Paper
      sx={{
        width: { xs: 336, md: "100%" },
        p: { xs: 2, md: 6 },
      }}
    >
      <Grid container spacing={1.5}>
        <Grid item xs={12} md={6}>
          <Stack spacing={1.5}>
            <Item label="Email" value={email} />
            {!!phone && <Item label="手機電話" value={phone} />}
            {!!countryCode && <Item label="居住國家" value={countryName} />}
          </Stack>
        </Grid>
        {!!aboutMe && (
          <Grid item xs md={6}>
            <Item label="自我介紹" value={aboutMe} valueBlock />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
