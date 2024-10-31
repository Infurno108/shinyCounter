const url = "/api/";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function loadSite() {
  await parseHunts(huntFetch()).then((data) => {
    config = data;
  });
  var hunts = config.hunts;
  var referenceNode = document.getElementsByClassName("hunts")[0];
  var splash = document.createElement("img");
  splash.src = "pics/!have/" + getRandomInt(3) + ".png";
  splash.id = "splash";
  referenceNode.appendChild(splash);
  for (var i = 0; i < hunts.length; i++) {
    var div = document.createElement("div");
    div.className = "huntBox";

    div.id = hunts[i].hunt;
    div.count = hunts[i].count;
    div.method = hunts[i].method;
    div.probability = hunts[i].probability;
    div.have = hunts[i].have;

    var sprite = document.createElement("img");
    if (hunts[i].have == 1) {
      sprite.src =
        "https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/shiny/" +
        div.id.toLowerCase() +
        ".png";
    } else {
      sprite.src =
        "https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/" +
        div.id.toLowerCase() +
        ".png";
    }
    sprite.id = "sprite";

    var text = document.createElement("p");
    text.innerHTML = `${div.id} ${div.count}`;
    text.id = div.id + "Text";

    var span = document.createElement("span");
    span.innerHTML = " " + (div.probability * 100).toFixed(2) + "%";
    if (div.have == 0) {
      span.setAttribute("style", "color: #dc1d16;");
    } else {
      span.setAttribute("style", "color: #3fe03f;");
    }
    text.appendChild(span);

    var button = document.createElement("button");
    button.className = "inc";
    button.id = div.id + "Button";
    button.innerHTML = "+";

    var updateButton = document.createElement("button");
    updateButton.className = "reset";
    updateButton.id = div.id + "Reset";
    updateButton.innerHTML = "↻";

    var catchButton = document.createElement("button");
    catchButton.className = "catch";
    catchButton.id = div.id + "Catch";
    catchButton.innerHTML = "◓";

    div.appendChild(sprite);
    div.appendChild(text);
    div.appendChild(catchButton);
    div.appendChild(updateButton);
    div.appendChild(button);

    referenceNode.appendChild(div);
  }
  buttonEstablishment();
  //console.log(huntFetch().then((data) => console.log(data)));
}

function buttonEstablishment() {
  var buttons = document.getElementsByClassName("inc");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      increment(this.id.slice(0, -6));
    });
  }
  buttons = document.getElementsByClassName("reset");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      updateHunt(this.id.slice(0, -5));
    });
  }
  buttons = document.getElementsByClassName("catch");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      catchHunt(this.id.slice(0, -5));
    });
  }
}

async function parseHunts(hunts) {
  //hunts being a json object returned from api/fetchHunts
  var dingus;
  await hunts.then((data) => {
    dingus = data.rows;
  });
  var temp = [];
  for (var i = 0; i < dingus.length; i++) {
    temp.push(dingus[i].hunts.replace("(", "").replace(")", "").split(",")); //splitting the strings into an array
  }
  var config = { hunts: [] };
  for (var i = 0; i < temp.length; i++) {
    config.hunts.push({
      hunt: temp[i][0],
      method: temp[i][1],
      count: temp[i][2],
      probability: temp[i][3],
      have: temp[i][4],
    });
  }
  return config;
}

async function huntFetch() {
  return await fetch(url + "fetchHunts").then(function (res) {
    return res.json();
  });
}

async function addHunt() {
  var hunt = document.getElementById("newHunt").value;
  var method = document.getElementById("method").value;
  await fetch(
    "/api/addHunt?hunt=" +
      hunt +
      "&method=" +
      method +
      "&count=0&probability=0&have=0"
  );
  window.location.reload();
}

function updateHunt(hunt) {
  var div = document.getElementById(hunt);
  var count = div.count;
  var probability = div.probability;
  var have = div.have;
  fetch(
    "/api/editHunt?hunt=" +
      hunt +
      "&count=" +
      count +
      "&probability=" +
      probability +
      "&have=" +
      have
  ).then((res) => {
    window.location.reload();
  });
}

function catchHunt(hunt) {
  var div = document.getElementById(hunt);
  if (div.have == 0) {
    div.have = 1;
  } else {
    div.have = 0;
  }
  updateHunt(hunt);
}

function increment(hunt) {
  var div = document.getElementById(hunt);
  if (div.have == 0) {
    ++div.count;
    var text = document.getElementById(hunt + "Text");
    var span = text.getElementsByTagName("span")[0];
    var prob = parseFloat(div.probability);
    switch (div.method) {
      case "Soft_Reset":
        prob = prob + (1 / 1354) * Math.pow(1354 / 1355, div.count - 1);
        break;
      case "Masuda_Method":
        prob = prob + (1 / 512) * Math.pow(511 / 512, div.count - 1);
        break;
      case "Hoard":
        prob =
          prob +
          (1 - Math.pow(1354 / 1355, 5)) *
            Math.pow(1354 / 1355, 5 * (div.count - 1));
        break;
    }
    div.probability = prob;
    span.innerHTML = " " + (prob * 100).toFixed(2) + "%";
    text.innerHTML = `${div.id} ${div.count}`;
    text.appendChild(span);
  }
}

loadSite();
