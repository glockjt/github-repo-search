import api from "../api";
import axios from "axios";

jest.mock("axios");

describe("API Service Tests", () => {
  it("should catch error from api", async () => {
    axios.get.mockRejectedValueOnce(new Error("API error"));

    await expect(api.search("test")).rejects.toThrow("API error");
  });

  it("should return data", async () => {
    const testRes = { data: { items: [{ name: "test" }] } };
    axios.get.mockResolvedValueOnce(testRes);

    const test = await api.search("test");

    expect(test).toEqual(testRes.data);
  });
});
