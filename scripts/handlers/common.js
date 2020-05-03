export async function applyCommon() {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
  };

  this.email = sessionStorage.getItem("email");
  this.loggedIn = !!sessionStorage.getItem("token");
  this.userId = sessionStorage.getItem("userId");
}
