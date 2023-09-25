import { createContext, useContext, type ReactNode } from "react";

import { Stack } from "@mui/material";

export interface BankAccountSelectProps extends BankAccountSelectContextValue {
  children: ReactNode;
}

export const BankAccountSelect = ({
  value,
  onChange,
  children,
}: BankAccountSelectProps) => {
  return (
    <Stack spacing={3}>
      <BankAccountSelectContext.Provider value={{ value, onChange }}>
        {children}
      </BankAccountSelectContext.Provider>
    </Stack>
  );
};

export interface BankAccountSelectContextValue {
  value: string;
  onChange: (value: string) => void;
}

export const BankAccountSelectContext = createContext<
  BankAccountSelectContextValue | undefined
>(undefined);

export const useBankAccountSelect = () => useContext(BankAccountSelectContext);
