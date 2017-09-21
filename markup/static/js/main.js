'use strict';

let mutator = 1;

let itemClass;
let circle = "figure circle";
let square = "figure square";



let count = Math.ceil(Math.random() * (5 - 2) + 2);

alert(count);
for(let i = 0; i < count; i++) {
   if ((mutator % 2) === 0) {
      itemClass = "red";
    } else {
      itemClass = "yellow";
    }
   console.log(document.body.clientWidth)
   let figureX = Math.random() * (document.body.clientWidth - 60);
   let figureY = Math.random() * (document.body.clientHeight - 60);
   // alert(figureX);
   // alert(figureY);

   document.body.innerHTML += `<div class='${circle} ${itemClass}' style='left: ${figureX}px; top: ${figureY}px'></div>`;
   document.body.innerHTML += `<div class='${square} ${itemClass}' style='left: ${figureX}px; top: ${figureY}px'></div>`;
   mutator++;

   console.log(mutator);
}

