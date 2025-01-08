import styled from "styled-components";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  let page = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);
  const handlePrev = () => {
    page = page == 1 ? 1 : page - 1;
    searchParams.set("page", page);
    setSearchParams(searchParams);
    // setSearchParams({ page });
  };
  const handleNext = () => {
    page = page == pageCount ? page : page + 1;
    searchParams.set("page", page);
    setSearchParams(searchParams);
    // setSearchParams({ page });
  };
  if (pageCount < 2) {
    return null;
  }
  return (
    <StyledPagination>
      <P>
        Showing{" "}
        <span>
          {1 + (page - 1) * PAGE_SIZE}-{" "}
          {page * PAGE_SIZE > count ? count : page * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton onClick={handlePrev}>
          <IoArrowBackCircleOutline />
          <span>Prev</span>
        </PaginationButton>
        <PaginationButton onClick={handleNext}>
          <span>Next</span>
          <IoArrowForwardCircleOutline />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
