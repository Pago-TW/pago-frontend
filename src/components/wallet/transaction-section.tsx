import { useEffect, useState } from "react";

import { ReceiptLong } from "@mui/icons-material";
import { Grid, Stack } from "@mui/material";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { SectionWrapper } from "@/components/wallet/section-wrapper";
import { TransactionMonthTabs } from "@/components/wallet/transaction-month-tabs";
import { TransactionYearDropdown } from "@/components/wallet/transaction-year-dropdown";
import { useTransactionQueries } from "@/hooks/api/use-transaction-queries";
import { useMediaQuery } from "@/hooks/use-media-query";

export const TransactionSection = () => {
  const [tab, setTab] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { data: queries, isLoading, isError } = useTransactionQueries();

  useEffect(() => {
    // The year is set after query data is received,
    // as there is no default value initially and cannot be determined without query data
    if (queries && !year) setYear(Object.keys(queries).reverse()[0]);
  }, [queries, year]);

  const handleYearChange = (year: string) => {
    setYear(year);
    setTab(`${year}-${queries![year]![0]!.tabViewName}`);
  };
  const handleTabChange = (tab: string) => {
    setTab(tab);
  };

  const isQueriesEmpty =
    !isLoading && !isError && Object.keys(queries).length === 0;

  return (
    <SectionWrapper sx={{ "&&": { p: 0 } }}>
      <Stack>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: { xs: 2, md: 3 } }}
        >
          <Grid item xs>
            <Stack direction="row" gap={1}>
              <ReceiptLong sx={{ color: "pago.main" }} />
              <Typography as="span" variant="h5">
                明細
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
            <TransactionYearDropdown
              queries={queries}
              year={year}
              onYearChange={handleYearChange}
            />
          </Grid>
          <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              size={mdUp ? "medium" : "small"}
              variant="outlined"
              sx={[
                (theme) => ({
                  [theme.breakpoints.down("md")]: {
                    minWidth: 0,
                  },
                }),
              ]}
            >
              搜尋
            </Button>
          </Grid>
        </Grid>
        {!isQueriesEmpty ? (
          <TransactionMonthTabs
            queries={queries}
            year={year}
            tab={tab}
            onTabChange={handleTabChange}
          />
        ) : (
          <Typography
            as="p"
            variant="h6"
            color="base.500"
            textAlign="center"
            py={2}
            fontStyle="italic"
          >
            目前沒有交易紀錄
          </Typography>
        )}
      </Stack>
    </SectionWrapper>
  );
};
