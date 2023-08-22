import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zonedTimeToUtc } from "date-fns-tz";

import { axios } from "@/libs/axios";

type AddBankAccountData = {
  legalName: string;
  birthDate: Date;
  zipCode: string;
  bankCode: string;
  branchCode: string;
  accountHolderName: string;
  accountNumber: string;
};

const addBankAccount = async (data: AddBankAccountData) => {
  const postData = {
    ...data,
    birthDate: zonedTimeToUtc(data.birthDate, "UTC"),
  };
  const res = await axios.post("/bank-accounts", postData);

  return res.data;
};

export const useAddBankAccount = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addBankAccount,
    onSuccess: () => qc.invalidateQueries(["bank-accounts"]),
  });
};
