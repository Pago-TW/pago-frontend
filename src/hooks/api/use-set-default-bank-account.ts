import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { BankAccount } from "@/types/bank";

interface SetDefaultBankAccountData extends Pick<BankAccount, "bankAccountId"> {
  otpCode: string;
}

const setDefaultBankAccount = async ({
  bankAccountId,
  otpCode,
}: SetDefaultBankAccountData) => {
  const res = await axios.patch<string>(
    `/bank-accounts/${bankAccountId}/default`,
    { otpCode }
  );

  return res.data;
};

export const useSetDefaultBankAccount = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: setDefaultBankAccount,
    onSuccess: () => qc.invalidateQueries(["bank-accounts"]),
  });
};
