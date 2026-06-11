import { Outlet } from "react-router-dom";
import { CustomCursor } from "@/components/CustomCursor";
import { BottomNav } from "@/components/BottomNav";

export function RootLayout() {
  return (
    <>
      <CustomCursor />
      <Outlet />
      <BottomNav />
    </>
  );
}
