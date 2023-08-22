import type { MouseEvent } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, Step } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import {
  MerchandiseForm,
  merchandiseFormSchema,
} from "@/components/forms/MerchandiseForm";
import { NeedsForm, needsFormSchema } from "@/components/forms/NeedsForm";
import {
  ReviewForm,
  reviewFormSchema,
  transformReviewFormValues,
  type ReviewFormValues,
} from "@/components/forms/ReviewForm";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { PageTitle } from "@/components/PageTitle";
import { SubmitButton } from "@/components/SubmitButton";
import { Button } from "@/components/ui/Button";
import { StepLabel } from "@/components/ui/StepLabel";
import { Stepper } from "@/components/ui/Stepper";
import { useAddOrder } from "@/hooks/api/useAddOrder";
import { useStepper } from "@/hooks/useStepper";

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
  purchase: {
    countryCode: "",
    cityCode: "",
  },
  purchaseAddress: "",
  quantity: 0,
  packing: true,
  receipt: true,
  fee: 0,
  destination: {
    countryCode: "",
    cityCode: "",
  },
  deadline: new Date(),
  note: "",
};

const NewOrderPage: NextPage = () => {
  const router = useRouter();

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

  const { mutate: addOrder, isLoading, isSuccess } = useAddOrder();

  const handleNext = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const isStepValid = await trigger();
    if (isStepValid) handleStepperNext();
  };

  const handleFormSubmit = (data: ReviewFormValues) => {
    addOrder(transformReviewFormValues(data), {
      onSuccess: (data) => router.replace(`/orders/${data.orderId}`),
    });
  };

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
            <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                    disabled={isLoading || isSuccess}
                    sx={{ minWidth: 0, width: "100%" }}
                  >
                    上一步
                  </Button>
                ) : null}
                {activeStep === totalSteps - 1 ? (
                  <SubmitButton
                    fullWidth
                    loading={isLoading}
                    success={isSuccess}
                  >
                    發布委託
                  </SubmitButton>
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
