import { createContext, useState, useContext, cloneElement } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
const ModelContext = createContext();
const Modal = ({ children }) => {
  const [modalName, setModalName] = useState("");
  const close = () => setModalName("");

  return (
    <ModelContext.Provider value={{ modalName, setModalName, close }}>
      {children}
    </ModelContext.Provider>
  );
};
const Open = ({ children, open }) => {
  const { setModalName } = useContext(ModelContext);
  // {children onClick={() => setModalName("open")}} is the button text
  //<Button onClick={() => setModalName("open")}>{children}</Button>
  return cloneElement(children, { onClick: () => setModalName(open) });
};
const Window = ({ children, name }) => {
  const { modalName, close } = useContext(ModelContext);
  const ref = useOutsideClick(close);
  if (modalName !== name) return null;
  return (
    <>
      {createPortal(
        <Overlay>
          <StyledModal ref={ref}>
            <Button onClick={close}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
            {/* {children onClick={close}} */}
            {cloneElement(children, { onClose: close })}
          </StyledModal>
        </Overlay>,
        document.body
      )}
    </>
  );
};
Modal.Open = Open;
Modal.Window = Window;
export default Modal;
