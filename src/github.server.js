import url from "url";

export function getGithubContent(request, response) {
  console.log("recieved");
  console.log(request.body);
  response.status(200).send("Hi");
}
