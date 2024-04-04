import { ReactNode, memo } from "react";

const Modal = memo(
  ({ children, onClose }: { children: ReactNode; onClose: () => void }) => {
    return (
      <article className="fixed w-screen h-screen bg-black bg-opacity-35 top-0 left-0 flex justify-center items-center">
        <section className="w-full max-w-96 bg-white shadow-md flex flex-col justify-center items-center p-4 rounded">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-yellow-200 ml-auto hover:bg-yellow-500 transition-all leading-none"
          >
            ☓
          </button>
          {children}
        </section>
      </article>
    );
  }
);

export default Modal;
