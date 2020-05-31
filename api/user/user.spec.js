import request from "supertest";
import should from "should";
import app from "../../index";
import models from "../../models";

describe("GET /users는", () => {
  const users = [{ name: "alice" }, { name: "bob" }, { name: "chok" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));
  describe("성공시 ", () => {
    it("유저 객체를 담은 배열을 응답", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it("최대 개수 응답", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("실패시 ", () => {
    it("limit이 숫자형이 아닌 경우 400을 응답", (done) => {
      request(app).get("/users?limit=two").expect(400).end(done);
    });
  });
});

describe("GET /users/:id은", () => {
  const users = [{ name: "alice" }, { name: "bob" }, { name: "chok" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));
  describe("성공시", () => {
    it("id가 1인 유저 객체를 반환", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("id가 숫자가 아닌 경우 400을 응답", (done) => {
      request(app).get("/users/one").expect(400).end(done);
    });
    it("없는 유저 요청의 경우 404를 응답", (done) => {
      request(app).get("/users/999").expect(404).end(done);
    });
  });
});

describe("DELETE /users/:id은", () => {
  const users = [{ name: "alice" }, { name: "bob" }, { name: "chok" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));
  describe("성공시", () => {
    it("204를 응답", (done) => {
      request(app).delete("/users/1").expect(204).end(done);
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닌 경우 400을 응답", (done) => {
      request(app).delete("/users/one").expect(400).end(done);
    });
  });
});

describe("POST /users는", () => {
  const users = [{ name: "alice" }, { name: "bob" }, { name: "chok" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));
  describe("성공시", () => {
    let body;
    let name = "dan";
    before((done) => {
      request(app)
        .post("/users")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("생성된 유저 객체를 반환", () => {
      body.should.have.property("id");
    });
    it("입력한 name을 반환", () => {
      body.should.have.property("name", name);
    });
  });
  describe("실패시", () => {
    it("name이 누락시 400 반환", (done) => {
      request(app).post("/users").send({}).expect(400).end(done);
    });
    it("name이 중복일 경우 409를 반환", (done) => {
      request(app).post("/users").send({ name: "dan" }).expect(409).end(done);
    });
  });
});

describe("PUT /users/:id", () => {
  const users = [{ name: "alice" }, { name: "bob" }, { name: "chok" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));
  describe("성공시", () => {
    const name = "tommy";
    it("변경된 name을 응답", (done) => {
      request(app)
        .put("/users/3")
        .send({ name })
        .end((err, res) => {
          res.body.should.have.property("name", name);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("정수가 아닌 id의 경우 400을 응답", (done) => {
      request(app).put("/users/three").expect(400).end(done);
    });
    it("name이 비었을 경우 400을 응답", (done) => {
      request(app).put("/users/3").send({}).expect(400).end(done);
    });
    it("없는 유저일 경우 404 응답", (done) => {
      request(app)
        .put("/users/999")
        .send({ name: "lolo" })
        .expect(404)
        .end(done);
    });
    it("이름이 중복일 경우 409 응답", (done) => {
      request(app).put("/users/3").send({ name: "bob" }).expect(409).end(done);
    });
  });
});
