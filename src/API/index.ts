import "reflect-metadata";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import { createConnection } from "typeorm";

import CartController from "./Controllers/CartController";
import OrderController from "./Controllers/OrdersController";
import CustomerController from "./Controllers/CustomerController";
import CategoryController from "./Controllers/CategoriesController";
import ProductController from "./Controllers/ProductsController";

createConnection()
  .then(async (connection) => {
    const app = express();
    let port = process.env.PORT || 5000;

    require("dotenv").config();

    app.use(bodyParser.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/cart", CartController);
    app.use("/orders", OrderController);
    app.use("/products", ProductController);
    app.use("/customer", CustomerController);
    app.use("/categories", CategoryController);

    app.use("/images", express.static("./Images"));

    app.listen(port, async () => {
      console.log("Successfully loaded Database table: " + connection.entityMetadatas[0].schema);

      if (connection.migrations.length > 0)
        console.log("Last migration: " + connection.migrations[connection.migrations.length - 1].name);
      console.log("Server is running on port: " + port);
    });
  })
  .catch((error) => console.log(error));
