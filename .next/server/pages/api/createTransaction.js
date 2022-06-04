"use strict";
(() => {
var exports = {};
exports.id = 624;
exports.ids = [624];
exports.modules = {

/***/ 831:
/***/ ((module) => {

module.exports = require("@solana/web3.js");

/***/ }),

/***/ 215:
/***/ ((module) => {

module.exports = require("bignumber.js");

/***/ }),

/***/ 57:
/***/ ((module) => {

module.exports = import("@solana/spl-token");;

/***/ }),

/***/ 364:
/***/ ((module) => {

module.exports = import("@solana/wallet-adapter-base");;

/***/ }),

/***/ 17:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(831);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(57);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(215);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(364);
/* harmony import */ var _products_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(277);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_spl_token__WEBPACK_IMPORTED_MODULE_1__, _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_3__]);
([_solana_spl_token__WEBPACK_IMPORTED_MODULE_1__, _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const usdcAddress = new _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");
const sellerAddress = process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY || "Seller-Address-Not-Defined";
const sellerPublicKey = new _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.PublicKey(sellerAddress);
const createTransaction = async (req, res)=>{
    try {
        // Extract the transaction data from the request body
        const { buyer , orderID , itemID  } = req.body;
        // If we don't have something we need, stop!
        if (!buyer) {
            return res.status(400).json({
                message: "Missing buyer address"
            });
        }
        if (!orderID) {
            return res.status(400).json({
                message: "Missing order ID"
            });
        }
        // Fetch item price from products.json using itemID
        const itemPrice = _products_json__WEBPACK_IMPORTED_MODULE_4__.find((item)=>item.uuid === itemID
        )?.price;
        if (!itemPrice) {
            return res.status(404).json({
                message: "Item not found. please check item ID"
            });
        }
        // Convert our price to the correct format
        const bigAmount = new (bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(itemPrice);
        const buyerPublicKey = new _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.PublicKey(buyer);
        const network = _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_3__.WalletAdapterNetwork.Devnet;
        const endpoint = (0,_solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.clusterApiUrl)(network);
        const connection = new _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.Connection(endpoint);
        const buyerUsdcAddress = await (0,_solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.getAssociatedTokenAddress)(usdcAddress, buyerPublicKey);
        const shopUsdcAddress = await (0,_solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.getAssociatedTokenAddress)(usdcAddress, sellerPublicKey);
        // A blockhash is sort of like an ID for a block. It lets you identify each block.
        const { blockhash , lastValidBlockHeight  } = await connection.getLatestBlockhash("finalized");
        // The first two things we need - a recent block ID
        // and the public key of the fee payer
        const tx = new _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.Transaction({
            blockhash,
            feePayer: buyerPublicKey,
            lastValidBlockHeight: lastValidBlockHeight
        });
        // This is new, we're getting the mint address of the token we want to transfer
        const usdcMint = await (0,_solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.getMint)(connection, usdcAddress);
        // Here we're creating a different type of transfer instruction
        const transferInstruction = (0,_solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.createTransferCheckedInstruction)(buyerUsdcAddress, usdcAddress, shopUsdcAddress, buyerPublicKey, bigAmount.toNumber() * 10 ** (await usdcMint).decimals, usdcMint.decimals // The token could have any number of decimals
        );
        // We're adding more instructions to the transaction
        transferInstruction.keys.push({
            // We'll use our OrderId to find this transaction later
            pubkey: new _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.PublicKey(orderID),
            isSigner: false,
            isWritable: false
        });
        tx.add(transferInstruction);
        // Formatting our transaction
        const serializedTransaction = tx.serialize({
            requireAllSignatures: false
        });
        const base64 = serializedTransaction.toString("base64");
        res.status(200).json({
            transaction: base64
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "error creating tx"
        });
        return;
    }
};
function handler(req, res) {
    if (req.method === "POST") {
        createTransaction(req, res);
    } else {
        res.status(405).end();
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
var __webpack_exports__ = __webpack_require__.X(0, [277], () => (__webpack_exec__(17)));
module.exports = __webpack_exports__;

})();