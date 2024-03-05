// app.get("/", (req, res) => {
//   res.json({ results: "Welcome to backend api main route..." });
// });

const express = require("express");
const app = express();

const getApiHome = (req,res) => {
    return req.body.server
}

test("Get API Home Welcome Banner in JSON format", () => {
    const req = {body:{
        server: "http://localhost:7777"
    }}
    const res = {status:200}
  expect(getApiHome(req, res)).toBe(req.body.server);
});