import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import Modal from "../../ui/Modal";
import AddCabinModal from "./AddCabinModal";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

const CabinTable = () => {
  const { data = [] } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  let filteredCabins = [...data];

  const filter = searchParams.get("discount") || "all";
  const [field, direction] = searchParams.get("sortBy").split("-");
  const modifier = direction === "asc" ? 1 : -1;
  switch (filter) {
    case "all":
      break;
    case "discount":
      filteredCabins = filteredCabins.filter((cabin) => cabin?.discount > 0);
      break;
    case "no-discount":
      filteredCabins = filteredCabins.filter((cabin) => cabin?.discount == 0);
      break;
    default:
      filteredCabins = [...data];
  }
  // if (filter == "discount")
  //   filteredCabins = data.filter((cabin) => cabin?.discount > 0);
  // if (filter == "no-discount")
  //   filteredCabins = data.filter((cabin) => cabin?.discount == 0);
  filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);
  return (
    <Table role="table" columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
      <Table.Header role="rowgroup">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={filteredCabins}
        // render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        render={(cabin) => {
          return <CabinRow key={cabin.id} cabin={cabin} />;
        }}
      />
    </Table>
    // <Table role="table">
    //   <TableHeader role="rowgroup">
    //     <div></div>
    //     <div>Cabin</div>
    //     <div>Capacity</div>
    //     <div>Price</div>
    //     <div>Discount</div>
    //     <div></div>
    //   </TableHeader>
    //   {data?.map((cabin) => {
    //     return <CabinRow key={cabin.id} cabin={cabin} />;
    //   })}
    // </Table>
  );
};
export default CabinTable;
