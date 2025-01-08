import { createContext, useState, useContext } from "react";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  z-index: 1000;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();
const Menus = ({ children }) => {
  const [id, setId] = useState("");
  const [position, setPosition] = useState({});
  return (
    <MenuContext.Provider value={{ id, setId, position, setPosition }}>
      {children}
    </MenuContext.Provider>
  );
};
const Menu = ({ children }) => {
  return <StyledMenu>{children}</StyledMenu>;
};
const Toggle = ({ children, openId }) => {
  const { id, setId, setPosition } = useContext(MenuContext);
  const handleToggle = (e) => {
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? setId(openId) : setId("");
    // if (id === "" || id !== openId) {
    //   setId(openId);
    //   setPosition({
    //     x: buttonRect.left, // Distance from the left edge of the viewport
    //     y: buttonRect.bottom, // Distance from the top edge of the viewport to the bottom of the button
    //   });
    // } else {
    //   setId("");
    // }
  };

  return <StyledToggle onClick={handleToggle}>{children}</StyledToggle>;
};
const List = ({ children, openId }) => {
  const { id, position } = useContext(MenuContext);
  if (id != openId) return null;
  return <StyledList position={position}>{children}</StyledList>;
};
const Button = ({ children, onClick, icon }) => {
  return (
    <li>
      <StyledButton onClick={onClick}>
        <span>{icon}</span>
        {children}
      </StyledButton>
    </li>
  );
};
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
