import React from "react";
import MovieItemSkeleton from "./movie-item-skeleton";

export default function MovieListSkeleton({
  count,
  gridColumns = 3,
}: {
  count: number; // 몇 개의 스켈레톤을 보여줄지
  gridColumns?: number; // 몇 개의 열로 보여줄지
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: "10px",
      }}
    >
      {new Array(count).fill(0).map((_, index) => (
        <MovieItemSkeleton key={`book-item-skeleton-${index}`} />
      ))}
    </div>
  );
}
