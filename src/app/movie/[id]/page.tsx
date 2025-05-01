import { MovieData, ReviewData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import { ReviewEditor } from "@/components/review-editor";
import ReviewItem from "@/components/review-item";

export const dynamicParams = false; // generateStaticParams에 명시 안한 값으로 접속 요청하면 404

export async function generateStaticParams() {
  // 정적인 parameter를 생성해주는 함수
  // getStaticPaths와 유사한 역할을 함

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );
  // force-cache 저장된 데이터 캐싱.
  // 데이터 베이스가 바뀌지 않는 한 같은 결과를 보여주기 때문
  if (!response.ok) {
    return [];
  }

  const movies: MovieData[] = await response.json();
  return movies.map((movie) => ({ id: String(movie.id) })); // params로 보낼 id들을 string으로 변환
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`,
    {
      cache: "force-cache",
    }
  );
  // force-cache 저장된 데이터 캐싱.
  // 데이터 베이스가 바뀌지 않는 한 같은 결과를 보여주기 때문

  if (!response.ok) {
    return notFound();
  }

  const movie: MovieData = await response.json();

  const {
    title,
    subTitle,
    company,
    runtime,
    description,
    posterImgUrl,
    releaseDate,
    genres,
  } = movie;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} alt="" />
      </div>
      <div className={style.info_container}>
        <div>
          <h2>{title}</h2>
          <div>
            {releaseDate} / {genres.join(", ")} / {runtime}분
          </div>
          <div>{company}</div>
        </div>
        <div>
          <div className={style.subTitle}>{subTitle}</div>
          <div className={style.description}>{description}</div>
        </div>
      </div>
    </section>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`
  );
  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json();
  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: movieId } = await params;
  return (
    <div className={style.container}>
      <MovieDetail movieId={movieId} />
      <ReviewEditor movieId={movieId} />
      <ReviewList movieId={movieId} />
    </div>
  );
}
