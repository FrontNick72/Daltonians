'use strict';

if ('ontouchstart' in window) {
 console.log("Событие касания есть");
}

let mutator,
    figureClass,
    figureColor,
    figureForm,
    sizes,
    figureX,
    figureY,
    arrCoords,
    count;


const forms = ["circle", "square"],
      sizeValues = ["30px", "40px", "50px", "60px"],
      greenRange = ['#abf977','#a8f877','#a5f776','#a0f775','#9cf575','#99f574','#96f474','#93f473','#8ff273','#8af172','#86f172','#81f071','#7eef71','#7bee70','#77ed70','#72ed6f','#6deb6f','#68eb6e','#62ea6d','#5ee96d','#5ae86d','#56e76c','#50e76c','#49e56b','#42e46b','#39e36a','#30e369','#23e269','#18e168','#00e068'],
      orangeRange = ['#e05900','#e05c00','#e05f00','#e06100','#e06400','#e16700','#e16900','#e16c00','#e16f00','#e17100','#e17300','#e17700','#e17800','#e17b00','#e17e00','#e18000','#e18300','#e18500','#e18700','#e18900','#e18b00','#e18e00','#e19000','#e19300','#e19400','#e19600','#e09a00','#e09c00','#e09d00','#e0a000'];

arrCoords = [];

const changePosition = () => {
  figureX = getRandom(0, (document.body.clientWidth - 60));;
  figureY = getRandom(35, (document.body.clientHeight - 60 - 200));
};

const countPosition = () => {
  return arrCoords.some(function(item, index) {
    return ( (figureX <= item.left + 70 && figureX >= item.left - 70) && (figureY <= item.top + 70 && figureY >= item.top - 70));
  });
};

let getRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

if (document.body.clientWidth > 500) {
  count = getRandom(12, 18);
} else {
  count = getRandom(4, 8);
}


document.querySelector('.countFigure').innerHTML = `Количество фигурок: ${count}`;

for(let i = 0; i < count; i++) {

    mutator = getRandom(0, 4);

    figureForm = forms[getRandom(0, 1)];
    sizes = sizeValues[getRandom(0, 3)];

    if (mutator > 2) {
      figureClass = "orange";
      figureColor = orangeRange[getRandom(0, orangeRange.length)];
    } else {
      figureClass = "green";
      figureColor = greenRange[getRandom(0, greenRange.length)];
    }

    changePosition();
    countPosition();

    if (countPosition() === true) {
      changePosition();
      countPosition();
    }

    if (countPosition() === false) {
      arrCoords.push({left: figureX, top: figureY});
      document.body.innerHTML += `<div
                                  class='figure draggable ${figureForm} ${figureClass}'
                                  style='left: ${figureX}px; top: ${figureY}px;
                                  height: ${sizes}; width: ${sizes};
                                  background-color: ${figureColor}'>
                                  </div>`;
    }
}

let getCoords = (elem) => {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    width: box.width
  };
}

