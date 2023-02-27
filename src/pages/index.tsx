import { Container } from "@components/layouts/Container";
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
      <Container>
        <main>Pago Home Page</main>
      </Container>
    </>
  );
};

export default Home;
