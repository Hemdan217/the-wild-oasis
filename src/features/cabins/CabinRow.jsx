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
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import { HiPencil } from "react-icons/hi";

const CabinRow = ({ cabin }) => {
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabin,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin deleted");
    },
    onError: (err) => {
      toast.error("There was an error deleting the cabin");
    },
  });
  return (
    <>
      <TableRow>
        <Img src={cabin?.image} />
        <Cabin>{cabin?.name}</Cabin>
        <div>{cabin?.maxCapacity} guests</div>
        <Price>${cabin?.regularPrice ?? "-"}</Price>
        <Discount>${cabin.discount ?? "-"}</Discount>
        <div>
          {/* <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={() => mutate(cabin.id)}>Delete</button> */}
          <Modal>
            {/* <Modal.Open open="edit">
              <button>Edit</button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabin={cabin} />
            </Modal.Window> */}
            <Menus>
              <Menus.Menu>
                <Menus.Toggle openId={cabin.id}>More</Menus.Toggle>
                <Menus.List openId={cabin.id}>
                  <Modal.Open open="edit">
                    <button>Edit</button>
                  </Modal.Open>
                  <Modal.Window name="edit">
                    <CreateCabinForm cabin={cabin} />
                  </Modal.Window>
                  {/* <Modal.Open opens="edit">
                    <button>
                      <HiPencil />
                    </button>
                  </Modal.Open>
                  <Modal.Window name="edit">
                    <CreateCabinForm cabin={cabin} />
                  </Modal.Window> */}
                  <Modal.Open open="delete">
                    <button>Delete</button>
                    {/* <button onClick={() => setEditMode(true)}>Delete</button> */}
                  </Modal.Open>
                  <Modal.Window name="delete">
                    {/* <div>
                <p>Are you sure you want to delete this cabin?</p>
                <button onClick={() => mutate(cabin.id)}>Delete</button>
              </div> */}

                    <ConfirmDelete
                      resourceName="cabins"
                      disabled={isDeleting}
                      onConfirm={() => mutate(cabin.id)}
                    />
                  </Modal.Window>
                  {/* <Menus.Button>
                  <button onClick={() => mutate(cabin.id)}>Delete</button>
                </Menus.Button> */}
                </Menus.List>
              </Menus.Menu>
            </Menus>
          </Modal>
        </div>
      </TableRow>
      {/* {editMode && (
        <Modal onClose={() => setEditMode(false)}>
          <CreateCabinForm cabin={cabin} onClose={() => setEditMode(false)} />
        </Modal>
        // <CreateCabinForm
        //   cabin={cabin}
        //   id={cabin.id}
        //   setEditMode={setEditMode}
        // />
      )} */}
    </>
  );
};

export default CabinRow;
