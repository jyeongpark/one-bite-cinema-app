import React from "react";
import Searchbar from "./_component/SearchBar";

interface Props {
  children: React.ReactNode;
}

export default function layout({ children }: Props) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
