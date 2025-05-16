import api from "./api";

export const moviesService = {
  getAll: async () => {
    try {
      const response = await api.get(
        "discover/movie?page=1&sort_by=popularity.desc"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  // getById: async (id) => {},
  // search: async (query) => {},
};
