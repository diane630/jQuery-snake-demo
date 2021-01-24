/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apple.js":
/*!**********************!*\
  !*** ./src/apple.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Coord = __webpack_require__(/*! ./coord */ \"./src/coord.js\");\n\nclass Apple {\n  constructor(board) {\n    this.board = board;\n    this.replace();\n  }\n\n  replace() {\n    let x = Math.floor(Math.random() * this.board.dim);\n    let y = Math.floor(Math.random() * this.board.dim);\n\n    // Don't place an apple where there is a snake\n    while (this.board.snake.isOccupying([x, y])) {\n      x = Math.floor(Math.random() * this.board.dim);\n      y = Math.floor(Math.random() * this.board.dim);\n    }\n\n    this.position = new Coord(x, y);\n  }\n\n}\n\nmodule.exports = Apple;\n\n\n//# sourceURL=webpack:///./src/apple.js?");

/***/ }),

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Snake = __webpack_require__(/*! ./snake */ \"./src/snake.js\");\nconst Apple = __webpack_require__(/*! ./apple */ \"./src/apple.js\");\n\nclass Board {\n  constructor(dim) {\n    this.dim = dim;\n\n    this.snake = new Snake(this);\n    this.apple = new Apple(this);\n  }\n\n  static blankGrid(dim) {\n    const grid = [];\n\n    for (let i = 0; i < dim; i++) {\n      const row = [];\n      for (let j = 0; j < dim; j++) {\n        row.push(Board.BLANK_SYMBOL);\n      }\n      grid.push(row);\n    }\n\n    return grid;\n  }\n\n  render() {\n    // const 值是可变的， const表示不可以被重新定义 \n    const grid = Board.blankGrid(this.dim);\n\n    this.snake.segments.forEach( segment => {\n      grid[segment.i][segment.j] = Snake.SYMBOL;\n    });\n\n    grid[this.apple.position.i][this.apple.position.j] = Apple.SYMBOL;\n\n    // join it up\n    const rowStrs = [];\n    grid.map( row => row.join(\"\") ).join(\"\\n\");\n  }\n\n  validPosition(coord) {\n    return (coord.i >= 0) && (coord.i < this.dim) &&\n      (coord.j >= 0) && (coord.j < this.dim);\n  }\n}\n\nBoard.BLANK_SYMBOL = \".\";\n\nmodule.exports = Board;\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/coord.js":
/*!**********************!*\
  !*** ./src/coord.js ***!
  \**********************/
/***/ ((module) => {

eval("class Coord {\n  constructor(i, j) {\n    this.i = i;\n    this.j = j;\n  }\n\n  equals(coord2) {\n      return (this.i == coord2.i) && (this.j == coord2.j);\n  }\n\n  isOpposite(coord2) {\n    return (this.i == (-1 * coord2.i)) && (this.j == (-1 * coord2.j));\n  }\n\n  plus(coord2) {\n    return new Coord(this.i + coord2.i, this.j + coord2.j);\n  }\n}\n\nmodule.exports = Coord;\n\n\n//# sourceURL=webpack:///./src/coord.js?");

/***/ }),

/***/ "./src/snake-view.js":
/*!***************************!*\
  !*** ./src/snake-view.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board.js */ \"./src/board.js\");\n\nclass View {\n  constructor($el) {\n    this.$el = $el;\n\n    this.board = new Board(20);\n    this.setupGrid();\n\n    this.intervalId = window.setInterval(\n      this.step.bind(this),\n      View.STEP_MILLIS\n    );\n\n    $(window).on(\"keydown\", this.handleKeyEvent.bind(this));\n  }\n\n  handleKeyEvent(event) {\n    if (View.KEYS[event.keyCode]) {\n      this.board.snake.turn(View.KEYS[event.keyCode]);\n    }\n  }\n\n  render() {\n    // simple text based rendering\n    // this.$el.html(this.board.render());\n\n    this.updateClasses(this.board.snake.segments, \"snake\");\n    this.updateClasses([this.board.apple.position], \"apple\");\n  }\n\n  updateClasses(coords, className) {\n    this.$li.filter(`.${className}`).removeClass();\n\n    coords.forEach( coord => {\n      const flatCoord = (coord.i * this.board.dim) + coord.j;\n      this.$li.eq(flatCoord).addClass(className);\n    });\n  }\n\n  setupGrid() {\n    let html = \"\";\n\n    for (let i = 0; i < this.board.dim; i++) {\n      html += \"<ul>\";\n      for (let j = 0; j < this.board.dim; j++) {\n        html += \"<li></li>\";\n      }\n      html += \"</ul>\";\n    }\n\n    this.$el.html(html);\n    this.$li = this.$el.find(\"li\");\n  }\n\n  step() {\n    if (this.board.snake.segments.length > 0) {\n      this.board.snake.move();\n      this.render();\n    } else {\n      alert(\"You lose!\");\n      window.clearInterval(this.intervalId);\n    }\n  }\n\n}\n\nView.KEYS = {\n  38: \"N\",\n  39: \"E\",\n  40: \"S\",\n  37: \"W\"\n};\n\nView.STEP_MILLIS = 100;\n\nmodule.exports = View;\n\n\n//# sourceURL=webpack:///./src/snake-view.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Coord = __webpack_require__(/*! ./coord */ \"./src/coord.js\");\n\nclass Snake {\n  constructor(board) {\n    this.dir = \"N\";\n    this.turning = false;\n    this.board = board;\n\n    const center = new Coord(Math.floor(board.dim/2), Math.floor(board.dim/2));\n    this.segments = [center];\n\n    this.growTurns = 0;\n  }\n\n  eatApple() {\n    if (this.head().equals(this.board.apple.position)) {\n      this.growTurns += 3;\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  isOccupying(array) {\n    let result = false;\n    this.segments.forEach( segment => {\n      if (segment.i === array[0] && segment.j === array[1]) {\n        result = true;\n        return result;\n      }\n    });\n    return result;\n  }\n\n  // slice() 方法返回一个新的数组对象，这一对象是一个由 \n  // begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。\n  // 如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，\n  // slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。\n  head() {\n    return this.segments.slice(-1)[0];\n  }\n\n  isValid() {\n    const head = this.head();\n\n    if (!this.board.validPosition(this.head())) {\n      return false;\n    }\n\n    for (let i = 0; i < this.segments.length - 1; i++) {\n      if (this.segments[i].equals(head)) {\n        return false;\n      }\n    }\n\n    return true;\n  }\n\n  move() {\n    // move snake forward\n    // push = append right\n    // this.head return last coord everytime\n    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));\n\n    // allow turning again\n    this.turning = false;\n\n    // maybe eat an apple\n    if (this.eatApple()) {\n      this.board.apple.replace();\n    }\n\n    // if not growing, remove tail segment (pop left)\n    // 变长3格\n    if (this.growTurns > 0) {\n      this.growTurns -= 1;\n    } else {\n      this.segments.shift();\n    }\n\n    // destroy snake if it eats itself or runs off grid\n    if (!this.isValid()) {\n      this.segments = [];\n    }\n  }\n\n  turn(dir) {\n    // avoid turning directly back on yourself\n    if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir]) ||\n      this.turning) {\n      return;\n    } else {\n      this.turning = true;\n      this.dir = dir;\n    }\n  }\n}\n\nSnake.DIFFS = {\n  \"N\": new Coord(-1, 0),\n  \"E\": new Coord(0, 1),\n  \"S\": new Coord(1, 0),\n  \"W\": new Coord(0, -1)\n};\n\nSnake.SYMBOL = \"S\";\nSnake.GROW_TURNS = 3;\n\nmodule.exports = Snake;\n\n\n//# sourceURL=webpack:///./src/snake.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
eval("const SnakeView = __webpack_require__(/*! ./snake-view */ \"./src/snake-view.js\");\n\n$(function () {\n  const rootEl = $('.snake-game');\n  new SnakeView(rootEl);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");
})();

/******/ })()
;