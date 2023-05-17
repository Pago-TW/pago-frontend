import { PageTitle } from "@/components/PageTitle";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Link } from "@/components/ui/Link";
import { Typography } from "@/components/ui/Typography";
import { Add } from "@mui/icons-material";
import { Container, Paper, Stack, styled } from "@mui/material";
import Head from "next/head";

const CreditCardBox = styled(Link)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: 170,
  borderRadius: 1,
  overflow: "hidden",
  color: theme.palette.base[500],
  userSelect: "none",
  cursor: "pointer",
}));

export default function UserPaymentPage() {
  return (
    <>
      <Head>
        <title>錢包</title>
      </Head>
      <BaseLayout>
        <PageTitle title="付款方式" />
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            component={Stack}
            spacing={3}
            sx={{ p: 3, width: "100%", maxWidth: 336 }}
          >
            <CreditCardBox
              sx={{
                borderWidth: 2,
                borderStyle: "dashed",
                borderColor: "base.300",
              }}
              href="/users/me/payment/new"
            >
              <Typography
                variant="h5"
                as="span"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Add />
                新增銀行帳戶
              </Typography>
            </CreditCardBox>
          </Paper>
        </Container>
      </BaseLayout>
    </>
  );
}
