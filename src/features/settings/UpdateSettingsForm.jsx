import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";
import useGetSettings from "./useGetSettings";

function UpdateSettingsForm() {
  const queryClient = useQueryClient();
  const { data } = useGetSettings();
  const { mutate } = useMutation({
    mutationFn: ({ update, id }) => updateSetting(update, id),
    onSuccess: () => {
      toast.success("Settings successfully updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
  const { register } = useForm({
    defaultValues: {
      ...data,
    },
  });
  console.log(data);
  const handleBlur = (e, field) => {
    mutate({
      update: { [field]: e.target.value },
      id: data.id,
    });
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          {...register("minBookingLength")}
          onBlur={(e) => {
            handleBlur(e, "minBookingLength");
          }}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          {...register("maxBookingLength")}
          onBlur={(e) => {
            handleBlur(e, "maxBookingLength");
          }}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          {...register("maxGuestsPerBooking")}
          onBlur={(e) => {
            handleBlur(e, "maxGuestsPerBooking");
          }}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          {...register("breakFastPrice")}
          onBlur={(e) => {
            handleBlur(e, "breakFastPrice");
          }}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
