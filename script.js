var count;
var method = 0; //0 SR, 1 MM, 2 Hoard
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
          document.getElementById("math2").innerHTML =
            inverse + "% of people got the shiny by now";
          document.getElementById("math").innerHTML =
            math + "% of people are still hunting";
          break;
        case 1:
          math = (Math.pow(511 / 512, count) * 100).toFixed(2);
          inverse = (100 - math).toFixed(2);
          document.getElementById("math2").innerHTML =
            inverse + "% of people got the shiny by this egg";
          document.getElementById("math").innerHTML =
            math + "% of people are still hatching";
          break;
        case 2:
          math = (Math.pow(1364 / 1365, 5 * count) * 100).toFixed(2);
          inverse = (100 - math).toFixed(2);
          document.getElementById("math2").innerHTML =
            inverse + "% of people got the shiny by this hoard";
          document.getElementById("math").innerHTML =
            math + "% of people are still using Sweet Scent";
          break;
      }
    });
}
function mm() {
  if (method == 1) {
    return;
  }
  method = 1;
  loadData();
}
function sr() {
  if (method == 0) {
    return;
  }
  method = 0;
  loadData();
}
function hoard() {
  if (method == 2) {
    return;
  }
  method = 2;
  loadData();
}
function inc() {
  count = count + 1;
  document.getElementById("hunt").innerHTML = "Currently hunting: " + hunt;
  document.getElementById("count").innerHTML = "Count: " + count;
  switch (method) {
    case 0:
      math = (Math.pow(1364 / 1365, count) * 100).toFixed(2);
      inverse = (100 - math).toFixed(2);
      document.getElementById("math2").innerHTML =
        inverse + "% of people got the shiny by now";
      document.getElementById("math").innerHTML =
        math + "% of people are still hunting";
      break;
    case 1:
      math = (Math.pow(511 / 512, count) * 100).toFixed(2);
      inverse = (100 - math).toFixed(2);
      document.getElementById("math2").innerHTML =
        inverse + "% of people got the shiny by this egg";
      document.getElementById("math").innerHTML =
        math + "% of people are still hatching";
      break;
    case 2:
      math = (Math.pow(1364 / 1365, 5 * count) * 100).toFixed(2);
      inverse = (100 - math).toFixed(2);
      document.getElementById("math2").innerHTML =
        inverse + "% of people got the shiny by this hoard";
      document.getElementById("math").innerHTML =
        math + "% of people are still using Sweet Scent";
      break;
  }
}
window.onload = loadData;
