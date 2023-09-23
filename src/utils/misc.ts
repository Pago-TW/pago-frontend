import type { WithRequired } from "@/types/util";

export const translateBoolean = (value: boolean) => (value ? "是" : "否");

export const formatCurrency = ({
  value,
  ...options
}: WithRequired<Omit<Intl.NumberFormatOptions, "style">, "currency"> & {
  value: number;
}) => {
  return Intl.NumberFormat(undefined, {
    style: "currency",
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
};

export const formatBankAccount = (text: string) =>
  text.match(/[^\s]{4}/g)?.join(" ");

export const formatNumber = (value: number) =>
  Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0,
  }).format(value);
