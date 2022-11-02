const baseURL = "https://collectionapi.metmuseum.org/public/collection/v1/";

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  async getData(url) {
    return fetch(baseURL + url)
      .then(convertToJson)
      .then((data) => data);
  }
}
