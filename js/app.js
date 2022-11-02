import ArtGetter from "./ArtGetter.js";

const artGetter = new ArtGetter();

function submit() {
  const department = document.querySelector("#departments").value;
  artGetter.getArtByDepartment(department);
}

document.querySelector("#submit").addEventListener("click", submit);
