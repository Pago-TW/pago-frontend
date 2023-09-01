import Head from "next/head";

import { SettingLayout } from "@/components/layouts/setting-layout";

export default function UserSettingsPage() {
  return (
    <>
      <Head>
        <title>設定</title>
      </Head>
      <SettingLayout />
    </>
  );
}
