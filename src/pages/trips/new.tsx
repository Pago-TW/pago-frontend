import type { NextPage } from "next";
import Head from "next/head";

import { Container } from "@mui/material";

import { NewTripCollectionForm } from "@/components/forms/new-trip-collection-form";
import { BaseLayout } from "@/components/layouts/base-layout";
import { PageTitle } from "@/components/page-title";

export const NewTripPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>新增旅途</title>
      </Head>
      <BaseLayout>
        <PageTitle title="填寫旅途詳情" />
        <Container>
          <NewTripCollectionForm />
        </Container>
      </BaseLayout>
    </>
  );
};

export default NewTripPage;
