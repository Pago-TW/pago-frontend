import type { ConfirmOptions } from "material-ui-confirm";

export const defaultConfirmOptions: ConfirmOptions = {
  confirmationText: "是",
  cancellationText: "否",
  buttonOrder: ["confirm", "cancel"],
};
