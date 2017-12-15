// N-Rooks Puzzle Functions

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  //set solution as the board (array of arrays)
  var board = new Board({n: n});
  var solution = [];
  
  //loop through all rows in solution array
  for (var row in board.attributes) {
    //loop all elements in rows in solution array
    for (var i = 0; i < board.attributes[row].length; i++) {
      //togglePiece at current position
      board.togglePiece(row, i);
      //if row has conflict OR if column has conflict
      if (board.hasRowConflictAt(row) || board.hasColConflictAt(i)) {
        //togglePiece again at current position
        board.togglePiece(row, i);
      }
    }
  }

  solution = Object.values(board.attributes);
  solution.pop();
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

//return the number of solutions that exist with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;

  var findAllSolutions = function(row) { 
    if (row === n) {
      solutionCount++;
      return;
    } 
     
    //loop all elements in rows in solution array
    for (var i = 0; i < board.attributes[row].length; i++) {
      //togglePiece at current position (change to 1)
      board.togglePiece(row, i);
      //if row has conflict OR if column has conflict
      if (!board.hasRowConflictAt(row) && !board.hasColConflictAt(i)) {
        findAllSolutions(row + 1);
      }
      //togglePiece again at current position (change to 0)
      board.togglePiece(row, i);
    }

  };

  findAllSolutions(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// N-Queens Puzzle Functions

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = [];
  if (n === 1) { solution = [[1]]; }
  if (n === 2) { solution = [[0, 0], [0, 0]]; }
  if (n === 3) { solution = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; }

  var findSolution = function(row) {
    if (row === n) {
      if (board.attributes[n - 1].includes(1) && !solution.length) {
        solution = Object.values(board.attributes);
        solution.pop();
      } 
      return;
    } 
    //loop all elements in rows in solution array
    for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
      
      //if there is conflict
      if (board.hasRowConflictAt(row) || 
          board.hasColConflictAt(i) || 
          board.hasMajorDiagonalConflictAt(i - row) || 
          board.hasMinorDiagonalConflictAt(i + row)) {
        //togglePiece again at current position
        board.togglePiece(row, i);
      } else {
        findSolution(row + 1);
        //if a valid solution was found
        if (solution.length) {
          return;
        } else {
          board.togglePiece(row, i);
        }
      }
    }
  }

  if (n > 3) { findSolution(0); }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;
  if (n === 0 || n === 1) { solutionCount = 1; }
  if (n === 2 || n === 3) { solutionCount = 0; }

  var findAllSolutions = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    } 
    //loop all elements in rows in solution array
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      //if there is conflict
      if (board.hasRowConflictAt(row) || 
          board.hasColConflictAt(i) || 
          board.hasMajorDiagonalConflictAt(i - row) || 
          board.hasMinorDiagonalConflictAt(i + row)) {
        //togglePiece again at current position
        board.togglePiece(row, i);
      } else {
        findAllSolutions(row + 1);
        board.togglePiece(row, i);
      }
    }
  }

  if (n > 3) { findAllSolutions(0); }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
