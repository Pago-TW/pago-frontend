export interface Bank {
  bankCode: string;
  name: string;
}

export interface BankBranch {
  bankCode: Bank["bankCode"];
  branchCode: string;
  branchName: string;
  address: string;
  phoneNumber: string;
  administrativeDivision: string;
}

export interface AdministrativeDivision {
  administrativeDivisionChineseName: string;
  administrativeDivisionEnglishName: string;
  districtList: District[];
}

export interface District {
  zipCode: string;
  districtChineseName: string;
  districtEnglishName: string;
}

export interface Otp {
  expiryDate: string;
  createDate: string;
}

export interface BankAccount {
  bankAccountId: string;
  userId: string;
  legalName: string;
  birthDate: string;
  identityNumber: string;
  residentialAddress: string;
  zipCode: string;
  bankCode: string;
  bankName: string;
  branchAdministrativeDivision: string;
  branchCode: string;
  branchName: string;
  accountHolderName: string;
  accountNumber: string;
  createDate: string;
  updateDate: string;
  isDefault: boolean;
}
