import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useGetBooking from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import useCheckinBooking from "../bookings/useCheckinBooking";
import Checkbox from "./../../ui/Checkbox";
import { useEffect, useState } from "react";
import useGetSettings from "../settings/useGetSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  margin-top: 2.4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const { booking, isLoading } = useGetBooking();
  const { data: settings } = useGetSettings();
  const [isPaid, setIsPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { makeCheckinBooking, isCheckinBooking } = useCheckinBooking();
  useEffect(() => {
    setIsPaid(booking?.isPaid);
  }, [booking]);
  if (isLoading) {
    return <Spinner />;
  }
  const {
    id: bookingId,
    guests,
    cabins,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    let payLoad = {
      status: "checked-in",
      isPaid: true,
    };
    if (addBreakfast) {
      payLoad = {
        ...payLoad,
        hasBreakfast: true,
        totalPrice:
          totalPrice + settings.breakFastPrice * numGuests * numNights,
        extrasPrice: settings.breakFastPrice * numGuests * numNights,
      };
    }
    makeCheckinBooking({
      bookingId,
      data: payLoad,
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast(!addBreakfast);
            setIsPaid(false);
          }}
          id="breakfast"
        >
          I confirm that {guests.fullName} will pay the breakfast fee of{" "}
          {settings.breakFastPrice} $ for {numGuests} guest(s) for {numNights}{" "}
          night(s) = {settings.breakFastPrice * numGuests * numNights} $
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          checked={isPaid}
          onChange={() => setIsPaid(!isPaid)}
          id="paid"
        >
          I confirm that {guests.fullName} paid the total amount of {totalPrice}{" "}
          {addBreakfast
            ? `+ ${settings.breakFastPrice * numGuests * numNights}`
            : ""}{" "}
          $ for {numGuests} guest(s) for {numNights} night(s) at {cabins?.name}
          's cabin
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isCheckinBooking || !isPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
