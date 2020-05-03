import { applyCommon } from "./common.js";
import { fireBaseRequestFactory } from "../services/firebase-requests.js";

export async function homeViewHandler() {
  await applyCommon.call(this);
  this.partials.createPostForm = await this.load(
    "./templates/create/createForm.hbs"
  );

  const firebasePosts = fireBaseRequestFactory(
    "https://spa-exam-f0239.firebaseio.com/",
    sessionStorage.getItem("userId"),
    "posts",
    sessionStorage.getItem("token")
  );
  firebasePosts
    .getAll()
    .then((x) => x || {})
    .then((res) => {
      this.posts = Object.entries(res).map((d) => {
        return { ...d[1], id: d[0] };
      });
      this.partial("./templates/home/home.hbs");
    });
}
