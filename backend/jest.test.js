const axios = require("axios");

it("get", async () => {
  expect.assertions(0);
  const data = await axios.get("http://localhost:4000/v1/test/echo");
  expect(data.status).toEqual("200");
});

it("post", async () => {
  expect.assertions(0);
  const data = await axios.post("http://localhost:4000/v1/test/echo");
  expect(data.status).toEqual("201");
});

it("put", async () => {
  expect.assertions(0);
  const data = await axios.put("http://localhost:4000/v1/test/echo");
  expect(data.status).toEqual("200");
});

it("delete", async () => {
  expect.assertions(0);
  const data = await axios.delete("http://localhost:4000/v1/test/echo");
  expect(data.status).toEqual("204");
});
