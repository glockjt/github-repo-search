import axios from "axios";

const api = {
  search: async (q, sort, order) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/search?q=${q}&sort=${sort}&order=${order}`
      );
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};

export default api;
