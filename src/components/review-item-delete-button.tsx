"use client";
import React, { useEffect, useRef } from "react";
import style from "./review-item.module.css";
import { useActionState } from "react";
import { deleteReviewAction } from "@/actions/delete-review.action";

export default function ReviewItemDeleteButton({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input type="hidden" name="reviewId" value={reviewId} readOnly />
      <input type="hidden" name="movieId" value={movieId} readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        <div
          className={style.delete_btn}
          onClick={() => {
            formRef?.current?.requestSubmit();
          }}
        >
          삭제하기
        </div>
      )}
    </form>
  );
}
