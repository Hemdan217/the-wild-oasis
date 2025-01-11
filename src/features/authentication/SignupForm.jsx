import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { signupApi } from "../../services/apiAuth";
import useSignUp from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signUp, isLoading } = useSignUp();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const createUser = (data) => {
    // console.log(data);
    signUp(data, {
      onSuccess: () => reset(),
    });
  };
  return (
    <Form onSubmit={handleSubmit(createUser)}>
      <FormRow label="Full name" error={errors?.email?.fullName}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register(
            "email",

            {
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
              required: "This field is required",
            }
          )}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            validate: (value) =>
              value == getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isLoading} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
