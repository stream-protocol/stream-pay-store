"use strict";
(() => {
var exports = {};
exports.id = 722;
exports.ids = [722];
exports.modules = {

/***/ 436:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: ./pages/api/orders.json
const orders_namespaceObject = [];
;// CONCATENATED MODULE: external "fs/promises"
const promises_namespaceObject = require("fs/promises");
;// CONCATENATED MODULE: ./pages/api/orders.ts
// This API endpoint will let users POST data to add records and GET to retrieve


const orders = orders_namespaceObject;
function get(req, res) {
    const { buyer  } = req.query;
    // Check if this address has any orders
    const buyerOrders = orders.filter((order)=>order.buyer === buyer
    );
    if (buyerOrders.length === 0) {
        // 204 = successfully processed the request, not returning any content
        res.status(204).send();
    } else {
        res.status(200).json(buyerOrders);
    }
}
async function post(req, res) {
    console.log("Received add order request", req.body);
    // Add new order to orders.json
    try {
        const newOrder = req.body;
        // If this address has not purchased this item, add order to orders.json
        if (!orders.find((order)=>order.buyer === newOrder.buyer.toString() && order.itemID === newOrder.itemID
        )) {
            orders.push(newOrder);
            await (0,promises_namespaceObject.writeFile)("./pages/api/orders.json", JSON.stringify(orders, null, 2));
            res.status(200).json(orders);
        } else {
            res.status(400).send("Order already exists");
        }
    } catch (err) {
        res.status(400).send(err);
    }
}
async function handler(req, res) {
    switch(req.method){
        case "GET":
            get(req, res);
            break;
        case "POST":
            await post(req, res);
            break;
        default:
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
var __webpack_exports__ = (__webpack_exec__(436));
module.exports = __webpack_exports__;

})();