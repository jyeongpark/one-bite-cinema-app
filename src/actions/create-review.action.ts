"use server";

import { revalidateTag } from "next/cache";

export async function createReveiewAction(_: any, formData: FormData) {
  // api를 이용해서 만들면 별도의 파일을 추가하고 단순한 기능만 하는거면 서버 액션을 활용하는게
  // 클라이언트에서는 호출만 할 수 있을 뿐.

  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!movieId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({
          movieId,
          content,
          author,
        }),
      }
    );
    console.log(response.status);
    revalidateTag(`review-${movieId}`);
    return {
      status: true,
      error: null,
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      error: `리뷰 작성에 실패했습니다. : ${err}`,
    };
  }
}
