import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";
import { delay } from "@/util/delay";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  await delay(1500);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${
      (
        await searchParams
      ).q
    }`,
    { cache: "force-cache" }
    // force-cache 저장된 데이터 캐싱.
    // 검색은 데이터베이스가 바뀌지 않는 한 같은 결과를 보여주기 때문
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const movies: MovieData[] = await response.json();

  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
