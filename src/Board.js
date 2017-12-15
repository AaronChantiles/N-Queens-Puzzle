// This file is a Backbone Model
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: Build these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var count = 0;
      var row = this.attributes[rowIndex];
      for (var element of row) {
        if (element === 1) { count++; }
        
      }
      return count > 1 ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.attributes;
      for (var row in board) {
        var count = 0;
        if (row !== 'n') {
          for (var square of board[row]) {
            if (square === 1) { count++; }
            
          }
          if (count > 1) { return true; }
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var count = 0;
      var board = this.attributes;
      for (var row in board) {
        if (board[row][colIndex] === 1) { count++; }
      }
      
      return count > 1 ? true : false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.attributes;
      if (board[0] !== undefined) {
        for (var i = 0; i < board[0].length; i++) {
          var count = 0;
          for (var row in board) {
            if (row !== 'n') {
              if (board[row][i] === 1) { count++; }  
            }
          }    
          if (count > 1) { return true; }
        }
      
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.attributes;
      var index = majorDiagonalColumnIndexAtFirstRow;
      var count = 0;
      //loop over rows
      for (var row in board) {
        if (row !== 'n') {
          if (board[row][index] === 1) { count++; }
          index++;
        }
      }
      //check count > 1 if so, return true
      return count > 1 ? true : false;
      
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.attributes;
      
      //iterate over all rows
      for (var row in board) {
        if (row !== 'n') { 
          //iterate over all elements in row
          for (var i = 0; i < board[row].length; i++) {
            //if element equals 1
            if (board[row][i] === 1) {
              //if called function returns true
              if (this.hasMajorDiagonalConflictAt(i - parseInt(row)) === true) {
                return true;
              }
            }
          }
        }
      }
      
      return false; 
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.attributes;
      var index = minorDiagonalColumnIndexAtFirstRow;
      var count = 0;
      //loop over rows
      for (var row in board) {
        if (row !== 'n') {
          if (board[row][index] === 1) { count++; }
          index--;
        }
      }
      //check count > 1 if so, return true
      return count > 1 ? true : false;

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.attributes;
      
      //iterate over all rows
      for (var row in board) {
        if (row !== 'n') { 
          //iterate over all elements in row
          for (var i = 0; i < board[row].length; i++) {
            //if element equals 1
            if (board[row][i] === 1) {
              //if called function returns true
              if (this.hasMinorDiagonalConflictAt(i + parseInt(row)) === true) {
                return true;
              }
            }
          }
        }
      }
      
      return false; 
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
