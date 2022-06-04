"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 118:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _products_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(277);

function handler(req, res) {
    if (req.method === "GET") {
        const productsNoHashes = _products_json__WEBPACK_IMPORTED_MODULE_0__.map((product)=>{
            const { hash , filename , ...rest } = product;
            return rest;
        });
        res.status(200).json(productsNoHashes);
    } else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [277], () => (__webpack_exec__(118)));
module.exports = __webpack_exports__;

})();