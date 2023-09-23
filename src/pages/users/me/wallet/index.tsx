import Head from "next/head";

import { Container, Stack } from "@mui/material";

import { BaseLayout } from "@/components/layouts/base-layout";
import { PageTitle } from "@/components/page-title";

export default function WalletPage() {
  return (
    <>
      <Head>
        <title>錢包</title>
      </Head>
      <BaseLayout>
        <PageTitle title="錢包" />
        <Container maxWidth="xs">
          <Stack spacing={2}>
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
}
