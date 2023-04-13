import type { CountryCityOption } from "@/components/inputs/CountryCitySelect";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { PageTitle } from "@/components/PageTitle";
import { Tab } from "@/components/ui/Tab";
import { env } from "@/env/server.mjs";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Container, Stack } from "@mui/material";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import type { SyntheticEvent } from "react";
import { useCallback, useState } from "react";

const DynamicOneWrapTripForm = dynamic(
  import("@/components/forms/OneWayTripForm")
);
const DynamicRoundTripForm = dynamic(
  import("@/components/forms/RoundTripForm")
);

const TABS = [
  { label: "單程", value: "ONE_WAY" },
  { label: "來回", value: "ROUND_TRIP" },
] as const;

type Tab = (typeof TABS)[number];

export const NewTripPage: NextPage<{
  countryCityOptions: CountryCityOption[];
}> = ({ countryCityOptions }) => {
  const [currentTab, setCurrentTab] = useState<Tab["value"]>("ONE_WAY");

  const handleTabChange = useCallback(
    (_event: SyntheticEvent, newValue: Tab["value"]) => {
      setCurrentTab(newValue);
    },
    []
  );

  return (
    <>
      <Head>
        <title>新增旅途</title>
      </Head>
      <BaseLayout>
        <PageTitle title="填寫旅途詳情" />
        <Container>
          <Stack spacing={2}>
            <TabContext value={currentTab}>
              <TabList
                onChange={handleTabChange}
                sx={{
                  "& .MuiTabs-flexContainer": { justifyContent: "center" },
                }}
              >
                {TABS.map((tab) => (
                  <Tab key={tab.value} {...tab} />
                ))}
              </TabList>
              {TABS.map((tab) => (
                <TabPanel
                  key={tab.value}
                  value={tab.value}
                  sx={{ px: 0, py: 2, flexGrow: 1 }}
                >
                  {tab.value === "ONE_WAY" ? (
                    <DynamicOneWrapTripForm
                      countryCityOptions={countryCityOptions}
                    />
                  ) : null}
                  {tab.value === "ROUND_TRIP" ? (
                    <DynamicRoundTripForm
                      countryCityOptions={countryCityOptions}
                    />
                  ) : null}
                </TabPanel>
              ))}
            </TabContext>
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(env.NEXT_PUBLIC_API_URL + "/countries-and-cities");
  const data = await res.json();

  return {
    props: {
      countryCityOptions: data.cities,
    },
  };
};

export default NewTripPage;
