import { PageTitle } from "@/components/PageTitle";
import { AddBankAccFormContainer } from "@/components/forms/AddBankAccFormContainer";
import { BaseLayout } from "@/components/layouts/BaseLayout";
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
          <AddBankAccFormContainer />
        </Container>
      </BaseLayout>
    </>
  );
}
