require("dotenv").config();
var request = require("request");
var rp = require("request-promise");
const { USER_EMAIL, API_TOKEN } = process.env;
export const options = {
  method: "GET",
  url: "",
  headers: {
    Accept: "application/json",
    authorization: `Basic ${new Buffer(USER_EMAIL + ":" + API_TOKEN).toString(
      "base64"
    )}`
  }
};
export async function getPages(): Promise<any> {
  options.url = `https://ubiqum.atlassian.net/wiki/rest/api/space/STUDENTS/content?expand=children.page,body.storage&limit=200`;
  try {
    const body = await rp(options);
    const response = JSON.parse(body);
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
