"use server";

export async function createReveiewAction(formData: FormData) {
  // api를 이용해서 만들면 별도의 파일을 추가하고 단순한 기능만 하는거면 서버 액션을 활용하는게
  // 클라이언트에서는 호출만 할 수 있을 뿐.

  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!movieId || !content || !author) {
    return;
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
  } catch (err) {
    console.log(err);
    return;
  }
}
