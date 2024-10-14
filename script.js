var count;
var method = 0; //0 SR, 1 MM, 2 Hoard

function loadSite() {
  fetch("config.json")
    .then((response) => response.json())
    .then((data) => {
      const hunts = data.hunts;
      var hunt, method, count;
      var referenceNode = document.getElementsByClassName("hunts")[0];
      for (var i = 0; i < hunts.length; i++) {
        hunt = hunts[i].hunt;
        count = hunts[i].count;
        method = hunts[i].method;
        var div = document.createElement("div");
        div.id = "huntBox";
        var sprite = document.createElement("img");
        sprite.src =
          "https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/shiny/" +
          hunt.toLowerCase() +
          ".png";
        sprite.id = "sprite";
        var text = document.createElement("p");
        text.innerHTML = `${hunt} ${method} ${count}`;
        div.appendChild(sprite);
        div.appendChild(text);
        referenceNode.appendChild(div);
      }
    });
}
window.onload = loadSite;

function loadData() {
  fetch("config.json")
    .then((response) => response.json())
    .then((data) => {
      const hunt = data.hunt;
      count = data.count;
      let math;
      let inverse;
      document.getElementById("hunt").innerHTML = "Currently hunting: " + hunt;
      document.getElementById("count").innerHTML = "Count: " + count;
      switch (method) {
        case 0:
          math = (Math.pow(1364 / 1365, count) * 100).toFixed(2);
          inverse = (100 - math).toFixed(2);
          document.getElementById("math").innerHTML =
            inverse + "% of people would have the shiny by this reset";
          document.getElementById("math2").innerHTML =
            math + "% of people would still be hunting";
          break;
        case 1:
          math = (Math.pow(511 / 512, count) * 100).toFixed(2);
          inverse = (100 - math).toFixed(2);
          document.getElementById("math").innerHTML =
            inverse + "% of people would have the  shiny by this egg";
          document.getElementById("math2").innerHTML =
            math + "% of people would still be hatching";
          break;
        case 2:
          math = (Math.pow(1364 / 1365, 5 * count) * 100).toFixed(2);
          inverse = (100 - math).toFixed(2);
          document.getElementById("math").innerHTML =
            inverse + "% of people would have the shiny by this hoard";
          document.getElementById("math2").innerHTML =
            math + "% of people would still be using Sweet Scent";
          break;
      }
    });
}
function mm() {
  if (method == 1) {
    return;
  }
  method = 1;
  document.getElementById("inc").innerText = "HATCH";
  loadData();
}
function sr() {
  if (method == 0) {
    return;
  }
  method = 0;
  document.getElementById("inc").innerText = "SR";
  loadData();
}
function hoard() {
  if (method == 2) {
    return;
  }
  method = 2;
  document.getElementById("inc").innerText = "RUN";
  loadData();
}
function inc() {
  count = count + 1;
  document.getElementById("count").innerHTML = "Count: " + count;
  switch (method) {
    case 0:
      math = (Math.pow(1364 / 1365, count) * 100).toFixed(2);
      inverse = (100 - math).toFixed(2);
      document.getElementById("math").innerHTML =
        inverse + "% of people would have the shiny by now";
      document.getElementById("math2").innerHTML =
        math + "% of people would still be hunting";
      break;
    case 1:
      math = (Math.pow(511 / 512, count) * 100).toFixed(2);
      inverse = (100 - math).toFixed(2);
      document.getElementById("math").innerHTML =
        inverse + "% of people would have the shiny by this egg";
      document.getElementById("math2").innerHTML =
        math + "% of people would still be hatching";
      break;
    case 2:
      math = (Math.pow(1364 / 1365, 5 * count) * 100).toFixed(2);
      inverse = (100 - math).toFixed(2);
      document.getElementById("math").innerHTML =
        inverse + "% of people would have the shiny by this hoard";
      document.getElementById("math2").innerHTML =
        math + "% of people are would still be using Sweet Scent";
      break;
  }
}
