import DigitalGiftHero from "~/app/animatesvg";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  // void api.post.getLatest.prefetch();

  return (
    <>
      <div className="">
        <div className="">
          <DigitalGiftHero />
        </div>
      </div>
    </>
  );
}
