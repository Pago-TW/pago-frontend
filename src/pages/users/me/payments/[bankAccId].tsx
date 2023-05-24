import { BankAccountInfo } from "@/components/BankAccountInfo";
import { BankUserInfo } from "@/components/BankUserInfo";
import { PageTitle } from "@/components/PageTitle";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { useBankAccount } from "@/hooks/api/useBankAccount";
import { Container, Stack } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";

export default function UserBankAccountDetailPage() {
  const router = useRouter();
  const bankAccId = router.query.bankAccId as string;

  const { data: account } = useBankAccount(bankAccId, { enabled: !!bankAccId });

  return (
    <>
      <Head>
        <title>銀行帳號</title>
      </Head>
      <BaseLayout>
        <PageTitle title="銀行帳號" />
        <Container>
          <Stack spacing={2}>
            {!!account && (
              <>
                <BankUserInfo
                  legalName={account.legalName}
                  birthDate={account.birthDate}
                  residentialDistrict={account.residentialDistrict}
                />
                <BankAccountInfo
                  bankName={account.bankName}
                  branchAdministrativeDivision={
                    account.branchAdministrativeDivision
                  }
                  branchName={account.branchName}
                  accountHolderName={account.accountHolderName}
                  accountNumber={account.accountNumber}
                />
              </>
            )}
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
}