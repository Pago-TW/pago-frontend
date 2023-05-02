import type { PropsWithChildren } from "react";
import { Navbar } from "../Navbar";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <div style={{ marginBottom: 15 }}>
      <Navbar />
      {children}
    </div>
  );
};
