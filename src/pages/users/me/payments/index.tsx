import { AddBankCard } from "@/components/AddBankCard";
import { BankCard } from "@/components/BankCard";
import { PageTitle } from "@/components/PageTitle";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { useBankAccounts } from "@/hooks/api/useBankAccounts";
import { Container, Paper, Stack } from "@mui/material";
import Head from "next/head";

export default function UserBankAccountsPage() {
  const { data: accounts } = useBankAccounts();

  return (
    <>
      <Head>
        <title>錢包</title>
      </Head>
      <BaseLayout>
        <PageTitle title="付款方式" />
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            component={Stack}
            gap={3}
            sx={{ p: 3, width: "100%", maxWidth: 336 }}
          >
            <AddBankCard />
            {accounts?.map((acc) => (
              <BankCard
                key={acc.bankAccountId}
                bankAccountId={acc.bankAccountId}
                bankName={acc.bankName}
                accountNumber={acc.accountNumber}
                legalName={acc.legalName}
                isDefault={acc.isDefault}
              />
            ))}
          </Paper>
        </Container>
      </BaseLayout>
    </>
  );
}
