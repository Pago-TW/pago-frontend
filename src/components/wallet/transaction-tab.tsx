import type { ReactNode } from "react";

import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  type StackProps,
} from "@mui/material";

import { Typography, type TypographyProps } from "@/components/ui/typography";
import { useTransactions } from "@/hooks/api/use-transactions";
import { useMediaQuery } from "@/hooks/use-media-query";
import { robotoMono } from "@/styles/fonts";
import type { Transaction } from "@/types/transaction";
import { format } from "@/utils/date";
import { formatBankAccount } from "@/utils/misc";

const TransactionItem = ({
  children,
}: {
  children: NonNullable<ReactNode>;
}) => {
  return (
    <Accordion
      elevation={0}
      disableGutters
      square
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        "&:before": {
          display: "none",
        },
        "&:not(:last-child)": {
          borderBottom: 0,
        },
        "&:not(:first-of-type)": {
          borderTopStyle: "dashed",
        },
      }}
    >
      {children}
    </Accordion>
  );
};

const TransactionSummary = ({
  date,
  title,
  description,
  amount,
}: {
  date: Transaction["transactionDate"];
  title: Transaction["transactionTitle"];
  description: Transaction["transactionDescription"];
  amount: Transaction["transactionAmount"];
}) => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const typographyVariant = mdUp ? "h5" : "h6";
  const formattedDate = format(date, "M/D");

  return (
    <AccordionSummary
      expandIcon={<ExpandMore sx={{ color: "pago.main" }} />}
      sx={{ px: { md: 4 } }}
    >
      <Grid container sx={{ pr: 1 }}>
        <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
          <Typography as="span" variant={typographyVariant}>
            {formattedDate}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography as="p" variant={typographyVariant}>
            {title}
          </Typography>
          <Typography as="p" variant={typographyVariant} color="base.500">
            {description}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Typography
            as="span"
            variant={typographyVariant}
            weightPreset="bold"
            color={amount > 0 ? "pagoGreen.800" : "currentcolor"}
          >
            {amount}
          </Typography>
        </Grid>
      </Grid>
    </AccordionSummary>
  );
};

const TransactionDetails = ({ children }: { children: ReactNode }) => {
  return (
    <AccordionDetails sx={{ px: { md: 4 } }}>
      <Stack
        spacing={1}
        sx={{ bgcolor: "base.50", borderRadius: 1, p: { xs: 1, md: 2 } }}
      >
        {children}
      </Stack>
    </AccordionDetails>
  );
};

const TransactionDetail = (props: StackProps) => {
  return <Stack direction="row" justifyContent="space-between" {...props} />;
};

const TransactionDetailText = (props: TypographyProps) => {
  return (
    <Typography
      as="span"
      color="base.500"
      fontSize={{ xs: 12, md: 16 }}
      {...props}
    />
  );
};

const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <>
      {transactions.map(
        ({
          transactionId,
          transactionDate,
          transactionTitle,
          transactionDescription,
          transactionAmount,
          detail: {
            balance,
            accountNumber,
            bankName,
            orderSerialNumber,
            orderName,
            cancelReason,
          },
        }) => {
          const summaryProps = {
            date: transactionDate,
            title: transactionTitle,
            description: transactionDescription,
            amount: transactionAmount,
          };

          const formattedAccountNumber =
            accountNumber && formatBankAccount(accountNumber);
          const items = [
            { label: "餘額", value: balance },
            {
              label: "銀行帳號",
              value: formattedAccountNumber,
              valueProps: { fontFamily: robotoMono.style.fontFamily },
            },
            { label: "銀行名稱", value: bankName },
            { label: "訂單編號", value: orderSerialNumber },
            { label: "訂單品名", value: orderName },
            { label: "取消原因", value: cancelReason },
          ].filter(({ value }) => value) as {
            label: string;
            value: string | number;
            labelProps?: TypographyProps;
            valueProps?: TypographyProps;
          }[];

          return (
            <TransactionItem key={transactionId}>
              <TransactionSummary {...summaryProps} />
              <TransactionDetails>
                {items.map(({ label, value, labelProps, valueProps }) => (
                  <TransactionDetail key={label}>
                    <TransactionDetailText {...labelProps}>
                      {label}
                    </TransactionDetailText>
                    <TransactionDetailText {...valueProps}>
                      {value}
                    </TransactionDetailText>
                  </TransactionDetail>
                ))}
              </TransactionDetails>
            </TransactionItem>
          );
        }
      )}
    </>
  );
};

export const TransactionTab = ({
  query,
}: {
  query?: { startDate: string; endDate: string };
}) => {
  const { data: groupedTransactions } = useTransactions(query);

  if (!groupedTransactions) return null;

  return (
    <div>
      {groupedTransactions.map(({ transactions }, idx) => (
        <TransactionList key={idx} transactions={transactions} />
      ))}
    </div>
  );
};
