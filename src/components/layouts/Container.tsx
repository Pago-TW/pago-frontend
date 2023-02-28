import { Header } from "@components/Header";
import type { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
