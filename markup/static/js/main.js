'use strict';

let mutator,
    figureClass,
    figureColor,
    figureForm,
    sizes;

const forms = ["circle", "square"],
      sizeValues = ["30px", "40px", "50px", "60px"],
      greenRange = ['#abf977','#a8f877','#a5f776','#a0f775','#9cf575','#99f574','#96f474','#93f473','#8ff273','#8af172','#86f172','#81f071','#7eef71','#7bee70','#77ed70','#72ed6f','#6deb6f','#68eb6e','#62ea6d','#5ee96d','#5ae86d','#56e76c','#50e76c','#49e56b','#42e46b','#39e36a','#30e369','#23e269','#18e168','#00e068'],
      orangeRange = ['#e05900','#e05c00','#e05f00','#e06100','#e06400','#e16700','#e16900','#e16c00','#e16f00','#e17100','#e17300','#e17700','#e17800','#e17b00','#e17e00','#e18000','#e18300','#e18500','#e18700','#e18900','#e18b00','#e18e00','#e19000','#e19300','#e19400','#e19600','#e09a00','#e09c00','#e09d00','#e0a000'];

let getRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

let count = getRandom(4, 10);

for(let i = 0; i < count; i++) {

    mutator = getRandom(0, 10);

    figureForm = forms[getRandom(0, 1)];
    sizes = sizeValues[getRandom(0, 3)];

    if (mutator > 5) {
      figureClass = "orange";
      figureColor = orangeRange[getRandom(0, orangeRange.length)];
    } else {
      figureClass = "green";
      figureColor = greenRange[getRandom(0, greenRange.length)];
    }

    console.log(document.body.clientWidth)
    let figureX = getRandom(0, (document.body.clientWidth - 60));
    let figureY = getRandom(0, (document.body.clientHeight - 60 - 200));
    // let greenColor = greenRange[Math.ceil(Math.random() * (greenRange.length - 0) + 0)];
    // let orangeColor = orangeRange[Math.ceil(Math.random() * (orangeRange.length - 0) + 0)];

    document.body.innerHTML += `<div class='figure ${figureForm} ${figureClass}' style='left: ${figureX}px; top: ${figureY}px; height: ${sizes}; width: ${sizes}; background-color: ${figureColor}'></div>`;
    // document.body.innerHTML += `<div class='${square} ${itemClass}' style='left: ${figureX}px; top: ${figureY}px; background-color: ${orangeColor}'></div>`;

    console.log(mutator);
}



