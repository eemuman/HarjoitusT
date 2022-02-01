import express, {
  Request,
  Response,
  Application,
  request,
  response,
} from "express";
import cors from "cors";
require("dotenv").config();
const server = require("./Server");

const app: Application = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

const checkSend = (res: Response, data: any) => {
  if (data.length === 0) {
    res.status(404).send("Ei löydy");
    return;
  }
  if (!data) {
    res.status(500).send("Jokin meni vikaan...");
    return;
  }
  res.send(data);
};

app.listen(PORT, () => {
  console.log("Yhteys upis");
});

app.use(express.json());

app.get(`/users`, async (req, res) => {
  const data = await server.getAll();
  checkSend(res, data);
});

app.get(`/users/:id`, async (req, res) => {
  const data = await server.getById(req.params.id);
  checkSend(res, data);
});

app.post("/users", async (req, res) => {
  const data = await server.postNew(
    req.body.fName,
    req.body.lName,
    req.body.age
  );
  checkSend(res, data);
});

app.patch(`/users/:id`, async (req: Request, res) => {
  const data = await server.updateById(req.params.id, req.body);
  checkSend(res, data);
});

app.delete(`/users/:id`),
  async (req: Request, res: Response) => {
    const data = await server.deleteById(req.params.id);
    checkSend(res, data);
  };
