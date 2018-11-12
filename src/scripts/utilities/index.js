Element.prototype.offset = function getCoords() {
  const box = this.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset,
    width: box.width,
    height: box.height,
  };
};


export function scrollToAnimation(x, y, ms) {
  let timeout;
  // определяет велечину шага в абсолютном значении
  const stepX = Math.ceil(Math.abs((x - window.scrollX) / ms));
  const stepY = Math.ceil(Math.abs((y - window.scrollY) / ms));
  //  определяет направление движение экрана и разнуцу между текущем и следуещем положением
  const directionX = Math.ceil(x - window.scrollX);
  const directionY = Math.ceil(y - window.scrollY);

  // определяет разницу положений в абсолютном значении
  let posX = Math.abs(directionX);
  let posY = Math.abs(directionY);

  to();
  function to() {
    if (posX > 0 || posY > 0) {
      window.scrollBy(
          Math.sign(directionX) * stepX,
          Math.sign(directionY) * stepY
      );

      posX -= stepX;
      posY -= stepY;
      timeout = setTimeout(to, 20);
    } else clearTimeout(timeout);
    return false;
  }
}

