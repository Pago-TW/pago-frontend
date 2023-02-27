import { Header } from "@components/Header";
import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
