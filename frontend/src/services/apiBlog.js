import api from "@/api";

export async function getBlogs(page) {
  try {
    const response = await api.get(`blog_list?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getBlog(slug) {
  try {
    const response = await api.get(`blogs/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function registerUser(data) {
  try {
    const response = await api.post("register_user/", data);
    return response.data;
  } catch (error) {
    console.log(error);

    if (error.response && error.response.status === 400) {
      const errorData = error.response.data;

      if (errorData.username) {
        throw new Error("Username already exists");
      } else if (errorData.email) {
        throw new Error("Email already exists");
      } else {
        throw new Error("Invalid registration details");
      }
    }

    throw new Error(error.message || "An unexpected error occurred");
  }
}

export async function login(data) {
  try {
    const response = await api.post("token/", data);
    return response.data;
  } catch (error) {
    if (error.status === 401) {
      throw new Error("Invalid Credentials");
    }
    throw new Error(error);
  }
}
