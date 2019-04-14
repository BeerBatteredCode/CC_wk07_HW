/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Crypto = __webpack_require__(/*! ./models/crypto.js */ \"./src/models/crypto.js\");\nconst ListAllCrypto = __webpack_require__(/*! ./views/list_all_crypto.js */ \"./src/views/list_all_crypto.js\");\nconst SelectedInfoView = __webpack_require__(/*! ./views/selected_info_view.js */ \"./src/views/selected_info_view.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n\n  const crypto = new Crypto;\n  crypto.bindEvents();\n\n  const listElement = document.querySelector('#list-view');\n  const listAllCrypto = new ListAllCrypto(listElement);\n  listAllCrypto.bindEvents();\n\n  const selectElement = document.querySelector('#select-view');\n  const selectedInfoView = new SelectedInfoView(selectElement);\n  selectedInfoView.bindEvents();\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/pub_sub.js":
/*!********************************!*\
  !*** ./src/helpers/pub_sub.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function (channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n  },\n\n  subscribe: function (channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n};\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./src/helpers/pub_sub.js?");

/***/ }),

/***/ "./src/helpers/request_helper.js":
/*!***************************************!*\
  !*** ./src/helpers/request_helper.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const RequestHelper = function (url) {\n  this.url = url\n};\n\nRequestHelper.prototype.get = function () {\n  return fetch(this.url)\n    .then(response => response.json());\n};\n\nmodule.exports = RequestHelper;\n\n\n//# sourceURL=webpack:///./src/helpers/request_helper.js?");

/***/ }),

/***/ "./src/models/crypto.js":
/*!******************************!*\
  !*** ./src/models/crypto.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const RequestHelper = __webpack_require__(/*! ../helpers/request_helper.js */ \"./src/helpers/request_helper.js\");\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst Crypto = function(){\n  this.data = null;\n};\n\nCrypto.prototype.bindEvents = function(){\n\n  this.getData();\n\n  PubSub.subscribe('crypto:selected-info', (evt) => {\n    const cryptoIndex = parseInt(evt.detail, 10);\n    const crypto = this.data[cryptoIndex];\n    PubSub.publish('crypto:display-info', crypto);\n  });\n};\n\nCrypto.prototype.getData = function(){\n  const url = 'https://api.coinranking.com/v1/public/coins';\n  const request = new RequestHelper(url);\n  request.get()\n    .then((crypto) => {\n      this.data = data.map( (crypto, index) => {\n        crypto.id = index;\n        return crypto;\n        console.log(crypto)\n      });\n    PubSub.publish('crypto:all-info', this.data);\n  })\n  .catch( (err) => {\n    PubSub.publish('crypto-api-error', err);\n  });\n};\n\nmodule.exports = Crypto;\n\n\n//# sourceURL=webpack:///./src/models/crypto.js?");

/***/ }),

/***/ "./src/views/list_all_crypto.js":
/*!**************************************!*\
  !*** ./src/views/list_all_crypto.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst ListAllCrypto = function(element){\n  this.element = element;\n};\n\nListAllCrypto.prototype.bindEvents = function(){\n  PubSub.subscribe('crypto:all-info', (evt) => {\n    const cryptoInfo = evt.detail;\n    this.render(cryptoInfo);\n  });\n  this.element.addEventListener('change', (evt) => {\n    const cryptoIndex = evt.target.value;\n    console.log(evt);\n    PubSub.publish('crypto:selected-info', cryptoIndex);\n  });\n};\n\nListAllCrypto.prototype.render = function(cryptoInfo){\n  this.element.innerHTML = '';\n  cryptoInfo.forEach( (crypto) => {\n    const li = document.createElement('li');\n    li.textContent = crypto.name;\n    li.value = crypto.id;\n    this.element.appendChild(li);\n  });\n};\n\nmodule.exports = ListAllCrypto;\n\n\n//# sourceURL=webpack:///./src/views/list_all_crypto.js?");

/***/ }),

/***/ "./src/views/selected_info_view.js":
/*!*****************************************!*\
  !*** ./src/views/selected_info_view.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst SelectedInfoView = function(element){\n  this.element = element;\n};\n\nSelectedInfoView.prototype.bindEvents = function(){\n  PubSub.subscribe('crypto:display-info', (evt) => {\n    this.render(evt.detail);\n  });\n};\n\nSelectedInfoView.prototype.render = function(crypto){\n  this.element.innerHTML = '';\n\n  const cryptoContent = document.createElement('div')\n\n  cryptoContent.innerHTML = `\n    <ul>\n      <li>${crypto.name}</li>\n      <li>${crypto.price}</li>\n      <li>${crypto.change}</li>\n    </ul>\n  `;\n\n  this.element.appendChild(cryptoContent);\n};\n\nmodule.exports = SelectedInfoView;\n\n\n//# sourceURL=webpack:///./src/views/selected_info_view.js?");

/***/ })

/******/ });