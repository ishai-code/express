const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
express = require("express");
const app = express();
const port = 8080;
const saltRounds = 10;

app.use(express.json());

function createId() {
  return uuidv4();
}

id1 = "b1b47324-fc89-4ecd-a60b-51448f6caeff";
id2 = "639383bd-3dc5-46d1-9121-27fb6ac5a61d";
id3 = "38873ed8-c13a-441f-9d8c-2987ece26b7b";

const users = [
  { id: id1, name: "shay", pass: "1234" },
  { id: id2, name: "dan", pass: "5687" },
  { id: id3, name: "elad", pass: "8743" },
];

function hashPass(pass) {
  let hash = bcrypt.hashSync(pass, saltRounds);
  return hash;
}

users.forEach((element) => {
  element.pass = hashPass(element.pass);
  console.log(element.pass);
});

app.listen(port, () => {
  console.log(`port:${port}`);
});

app.get("/", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  let bool = 0;
  users.forEach((element) => {
    if (element.id == req.params.id) {
      res.send(element);
      bool++;
    }
  });
  if (!bool) {
    res.send("fold");
  }
});

app.post("/users", (req, res) => {
  const password = hashPass(req.body.pass);
  const newUser = { id: createId(), name: req.body.name, pass: password };
  users.push(newUser);
  res.send(users);
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  let bool = 0;
  users.forEach((element) => {
    if (element.id == userId) {
      element.name = req.body.name;
      res.send(users);
      bool++;
    }
  });
  if (!bool) {
    res.send("not exist such a user in our data");
  }
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  let bool = 0;
  users.forEach((element, index) => {
    if (element.id == userId) {
      users.splice(index, 1);
      res.send(users);
      bool++;
    }
  });
  if (!bool) {
    res.send("not exist such a user in our data");
  }
});


app.post("/users", (req, res) => {
  const userName = req.body.name;
  const userPass = req.body.pass;
  let bool = 0;
  users.forEach((element) => {
    if (element.name == userName & bcrypt.compareSync(userPass, element.pass)) {
      res.send("user is connected");
      bool++;
    }
  });
  if (!bool) {
    res.send("not exist such a user in our data");
  }
});




