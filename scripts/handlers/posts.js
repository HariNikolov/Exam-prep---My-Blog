import { applyCommon } from "./common.js";
import { createFormEntity } from "../services/form-helpers.js";
import { fireBaseRequestFactory } from "../services/firebase-requests.js";

export async function createPostHandler() {
  await applyCommon.call(this);
  this.partials.createPostForm = await this.load(
    "./templates/create/createPostForm.hbs"
  );
  await this.partial("./templates/home/home.hbs");
}

export function create() {
  const firebasePosts = fireBaseRequestFactory(
    `https://spa-exam-f0239.firebaseio.com/`,
    sessionStorage.getItem("userId"),
    "posts",
    sessionStorage.getItem("token")
  );
  let formRef = document.querySelector("#create-form");
  let form = createFormEntity(formRef, ["title", "category", "content"]);
  let formValue = form.getValue();
  firebasePosts.createEntity(formValue);
  this.redirect(["#/home"]);
}

export async function detailsViewHandler() {
  await applyCommon.call(this);
  const firebasePost = fireBaseRequestFactory(
    "https://spa-exam-f0239.firebaseio.com/",
    sessionStorage.getItem("userId"),
    "posts",
    sessionStorage.getItem("token")
  );
  let id = this.params.id;
  firebasePost.getById(id).then((res) => {
    this.details = [{ ...res, id: this.params.id }];
    this.partial("./templates/create/details.hbs");
  });
}

export async function editPostHandler() {
  await applyCommon.call(this);
  this.postId = this.params.id;
  this.partials.createPostForm = await this.load(
    "./templates/create/createForm.hbs"
  );
  this.partials.editForm = await this.load("./templates/edit/editForm.hbs");
  const firebasePost = fireBaseRequestFactory(
    "https://spa-exam-f0239.firebaseio.com/",
    sessionStorage.getItem("userId"),
    "posts",
    sessionStorage.getItem("token")
  );
  const firebaseEditPost = await fireBaseRequestFactory(
    "https://spa-exam-f0239.firebaseio.com/",
    sessionStorage.getItem("userId"),
    "posts",
    sessionStorage.getItem("token")
  );
  await firebasePost
    .getAll()
    .then((x) => x || {})
    .then((res) => {
      this.posts = Object.entries(res).map((d) => {
        return { ...d[1], id: d[0] };
      });
      this.partial("./templates/home/home.hbs");
    });
  await firebaseEditPost.getById(this.postId).then((res) => {
    this.post = [{ ...res, id: this.params.id }];
    this.partial("./templates/home/home.hbs");
  });
}

export function edit() {
  const firebasePosts = fireBaseRequestFactory(
    "https://spa-exam-f0239.firebaseio.com/",
    sessionStorage.getItem("userId"),
    "posts",
    sessionStorage.getItem("token")
  );
  this.postId = this.params.id;

  let formRef = document.querySelector("#edit-form");
  let form = createFormEntity(formRef, ["title", "category", "content"]);
  let formValue = form.getValue();
  firebasePosts.updateEntity(formValue, this.postId).then((res) => {
    res;
    this.redirect(["#/home"]);
  });
}

export function deleteHandler() {
  const firebasePost = fireBaseRequestFactory(
    "https://spa-exam-f0239.firebaseio.com/",
    sessionStorage.getItem("userId"),
    "posts",
    sessionStorage.getItem("token")
  );

  let id = this.params.id;
  firebasePost.deleteEntity(id);
  this.redirect(["#/home"]);
}
