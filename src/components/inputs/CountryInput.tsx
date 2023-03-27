import { MenuItem } from "@mui/material";
import type { FieldValues } from "react-hook-form";
import type { SelectInputProps } from "./SelectInput";
import { SelectInput } from "./SelectInput";

export const COUNTRY_OPTIONS = [
  { value: "臺北市", content: "台北市" },
  { value: "新北市", content: "新北市" },
  { value: "桃園市", content: "桃園市" },
  { value: "臺中市", content: "臺中市" },
  { value: "臺南市", content: "臺南市" },
  { value: "高雄市", content: "高雄市" },
  { value: "基隆市", content: "基隆市" },
  { value: "新竹市", content: "新竹市" },
  { value: "嘉義市", content: "嘉義市" },
  { value: "新竹縣", content: "新竹縣" },
  { value: "苗栗縣", content: "苗栗縣" },
  { value: "彰化縣", content: "彰化縣" },
  { value: "南投縣", content: "南投縣" },
  { value: "雲林縣", content: "雲林縣" },
  { value: "嘉義縣", content: "嘉義縣" },
  { value: "屏東縣", content: "屏東縣" },
  { value: "宜蘭縣", content: "宜蘭縣" },
  { value: "花蓮縣", content: "花蓮縣" },
  { value: "臺東縣", content: "臺東縣" },
  { value: "澎湖縣", content: "澎湖縣" },
  { value: "金門縣", content: "金門縣" },
  { value: "連江縣", content: "連江縣" },
  { value: "其他", content: "其他" },
] as const;

export const COUNTRY_VALUES = [
  COUNTRY_OPTIONS[0].value,
  ...COUNTRY_OPTIONS.slice(1).map((o) => o.value),
] as const;

export type Country = (typeof COUNTRY_OPTIONS)[number]["value"];

export type CountryInputProps<T extends FieldValues> = Omit<
  SelectInputProps<T>,
  "options"
>;

export const CountryInput = <T extends FieldValues>(
  props: CountryInputProps<T>
) => {
  return (
    <SelectInput {...props}>
      {COUNTRY_OPTIONS.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.content}
        </MenuItem>
      ))}
    </SelectInput>
  );
};

export default CountryInput;
