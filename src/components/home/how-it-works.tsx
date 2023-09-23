import { useState } from "react";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Stack, styled } from "@mui/material";

import { SectionTitle } from "@/components/section-title";
import * as StepCard from "@/components/step-card";
import { Tab } from "@/components/ui/tab";

const TABS = [
  { label: "委託者", value: "CONSUMER" },
  { label: "代購者", value: "SHOPPER" },
] as const;

type Tab = (typeof TABS)[number];

interface Step {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

const CONSUMER_STEPS: Step[] = [
  {
    title: "發布委託",
    description:
      "為您想要購買的產品創建一個委託訂單，並自己訂定願意支付的代購費。",
    image: {
      src: "/images/how-it-works/consumer/step1.jpg",
      alt: "A bag and shoes and sunglasses",
    },
  },
  {
    title: "等待代購者出價",
    description:
      "當您發布委託後，所有使用者將看到您的委託，且他們可以針對委託提出更合理的報價。",
    image: {
      src: "/images/how-it-works/consumer/step2.jpg",
      alt: "A person holding a phone",
    },
  },
  {
    title: "選擇代購者",
    description: "您可以從所有願意代購者中，選擇一位，並接受他的報價。",
    image: {
      src: "/images/how-it-works/consumer/step3.jpg",
      alt: "A person holding a phone",
    },
  },
  {
    title: "面交取得商品",
    description:
      "與代購者相約時間、地點面交，取得商品，並為雙方在這次的交易體驗中評價。",
    image: {
      src: "/images/how-it-works/consumer/step4.jpg",
      alt: "A close up of hands",
    },
  },
];

const SHOPPER_STEPS: Step[] = [
  {
    title: "發布旅途",
    description:
      "將您計畫好的旅途，發布在Pago，您將看到符合您旅途範圍的委託單。",
    image: {
      src: "/images/how-it-works/shopper/step1.jpg",
      alt: "A person walking down a street with a backpack",
    },
  },
  {
    title: "選擇委託單",
    description:
      "您可以選擇願意代購的委託單，若您對代購費不滿意您可以向對方提出更合理的報價。",
    image: {
      src: "/images/how-it-works/shopper/step2.jpg",
      alt: "A person sitting on a dock looking at a phone",
    },
  },
  {
    title: "購買商品",
    description:
      "委託者接受了您的報價，接著您需要根據委託單的內容購買指定規格的商品。",
    image: {
      src: "/images/how-it-works/shopper/step3.jpg",
      alt: "A person using a credit card to pay",
    },
  },
  {
    title: "面交商品",
    description:
      "與委託者相約時間、地點面交，取得商品，並為雙方在這次的交易體驗中評價。",
    image: {
      src: "/images/how-it-works/shopper/step4.jpg",
      alt: "A close up of hands",
    },
  },
];

const StyledTab = styled(Tab)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    fontSize: theme.typography.pxToRem(16),
  },
  [theme.breakpoints.up("md")]: {
    fontSize: theme.typography.pxToRem(18),
  },
}));

export const HowItWorks = () => {
  const [currentTab, setCurrentTab] = useState<Tab["value"]>("CONSUMER");

  const handleTabChange = (_event: React.SyntheticEvent, value: Tab["value"]) =>
    setCurrentTab(value);

  return (
    <section>
      <SectionTitle sx={{ mt: 10, mb: 5 }}>Pago 如何運作</SectionTitle>

      <TabContext value={currentTab}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <TabList onChange={handleTabChange} centered>
            {TABS.map((tab) => (
              <StyledTab key={tab.value} {...tab} />
            ))}
          </TabList>
        </Box>

        <TabPanel value="CONSUMER">
          <TabContent steps={CONSUMER_STEPS} />
        </TabPanel>

        <TabPanel value="SHOPPER">
          <TabContent steps={SHOPPER_STEPS} />
        </TabPanel>
      </TabContext>
    </section>
  );
};

interface TabContentProps {
  steps: Step[];
}

const TabContent = ({ steps }: TabContentProps) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={6}
      sx={{
        "& :nth-child(odd)": {
          alignSelf: "start",
          "&  .MuiCardMedia-root img": {
            clipPath: "polygon(25% 0, 100% 0%, 100% 100%, 0 100%)",
          },
        },
        "& :nth-child(even)": {
          alignSelf: "end",
          "&  .MuiCardMedia-root img": {
            clipPath: "polygon(0 0, 100% 0%, 100% 100%, 25% 100%)",
          },
        },
      }}
    >
      {steps.map(({ title, description, image: { src, alt } }, idx) => (
        <StepCard.Root sx={{ width: { xs: "100%", md: "80%" } }} key={idx}>
          <StepCard.Label
            src={`/images/how-it-works/labels/step${idx + 1}.svg`}
            alt={`A label icon with 'Step ${idx + 1}' text`}
          />
          <StepCard.Content>
            <StepCard.Title>{title}</StepCard.Title>
            <StepCard.Description>{description}</StepCard.Description>
          </StepCard.Content>
          <StepCard.Image src={src} alt={alt} />
        </StepCard.Root>
      ))}
    </Stack>
  );
};
