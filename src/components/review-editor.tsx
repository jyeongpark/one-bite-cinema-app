import { createReveiewAction } from "@/actions/create-review.action";
import style from "./review-editor.module.css";

export function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <section>
      <form className={style.form_container} action={createReveiewAction}>
        <input hidden name="movieId" value={movieId} readOnly />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input required type="text" name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
