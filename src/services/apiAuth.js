import supabase from "./supabase";

export const signupApi = async ({ email, password, fullName }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export const login = async (credentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    ...credentials,
  });
  console.log(data, error);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  return;
};
export const getUser = async () => {
  const { data: session, error } = await supabase.auth.getSession();
  console.log(session, error);
  if (!session?.session) {
    return null;
  }
  const { data, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }
  return data.user;
};
