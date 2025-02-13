import styled from "styled-components";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const UserAvatar = ({ user }) => {
  const src = user?.user_metadata?.avatar
    ? user?.user_metadata?.avatar
    : "default-user.jpg";
  return (
    <StyledUserAvatar>
      <Avatar src={src} alt={` profile picture`} />
    </StyledUserAvatar>
  );
};

export default UserAvatar;
