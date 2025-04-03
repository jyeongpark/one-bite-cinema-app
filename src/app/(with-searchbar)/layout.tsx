import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function layout({ children }: Props) {
  return (
    <div>
      <div>Searchbar Layout</div>
      {children}
    </div>
  );
}
