import type { BankAccount } from "@/types/bank";
import type { Order } from "@/types/order";
import type { User } from "@/types/user";

export interface Transaction {
  transactionId: string;
  userId: User["userId"];
  transactionTitle: string;
  transactionDescription: string;
  transactionAmount: number;
  transactionType: TransactionType;
  transactionDate: string;
  transactionStatus: TransactionStatus;
  detail: TransactionDetail;
}

export interface TransactionDetail {
  balance: number;
  accountNumber?: BankAccount["accountNumber"];
  bankName?: BankAccount["bankName"];
  orderSerialNumber?: Order["serialNumber"];
  orderName?: Order["orderItem"]["name"];
  cancelReason?: string;
}

export type TransactionType = "WITHDRAW" | "INCOME" | "REFUND" | "FEE";

export type TransactionStatus =
  | "WITHDRAWAL_IN_PROGRESS"
  | "WITHDRAWAL_SUCCESS"
  | "WITHDRAWAL_FAILED"
  | "REFUND_IN_PROGRESS"
  | "REFUND_SUCCESS"
  | "REFUND_FAILED"
  | "COMPLETED";
