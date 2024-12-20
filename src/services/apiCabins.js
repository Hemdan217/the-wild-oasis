import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function createEditCabin(cabin) {
  console.log(cabin.image);
  const hasImageBefore = cabin?.image?.startsWith?.(supabaseUrl);
  const imageName = `${Date.now()}-${cabin.image?.name}`;
  const imagePath = hasImageBefore
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");
  if (!cabin?.id) {
    query = query.insert([{ ...cabin, image: imagePath }]);
    // .select()
    // .single();
  } else {
    console.log(cabin);
    query = query.update({ ...cabin, image: imagePath }).eq("id", cabin?.id);
    // image: !cabin?.image?.startsWith?.(supabaseUrl)
    //   ? imagePath
    //   : cabin.image,
  }
  // const { data, error } = await query;

  const { data, error } = await query.select().single();
  if (error) {
    throw new Error("Cabins could not be created");
  }
  if (!hasImageBefore) {
    const { error: errorUpload } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image);
    // return data;
    if (errorUpload) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("Image could not be uploaded");
    }
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
