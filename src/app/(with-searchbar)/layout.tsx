import Searchbar from "@/components/searchbar";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* Suspense는 fallback을 사용하여 로딩 중인 상태를 보여줄 수 있다. */}
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
