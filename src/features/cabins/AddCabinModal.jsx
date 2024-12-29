import React, { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabinModal = () => {
  //   const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal>
        <Modal.Open open="open">
          <Button>Add Cabin</Button>
        </Modal.Open>
        <Modal.Window name="open">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
      {/* <Button onClick={() => setIsOpen(true)}>Add Cabin</Button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <CreateCabinForm onClose={() => setIsOpen(false)} />
        </Modal>
      )} */}
    </>
  );
};

export default AddCabinModal;
