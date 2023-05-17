export interface Bank {
  bankCode: string;
  name: string;
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
