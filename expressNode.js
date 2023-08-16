const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const validator = require("validator");
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
  { id: id1, email: "shay@gmail.com", pass: "1234" },
  { id: id2, email: "dan@gmail.com", pass: "5687" },
  { id: id3, email: "elad@gmail.com", pass: "8743" },
];

function hashPass(pass) {
  const hash = bcrypt.hashSync(pass, saltRounds);
  return hash;
}

function emailValidator(email) {
  return validator.isEmail(email);
}

function passValidator(pass) {
  return validator.isStrongPassword(pass);
}

users.forEach((user) => {
  user.pass = hashPass(user.pass);
  console.log(user.pass);
});

app.listen(port, () => {
  console.log(`port:${port}`);
});

app.get("/", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  if (users.find((user) => user.id === req.params.id)) {
    res.send(user);
  } else {
    res.send("fold");
  }
});

app.post("/users/addUser", (req, res) => {
  let { email, pass } = req.body;
  const password = hashPass(pass);
  if (emailValidator(email) & passValidator(password)) {
    const newUser = { id: createId(), email: email, pass: password };
    users.push(newUser);
    res.send(`user added successfully this the update list`);
  } else {
    res.send("the email or the password is not valid");
  }
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const {email, password} = req.body
  if (emailValidator(email) & passValidator(password)) {
    if (users.find((user) => user.id === userId)) {
      user.email = email
      user.pass = password
      res.send(users);
    } else {
      res.send("not exist such a user in our data");
    }
  } else {
    res.send("the email or the password is not valid");
  }
});

app.delete("/users/delete/:id", (req, res) => {
  const userId = req.params.id;
  if (users.find((user) => user.id === userId)) {
    const index = users.indexOf(userId);
    users.splice(index, 1);
    res.send(users);
  } else {
    res.send("not exist such a user in our data");
  }
});

app.post("/users/login", (req, res) => {
  const userEmail = req.body.email;
  const userPass = req.body.pass;
  if (
    users.find(
      (user) =>
        (user.email === userEmail) & bcrypt.compareSync(userPass, user.pass)
    )
  ) {
    res.send("user is connected");
  } else {
    res.send("not exist such a user in our data");
  }
});
