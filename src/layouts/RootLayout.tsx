import { Outlet } from "react-router-dom";
import { CustomCursor } from "@/components/CustomCursor";
import { BottomNav } from "@/components/BottomNav";
import { SmartCalculatorsFloat } from "@/components/SmartCalculatorsFloat";

export function RootLayout() {
  return (
    <>
      <CustomCursor />
      <Outlet />
      <BottomNav />
      <SmartCalculatorsFloat />
    </>
  );
}
