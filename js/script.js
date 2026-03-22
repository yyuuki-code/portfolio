gsap.registerPlugin(ScrollTrigger);

// === Loading + Hero animations ===
window.addEventListener("load", function() {
  var tl = gsap.timeline();
  tl.to("#loading", { opacity: 0, duration: 0.6, delay: 2.2, ease: "power2.in" })
    .set("#loading", { display: "none" })
    .from(".js-hero-1", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" })
    .from(".js-hero-2", { opacity: 0, y: 24, duration: 0.7, ease: "power2.out" }, "-=0.3")
    .from(".js-hero-3", { opacity: 0, y: 24, duration: 0.7, ease: "power2.out" }, "-=0.4")
    .from(".js-hero-4", { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" }, "-=0.3")
    .from(".js-hero-5", { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" }, "-=0.2");
});

// === Custom Cursor ===
var dot = document.getElementById("cursorDot");
var ring = document.getElementById("cursorRing");
var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
document.addEventListener("mousemove", function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + "px";
  dot.style.top = mouseY + "px";
});
(function rafCursor() {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;
  ring.style.left = ringX + "px";
  ring.style.top = ringY + "px";
  requestAnimationFrame(rafCursor);
})();
document.querySelectorAll("a, button").forEach(function(el) {
  el.addEventListener("mouseenter", function() { ring.classList.add("hovered"); });
  el.addEventListener("mouseleave", function() { ring.classList.remove("hovered"); });
});

// === Scroll Progress ===
var progressBar = document.getElementById("scrollProgress");
window.addEventListener("scroll", function() {
  var st = document.documentElement.scrollTop;
  var sh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = ((st / sh) * 100) + "%";
});

// === Header hide / show ===
var header = document.getElementById("header");
var lastScroll = 0;
window.addEventListener("scroll", function() {
  var cur = window.pageYOffset;
  if (cur > lastScroll && cur > 100) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
  lastScroll = cur;
});

// === Hamburger menu ===
var burger = document.getElementById("burger");
var mobileMenu = document.getElementById("mobileMenu");
burger.addEventListener("click", function() {
  burger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});
document.querySelectorAll(".mobile-link").forEach(function(link) {
  link.addEventListener("click", function() {
    burger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// === Canvas Sakura Petals ===
var canvas = document.getElementById("heroCanvas");
var ctx = canvas.getContext("2d");
var petals = [];
var PETAL_COUNT = 30;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function Petal() {
  this.reset();
  this.y = Math.random() * canvas.height;
}
Petal.prototype.reset = function() {
  this.x = Math.random() * canvas.width;
  this.y = -16;
  this.size = Math.random() * 7 + 4;
  this.speedX = Math.random() * 1.4 - 0.7;
  this.speedY = Math.random() * 1.2 + 0.6;
  this.opacity = Math.random() * 0.5 + 0.15;
  this.rotation = Math.random() * 360;
  this.rotSpeed = Math.random() * 1.5 - 0.75;
};
Petal.prototype.update = function() {
  this.x += this.speedX;
  this.y += this.speedY;
  this.rotation += this.rotSpeed;
  if (this.y > canvas.height + 16) { this.reset(); }
};
Petal.prototype.draw = function() {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotation * Math.PI / 180);
  ctx.globalAlpha = this.opacity;
  ctx.fillStyle = "#e8a0a8";
  ctx.beginPath();
  ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

for (var i = 0; i < PETAL_COUNT; i++) { petals.push(new Petal()); }
function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(function(p) { p.update(); p.draw(); });
  requestAnimationFrame(animatePetals);
}
animatePetals();

// === ScrollTrigger section animations ===
gsap.utils.toArray(".js-up").forEach(function(el) {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
    opacity: 0, y: 40, duration: 0.7, ease: "power2.out", immediateRender: false
  });
});
gsap.utils.toArray(".js-left").forEach(function(el) {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
    opacity: 0, x: -40, duration: 0.7, ease: "power2.out", immediateRender: false
  });
});
gsap.utils.toArray(".js-right").forEach(function(el) {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
    opacity: 0, x: 40, duration: 0.7, ease: "power2.out", immediateRender: false
  });
});

// === Skill bar animations ===
document.querySelectorAll(".bar-fill").forEach(function(bar) {
  ScrollTrigger.create({
    trigger: bar,
    start: "top 88%",
    onEnter: function() {
      bar.style.width = bar.getAttribute("data-width") + "%";
    }
  });
});

// === Smooth scroll ===
document.querySelectorAll(".nav-link, .btn-primary, .mobile-link, .footer-logo").forEach(function(a) {
  a.addEventListener("click", function(e) {
    var href = this.getAttribute("href");
    if (href && href.charAt(0) === "#") {
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});
