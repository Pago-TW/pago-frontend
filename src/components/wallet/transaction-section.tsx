import { useEffect, useState } from "react";

import { ReceiptLong } from "@mui/icons-material";
import { Stack } from "@mui/material";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { SectionWrapper } from "@/components/wallet/section-wrapper";
import { TransactionMonthTabs } from "@/components/wallet/transaction-month-tabs";
import { TransactionYearDropdown } from "@/components/wallet/transaction-year-dropdown";
import { useTransactionQueries } from "@/hooks/api/use-transaction-queries";

export const TransactionSection = () => {
  const [tab, setTab] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);

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
    <SectionWrapper sx={{ pb: 0, px: 0 }}>
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 2 }}
        >
          <Stack direction="row" gap={1}>
            <ReceiptLong sx={{ color: "pago.main" }} />
            <Typography as="span" variant="h5">
              明細
            </Typography>
          </Stack>
          <TransactionYearDropdown
            queries={queries}
            year={year}
            onYearChange={handleYearChange}
          />
          <Button size="small" variant="outlined" sx={{ minWidth: 0 }}>
            搜尋
          </Button>
        </Stack>
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
