import { createFormEntity } from "../services/form-helpers.js";
import { applyCommon } from "./common.js";

/**
 * Logs user
 */
export async function loginViewHandler() {
  await applyCommon.call(this);
  this.partials.loginForm = await this.load(
    "./templates/login/loginForm.hbs"
  );

  await this.partial("./templates/login/loginPage.hbs");

  let formRef = document.querySelector("#login-form");
  let form = createFormEntity(formRef, ["email", "password"]);

  formRef.addEventListener("submit", (e) => {
    e.preventDefault();
    let formValue = form.getValue();

    firebase
      .auth()
      .signInWithEmailAndPassword(formValue.email, formValue.password)
      .then((response) => {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token) => {
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("email", response.user.email);
            sessionStorage.setItem("userId", firebase.auth().currentUser.uid);
          });
        this.redirect(["#/home"]);
      });
  });
}

/**
 * Registers user
 */
export async function registerViewHandler() {
  await applyCommon.call(this);
  this.partials.registerForm = await this.load(
    "./templates/register/registerForm.hbs"
  );

  await this.partial("./templates/register/registerPage.hbs");

  let formRef = document.querySelector("#register-form");

  let form = createFormEntity(formRef, ["email", "password", "repeatPassword"]);

  formRef.addEventListener("submit", (e) => {
    e.preventDefault();
    let formValue = form.getValue();
    if (formValue.password !== formValue.repeatPassword) {
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(formValue.email, formValue.password)
      .then((response) => {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token) => {
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("email", response.user.email);
            sessionStorage.setItem("userId", firebase.auth().currentUser.uid);
          });
        this.redirect(["#/home"]);
      });
  });
}

/**
 * Signs out user
 */
export function logoutHandler() {
  sessionStorage.clear();
  firebase.auth().signOut();
  this.redirect(["#/home"]);
}
