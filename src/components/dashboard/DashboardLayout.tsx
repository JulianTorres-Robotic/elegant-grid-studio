import { ReactNode } from "react";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-20 px-4 md:px-8 pb-8 max-w-7xl mx-auto">
      {children}
    </main>
  </div>
);

export default DashboardLayout;
