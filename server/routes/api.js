const mongoose = require("mongoose");
const Item = require("../models/Item").Item;

mongoose.connect(process.env.DB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = function(app) {
  app
    .route("/api/itens")
    .post((req, res) => {
      if (!req.body.name.trim())
        return res.status(402).send("O nome é obrigatório");
      if (!req.body.description.trim())
        return res.status(402).send("A descrição é obrigatória");

      const { name, description } = req.body;
      const newItem = new Item({ name, description });
      newItem.save((err, result) => {
        if (err) return res.status(500).send(`Cannot save item. error: ${err}`);
        return res.status(200).send(result);
      });
    })
    .get((req, res) => {
      Item.find().then((resu, err) => {
        if (err) return res.status(500).send(`Cannot get itens. error: ${err}`);
        return res.send(resu);
      });
    })
    .delete((req, res) => {
      const id = req.body.id;

      Item.deleteOne({ _id: id }, (err, result) => {
        if (result.deletedCount === 0) return res.status(500).send("error");
        return res.status(200).send("success");
      });
    })
    .put((req, res) => {
      const { id, name, description } = req.body;

      Item.updateOne(
        { _id: id },
        { $set: { name: name, description: description } },
        (err, result) => {
          if (err)
            return res.status(500).send(`Cannot update thread. error: ${err}`);
          if (result.nModified === 0)
            return res.status(500).send("not reported");
          res.status(200).send("success");
        }
      );
    });
};
