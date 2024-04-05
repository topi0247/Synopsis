import { memo } from "react";
import Modal from "./modal";

const LoginModal = memo(
  ({
    setIsLoginModalOpen,
  }: {
    setIsLoginModalOpen: (isOpen: boolean) => void;
  }) => {
    return (
      <Modal onClose={() => setIsLoginModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-8">
          <span className="px-4 pb-2 border-b-2 border-green-400">
            ログイン
          </span>
        </h2>
        <section className="flex flex-col gap-4 justify-center items-center w-40 m-auto">
          <div>
            <label>メールアドレス</label>
            <input
              type="email"
              className="bg-slate-200 rounded focus:outline-none p-1 ml-8 leading-3"
            />
          </div>
          <div>
            <label>パスワード</label>
            <input
              type="password"
              className="bg-slate-200 rounded focus:outline-none p-1 ml-8 leading-3"
            />
          </div>
          <button className="bg-green-100 rounded px-4 py-2 hover:bg-green-400 transition-all">
            ログイン
          </button>
        </section>
      </Modal>
    );
  }
);

LoginModal.displayName = "LoginModal";
export default LoginModal;
