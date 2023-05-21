import { PageTitle } from "@/components/PageTitle";
import { AddBankAccForm } from "@/components/forms/AddBankAccForm";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { AddBankAccFormContextProvider } from "@/contexts/AddBankAccFormContext";
import { Container } from "@mui/material";
import Head from "next/head";

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
