import { AmountInput } from "@components/AmountInput";
import { Container } from "@components/layouts/Container";
import { PageTitle } from "@components/PageTitle";
import { Button } from "@components/ui/Button";
import { StepLabel } from "@components/ui/StepLabel";
import { Stepper } from "@components/ui/Stepper";
import { useStepper } from "@hooks/useStepper";
import { Place } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Step,
  TextField,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

const STEPS = [
  {
    label: "商品資訊",
    content: "test 1",
  },
  {
    label: "代購需求",
    content: "test 2",
  },
  {
    label: "確認資訊",
    content: "test 3",
  },
];

const StepOne = () => {
  return (
    <Stack spacing={3}>
      <TextField
        label="商品名稱"
        variant="standard"
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <TextField
        label="商品圖片"
        variant="standard"
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <TextField
        label="商品規格敘述"
        variant="standard"
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Box position="relative">
        <TextField
          label="商品價格"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <FormControl
          size="small"
          sx={{ minWidth: 120, position: "absolute", right: 0, bottom: 5 }}
        >
          <InputLabel>貨幣單位</InputLabel>
          <Select label="貨幣單位">
            <MenuItem>NTD</MenuItem>
            <MenuItem>JPN</MenuItem>
            <MenuItem>USD</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ position: "relative" }}>
        <TextField
          label="購買地點"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <IconButton sx={{ p: 0, position: "absolute", right: 0, bottom: 5 }}>
          <Place />
        </IconButton>
      </Box>
      <AmountInput label="商品數量" />
    </Stack>
  );
};

const NewCommissionPage: NextPage = () => {
  const { activeStep, isFinished, handlePrev, handleNext } = useStepper({
    totalSteps: STEPS.length,
  });

  return (
    <>
      <Head>
        <title>新增委託</title>
      </Head>
      <Container>
        <Box sx={{ mx: { xs: 3, sm: 13 }, my: { xs: 3, md: 8 } }}>
          <PageTitle>填寫委託資訊</PageTitle>
        </Box>
        <Box sx={{ mx: { xs: 3, sm: 13 } }}>
          <Stepper activeStep={activeStep}>
            {STEPS.map(({ label }) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
            <StepOne />
            {/* {isFinished ? <div>done!</div> : STEPS[activeStep]?.content} */}
          </Paper>
          <Box display="flex">
            <Button onClick={handleNext} sx={{ mx: "auto", mt: 3 }}>
              下一步
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default NewCommissionPage;
