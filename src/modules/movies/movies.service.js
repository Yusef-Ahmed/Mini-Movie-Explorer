import api from "../../services/api";

export const moviesService = {
  getAll: async (pageNumber) => {
    try {
      const response = await api.get(
        `discover/movie?page=1&sort_by=popularity.desc&page=${pageNumber}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  search: async (query, pageNumber) => {
    try {
      const response = await api.get(`search/movie?query=${query}&page=${pageNumber}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`movie/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
