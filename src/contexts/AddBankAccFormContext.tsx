import {
  createContext,
  useContext,
  useEffect,
  type PropsWithChildren,
} from "react";

import { useSession } from "next-auth/react";
import { useImmer, type Updater } from "use-immer";

import { utcNow } from "@/utils/date";

const INITIAL_STATE = {
  step: 0,
  data: {
    userInfo: {
      legalName: "",
      birthDate: utcNow(),
      city: "",
      zipCode: "",
    },
    bankInfo: {
      bankCode: "",
      bankCity: "",
      branchCode: "",
      accountHolderName: "",
      accountNumber: "",
    },
    verifyPhone: {
      phone: "",
      otpCode: "",
      countdownDate: new Date(),
    },
  },
};

export const AddBankAccFormContext = createContext<{
  form: typeof INITIAL_STATE;
  setForm: Updater<typeof INITIAL_STATE>;
}>({
  form: INITIAL_STATE,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setForm: () => {},
});

export const AddBankAccFormContextProvider = ({
  children,
}: PropsWithChildren) => {
  const { data: session } = useSession();

  const [form, setForm] = useImmer(INITIAL_STATE);

  useEffect(() => {
    setForm((draft) => {
      draft.data.verifyPhone.phone = session?.user?.phone ?? "";
    });
  }, [session?.user?.phone, setForm]);

  return (
    <AddBankAccFormContext.Provider value={{ form, setForm }}>
      {children}
    </AddBankAccFormContext.Provider>
  );
};

export const useAddBankAccFormContext = () => useContext(AddBankAccFormContext);
