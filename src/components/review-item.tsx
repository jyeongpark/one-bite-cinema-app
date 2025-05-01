import style from "./review-item.module.css";
import { ReviewData } from "@/types";
import React from "react";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId,
}: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.author_container}>
        <div className={style.author}>{author}</div>
        <div className={style.date}>
          {new Date(createdAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          작성됨
        </div>
      </div>

      <div className={style.content}>{content}</div>
      <div>
        <div className={style.delete_btn}>삭제하기</div>
      </div>
    </div>
  );
}
