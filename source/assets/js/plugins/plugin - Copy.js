// // Global module

// var myModule = (function () {

//   var privateVariable = 'Hello World';
//   function privateMethod() {
//     // ...
//   }

//   // Module object

//   var module = {};

//   module.publicProperty = "Foobar";

//   module.publicMethod = function () {

//     console.log( privateVariable );

//   };

//   return module;

// }());


// //
// document.getElementsByTagName('button')[0].onclick = function () {
//   var target = document.querySelector('.target').offsetTop;
//   scrollTo(target, 1000);
// }

// // Element to move, time in ms to animate
// function scrollTo(element, duration) {
//   var e = document.documentElement;
//   if(e.scrollTop===0){
//     var t = e.scrollTop;
//     ++e.scrollTop;
//     e = t+1===e.scrollTop--?e:document.body;
//   }
//   scrollToC(e, e.scrollTop, element, duration);
// }

// // Element to move, element or px from, element or px to, time in ms to animate
// function scrollToC(element, from, to, duration) {
//   if (duration < 0) return;
//   if(typeof from === "object")from=from.offsetTop;
//   if(typeof to === "object")to=to.offsetTop;

//   scrollToX(element, from, to, 0, 1/duration, 20, easeOutCuaic);
// }

// function scrollToX(element, x1, x2, t, v, s
//   tep, operacion) {
//   if (t < 0 || t > 1 || v <= 0) {
//     // callback here
//     return;
//   }
//   element.scrollTop = x1 - (x1-x2)*operacion(t);
//   t += v * step;

//   setTimeout(function() {
//     scrollToX(element, x1, x2, t, v, step, operacion);
//   }, step);
// }
