import {
  MerchandiseForm,
  merchandiseFormSchema,
} from "@components/forms/MerchandiseForm";
import { NeedsForm, needsFormSchema } from "@components/forms/NeedsForm";
import type { ReviewFormValues } from "@components/forms/ReviewForm";
import { ReviewForm, reviewFormSchema } from "@components/forms/ReviewForm";
import { BaseLayout } from "@components/layouts/BaseLayout";
import { PageTitle } from "@components/PageTitle";
import { Button } from "@components/ui/Button";
import { StepLabel } from "@components/ui/StepLabel";
import { Stepper } from "@components/ui/Stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStepper } from "@hooks/useStepper";
import { Box, Step } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { FormProvider, useForm } from "react-hook-form";

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

const DEFAULT_VALUES: Partial<ReviewFormValues> = {
  name: "",
  description: "",
  price: {
    amount: 0,
    currency: "TWD",
  },
  purchaseLocation: "",
  amount: 0,
  packing: true,
  receipt: true,
  fee: {
    amount: 0,
    currency: "TWD",
  },
  destination: "",
  date: new Date(),
  remark: "",
};

const getStepSchema = (step: number) => {
  switch (step) {
    case 0:
      return merchandiseFormSchema;
    case 1:
      return needsFormSchema;
    default:
      return reviewFormSchema;
  }
};

const getStepForm = (step: number) => {
  switch (step) {
    case 0:
      return <MerchandiseForm />;
    case 1:
      return <NeedsForm />;
    case 2:
      return <ReviewForm />;
    default:
      return null;
  }
};

const NewOrderPage: NextPage = () => {
  const {
    activeStep,
    handleNext: handleStepperNext,
    handlePrev: handleStepperPrev,
  } = useStepper({
    totalSteps: STEPS.length,
  });

  const methods = useForm<ReviewFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(getStepSchema(activeStep)),
  });
  const { handleSubmit, trigger } = methods;

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) handleStepperNext();
  };

  const formSubmit = (formData: ReviewFormValues) => console.log(formData);

  return (
    <>
      <Head>
        <title>新增委託</title>
      </Head>
      <BaseLayout>
        <Box sx={{ mx: { xs: 3, sm: 13 }, my: { xs: 3, md: 8 } }}>
          <PageTitle>填寫委託資訊</PageTitle>
        </Box>
        <Box sx={{ mx: { xs: 3, sm: 13 }, mb: 3 }}>
          <Stepper activeStep={activeStep}>
            {STEPS.map(({ label }) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <FormProvider {...methods}>
            <form>
              {getStepForm(activeStep)}
              <Box display="flex">
                {activeStep !== 0 ? (
                  <Button
                    variant="outlined"
                    onClick={handleStepperPrev}
                    sx={{ mx: "auto", mt: 3 }}
                  >
                    上一步
                  </Button>
                ) : null}
                {activeStep === STEPS.length - 1 ? (
                  <Button
                    onClick={handleSubmit(formSubmit)}
                    sx={{ mx: "auto", mt: 3 }}
                  >
                    發布委託
                  </Button>
                ) : (
                  <Button onClick={handleNext} sx={{ mx: "auto", mt: 3 }}>
                    下一步
                  </Button>
                )}
              </Box>
            </form>
          </FormProvider>
        </Box>
      </BaseLayout>
    </>
  );
};

export default NewOrderPage;
