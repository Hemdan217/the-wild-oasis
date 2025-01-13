import supabase, { supabaseUrl } from "./supabase";

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

export const updateUser = async ({ fullName, password, avatar }) => {
  let dataToUpdate = {};

  if (password) dataToUpdate = { password };
  if (fullName)
    dataToUpdate = {
      data: {
        fullName,
      },
    };
  let imagePath;

  if (avatar) {
    const imageName = `${Date.now()}-${avatar?.name}`;
    imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;
    dataToUpdate = {
      data: {
        avatar: imagePath,
      },
    };
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(imageName, avatar);
    if (uploadError) {
      throw new Error(uploadError.message);
    }
  }

  const { data, error } = await supabase.auth.updateUser(dataToUpdate);
  if (error) {
    throw new Error(error.message);
  }

  return data;
};
