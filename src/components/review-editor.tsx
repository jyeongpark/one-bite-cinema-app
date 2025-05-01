"use client";
import { createReveiewAction } from "@/actions/create-review.action";
import style from "./review-editor.module.css";
import { useActionState, useEffect } from "react";

export function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReveiewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input hidden name="movieId" value={movieId} readOnly />
        <textarea
          required
          name="content"
          placeholder="리뷰 내용"
          disabled={isPending}
        />
        <div className={style.submit_container}>
          <input
            required
            type="text"
            name="author"
            placeholder="작성자"
            disabled={isPending}
          />
          <button type="submit" disabled={isPending}>
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
