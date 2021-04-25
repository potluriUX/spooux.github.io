describe("Game Of Life", function(){
  var world;

  describe("World", function(){
    beforeEach(function(){
      world1_arr = [0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      //writing all tests for world 1 only can be written for other 3 worlds as well 
      world = new World(5, 5, world1_arr);
    });

    it("world has 25 elements", function(){
      expect(world.cells.length).toBe(25);
    });

    it('cells are world1_arr at beginning', function(){
      var allDead = true;
      var outarr =[];
      world.cells.each(function(cell) {
        if(cell.dead == true){
          outarr.push(0)
        }else if(cell.dead == false){
          outarr.push(1);
        }else{
          outarr.push(0);
        }
      });
      expect(outarr).toEqual(world1_arr);
      
    });

    it('return given coordinate cell', function(){
      var cell = world.getCell(2, 1);
      
      expect(cell.x).toBe(2);
      expect(cell.y).toBe(1);
    });
  });

});



describe("Cell", function(){
  beforeEach(function(){
   world1_arr = [0,1,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0];
   world = new World(5, 5,  world1_arr);
 });

  it("returns neighbours", function(){
    var cell = world.getCell(1, 1);
    expect(cell.neighbours().length).toBe(8);
    expect(cell.neighbours()).toContain(world.getCell(0, 0));
    expect(cell.neighbours()).toContain(world.getCell(0, 1));
    expect(cell.neighbours()).toContain(world.getCell(0, 2));
    expect(cell.neighbours()).toContain(world.getCell(1, 0));
    expect(cell.neighbours()).toContain(world.getCell(1, 2));
    expect(cell.neighbours()).toContain(world.getCell(2, 0));
    expect(cell.neighbours()).toContain(world.getCell(2, 1));
    expect(cell.neighbours()).toContain(world.getCell(2, 2));

    var cell = world.getCell(0, 0);
    expect(cell.neighbours().length).toBe(8);
    expect(cell.neighbours()).toContain(world.getCell(4, 4));
    expect(cell.neighbours()).toContain(world.getCell(4, 0));
    expect(cell.neighbours()).toContain(world.getCell(4, 1));
    expect(cell.neighbours()).toContain(world.getCell(0, 4));
    expect(cell.neighbours()).toContain(world.getCell(0, 1));
    expect(cell.neighbours()).toContain(world.getCell(1, 4));
    expect(cell.neighbours()).toContain(world.getCell(1, 0));
    expect(cell.neighbours()).toContain(world.getCell(1, 1));

    var cell = world.getCell(4, 1);
    expect(cell.neighbours().length).toBe(8);
    expect(cell.neighbours()).toContain(world.getCell(3, 0));
    expect(cell.neighbours()).toContain(world.getCell(3, 1));
    expect(cell.neighbours()).toContain(world.getCell(3, 2));
    expect(cell.neighbours()).toContain(world.getCell(4, 0));
    expect(cell.neighbours()).toContain(world.getCell(4, 2));
    expect(cell.neighbours()).toContain(world.getCell(0, 0));
    expect(cell.neighbours()).toContain(world.getCell(0, 1));
    expect(cell.neighbours()).toContain(world.getCell(0, 2));

    var cell = world.getCell(1, 4);
    expect(cell.neighbours().length).toBe(8);
    expect(cell.neighbours()).toContain(world.getCell(0, 3));
    expect(cell.neighbours()).toContain(world.getCell(0, 4));
    expect(cell.neighbours()).toContain(world.getCell(0, 0));
    expect(cell.neighbours()).toContain(world.getCell(1, 3));
    expect(cell.neighbours()).toContain(world.getCell(1, 0));
    expect(cell.neighbours()).toContain(world.getCell(2, 3));
    expect(cell.neighbours()).toContain(world.getCell(2, 4));
    expect(cell.neighbours()).toContain(world.getCell(2, 0));
  });



    it("first rule cell with fewer than two live neighbours dies, under population", function(){
      var liveCell = world.getCell(0, 0);
      liveCell.live();
      world.tick();
      expect(liveCell.isDead()).toBeFalsy();

      var liveCellWithOneNeighbour = world.getCell(0, 0);
      var cellAtRight = world.getCell(0, 1);
      liveCellWithOneNeighbour.live();
      cellAtRight.live();
      world.tick();
      expect(liveCellWithOneNeighbour.isDead()).toBeTruthy();
      expect(cellAtRight.isDead()).toBeFalsy();
    });

    it('rule 2: any live cell with two or three live neighbours lives on to the next generation', function(){
      var liveCellWithTwoNeighbours = world.getCell(0, 0);
      var cellAtRight = world.getCell(0, 1);
      var cellAtBottom = world.getCell(1, 0);
      liveCellWithTwoNeighbours.live();
      cellAtRight.live();
      cellAtBottom.live();
      world.tick();
      expect(liveCellWithTwoNeighbours.isLive()).toBeTruthy();

      var liveCellWithThreeNeighbours = world.getCell(1, 1);
      var cellAtTop = world.getCell(0, 1);
      var cellAtRight = world.getCell(1, 2);
      var cellAtBottom = world.getCell(2, 1);
      liveCellWithThreeNeighbours.live();
      cellAtTop.live();
      cellAtRight.live();
      cellAtBottom.live();
      world.tick();
      expect(liveCellWithTwoNeighbours.isLive()).toBeTruthy();
    });

    it('rule #3: any live cell with more than three live neighbours dies, overcrowding', function(){
      var liveCellWithFourNeighbours = world.getCell(1, 1);
      var cellAtTop = world.getCell(0, 1);
      var cellAtLeft = world.getCell(1, 0);
      var cellAtRight = world.getCell(1, 2);
      var cellAtBottom = world.getCell(2, 1);
      liveCellWithFourNeighbours.live();
      cellAtTop.live();
      cellAtLeft.live();
      cellAtRight.live();
      cellAtBottom.live();
      world.tick();
      expect(liveCellWithFourNeighbours.isDead()).toBeTruthy();
    });

    it('respects rule #4: any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction', function(){
      var deadCellWithThreeNeighbours = world.getCell(1, 1);
      var cellAtTop = world.getCell(0, 1);
      var cellAtRight = world.getCell(1, 2);
      var cellAtBottom = world.getCell(2, 1);
      deadCellWithThreeNeighbours.live();
      cellAtTop.live();
      cellAtRight.live();
      cellAtBottom.live();
      world.tick();
      expect(deadCellWithThreeNeighbours.isLive()).toBeFalsy();

  
  });
});
