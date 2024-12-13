import styled from "styled-components";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";

const CabinRow = ({ cabin }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      alert("Cabin deleted");
    },
    onError: (err) => {
      alert("There was an error deleting the cabin");
    },
  });
  return (
    <>
      <TableRow>
        <Img
          src={
            "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-004.jpg"
          }
        />
        <Cabin>{cabin?.name}</Cabin>
        <div>{cabin?.maxCapacity} guests</div>
        <Price>${cabin?.price}</Price>
        <Discount>${cabin.discount ?? "-"}</Discount>
        <button onClick={() => mutate(cabin.id)}>Delete</button>
      </TableRow>
    </>
  );
};

export default CabinRow;
