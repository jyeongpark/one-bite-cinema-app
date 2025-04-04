"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

export default function Searchbar() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (!search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <input
        value={search}
        onChange={onChangeValue}
        onKeyDown={onKeyDown}
        placeholder="검색어를 입력하세요 ..."
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