let DragManager = new function() {

  let dragObject = {};

  let self = this;

  let onMouseDown = (e) => {

    // if (e.which != 1) return;

    let elem = e.target.closest('.draggable');
    if (!elem) return;

    dragObject.elem = elem;

    // запомним, что элемент нажат на текущих координатах pageX/pageY
    if ((e.pageX)&&(e.pageY)) {
      dragObject.downX = e.pageX;
      dragObject.downY = e.pageY;
    } else if (e.targetTouches) {
      dragObject.downX = e.targetTouches[0].pageX;
      dragObject.downY = e.targetTouches[0].pageY;
      e.preventDefault();
    }

    return false;
  };

  let startDrag = (e) => {
    let avatar = dragObject.avatar;

    // инициировать начало переноса
    document.body.appendChild(avatar);
    avatar.style.zIndex = 9999;
    avatar.style.position = 'absolute';
  };

  let createAvatar = (e) => {

    // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
    let avatar = dragObject.elem;
    let old = {
      parent: avatar.parentNode,
      nextSibling: avatar.nextSibling,
      position: avatar.position || '',
      left: avatar.left || '',
      top: avatar.top || '',
      zIndex: avatar.zIndex || ''
    };

    // функция для отмены переноса
    avatar.rollback = function() {
      old.parent.insertBefore(avatar, old.nextSibling);
      avatar.style.position = old.position;
      avatar.style.left = old.left;
      avatar.style.top = old.top;
      avatar.style.zIndex = old.zIndex
    };

    return avatar;
  }

  let onMouseMove = (e) => {
    e.preventDefault();
    if (!dragObject.elem) return; // элемент не зажат

    if (!dragObject.avatar) { // если перенос неначат...
      let moveX,
          moveY;
      if ((e.pageX)&&(e.pageY)) {
        moveX = e.pageX - dragObject.downX;
        moveY = e.pageY - dragObject.downY;
      } else if (e.targetTouches) {
        moveX = e.targetTouches[0].pageX - dragObject.downX;
        moveY = e.targetTouches[0].pageY - dragObject.downY;
        e.preventDefault();
      }

      // если мышь передвинулась в нажатом состоянии недостаточно далеко
      if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
        return;
      }

      // начинаем перенос
      dragObject.avatar = createAvatar(e); // создать аватар
      if (!dragObject.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
        dragObject = {};
        return;
      }

      // аватар создан успешно
      // создать вспомогательные свойства shiftX/shiftY
      coords = getCoords(dragObject.avatar);
      dragObject.shiftX = dragObject.downX - coords.left;
      dragObject.shiftY = dragObject.downY - coords.top;
      console.log(document.body.scrollWidth);
      startDrag(e); // отобразить начало переноса
    }

    let coords = getCoords(dragObject.avatar);
    // отобразить перенос объекта при каждом движении мыши
    if ((e.pageX)&&(e.pageY)) {
      dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
      dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';
    } else if (e.targetTouches) {
      dragObject.avatar.style.left = e.targetTouches[0].pageX - dragObject.shiftX + 'px';
      dragObject.avatar.style.top = e.targetTouches[0].pageY - dragObject.shiftY + 'px';
      e.preventDefault();
    }

    console.log(coords);
    if ((parseInt(dragObject.avatar.style.left)) > (document.body.clientWidth - coords.width))  {
      dragObject.avatar.style.left = document.body.clientWidth - coords.width + 'px';
    } else if (parseInt(dragObject.avatar.style.left) < 0) {
      dragObject.avatar.style.left = 0 + 'px';
    }

    return false;
  };

  let findDroppable = (event) => {
    // спрячем переносимый элемент
    dragObject.avatar.hidden = true;
    let elem,
        touch,
        coordX,
        coordY;
    // получить самый вложенный элемент под курсором мыши
    // if ((event.clientX)&&(event.clientY)) {
      elem = document.elementFromPoint(event.clientX, event.clientY);

    // } else if (event.targetTouches) {
    //   touch = event.targetTouches[0];
    //   coordX = touch.clientX;
    //   coordY = touch.clientY;
    //   elem = document.elementFromPoint(coordX, coordY);
    //   event.preventDefault();
    // }


    // показать переносимый элемент обратно
    dragObject.avatar.hidden = false;

    if (elem == null) {
      // такое возможно, если курсор мыши "вылетел" за границу окна
      return null;
    }
    console.log(elem);
    return elem.closest('.droppable');
  };

  let finishDrag = (e) => {
    let dropElem = findDroppable(e);

    // if (!dropElem) {
    //   self.onDragCancel(dragObject);
    // } else {
    //   self.onDragEnd(dragObject, dropElem);
    // }
  };

  let onMouseUp = (e) => {
    if (dragObject.avatar) { // если перенос идет
      finishDrag(e);
    }

    // перенос либо не начинался, либо завершился
    // в любом случае очистим "состояние переноса" dragObject
    dragObject = {};
  };



  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("touchstart", onMouseDown, true);
  document.addEventListener("touchmove", onMouseMove, true);

  document.addEventListener("mouseup", onMouseUp);
  document.addEventListener("touchend", onMouseUp, true);
  document.addEventListener("touchcancel", onMouseUp, true);
  document.addEventListener("mousedown", onMouseDown);


  this.onDragEnd = function(dragObject, dropElem) {};
  this.onDragCancel = function(dragObject) {};

};
