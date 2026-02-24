import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";

const SidebarLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background flex">
    <AppSidebar />
    {/* Main content offset by sidebar width */}
    <main className="flex-1 ml-[68px] md:ml-60 p-4 md:p-6 lg:p-8 max-w-[1400px]">
      {children}
    </main>
  </div>
);

export default SidebarLayout;
