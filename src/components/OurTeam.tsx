import { Container, Divider, Stack } from "@mui/material";

import * as MemberCard from "@/components/MemberCard";
import { SectionTitle } from "@/components/SectionTitle";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { Typography } from "@/components/ui/Typography";

interface Member {
  name: string;
  job: string;
  image: {
    src: string;
    alt: string;
  };
  links: {
    github: string;
    instagram: string;
    linkedin: string;
  };
}

const MEMBERS: Member[] = [
  {
    name: "邱奕勳",
    job: "負責職位: PM、後端開發",
    image: {
      src: "/images/about-us/team/shiun.svg",
      alt: "",
    },
    links: {
      github: "https://github.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "陳俊廷",
    job: "負責職位: PM、後端開發",
    image: {
      src: "/images/about-us/team/jack.svg",
      alt: "",
    },
    links: {
      github: "https://github.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "范詠淇",
    job: "負責職位: 設計、行銷",
    image: {
      src: "/images/about-us/team/ariel.svg",
      alt: "",
    },
    links: {
      github: "https://github.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "曾瑞章",
    job: "負責職位: 前端開發",
    image: {
      src: "/images/about-us/team/enderwolf.svg",
      alt: "",
    },
    links: {
      github: "https://github.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "戴宇辰",
    job: "負責職位: 後端開發",
    image: {
      src: "/images/about-us/team/ycday.svg",
      alt: "",
    },
    links: {
      github: "https://github.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
];

export const OurTeam = () => {
  return (
    <section>
      <SectionTitle sx={{ mt: 10, mb: 5 }}>Team 創建團隊</SectionTitle>

      <Container>
        <Typography variant="h5" as="p" color="base.800" lineHeight={1.5}>
          我們是一群來自輔仁大學資管系的學子， 於 2022 年聚集而成的團隊。
          <br />
          <br />
          我們憑藉著專業知識與創新思維，專注於解決社會問題並創造有價值的技術產品。
          <br />
          <br />
          我們的理念不只是創造出一個共享經濟、快速媒合、價格透明的，更是透過實際行動，以科技助益社會，
          期望能共創一個高度透明、充分利用共享經濟並為每位用戶帶來價值的代購市場，讓每位用戶都能從中受益。
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Stack direction="row" gap={8} flexWrap="wrap" justifyContent="center">
          {MEMBERS.map(({ name, job, image, links }) => (
            <MemberCard.Root key={name}>
              <MemberCard.Image width={100} height={106} {...image} />
              <MemberCard.Content>
                <MemberCard.Title>{name}</MemberCard.Title>
                <MemberCard.Description>{job}</MemberCard.Description>
                <Stack direction="row" gap={3}>
                  <MemberCard.LinkButton href={links.linkedin}>
                    <LinkedInIcon sx={{ fontSize: 32 }} />
                  </MemberCard.LinkButton>
                  <MemberCard.LinkButton href={links.github}>
                    <GithubIcon sx={{ fontSize: 32 }} />
                  </MemberCard.LinkButton>
                  <MemberCard.LinkButton href={links.instagram}>
                    <InstagramIcon sx={{ fontSize: 32 }} />
                  </MemberCard.LinkButton>
                </Stack>
              </MemberCard.Content>
            </MemberCard.Root>
          ))}
        </Stack>
      </Container>
    </section>
  );
};
