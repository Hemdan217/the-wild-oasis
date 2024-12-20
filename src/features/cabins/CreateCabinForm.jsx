import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function CreateCabinForm({ cabin = {} }) {
  const idEditing = cabin?.id;
  const { register, handleSubmit, formState, getValues, reset } = useForm({
    defaultValues: {
      ...cabin,
    },
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      reset();
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const { error } = formState;
  const onSubmit = (data) => {
    if (!idEditing) {
      mutate({ ...data, image: data.image[0] });
    } else {
      // if () {
      mutate(
        {
          ...data,
          image: typeof data.image == "string" ? data.image : data.image[0],
        },
        {
          onSuccess: () => {
            toast.success("Cabin successfully was edited");
            reset();
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
          },
        }
      );
      // } else {
      //   mutate({ ...data, image: data.image[0] });
      // }
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={error?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={error?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={error?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={error?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={error?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={error?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>{idEditing ? "Update cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
