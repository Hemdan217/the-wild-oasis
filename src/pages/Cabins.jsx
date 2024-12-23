import AddCabinModal from "../features/cabins/AddCabinModal";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
      </Row>
      <Row>
        <CabinTable />
        {/* <CreateCabinForm /> */}
        <AddCabinModal />
      </Row>
    </>
  );
}

export default Cabins;
