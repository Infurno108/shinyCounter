var count;
function loadData() {
  fetch("config.json")
    .then((response) => response.json())
    .then((data) => {
      const hunt = data.hunt;
      count = data.count;
      document.getElementById("hunt").innerHTML = "Currently hunting: " + hunt;
      document.getElementById("count").innerHTML = "Count: " + count;
      let math = Math.pow(1364 / 1365, count) * 100;
      document.getElementById("math").innerHTML =
        math + "% of people have not gotten the shiny by this count";
    });
}

function sr() {
  count = count + 1;
  let math = Math.pow(1364 / 1365, count) * 100;
  document.getElementById("math").innerHTML =
    math + "% of people have not gotten the shiny by this count";
  document.getElementById("count").innerHTML = "Count: " + count;
}

window.onload = loadData;
