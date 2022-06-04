"use strict";
(() => {
var exports = {};
exports.id = 603;
exports.ids = [603];
exports.modules = {

/***/ 555:
/***/ ((module) => {

module.exports = import("uuid");;

/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 447:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _products_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(277);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(555);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([uuid__WEBPACK_IMPORTED_MODULE_2__]);
uuid__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



function handler(req, res) {
    if (req.method === "POST") {
        try {
            console.log("body is ", req.body);
            const { name , price , image_url , type , description , filename , hash  } = req.body;
            // Create new product ID based on last product ID
            _products_json__WEBPACK_IMPORTED_MODULE_1__.push({
                uuid: (0,uuid__WEBPACK_IMPORTED_MODULE_2__.v4)(),
                name,
                price,
                image_url,
                type,
                description,
                filename,
                hash
            });
            fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync("./pages/api/products.json", JSON.stringify(_products_json__WEBPACK_IMPORTED_MODULE_1__, null, 2));
            res.status(200).send({
                status: "ok"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "error adding product"
            });
            return;
        }
    } else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [277], () => (__webpack_exec__(447)));
module.exports = __webpack_exports__;

})();