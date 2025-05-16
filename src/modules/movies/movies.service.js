import api from "../../services/api";

export const moviesService = {
  getAll: async () => {
    try {
      console.log("getAll");
      const response = await api.get(
        "discover/movie?page=1&sort_by=popularity.desc"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  search: async (query) => {
    try {
      const response = await api.get(`search/movie?query=${query}&page=1`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  // getById: async (id) => {},
};
