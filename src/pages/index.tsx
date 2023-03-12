import { BaseLayout } from "@/components/layouts/BaseLayout";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pago</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout>
        <main>Pago Home Page</main>
      </BaseLayout>
    </>
  );
};

export default Home;
