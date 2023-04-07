import type { PropsWithChildren } from "react";
import { Navbar } from "../Navbar";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
