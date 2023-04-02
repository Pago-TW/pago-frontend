import { Header } from "@/components/Header";
import type { PropsWithChildren } from "react";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
