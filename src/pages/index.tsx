import { BaseLayout } from "@/components/layouts/BaseLayout";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Home: NextPage = () => {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>Pago</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout>
        <main>Pago Home Page</main>
        <p>{status}</p>
        {status === "authenticated" && (
          <button onClick={() => signOut()}>Sign Out</button>
        )}
      </BaseLayout>
    </>
  );
};

export default Home;
