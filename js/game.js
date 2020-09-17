const numDivs = 36;
const maxHits = 10;

let hits = 0;
let missHits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый - OK
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером - OK
  if ($(divSelector).hasClass("target")) {
    $(divSelector).text(`${hits + 1}`);
  }
  // FIXME: тут надо определять при первом клике firstHitTime - OK
  if (hits === 1) {
    firstHitTime = getTimestamp();
  } else if (hits === maxHits) {
    endGame();
  }
}

function randomDivId() {
  let d = Math.floor(Math.random() * 6) + 1;
  let n = Math.floor(Math.random() * 6) + 1;
  return `#slot-${d}${n}`;
}

function endGame() {
  // FIXME: спрятать игровое поле сначала - OK
  $("#hide-field").addClass('hide-field');
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-missed-clicks").text(`${missHits}`);
  $("#win-message").removeClass("d-none");
}

function getTimestamp() {
  let d = new Date();
  return d.getTime();
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text? - OK
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(event.target).removeClass("target");
    $(event.target).text("");
    $(".col").removeClass("miss");
    $(".col").text("");
    round();
  } else {
    $(event.target).addClass("miss");
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss - OK
  if ($(event.target).hasClass("miss")) {
    missHits = missHits + 1;
    $(event.target).text(`${missHits}`);
  }
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке - OK
  $("#button-reload").click(function () {
    location.reload();
    $("#hide-field").removeClass('hide-field');
  });

  round();

  $(".game-field").click(handleClick);

}

$(document).ready(init);