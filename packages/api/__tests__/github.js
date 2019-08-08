const github = require("../github");
// const mockAxios = require("axios");
const axios = require("axios");

jest.mock("axios");

describe("Test Github", () => {
  const testData = { items: [{ name: "test repo" }] };
  axios.get.mockResolvedValue({ data: testData });

  it("should properly return data", async () => {
    const req = { query: { q: "test" } };
    const json = jest.fn(data => data);
    const res = { json };

    await github(req, res);

    expect(json.mock.calls).toHaveLength(1);
    expect(json.mock.results[0].value).toEqual(testData);
  });

  it("should handle github proxy error", async () => {
    axios.get.mockRejectedValueOnce(new Error("Github error"));

    const req = { query: { q: "test" } };
    const mockResponse = () => {
      const res = {};
      res.sendStatus = jest.fn().mockReturnValue(res);
      res.send = jest.fn(data => data);
      return res;
    };

    const res = mockResponse();

    await github(req, res);

    expect(res.sendStatus.mock.calls).toHaveLength(1);
    expect(res.send.mock.calls).toHaveLength(1);
  });

  it("should handle github proxy error", async () => {
    axios.get.mockRejectedValueOnce(new Error("Github error"));

    const req = { query: { q: "" } };
    const mockResponse = () => {
      const res = {};
      res.sendStatus = jest.fn().mockReturnValue(res);
      res.send = jest.fn(data => data);
      return res;
    };

    const res = mockResponse();

    await github(req, res);

    expect(res.sendStatus.mock.calls).toHaveLength(1);
    expect(res.send.mock.calls).toHaveLength(1);
  });
});
