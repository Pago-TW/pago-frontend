import {
  MerchandiseForm,
  merchandiseFormSchema,
} from "@/components/forms/MerchandiseForm";
import { NeedsForm, needsFormSchema } from "@/components/forms/NeedsForm";
import type { ReviewFormValues } from "@/components/forms/ReviewForm";
import { ReviewForm, reviewFormSchema } from "@/components/forms/ReviewForm";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/Button";
import { StepLabel } from "@/components/ui/StepLabel";
import { Stepper } from "@/components/ui/Stepper";
import { useStepper } from "@/hooks/useStepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, Step } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import type { MouseEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";

const STEPS = [
  {
    label: "商品資訊",
    form: <MerchandiseForm />,
    schema: merchandiseFormSchema,
  },
  {
    label: "代購需求",
    form: <NeedsForm />,
    schema: needsFormSchema,
  },
  {
    label: "確認資訊",
    form: <ReviewForm />,
    schema: reviewFormSchema,
  },
] as const;

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

const NewOrderPage: NextPage = () => {
  const {
    activeStep,
    activeStepObj,
    totalSteps,
    handleNext: handleStepperNext,
    handlePrev: handleStepperPrev,
  } = useStepper({ steps: STEPS });

  const resolver = activeStepObj?.schema
    ? zodResolver(activeStepObj.schema)
    : undefined;

  const methods = useForm<ReviewFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver,
  });
  const { handleSubmit, trigger } = methods;

  const handleNext = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
        <PageTitle title="填寫委託資訊" />
        <Box sx={{ mx: { xs: 3, sm: 13 }, mb: 3 }}>
          <Stepper activeStep={activeStep}>
            {STEPS.map(({ label }) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(formSubmit)}>
              {activeStepObj?.form}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                my={3}
              >
                {activeStep !== 0 ? (
                  <Button
                    variant="outlined"
                    onClick={handleStepperPrev}
                    sx={{ minWidth: 0, width: "100%" }}
                  >
                    上一步
                  </Button>
                ) : null}
                {activeStep === totalSteps - 1 ? (
                  <Button type="submit" sx={{ minWidth: 0, width: "100%" }}>
                    發布委託
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    sx={{ minWidth: 0, width: "100%" }}
                  >
                    下一步
                  </Button>
                )}
              </Stack>
            </form>
          </FormProvider>
        </Box>
      </BaseLayout>
    </>
  );
};

export default NewOrderPage;
