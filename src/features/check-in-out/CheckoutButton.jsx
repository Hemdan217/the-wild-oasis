import Button from "../../ui/Button";
import useCheckinBooking from "../bookings/useCheckinBooking";

function CheckoutButton({ bookingId }) {
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
    <Button variation="primary" size="small" onClick={handleCheckout}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
