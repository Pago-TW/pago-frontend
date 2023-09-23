import Head from "next/head";

import { Container } from "@mui/material";

import { AddBankAccForm } from "@/components/forms/add-bank-acc-form";
import { BaseLayout } from "@/components/layouts/base-layout";
import { PageTitle } from "@/components/page-title";
import { AddBankAccFormContextProvider } from "@/contexts/add-bank-acc-form-context";

export default function UserAddBankAccountPage() {
  return (
    <>
      <Head>
        <title>新增付款方式</title>
      </Head>
      <BaseLayout>
        <PageTitle title="使用者資訊" />
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <AddBankAccFormContextProvider>
            <AddBankAccForm />
          </AddBankAccFormContextProvider>
        </Container>
      </BaseLayout>
    </>
  );
}
