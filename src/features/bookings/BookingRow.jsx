import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { RiMore2Line } from "react-icons/ri";
import { PiEye } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { TiTrash } from "react-icons/ti";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import { HiAnnotation } from "react-icons/hi";
import useCheckinBooking from "./useCheckinBooking";
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const naviate = useNavigate();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { makeCheckinBooking, isCheckinBooking } = useCheckinBooking();
  const handleCheckout = () => {
    makeCheckinBooking({
      bookingId,
      data: {
        status: "checked-out",
      },
    });
  };
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Menus.Menu>
        <Menus.Toggle openId={bookingId}>
          <RiMore2Line />
        </Menus.Toggle>
        <Menus.List openId={bookingId}>
          <Menus.Button
            icon={<PiEye />}
            onClick={() => naviate(`/bookings/${bookingId}`)}
          >
            View
          </Menus.Button>
          {status === "unconfirmed" && (
            <Menus.Button
              icon={<PiEye />}
              onClick={() => naviate(`/checkin/${bookingId}`)}
            >
              Checkin
            </Menus.Button>
          )}
          {status === "checked-in" && (
            <Menus.Button icon={<HiAnnotation />} onClick={handleCheckout}>
              Checkout
            </Menus.Button>
          )}
          <Modal>
            <Modal.Open open="delete">
              <Menus.Button disabled={isDeleting} icon={<TiTrash />}>
                Delete
              </Menus.Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="booking"
                onConfirm={() => {
                  deleteBooking(bookingId);
                }}
              />
            </Modal.Window>
          </Modal>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
