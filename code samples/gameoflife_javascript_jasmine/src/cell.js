function Cell(world, x, y, deadflag) {
  this.world = world;
  this.x = x;
  this.y = y;
  this.dead = deadflag;
}

Cell.prototype.neighbours = function() {
  var neighbourX, neighbourY, realX, realY;
  var found = [];
  neighbourX = this.x - 1;
  while(neighbourX <= this.x + 1) {
    realX = neighbourX;
    if(neighbourX == -1) {
      realX = this.world.heigth - 1;
    } else if(neighbourX == this.world.heigth) {
      realX = 0;
    }
    neighbourY = this.y - 1;
    while(neighbourY <= this.y + 1) {
      realY = neighbourY;
      if(neighbourY == -1) {
        realY = this.world.width - 1;
      } else if(neighbourY == this.world.width) {
        realY = 0;
      }
      if(realX != this.x || realY != this.y) {
        found.push(this.world.getCell(realX, realY));
      }
      neighbourY++;
    }
    neighbourX++;
  }
  return found;
}

Cell.prototype.liveNeighbours = function() {
  return this.neighbours().map(function(cell){
    return cell.isLive();
  });
}

Cell.prototype.die = function() {
  return this.dead = true;
}

Cell.prototype.isDead = function() {
  return this.dead;
}

Cell.prototype.live = function() {
  return this.dead = false;
}

Cell.prototype.isLive = function() {
  return !this.isDead();
}

Cell.prototype.toggle = function() {
  this.dead = !this.dead;
  return this.dead;
}
