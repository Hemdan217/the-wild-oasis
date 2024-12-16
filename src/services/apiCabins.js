import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function createCabin(cabin) {
  console.log(cabin.image);
  const imageName = `${Date.now()}-${cabin.image.name}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    throw new Error("Cabins could not be created");
  }
  const { error: errorUpload } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);
  // return data;
  if (errorUpload) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Image could not be uploaded");
  }

  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
