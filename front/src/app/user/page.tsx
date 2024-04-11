import { userState } from "@/state/user";
import { useRecoilValue } from "recoil";
import { H2 } from "../components/ui/h2";

export default function User() {
  const user = useRecoilValue(userState);
  return (
    <article>
      <H2>{user.name}さん</H2>
      <section>
        <p>ユーザー名: {user.name}</p>
      </section>
    </article>
  );
}
