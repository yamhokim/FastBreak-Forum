import api from "@/api";

export async function getBlogs() {
  try {
    const response = await api.get("blog_list");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
