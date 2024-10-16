//0 SR, 1 MM, 2 Hoard

var config = {
  hunts: [
    {
      hunt: "Reshiram",
      count: 1180,
      method: "Soft Reset",
      probability: 0.5788581956042984,
    },
    {
      hunt: "Latias",
      count: 182,
      method: "Soft Reset",
      probability: 0.12486944430732436,
    },
    {
      hunt: "Ho-Oh",
      count: 340,
      method: "Soft Reset",
      probability: 0.22055685686824258,
    },
  ],
};

function loadSite() {
  const hunts = config.hunts;
  var hunt, method, count;
  var referenceNode = document.getElementsByClassName("hunts")[0];
  for (var i = 0; i < hunts.length; i++) {
    var div = document.createElement("div");
    div.className = "huntBox";
    div.id = hunt;
    div.count = count;

    div.id = hunts[i].hunt;
    div.count = hunts[i].count;
    div.method = hunts[i].method;
    div.probability = hunts[i].probability;

    var sprite = document.createElement("img");
    sprite.src =
      "https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/shiny/" +
      div.id.toLowerCase() +
      ".png";
    sprite.id = "sprite";

    var text = document.createElement("p");
    text.innerHTML = `${div.id} ${div.count}`;
    text.id = div.id + "Text";

    var span = document.createElement("span");
    span.innerHTML = " " + (div.probability * 100).toFixed(2) + "%";
    span.setAttribute("style", "color: #3fe03f;");
    text.appendChild(span);

    var button = document.createElement("button");
    button.className = "reset";
    button.id = div.id + "Button";
    button.innerHTML = "+";

    div.appendChild(sprite);
    div.appendChild(text);
    div.appendChild(button);

    referenceNode.appendChild(div);
  }
  buttonEstablishment();
}

function buttonEstablishment() {
  var buttons = document.getElementsByClassName("reset");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      increment(this.id.slice(0, -6));
    });
  }
}

loadSite();

function increment(hunt) {
  var div = document.getElementById(hunt);
  ++div.count;
  var text = document.getElementById(hunt + "Text");
  var span = text.getElementsByTagName("span")[0];
  switch (div.method) {
    case "Soft Reset":
      div.probability =
        div.probability + (1 / 1354) * Math.pow(1354 / 1355, div.count - 1);
      break;
    case "Masuda Method":
      div.probability =
        div.probability + (1 / 512) * Math.pow(511 / 512, div.count - 1);
      break;
    case "Hoard":
      div.probability =
        div.probability +
        (1 - Math.pow(1354 / 1355, 5)) *
          Math.pow(1354 / 1355, 5 * (div.count - 1));
      break;
  }
  console.log(div.probability);
  span.innerHTML = " " + (div.probability * 100).toFixed(2) + "%";
  text.innerHTML = `${div.id} ${div.count}`;
  text.appendChild(span);
}
