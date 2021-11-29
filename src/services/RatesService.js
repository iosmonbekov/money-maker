import api from "../axios";

export default {
  async get() {
    const { data } = await api.get("/rates");
    return data;
  },
  async post(name) {
    await api.post("/rates", { name });
  },
  async update(rate) {
    await api.put(`/rates/${rate._id}`, {
      favorite: rate.favorite,
      seen: rate.seen,
    });
  },
  async refreshList() {
    await api.put("/rates");
  },
};
