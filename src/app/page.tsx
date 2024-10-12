import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  // void api.post.getLatest.prefetch();

  return (
    <>
      <div>
        <div className=""></div>
      </div>
    </>
  );
}
