import Head from "next/head";

import { Container, Paper, Stack } from "@mui/material";

import { AddBankCard } from "@/components/add-bank-card";
import { BankCard } from "@/components/bank-card";
import { BaseLayout } from "@/components/layouts/base-layout";
import { PageTitle } from "@/components/page-title";
import { useBankAccounts } from "@/hooks/api/use-bank-accounts";

export default function UserBankAccountsPage() {
  const { data: accounts } = useBankAccounts();

  return (
    <>
      <Head>
        <title>錢包</title>
      </Head>
      <BaseLayout>
        <PageTitle title="銀行帳號" />
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Paper sx={{ p: 3 }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              gap={3}
              flexWrap="wrap"
            >
              <AddBankCard />
              {accounts?.map((acc) => (
                <BankCard
                  key={acc.bankAccountId}
                  bankAccountId={acc.bankAccountId}
                  bankName={acc.bankName}
                  bankLogoUrl={acc.bankLogoUrl}
                  accountNumber={acc.accountNumber}
                  legalName={acc.legalName}
                  isDefault={acc.isDefault}
                />
              ))}
            </Stack>
          </Paper>
        </Container>
      </BaseLayout>
    </>
  );
}
