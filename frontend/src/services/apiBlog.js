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

export async function getUsername() {
  try {
    const response = await api.get("get_username/");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createBlog(data) {
  try {
    const response = await api.post("create_blog/", data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateBlog(data, id) {
  try {
    const response = await api.put(`update_blog/${id}/`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response?.data?.message || "Failed to update blog");
    } else {
      throw new Error(error.message);
    }
  }
}

export async function deleteBlog(id) {
  try {
    const response = await api.post(`delete_blog/${id}/`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response?.data?.message || "Failed to delete blog");
    } else {
      throw new Error(error.message);
    }
  }
}

export async function getUserInfo(username) {
  try {
    const response = await api.get(`get_userinfo/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateUser(data) {
  try {
    const response = await api.put(`update_user/`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data.username[0] || "Failed to update profile"
      );
    }
    throw new Error(error.message);
  }
}
