import { homeViewHandler } from "./handlers/home.js";
import {
  loginViewHandler,
  registerViewHandler,
  logoutHandler,
} from "./handlers/auth.js";

import {
  createPostHandler,
  create,
  detailsViewHandler,
  editPostHandler,
  edit,
  deleteHandler,
} from "./handlers/posts.js";

// initialize the application
var app = Sammy("#main", function () {
  // include a plugin
  this.use("Handlebars", "hbs");

  // define a 'route'
  this.get("#/", homeViewHandler);
  this.get("#/home", homeViewHandler);
  this.get("#/login", loginViewHandler);
  this.post("#/login", () => false);
  this.get("#/logout", logoutHandler);
  this.get("#/register", registerViewHandler);
  this.post("#/register", () => {
    false;
  });
  this.get("#/create", createPostHandler);
  this.post("#/create", create);
  this.get("#/details/:id", detailsViewHandler);
  this.get("#/delete/:id", deleteHandler);
  this.get("#/edit/:id", editPostHandler);
  this.post("#/edit/:id", edit);
});

$(() => {
  app.run("#/");
});
