import { useState, type MouseEvent } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { alpha, Box, Stack, Step, styled } from "@mui/material";
import { parseISO } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";

import {
  EditMerchandiseForm,
  editMerchandiseFormSchema,
} from "@/components/forms/EditMerchandiseForm";
import EditReviewForm, {
  editReviewFormSchema,
  transformEditReviewFormValues,
  type EditReviewFormValues,
} from "@/components/forms/EditReviewForm";
import { NeedsForm, needsFormSchema } from "@/components/forms/NeedsForm";
import type { Currency } from "@/components/inputs/CurrencyInput";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { PageTitle } from "@/components/PageTitle";
import { SubmitButton } from "@/components/SubmitButton";
import { Button } from "@/components/ui/Button";
import { StepLabel } from "@/components/ui/StepLabel";
import { Stepper } from "@/components/ui/Stepper";
import { useOrder } from "@/hooks/api/useOrder";
import { useUpdateOrder } from "@/hooks/api/useUpdateOrder";
import type { Order } from "@/types/order";

const StyledButton = styled(Button)(({ theme, color }) => ({
  minWidth: 0,
  width: "100%",
  ...(color === "success" && {
    "&.Mui-disabled": {
      color: theme.palette.common.white,
      backgroundColor: alpha(theme.palette.success.main, 0.5),
    },
  }),
}));

const transformApiData = (order: Order): EditReviewFormValues => {
  return {
    name: order.orderItem.name,
    description: order.orderItem.description,
    price: {
      amount: order.orderItem.unitPrice,
      currency: order.currency as Currency,
    },
    purchase: {
      countryCode: order.orderItem.purchaseCountryCode,
      cityCode: order.orderItem.purchaseCityCode,
    },
    purchaseAddress: [
      order.orderItem.purchaseDistrict,
      order.orderItem.purchaseRoad,
    ].join(" "),
    quantity: order.orderItem.quantity,
    packing: order.isPackagingRequired,
    receipt: order.isVerificationRequired,
    fee: order.travelerFee,
    destination: {
      countryCode: order.destinationCountryCode,
      cityCode: order.destinationCityCode,
    },
    deadline: parseISO(order.latestReceiveItemDate),
    note: order.note,
  };
};

const DEFAULT_VALUES: Partial<EditReviewFormValues> = {
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

const getSchema = (step: number) => {
  if (step === 1) return editMerchandiseFormSchema;
  if (step === 2) return needsFormSchema;
  if (step === 3) return editReviewFormSchema;
};

const EditOrderPage: NextPage = () => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const [step, setStep] = useState<number>(1);

  const isFirstStep = step === 1;
  const isLastStep = step === 3;

  const { data: order } = useOrder(orderId);

  const schema = getSchema(step);
  const methods = useForm<EditReviewFormValues>({
    mode: "onBlur",
    values: order ? transformApiData(order) : undefined,
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: DEFAULT_VALUES,
  });
  const { handleSubmit, trigger } = methods;

  const { mutate: updateOrder, isLoading, isSuccess } = useUpdateOrder();

  const handlePrevStep = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isFirstStep) setStep((prev) => prev - 1);
  };
  const handleNextStep = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const isStepValid = await trigger();
    if (isStepValid && !isLastStep) setStep((prev) => prev + 1);
  };
  const handleFormSubmit = (data: EditReviewFormValues) => {
    updateOrder(
      { orderId, data: transformEditReviewFormValues(data) },
      { onSuccess: (data) => void router.replace(`/orders/${data.orderId}`) }
    );
  };

  if (!order) return null;

  const imageUrls = order.orderItem.fileUrls;

  return (
    <>
      <Head>
        <title>編輯委託</title>
      </Head>
      <BaseLayout>
        <PageTitle title="填寫委託資訊" />
        <Box sx={{ mx: { xs: 3, sm: 13 }, mb: 3 }}>
          <Stepper activeStep={step}>
            <Step>
              <StepLabel>商品資訊</StepLabel>
            </Step>
            <Step>
              <StepLabel>代購需求</StepLabel>
            </Step>
            <Step>
              <StepLabel>確認資訊</StepLabel>
            </Step>
          </Stepper>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              {step === 1 && <EditMerchandiseForm imageUrls={imageUrls} />}
              {step === 2 && <NeedsForm />}
              {step === 3 && <EditReviewForm imageUrls={imageUrls} />}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                my={3}
              >
                {!isFirstStep ? (
                  <StyledButton
                    variant="outlined"
                    onClick={handlePrevStep}
                    disabled={isLoading || isSuccess}
                  >
                    上一步
                  </StyledButton>
                ) : null}
                {!isLastStep ? (
                  <StyledButton onClick={handleNextStep}>下一步</StyledButton>
                ) : (
                  <SubmitButton
                    fullWidth
                    loading={isLoading}
                    success={isSuccess}
                  >
                    儲存編輯
                  </SubmitButton>
                )}
              </Stack>
            </form>
          </FormProvider>
        </Box>
      </BaseLayout>
    </>
  );
};

export default EditOrderPage;
