import Head from "next/head";

import { Container, Grid, Stack } from "@mui/material";

import { BaseLayout } from "@/components/layouts/base-layout";
import { PageTitle } from "@/components/page-title";
import { BalanceSection } from "@/components/wallet/balance-section";
import { BankAccountSection } from "@/components/wallet/bank-account-section";
import { TransactionSection } from "@/components/wallet/transaction-section";

export default function WalletPage() {
  return (
    <>
      <Head>
        <title>錢包</title>
      </Head>
      <BaseLayout>
        <PageTitle title="錢包" />
        <Container>
          <Stack spacing={2}>
            <Grid container spacing={2} direction={{ xs: "column", md: "row" }}>
              <Grid item xs>
                <BalanceSection />
              </Grid>
              <Grid item xs>
                <BankAccountSection />
              </Grid>
            </Grid>
            <Container maxWidth="md" disableGutters>
              <TransactionSection />
            </Container>
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
}
