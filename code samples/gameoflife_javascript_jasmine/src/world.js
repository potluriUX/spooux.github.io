function World(width, heigth, zeroonearr) {
  this.width = width;
  this.heigth = heigth;

  var i = width * heigth;
  var x, y;

  this.cells = [];
  while(i--) {
    x = Math.floor(i / width);
    y = i - (x * width);
    if(zeroonearr[i] == 0)
    this.cells.unshift(new Cell(this, x, y, true));
  else if(zeroonearr[i] == 1)
    this.cells.unshift(new Cell(this, x, y, false));
  else
    this.cells.unshift(new Cell(this, x, y, true));
  }
}

World.prototype.getCell = function(x, y) {
  return this.cells[(x * this.width) + y];
}

World.prototype.tick = function() {
  var affected = [];
  this.cells.each(function(currentCell){
    var aliveNeighCount = currentCell.liveNeighbours().length;
    if(currentCell.isLive()){
      if (aliveNeighCount < 2) {
        affected.unshift(currentCell);
      } else if(aliveNeighCount > 3) {
        affected.unshift(currentCell);
      }
    } else {
      if(aliveNeighCount == 3) {
        affected.unshift(currentCell);
      }
    }
  });

  affected.each(function(cell){
    cell.toggle();
  })
}
