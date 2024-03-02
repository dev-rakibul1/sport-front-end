var c = document.getElementById("canv"),
  $ = c.getContext("2d"),
  w = (c.width = window.innerWidth / 2),
  h = (c.height = window.innerHeight),
  t = 0,
  num = 750,
  u = 0,
  s,
  a,
  b,
  x,
  y,
  _x,
  _y,
  _t = 1 / 60;

var anim = function () {
  $.globalCompositeOperation = "source-over";
  window.requestAnimationFrame(anim);
  $.fillStyle = "hsla(0, 0%, 5%, 1)";
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = "lighter";
  var k = document.getElementById("ly").value;
  for (var i = 0; i < k; i++) {
    x = 0;
    $.beginPath();

    for (var j = 0; j < num; j++) {
      $.strokeStyle = "hsla(" + u * 2 + ",100%,60%," + a + ")";
      x += 0.5 * Math.sin(2);
      y = (x * Math.sin(i + l * t + x / 50)) / m;
      _x = x * Math.cos(b) + y * Math.sin(i);
      _y = x * Math.sin(b) + y * Math.cos(i);
      var l = document.getElementById("l").value;
      var m = document.getElementById("m").value;
      var n = document.getElementById("j").value;
      var o = document.getElementById("pi").value;
      var lw = document.getElementById("lw").value;
      var r = document.getElementById("rad").value;
      var a = document.getElementById("alph").value;
      b = (j * n * Math.PI) / o;
      $.lineWidth = lw;

      $.arc(w / 2 + _x, h / 2 + _y, r, 0, 2 * Math.PI);
    }
    $.stroke();
  }
  t += _t;
  u -= 0.5;
};
anim();

window.addEventListener(
  "resize",
  function () {
    c.width = w = window.innerWidth / 2;
    c.height = h = window.innerHeight;
  },
  false
);
