var count;
function loadData() {
  fetch("config.json")
    .then((response) => response.json())
    .then((data) => {
      const hunt = data.hunt;
      count = data.count;
      let math = (Math.pow(1364 / 1365, count) * 100).toFixed(2);
      let inverse = (100 - math).toFixed(2);

      document.getElementById("hunt").innerHTML = "Currently hunting: " + hunt;
      document.getElementById("count").innerHTML = "Count: " + count;
      document.getElementById("math").innerHTML =
        math + "% of people are still hunting";
      document.getElementById("math2").innerHTML =
        inverse + "% of people got the shiny";
    });
}

function sr() {
  count = count + 1;
  let math = (Math.pow(1364 / 1365, count) * 100).toFixed(2);
  let inverse = (100 - math).toFixed(2);
  document.getElementById("math").innerHTML =
    math + "% of people are still hunting";
  document.getElementById("count").innerHTML = "Count: " + count;
  document.getElementById("math2").innerHTML =
    inverse + "% of people got the shiny";
}

window.onload = loadData;
