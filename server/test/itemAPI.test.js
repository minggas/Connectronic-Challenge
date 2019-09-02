import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";
// Configure chai
chai.use(chaiHttp);
chai.should();

let test_item_id = "";
let test_item_id2 = "";

describe("POST", function() {
  it("all fields fill", function(done) {
    chai
      .request(app)
      .post("/api/itens")
      .send({
        description: "  This is my first test message board - 54321   ",
        name: "minggas  "
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("all fields fill - post to be deleted", function(done) {
    chai
      .request(app)
      .post("/api/itens")
      .send({
        description:
          "  This is my second test message board - this must be deleted   ",
        name: "sayo"
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("description fields not filled", function(done) {
    chai
      .request(app)
      .post("/api/itens")
      .send({
        description: "      ",
        name: "02$del*&2"
      })
      .end(function(err, res) {
        console.log(res.text);
        res.text.should.be.equal("A descrição é obrigatória");
        res.should.have.status(402);
        done();
      });
  });

  it("name fields not filled", function(done) {
    chai
      .request(app)
      .post("/api/itens")
      .send({
        description: "  This is my first test message board - 54321   ",
        name: ""
      })
      .end(function(err, res) {
        res.text.should.be.equal("O nome é obrigatório");
        res.should.have.status(402);
        done();
      });
  });
});

describe("GET", function() {
  it("Show recent threads", function(done) {
    chai
      .request(app)
      .get("/api/itens")
      .end(function(err, res) {
        test_item_id = res.body[0]._id;
        test_item_id2 = res.body[1]._id;
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});

describe("DELETE", function() {
  it("Delete item", function(done) {
    chai
      .request(app)
      .delete("/api/itens")
      .send({
        id: test_item_id2
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.text.should.be.equal("success");
        done();
      });
  });
});

describe("PUT", function() {
  it("report a thread passing valid item_id", function() {
    chai
      .request(app)
      .put("/api/itens")
      .send({ item: test_item_id })
      .end(function(err, res) {
        res.should.have.status(200);
        res.text.should.be.equal("success");
      });
  });
});
