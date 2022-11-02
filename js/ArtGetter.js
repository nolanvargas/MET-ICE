import ExternalServices from "./externalServices.js";

const a = new ExternalServices();

export default class ArtGetter {
  constructor() {
    this.artworks = [];
    this.artData = [];
    this.departments = [];
    this.data = [];
    this.init();
  }

  async init() {
    // Get the list of departments using our external services module
    this.data = await a.getData("departments");
    // Build the html list of departments
    this.buildDepartmentSelect();
  }

  buildDepartmentSelect() {
    // Get department select html element
    const departmentSelect = document.querySelector("#departments");
    // For each department that got sent back to us, put it in an option element
    const optionHtML = this.data["departments"].map(
      (department) =>
        `<option value="${department.departmentId}">${department.displayName}</option>`
    );
    // Add all options to the html select element
    departmentSelect.innerHTML = optionHtML.join("");
  }

  async getArtByDepartment(SelectedDepartment) {
    // Get the list of objects IDs in the department
    const artworks = await a.getData(
      `objects?departmentIds=${SelectedDepartment}`
    );
    // This is a super fancy way of picking 20 random elements from a list.
    // Here, it returns 20 random object Ids.
    this.artworks = artworks["objectIDs"]
      .sort(function () {
        return 0.5 - Math.random();
      })
      .slice(0, 20);
    console.log(this.artworks);
    // For each object ID, grab the art data
    this.artworks.forEach((art) => {
      this.getArtData(art);
    });
    // This isn't the best place to put the renderArt() method call but it works
    this.renderArt();
  }

  async getArtData(art) {
    // Grab the data for each art piece
    const artData = await a.getData(`objects/${art}`);
    // Add it to the list
    this.artData.push(artData);
  }

  renderArt() {
    // Get the output element
    let outputListElement = document.querySelector("#output");
    // Construct a li element for each art piece
    let outputHTML = this.artData.map(
      (art) =>
        `<li><p>Name: ${art.objectName}</p><p>ID: ${art.objectID}</p></li><hr>`
    );
    // Add all li elements to the DOM
    outputListElement.innerHTML = outputHTML.join("");
  }
}
