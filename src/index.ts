import express, {
  Request,
  Response,
  Application,
  request,
  response,
} from "express";
require("dotenv").config();
const server = require("./Server");

const app: Application = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Yhteys upis");
});

app.use(express.json());

app.get(`/users`, async (req, res) => {
  const data = await server.getAll();
  res.send(data);
});

app.get(`/users/:id`, async (req, res) => {
  const data = await server.getById(req.params.id);
  res.send(data);
});

app.post("/users", async (req, res) => {
  const data = await server.postNew(
    req.body.fName,
    req.body.lName,
    req.body.age
  );
  res.send(data);
});

app.patch(`/users/:id`, async (req: Request, res) => {
  const data = await server.updateById(req.params.id, req.body);
  res.send(data);
});

app.delete(`/users/:id`),
  async (req: Request, res: Response) => {
    const data = await server.deleteById(req.params.id);
    res.send(data);
  };
