(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_validators_validators_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/validators/validators.component */ "./src/app/components/validators/validators.component.ts");
/* harmony import */ var _components_last_block_last_block_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/last-block/last-block.component */ "./src/app/components/last-block/last-block.component.ts");
/* harmony import */ var _components_block_block_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/block/block.component */ "./src/app/components/block/block.component.ts");
/* harmony import */ var _components_blocks_blocks_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/blocks/blocks.component */ "./src/app/components/blocks/blocks.component.ts");
/* harmony import */ var _components_tx_tx_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/tx/tx.component */ "./src/app/components/tx/tx.component.ts");
/* harmony import */ var _components_txs_txs_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/txs/txs.component */ "./src/app/components/txs/txs.component.ts");
/* harmony import */ var _components_validator_validator_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/validator/validator.component */ "./src/app/components/validator/validator.component.ts");
/* harmony import */ var _components_new_tx_new_tx_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/new-tx/new-tx.component */ "./src/app/components/new-tx/new-tx.component.ts");









// import { DashboardComponent } from './components/dashboard/dashboard.component';


var routes = [
    { path: '', redirectTo: '/validators', pathMatch: 'full' },
    { path: 'validators', component: _components_validators_validators_component__WEBPACK_IMPORTED_MODULE_3__["ValidatorsComponent"] },
    // { path: 'dashboard', component: DashboardComponent },
    { path: 'block/:height', component: _components_block_block_component__WEBPACK_IMPORTED_MODULE_5__["BlockComponent"] },
    { path: 'last-block', component: _components_last_block_last_block_component__WEBPACK_IMPORTED_MODULE_4__["LastBlockComponent"] },
    { path: 'blocks', component: _components_blocks_blocks_component__WEBPACK_IMPORTED_MODULE_6__["BlocksComponent"] },
    { path: 'tx/:hash', component: _components_tx_tx_component__WEBPACK_IMPORTED_MODULE_7__["TxComponent"] },
    { path: 'txs', component: _components_txs_txs_component__WEBPACK_IMPORTED_MODULE_8__["TxsComponent"] },
    { path: 'validator/:address', component: _components_validator_validator_component__WEBPACK_IMPORTED_MODULE_9__["ValidatorComponent"] },
    { path: 'new/tx/:delegator', component: _components_new_tx_new_tx_component__WEBPACK_IMPORTED_MODULE_10__["NewTxComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.actions.ts":
/*!********************************!*\
  !*** ./src/app/app.actions.ts ***!
  \********************************/
/*! exports provided: UPDATE_BLOCKS, UPDATE_TXS, UPDATE_VALIDATORS, UPDATE_ROUND, UPDATE_ROUND_STEP, UPDATE_VALS_MAP, UpdateBlocks, UpdateValidators, UpdateTxs, UpdateRound, UpdateRoundStep, UpdateValsMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_BLOCKS", function() { return UPDATE_BLOCKS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_TXS", function() { return UPDATE_TXS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_VALIDATORS", function() { return UPDATE_VALIDATORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_ROUND", function() { return UPDATE_ROUND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_ROUND_STEP", function() { return UPDATE_ROUND_STEP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_VALS_MAP", function() { return UPDATE_VALS_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateBlocks", function() { return UpdateBlocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateValidators", function() { return UpdateValidators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateTxs", function() { return UpdateTxs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateRound", function() { return UpdateRound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateRoundStep", function() { return UpdateRoundStep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateValsMap", function() { return UpdateValsMap; });
var UPDATE_BLOCKS = 'UPDATE_BLOCKS';
var UPDATE_TXS = 'UPDATE_TXS';
var UPDATE_VALIDATORS = 'UPDATE_VALIDATORS';
var UPDATE_ROUND = 'UPDATE_ROUND';
var UPDATE_ROUND_STEP = 'UPDATE_ROUND_STEP';
var UPDATE_VALS_MAP = 'UPDATE_VALS_MAP';
var UpdateBlocks = /** @class */ (function () {
    function UpdateBlocks(payload) {
        this.payload = payload;
        this.type = UPDATE_BLOCKS;
    }
    ;
    return UpdateBlocks;
}());

var UpdateValidators = /** @class */ (function () {
    function UpdateValidators(payload) {
        this.payload = payload;
        this.type = UPDATE_VALIDATORS;
    }
    ;
    return UpdateValidators;
}());

var UpdateTxs = /** @class */ (function () {
    function UpdateTxs(payload) {
        this.payload = payload;
        this.type = UPDATE_TXS;
    }
    ;
    return UpdateTxs;
}());

var UpdateRound = /** @class */ (function () {
    function UpdateRound(payload) {
        this.payload = payload;
        this.type = UPDATE_ROUND;
    }
    ;
    return UpdateRound;
}());

var UpdateRoundStep = /** @class */ (function () {
    function UpdateRoundStep(payload) {
        this.payload = payload;
        this.type = UPDATE_ROUND_STEP;
    }
    ;
    return UpdateRoundStep;
}());

var UpdateValsMap = /** @class */ (function () {
    function UpdateValsMap(payload) {
        this.payload = payload;
        this.type = UPDATE_VALS_MAP;
    }
    ;
    return UpdateValsMap;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*-------------------------------------------------*/\n/* Color HEX Codes */\n/*-------------------------------------------------*/\n/* orange-text: #FC7D14*/\n/* green-hero: #00796B */\n/* green-text: #00A58F */\n/* table-background-1: #111923 */\n/* table-background-2: #0D151F */\n/*-------------------------------------------------*/\n/* Basic Setup */\n/*-------------------------------------------------*/\nhtml, body {\n  font-size: 20px;\n  line-height: 1.5;\n  height: 100%;\n  background: #111923;\n  color: white;\n  font-family: 'Lato', 'Arial', sans-serif;\n  font-weight: 300;\n  text-rendering: optimizeLegibility;\n}\n.clearfix {zoom: 1;}\n.clearfix:after {\n    content: '.';\n    clear: both;\n    display: block;\n    height: 0;\n    visibility: hidden;\n}\n/*-------------------------------------------------*/\n/* Reusable Components */\n/*-------------------------------------------------*/\nnav {\n  height: 10vh;\n  background: #111923;\n}\nsection {\n  padding: 20px 0;\n  margin-bottom: 50px;\n}\n.row {\n  max-width: 90%; /*1140px or in %*/\n  margin: 0 auto;\n}\n.box {\n  padding: 1%;\n  /* box-shadow: 2px 2px 3px; */\n}\n.box-key {\n  text-align: left;\n  margin-left: 5px;\n}\n.box-value {\n  text-align: right;\n  margin-right: 5px;\n}\n.hero {\n  background: rgba(0, 121, 107, 0.8); /*#2461acb0*/\n}\n/*-------------------------------------------------*/\n/* Heading */\n/*-------------------------------------------------*/\nh1,\nh2,\nh3 {\n    font-weight: 300;\n    /* text-transform: uppercase; */\n}\nh1 {\n  margin-top: 0;\n  margin-bottom: 20px;\n  color: #ffffff;\n  font-size: 200%;\n  /* word-spacing: 3px;\n  letter-spacing: 1px; */\n}\nh2 {\n  font-size: 130%;\n  word-spacing: 2px;\n  text-align: left;\n  margin-bottom: 30px;\n  letter-spacing: 1px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\nh3 {\n  font-size: 120%;\n  /* margin-bottom: 15px; */\n  text-align: center;\n}\n/*-------------------------------------------------*/\n/* Paragraphs */\n/*-------------------------------------------------*/\np {\n  font-size: 100%;\n  text-align: center;\n  line-height: 145%;\n  width: 70%;\n  margin-left: 15%;\n}\n/*-------------------------------------------------*/\n/* Links */\n/*-------------------------------------------------*/\na:link,\na:visited {\n    color: white;\n    text-decoration: none;\n    /* padding-bottom: 10px; */\n    /* border-bottom: 1px solid #e67e22; */\n    transition: color 0.2s;\n}\na:hover,\na:active {\n    color: #FC7D14;\n    /* border-bottom: 1px solid transparent; */\n}\n/*-------------------------------------------------*/\n/* Header */\n/*-------------------------------------------------*/\nheader {\n  height: 15vh;\n  background-size: cover;\n  background-position: center;\n  background-attachment: fixed;\n}\n.logo {\n  height: 100px;\n  width: auto;\n  float: left;\n  margin-top: 20px;\n}\n.main-nav {\n  float: right;\n  list-style: none;\n  margin-top: 55px;\n  display: flex;\n  list-style: none;\n  height: 100%;\n  align-items: center;\n  margin-left: auto;\n  justify-content: space-around;\n}\n.main-nav li {\n  display: inline-block;\n  margin-left: 40px;\n}\n.landing {\n  /* height: 90vh; */\n  /* display: flex; */\n  justify-content: center;\n  align-items: center;\n\n}\n/*-------------------------------------------------*/\n/* Specific */\n/*-------------------------------------------------*/\n/* .header-row,\n.proposer-row,\n.chain-queries-row {\n  max-width: 1140px;\n  margin: 0 20px;\n\n}  */\n.main-container {\n  min-height: 76vh;\n}\n.card {\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);\n  margin-bottom: 2rem;\n}\n.card-header-title {\n  color:#8F99A3;\n  font-weight: 400;\n}\n.box {\n  background: #00796B;\n}\narticle {\n  background: #111923;\n}\n.title {\n  font-weight: 500;\n  color: rgb(255, 255, 255);\n}\n.subtitle {\n  font-weight: 400;\n  color:#111923;\n}\n.header-title,\n.header-subtitle {\n  text-align: left;\n}\n.header-subtitle {\n color: #FC7D14\n}\n.card .content {\n  font-size: 14px;\n}\n.card-footer-item {\n  font-size: 14px;\n  font-weight: 700;\n  color: #8F99A3;\n}\n.card-table .table {\n  margin-bottom: 0;\n}\n.events-card .card-table {\n  /*max-height: 500px;*/\n  overflow-y: scroll;\n}\n.navbar{\n  background: #0D151F;\n}\n/*-------------------------------------------------*/\n/* Footer */\n/*-------------------------------------------------*/\nfooter {\n  background-color: #0D151F;\n  color: white;\n  padding: 30px;\n}\n.footer-nav {\n  list-style: none;\n  float: left;\n  /* margin-top: 20px; */\n}\n.social-links {\n  list-style: none;\n  float: right;\n}\n.footer-nav li,\n.social-links li {\n    display: inline-block;\n    margin-right: 20px;\n}\n.footer-nav li:last-child,\n.social-links li:last-child {\n    margin-right: 0;\n}\n.footer-nav li:last-child,\n.social-links li:last-child {\n    margin-right: 0;\n}\nfooter p a:link,\nfooter p a:visited,\n.footer-nav li a:link,\n.footer-nav li a:visited,\n.social-links li a:link, \n.social-links li a:visited {\n    text-decoration: none;\n    border: 0;\n    color: #888888;\n    transition: color 0.2s;\n}\nfooter p a:hover,\nfooter p a:active,\n.footer-nav li a:hover,\n.footer-nav li a:active {\n    color: #FC7D14;\n}\n.social-links li a:link,\n.social-links li a:visited {\n    font-size: 150%;\n}\n.ion-social-facebook,\n.ion-social-twitter,\n.ion-social-googleplus,\n.ion-social-instagram {\n    transition: color 0.2s;\n}\n.ion-social-github:hover {\n    color: #a6b1b7;\n}\n.ion-social-twitter:hover {\n    color: #00aced;\n}\n.ion-paper-airplane:hover {\n    color: #0088cc;\n}\n.ion-social-linkedin:hover {\n    color: #007bb5;\n}\nfooter p {\n  color: #888888;\n  text-align: center;\n  margin-top: 20px;\n}\n/*-------------------------------------------------*/\n/* Responsive Nav */\n/*-------------------------------------------------*/\n@media screen and (max-width: 768px) {\n  .row {\n    max-width: 100%;\n  }\n\n  .line {\n    width: 30px;\n    height: 3px;\n    background: white;\n    margin: 5px;\n  }\n  \n  nav {\n    position: relative;\n  }\n\n  .hamburger {\n    margin-top: 40px;\n    position: absolute;\n    cursor: pointer;\n    right: 5%;\n    top: 50%;\n    -webkit-transform: translate(-5%, -50%);\n            transform: translate(-5%, -50%);\n    z-index: 2;\n  }\n\n  .main-nav {\n    position: fixed;\n    background: #111923;\n    height: 100vh;\n    width: 100%;\n    flex-direction: column;\n    clip-path: circle(100px at 90% -13%);\n    -webkit-clip-path: circle(100px at 90% -13%);\n    transition: all 0.6s ease-out;\n    pointer-events: none;\n    margin-top: 0;\n  }\n  .main-nav.open {\n    clip-path: circle(1050px at 90% -13%);\n    -webkit-clip-path: circle(1050px at 90% -13%);\n    pointer-events: all;\n  }\n  .landing {\n    flex-direction: column;\n  }\n  .main-nav li {\n    opacity: 1;\n  }\n  .main-nav li a {\n    font-size: 25px;\n  }\n  .main-nav li:nth-child(1) {\n    transition: all 0.5s ease 0.2s;\n  }\n  .main-nav li:nth-child(2) {\n    transition: all 0.5s ease 0.4s;\n  }\n  .main-nav li:nth-child(3) {\n    transition: all 0.5s ease 0.6s;\n  }\n  li.fade {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0RBQW9EO0FBQ3BELG9CQUFvQjtBQUNwQixvREFBb0Q7QUFDcEQsd0JBQXdCO0FBQ3hCLHdCQUF3QjtBQUN4Qix3QkFBd0I7QUFDeEIsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUVoQyxvREFBb0Q7QUFDcEQsZ0JBQWdCO0FBQ2hCLG9EQUFvRDtBQUNwRDtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osd0NBQXdDO0VBQ3hDLGdCQUFnQjtFQUNoQixrQ0FBa0M7QUFDcEM7QUFFQSxXQUFXLE9BQU8sQ0FBQztBQUNuQjtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsY0FBYztJQUNkLFNBQVM7SUFDVCxrQkFBa0I7QUFDdEI7QUFFQSxvREFBb0Q7QUFDcEQsd0JBQXdCO0FBQ3hCLG9EQUFvRDtBQUNwRDtFQUNFLFlBQVk7RUFDWixtQkFBbUI7QUFDckI7QUFFQTtFQUNFLGVBQWU7RUFDZixtQkFBbUI7QUFDckI7QUFFQTtFQUNFLGNBQWMsRUFBRSxpQkFBaUI7RUFDakMsY0FBYztBQUNoQjtBQUVBO0VBQ0UsV0FBVztFQUNYLDZCQUE2QjtBQUMvQjtBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGlCQUFpQjtBQUNuQjtBQUVBO0VBQ0Usa0NBQWtDLEVBQUUsWUFBWTtBQUNsRDtBQUNBLG9EQUFvRDtBQUNwRCxZQUFZO0FBQ1osb0RBQW9EO0FBQ3BEOzs7SUFHSSxnQkFBZ0I7SUFDaEIsK0JBQStCO0FBQ25DO0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGNBQWM7RUFDZCxlQUFlO0VBQ2Y7d0JBQ3NCO0FBQ3hCO0FBRUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCO0FBRUE7RUFDRSxlQUFlO0VBQ2YseUJBQXlCO0VBQ3pCLGtCQUFrQjtBQUNwQjtBQUVBLG9EQUFvRDtBQUNwRCxlQUFlO0FBQ2Ysb0RBQW9EO0FBQ3BEO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsVUFBVTtFQUNWLGdCQUFnQjtBQUNsQjtBQUVBLG9EQUFvRDtBQUNwRCxVQUFVO0FBQ1Ysb0RBQW9EO0FBQ3BEOztJQUVJLFlBQVk7SUFDWixxQkFBcUI7SUFDckIsMEJBQTBCO0lBQzFCLHNDQUFzQztJQUN0QyxzQkFBc0I7QUFDMUI7QUFFQTs7SUFFSSxjQUFjO0lBQ2QsMENBQTBDO0FBQzlDO0FBRUEsb0RBQW9EO0FBQ3BELFdBQVc7QUFDWCxvREFBb0Q7QUFDcEQ7RUFDRSxZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLDJCQUEyQjtFQUMzQiw0QkFBNEI7QUFDOUI7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0VBQ1gsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQiw2QkFBNkI7QUFDL0I7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjs7QUFFckI7QUFDQSxvREFBb0Q7QUFDcEQsYUFBYTtBQUNiLG9EQUFvRDtBQUNwRDs7Ozs7O0lBTUk7QUFFSjtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0UsMkNBQTJDO0VBQzNDLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCO0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQix5QkFBeUI7QUFDM0I7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0FBQ2Y7QUFHQTs7RUFFRSxnQkFBZ0I7QUFDbEI7QUFFQTtDQUNDO0FBQ0Q7QUFFQTtFQUNFLGVBQWU7QUFDakI7QUFFQTtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsY0FBYztBQUNoQjtBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0FBQ3BCO0FBRUM7RUFDQyxtQkFBbUI7QUFDckI7QUFFQSxvREFBb0Q7QUFDcEQsV0FBVztBQUNYLG9EQUFvRDtBQUNwRDtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osYUFBYTtBQUNmO0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLHNCQUFzQjtBQUN4QjtBQUdBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFlBQVk7QUFDZDtBQUVBOztJQUVJLHFCQUFxQjtJQUNyQixrQkFBa0I7QUFDdEI7QUFFQTs7SUFFSSxlQUFlO0FBQ25CO0FBRUE7O0lBRUksZUFBZTtBQUNuQjtBQUVBOzs7Ozs7SUFNSSxxQkFBcUI7SUFDckIsU0FBUztJQUNULGNBQWM7SUFDZCxzQkFBc0I7QUFDMUI7QUFFQTs7OztJQUlJLGNBQWM7QUFDbEI7QUFFQTs7SUFFSSxlQUFlO0FBQ25CO0FBRUE7Ozs7SUFJSSxzQkFBc0I7QUFDMUI7QUFFQTtJQUNJLGNBQWM7QUFDbEI7QUFFQTtJQUNJLGNBQWM7QUFDbEI7QUFFQTtJQUNJLGNBQWM7QUFDbEI7QUFFQTtJQUNJLGNBQWM7QUFDbEI7QUFFQTtFQUNFLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCO0FBRUEsb0RBQW9EO0FBQ3BELG1CQUFtQjtBQUNuQixvREFBb0Q7QUFDcEQ7RUFDRTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsV0FBVztJQUNYLGlCQUFpQjtJQUNqQixXQUFXO0VBQ2I7O0VBRUE7SUFDRSxrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixTQUFTO0lBQ1QsUUFBUTtJQUNSLHVDQUErQjtZQUEvQiwrQkFBK0I7SUFDL0IsVUFBVTtFQUNaOztFQUVBO0lBQ0UsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2IsV0FBVztJQUNYLHNCQUFzQjtJQUN0QixvQ0FBb0M7SUFDcEMsNENBQTRDO0lBQzVDLDZCQUE2QjtJQUM3QixvQkFBb0I7SUFDcEIsYUFBYTtFQUNmO0VBQ0E7SUFDRSxxQ0FBcUM7SUFDckMsNkNBQTZDO0lBQzdDLG1CQUFtQjtFQUNyQjtFQUNBO0lBQ0Usc0JBQXNCO0VBQ3hCO0VBQ0E7SUFDRSxVQUFVO0VBQ1o7RUFDQTtJQUNFLGVBQWU7RUFDakI7RUFDQTtJQUNFLDhCQUE4QjtFQUNoQztFQUNBO0lBQ0UsOEJBQThCO0VBQ2hDO0VBQ0E7SUFDRSw4QkFBOEI7RUFDaEM7RUFDQTtJQUNFLFVBQVU7RUFDWjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogQ29sb3IgSEVYIENvZGVzICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogb3JhbmdlLXRleHQ6ICNGQzdEMTQqL1xuLyogZ3JlZW4taGVybzogIzAwNzk2QiAqL1xuLyogZ3JlZW4tdGV4dDogIzAwQTU4RiAqL1xuLyogdGFibGUtYmFja2dyb3VuZC0xOiAjMTExOTIzICovXG4vKiB0YWJsZS1iYWNrZ3JvdW5kLTI6ICMwRDE1MUYgKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEJhc2ljIFNldHVwICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaHRtbCwgYm9keSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kOiAjMTExOTIzO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtZmFtaWx5OiAnTGF0bycsICdBcmlhbCcsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XG59XG5cbi5jbGVhcmZpeCB7em9vbTogMTt9XG4uY2xlYXJmaXg6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcuJztcbiAgICBjbGVhcjogYm90aDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBoZWlnaHQ6IDA7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogUmV1c2FibGUgQ29tcG9uZW50cyAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbm5hdiB7XG4gIGhlaWdodDogMTB2aDtcbiAgYmFja2dyb3VuZDogIzExMTkyMztcbn1cblxuc2VjdGlvbiB7XG4gIHBhZGRpbmc6IDIwcHggMDtcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcbn1cblxuLnJvdyB7XG4gIG1heC13aWR0aDogOTAlOyAvKjExNDBweCBvciBpbiAlKi9cbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5ib3gge1xuICBwYWRkaW5nOiAxJTtcbiAgLyogYm94LXNoYWRvdzogMnB4IDJweCAzcHg7ICovXG59XG5cbi5ib3gta2V5IHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuLmJveC12YWx1ZSB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxuLmhlcm8ge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDEyMSwgMTA3LCAwLjgpOyAvKiMyNDYxYWNiMCovXG59XG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogSGVhZGluZyAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmgxLFxuaDIsXG5oMyB7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAvKiB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyAqL1xufVxuXG5oMSB7XG4gIG1hcmdpbi10b3A6IDA7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBmb250LXNpemU6IDIwMCU7XG4gIC8qIHdvcmQtc3BhY2luZzogM3B4O1xuICBsZXR0ZXItc3BhY2luZzogMXB4OyAqL1xufVxuXG5oMiB7XG4gIGZvbnQtc2l6ZTogMTMwJTtcbiAgd29yZC1zcGFjaW5nOiAycHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG5oMyB7XG4gIGZvbnQtc2l6ZTogMTIwJTtcbiAgLyogbWFyZ2luLWJvdHRvbTogMTVweDsgKi9cbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogUGFyYWdyYXBocyAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbnAge1xuICBmb250LXNpemU6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbGluZS1oZWlnaHQ6IDE0NSU7XG4gIHdpZHRoOiA3MCU7XG4gIG1hcmdpbi1sZWZ0OiAxNSU7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBMaW5rcyAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmE6bGluayxcbmE6dmlzaXRlZCB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAvKiBwYWRkaW5nLWJvdHRvbTogMTBweDsgKi9cbiAgICAvKiBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2U2N2UyMjsgKi9cbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjJzO1xufVxuXG5hOmhvdmVyLFxuYTphY3RpdmUge1xuICAgIGNvbG9yOiAjRkM3RDE0O1xuICAgIC8qIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB0cmFuc3BhcmVudDsgKi9cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEhlYWRlciAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmhlYWRlciB7XG4gIGhlaWdodDogMTV2aDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xufVxuXG4ubG9nbyB7XG4gIGhlaWdodDogMTAwcHg7XG4gIHdpZHRoOiBhdXRvO1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luLXRvcDogMjBweDtcbn1cblxuLm1haW4tbmF2IHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBtYXJnaW4tdG9wOiA1NXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbn1cblxuLm1haW4tbmF2IGxpIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtYXJnaW4tbGVmdDogNDBweDtcbn1cblxuLmxhbmRpbmcge1xuICAvKiBoZWlnaHQ6IDkwdmg7ICovXG4gIC8qIGRpc3BsYXk6IGZsZXg7ICovXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG59XG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogU3BlY2lmaWMgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiAuaGVhZGVyLXJvdyxcbi5wcm9wb3Nlci1yb3csXG4uY2hhaW4tcXVlcmllcy1yb3cge1xuICBtYXgtd2lkdGg6IDExNDBweDtcbiAgbWFyZ2luOiAwIDIwcHg7XG5cbn0gICovXG5cbi5tYWluLWNvbnRhaW5lciB7XG4gIG1pbi1oZWlnaHQ6IDc2dmg7XG59XG5cbi5jYXJkIHtcbiAgYm94LXNoYWRvdzogMHB4IDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjE4KTtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbn1cbi5jYXJkLWhlYWRlci10aXRsZSB7XG4gIGNvbG9yOiM4Rjk5QTM7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG59XG5cbi5ib3gge1xuICBiYWNrZ3JvdW5kOiAjMDA3OTZCO1xufVxuXG5hcnRpY2xlIHtcbiAgYmFja2dyb3VuZDogIzExMTkyMztcbn1cblxuLnRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcbn1cblxuLnN1YnRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgY29sb3I6IzExMTkyMztcbn1cblxuXG4uaGVhZGVyLXRpdGxlLFxuLmhlYWRlci1zdWJ0aXRsZSB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5oZWFkZXItc3VidGl0bGUge1xuIGNvbG9yOiAjRkM3RDE0XG59XG5cbi5jYXJkIC5jb250ZW50IHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uY2FyZC1mb290ZXItaXRlbSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICM4Rjk5QTM7XG59XG5cbi5jYXJkLXRhYmxlIC50YWJsZSB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbi5ldmVudHMtY2FyZCAuY2FyZC10YWJsZSB7XG4gIC8qbWF4LWhlaWdodDogNTAwcHg7Ki9cbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xufVxuXG4gLm5hdmJhcntcbiAgYmFja2dyb3VuZDogIzBEMTUxRjtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEZvb3RlciAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmZvb3RlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwRDE1MUY7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZzogMzBweDtcbn1cblxuLmZvb3Rlci1uYXYge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBmbG9hdDogbGVmdDtcbiAgLyogbWFyZ2luLXRvcDogMjBweDsgKi9cbn1cblxuXG4uc29jaWFsLWxpbmtzIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuXG4uZm9vdGVyLW5hdiBsaSxcbi5zb2NpYWwtbGlua3MgbGkge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG59XG5cbi5mb290ZXItbmF2IGxpOmxhc3QtY2hpbGQsXG4uc29jaWFsLWxpbmtzIGxpOmxhc3QtY2hpbGQge1xuICAgIG1hcmdpbi1yaWdodDogMDtcbn1cblxuLmZvb3Rlci1uYXYgbGk6bGFzdC1jaGlsZCxcbi5zb2NpYWwtbGlua3MgbGk6bGFzdC1jaGlsZCB7XG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xufVxuXG5mb290ZXIgcCBhOmxpbmssXG5mb290ZXIgcCBhOnZpc2l0ZWQsXG4uZm9vdGVyLW5hdiBsaSBhOmxpbmssXG4uZm9vdGVyLW5hdiBsaSBhOnZpc2l0ZWQsXG4uc29jaWFsLWxpbmtzIGxpIGE6bGluaywgXG4uc29jaWFsLWxpbmtzIGxpIGE6dmlzaXRlZCB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGJvcmRlcjogMDtcbiAgICBjb2xvcjogIzg4ODg4ODtcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjJzO1xufVxuXG5mb290ZXIgcCBhOmhvdmVyLFxuZm9vdGVyIHAgYTphY3RpdmUsXG4uZm9vdGVyLW5hdiBsaSBhOmhvdmVyLFxuLmZvb3Rlci1uYXYgbGkgYTphY3RpdmUge1xuICAgIGNvbG9yOiAjRkM3RDE0O1xufVxuXG4uc29jaWFsLWxpbmtzIGxpIGE6bGluayxcbi5zb2NpYWwtbGlua3MgbGkgYTp2aXNpdGVkIHtcbiAgICBmb250LXNpemU6IDE1MCU7XG59XG5cbi5pb24tc29jaWFsLWZhY2Vib29rLFxuLmlvbi1zb2NpYWwtdHdpdHRlcixcbi5pb24tc29jaWFsLWdvb2dsZXBsdXMsXG4uaW9uLXNvY2lhbC1pbnN0YWdyYW0ge1xuICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMnM7XG59XG5cbi5pb24tc29jaWFsLWdpdGh1Yjpob3ZlciB7XG4gICAgY29sb3I6ICNhNmIxYjc7XG59XG5cbi5pb24tc29jaWFsLXR3aXR0ZXI6aG92ZXIge1xuICAgIGNvbG9yOiAjMDBhY2VkO1xufVxuXG4uaW9uLXBhcGVyLWFpcnBsYW5lOmhvdmVyIHtcbiAgICBjb2xvcjogIzAwODhjYztcbn1cblxuLmlvbi1zb2NpYWwtbGlua2VkaW46aG92ZXIge1xuICAgIGNvbG9yOiAjMDA3YmI1O1xufVxuXG5mb290ZXIgcCB7XG4gIGNvbG9yOiAjODg4ODg4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBSZXNwb25zaXZlIE5hdiAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5yb3cge1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5saW5lIHtcbiAgICB3aWR0aDogMzBweDtcbiAgICBoZWlnaHQ6IDNweDtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBtYXJnaW46IDVweDtcbiAgfVxuICBcbiAgbmF2IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cblxuICAuaGFtYnVyZ2VyIHtcbiAgICBtYXJnaW4tdG9wOiA0MHB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcmlnaHQ6IDUlO1xuICAgIHRvcDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01JSwgLTUwJSk7XG4gICAgei1pbmRleDogMjtcbiAgfVxuXG4gIC5tYWluLW5hdiB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGJhY2tncm91bmQ6ICMxMTE5MjM7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGNsaXAtcGF0aDogY2lyY2xlKDEwMHB4IGF0IDkwJSAtMTMlKTtcbiAgICAtd2Via2l0LWNsaXAtcGF0aDogY2lyY2xlKDEwMHB4IGF0IDkwJSAtMTMlKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC42cyBlYXNlLW91dDtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICB9XG4gIC5tYWluLW5hdi5vcGVuIHtcbiAgICBjbGlwLXBhdGg6IGNpcmNsZSgxMDUwcHggYXQgOTAlIC0xMyUpO1xuICAgIC13ZWJraXQtY2xpcC1wYXRoOiBjaXJjbGUoMTA1MHB4IGF0IDkwJSAtMTMlKTtcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xuICB9XG4gIC5sYW5kaW5nIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG4gIC5tYWluLW5hdiBsaSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAubWFpbi1uYXYgbGkgYSB7XG4gICAgZm9udC1zaXplOiAyNXB4O1xuICB9XG4gIC5tYWluLW5hdiBsaTpudGgtY2hpbGQoMSkge1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UgMC4ycztcbiAgfVxuICAubWFpbi1uYXYgbGk6bnRoLWNoaWxkKDIpIHtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlIDAuNHM7XG4gIH1cbiAgLm1haW4tbmF2IGxpOm50aC1jaGlsZCgzKSB7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZSAwLjZzO1xuICB9XG4gIGxpLmZhZGUge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <link href=\"https://fonts.googleapis.com/css?family=Lato:100,300,300i,400\" rel=\"stylesheet\">\n    <link rel=\"stylesheet\" href=\"http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css\">\n    <!-- <title>Demo</title> -->\n  </head>\n<!--The content below is only a placeholder and can be replaced.-->\n<!-- START NAV -->\n<mat-sidenav-container>\n  <mat-sidenav #sidenavRef role=\"navigation\">\n    <app-sidenav-list (sidenavClose)=\"sidenavRef.close()\"></app-sidenav-list>\n  </mat-sidenav>\n  <mat-sidenav-content>    \n    <app-header (sidenavToggle)=\"sidenavRef.toggle()\"></app-header>\n    <main>\n      <body>\n        <!-- <header> -->\n          <!-- --------------------- NAV BAR --------------------- -->\n            <!-- <nav>\n              <div class=\"hamburger\">\n                <div class=\"line\"></div>\n                <div class=\"line\"></div>\n                <div class=\"line\"></div>\n              </div>\n              <div class=\"row\">\n                <a href=\"#\"><img src=\"assets/img/Coris_logo.png\" class=\"logo\"></a>\n                <ul class=\"main-nav\">\n                  <li><a routerLink=\"/validators\">Validators</a></li>\n                  <li><a routerLink=\"/blocks\">Blocks</a></li>\n                  <li><a routerLink=\"/txs\">Transactions</a></li>\n                </ul>\n              </div>\n            </nav> -->\n          <!-- --------------------- END NAV --------------------- -->\n        <!-- </header> -->\n\n        <section class=\"landing\">\n          <div class=\"row header-row\">\n            <h1 class=\"title header-title\">\n              Coris Explorer \n            </h1>\n            <h2 class=\"subtitle header-subtitle\">{{(appState | async).blocks[0]?.header.chain_id}}</h2>\n          </div>\n          <div class=\"row proposer-row\">\n            <div style=\"cursor: pointer;\" routerLink=\"/validator/{{(appState | async).round.proposer?.address}}\">\n              <h2 *ngIf=\"(appState | async).valsMap.size; else elseBlock\" class=\"title proposer-title\">\n                Proposer - {{(appState | async).valsMap.get((appState | async).round.proposer?.address)}} \n              </h2>\n              <ng-template #elseBlock>\n                  <h2 class=\"title proposer-title\">\n                    Proposer - loading \n                  </h2>\n              </ng-template>\n            </div>\n          </div>\n          <div class=\"row chain-queries-row\">\n            <div class=\"col span-1-of-4\">\n              <div style=\"cursor: pointer;\" routerLink=\"/last-block\" class=\"is-parent\">\n                <article class=\"box\">\n                  <!-- <p class=\"title\">{{(appState | async).round?.height}}</p> -->\n                  <p class=\"subtitle chain-queries-subtitle box-key\"><i class=\"ion-cube\"></i>&nbsp;Last Block</p>\n                  <h3\n                    *ngFor=\"let block of (appState | async).blocks.reverse().slice(0,1)\"\n                    class=\"title chain-queries-title box-value\"\n                    [innerHTML]=\"block.header?.height !== null ? block.header.height : 0\">\n                  </h3>\n                  <!-- <p class=\"subtitle chain-queries-subtitle\">Last Block</p> -->\n                </article>\n              </div>\n            </div>\n            <div class=\"col span-1-of-4\">\n              <article class=\"box\">\n                    <!-- <p class=\"subtitle chain-queries-subtitle box-key\"><i class=\"ion-load-a\"></i>&nbsp;Round {{(appState | async).roundStep.round}}</p> -->\n                    <p class=\"subtitle chain-queries-subtitle box-key\"><i class=\"ion-load-a\"></i>&nbsp;Consensus</p>\n                    <h3 class=\"title chain-queries-title box-value\">{{(appState | async).roundStep.step?.split('RoundStep')[1]}}</h3>\n                <!-- <p class=\"subtitle chain-queries-subtitle\">Round {{(appState | async).roundStep.round}}</p> -->\n              </article>\n            </div>\n            <div class=\"col span-1-of-4\">\n              <div style=\"cursor: pointer;\" routerLink=\"/validators\" class=\"is-parent\">\n                <article class=\"box\">\n                  <p class=\"subtitle chain-queries-subtitle box-key\"><i class=\"ion-person-stalker\"></i>&nbsp;Validators</p>\n                  <h3 class=\"title chain-queries-title box-value\">{{(appState | async).validators?.length}}</h3>\n                  <!-- <p class=\"subtitle chain-queries-subtitle\">Validators</p> -->\n                </article>\n              </div>\n            </div>\n            <div class=\"col span-1-of-4\">\n                <div style=\"cursor: pointer;\" routerLink=\"/validators\" class=\"is-parent\">\n                  <article class=\"box\">\n                    <p class=\"subtitle chain-queries-subtitle box-key\"><i class=\"ion-soup-can\"></i>&nbsp;Add staking pool</p>\n                    <h3 class=\"title chain-queries-title box-value\">{{(appState | async).validators?.length}}</h3>\n                    <!-- <p class=\"subtitle chain-queries-subtitle\">Validators</p> -->\n                  </article>\n                </div>\n            </div>\n          </div>\n        </section>\n        <router-outlet></router-outlet>\n      </body>\n\n      <footer>\n        <div class=\"row\">\n          <div class=\"col span-1-of-2\">\n            <ul class=\"footer-nav\">\n              <li><a href=\"http://cyphercore.io/team/\" target=\" \">About</a></li>\n              <li><a href=\"https://medium.com/cypher-core\" target=\" \">Blog</a></li>\n              <li><a href=\"http://cyphercore.io/validator/\" target=\" \">Staking</a></li>\n            </ul>\n          </div>\n          <div class=\"col span-1-of-2\">\n            <ul class=\"social-links\">\n              <li><a href=\"#\"><i class=\"ion-social-github\" target=\" \"></i></a></li>\n              <li><a href=\"https://twitter.com/cypher_core\" target=\" \"><i class=\"ion-social-twitter\"></i></a></li>\n              <li><a href=\"https://t.me/cyphercore\" target=\" \"><i class=\"ion-paper-airplane\"></i></a></li>\n              <li><a href=\"https://www.linkedin.com/company/cypher-core/about/?viewAsMember=true\" target=\" \"><i class=\"ion-social-linkedin\"></i></a></li>\n            </ul>\n          </div>\n        </div>\n        <div class=\"row\">\n          <p>\n            Copyright &copy; 2019 - <a class=\"footer-brand\" href=\"http://cyphercore.io\" target=\" \">Cypher Core LLC.</a>\n          </p>\n        </div>\n      </footer>\n    </main>\n    </mat-sidenav-content>\n  </mat-sidenav-container>\n</html>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_ws_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/ws.service */ "./src/app/services/ws.service.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");




var AppComponent = /** @class */ (function () {
    function AppComponent(ws, store) {
        this.ws = ws;
        this.store = store;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.appState = this.store.select('App');
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.ws.unsubscribe();
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_ws_service__WEBPACK_IMPORTED_MODULE_2__["WsService"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_validators_validators_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/validators/validators.component */ "./src/app/components/validators/validators.component.ts");
/* harmony import */ var _components_blocks_blocks_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/blocks/blocks.component */ "./src/app/components/blocks/blocks.component.ts");
/* harmony import */ var _components_txs_txs_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/txs/txs.component */ "./src/app/components/txs/txs.component.ts");
/* harmony import */ var _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/dashboard/dashboard.component */ "./src/app/components/dashboard/dashboard.component.ts");
/* harmony import */ var _components_last_block_last_block_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/last-block/last-block.component */ "./src/app/components/last-block/last-block.component.ts");
/* harmony import */ var _app_reducers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./app.reducers */ "./src/app/app.reducers.ts");
/* harmony import */ var _components_block_block_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/block/block.component */ "./src/app/components/block/block.component.ts");
/* harmony import */ var _components_tx_tx_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/tx/tx.component */ "./src/app/components/tx/tx.component.ts");
/* harmony import */ var _components_validator_validator_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/validator/validator.component */ "./src/app/components/validator/validator.component.ts");
/* harmony import */ var _components_new_tx_new_tx_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/new-tx/new-tx.component */ "./src/app/components/new-tx/new-tx.component.ts");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./material.module */ "./src/app/material.module.ts");
/* harmony import */ var _components_navigation_header_header_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/navigation/header/header.component */ "./src/app/components/navigation/header/header.component.ts");
/* harmony import */ var _components_navigation_sidenav_list_sidenav_list_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/navigation/sidenav-list/sidenav-list.component */ "./src/app/components/navigation/sidenav-list/sidenav-list.component.ts");






















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"],
                _components_validators_validators_component__WEBPACK_IMPORTED_MODULE_9__["ValidatorsComponent"],
                _components_blocks_blocks_component__WEBPACK_IMPORTED_MODULE_10__["BlocksComponent"],
                _components_txs_txs_component__WEBPACK_IMPORTED_MODULE_11__["TxsComponent"],
                _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_12__["DashboardComponent"],
                _components_last_block_last_block_component__WEBPACK_IMPORTED_MODULE_13__["LastBlockComponent"],
                _components_block_block_component__WEBPACK_IMPORTED_MODULE_15__["BlockComponent"],
                _components_tx_tx_component__WEBPACK_IMPORTED_MODULE_16__["TxComponent"],
                _components_validator_validator_component__WEBPACK_IMPORTED_MODULE_17__["ValidatorComponent"],
                _components_new_tx_new_tx_component__WEBPACK_IMPORTED_MODULE_18__["NewTxComponent"],
                _components_navigation_header_header_component__WEBPACK_IMPORTED_MODULE_20__["HeaderComponent"],
                _components_navigation_sidenav_list_sidenav_list_component__WEBPACK_IMPORTED_MODULE_21__["SidenavListComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
                _material_module__WEBPACK_IMPORTED_MODULE_19__["MaterialModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__["FlexLayoutModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _ngrx_store__WEBPACK_IMPORTED_MODULE_4__["StoreModule"].forRoot({ App: _app_reducers__WEBPACK_IMPORTED_MODULE_14__["appReducer"] }),
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.reducers.ts":
/*!*********************************!*\
  !*** ./src/app/app.reducers.ts ***!
  \*********************************/
/*! exports provided: appReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appReducer", function() { return appReducer; });
/* harmony import */ var _app_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.actions */ "./src/app/app.actions.ts");
// import {Action} from '@ngrx/store';

var initialState = {
    blocks: [],
    txs: [],
    validators: [],
    round: {},
    roundStep: {},
    valsMap: Map
};
function appReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _app_actions__WEBPACK_IMPORTED_MODULE_0__["UPDATE_BLOCKS"]:
            return {
                // ...state,
                // blocks:[...state.blocks, action.payload]
                blocks: action.payload,
                txs: state.txs,
                validators: state.validators,
                round: state.round,
                roundStep: state.roundStep,
                valsMap: state.valsMap,
            };
            break;
        case _app_actions__WEBPACK_IMPORTED_MODULE_0__["UPDATE_TXS"]:
            return {
                blocks: state.blocks,
                txs: action.payload,
                validators: state.validators,
                round: state.round,
                roundStep: state.roundStep,
                valsMap: state.valsMap,
            };
            break;
        case _app_actions__WEBPACK_IMPORTED_MODULE_0__["UPDATE_VALIDATORS"]:
            return {
                txs: state.txs,
                blocks: state.blocks,
                validators: action.payload,
                round: state.round,
                roundStep: state.roundStep,
                valsMap: state.valsMap,
            };
            break;
        case _app_actions__WEBPACK_IMPORTED_MODULE_0__["UPDATE_ROUND"]:
            return {
                txs: state.txs,
                blocks: state.blocks,
                validators: state.validators,
                round: action.payload,
                roundStep: state.roundStep,
                valsMap: state.valsMap,
            };
            break;
        case _app_actions__WEBPACK_IMPORTED_MODULE_0__["UPDATE_ROUND_STEP"]:
            return {
                txs: state.txs,
                blocks: state.blocks,
                validators: state.validators,
                round: state.round,
                roundStep: action.payload,
                valsMap: state.valsMap,
            };
            break;
        case _app_actions__WEBPACK_IMPORTED_MODULE_0__["UPDATE_VALS_MAP"]:
            return {
                txs: state.txs,
                blocks: state.blocks,
                validators: state.validators,
                round: state.round,
                roundStep: state.roundStep,
                valsMap: action.payload,
            };
            break;
        default:
            break;
    }
    return state;
}


/***/ }),

/***/ "./src/app/components/block/block.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/block/block.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*-------------------------------------------------*/\n/* Reusable Components */\n/*-------------------------------------------------*/\n.row {\n  max-width: 90%; /*1140px or in %*/\n  margin: 0 auto;\n}\np {\n  padding: 1px;\n}\n/*-------------------------------------------------*/\n/* Paragraphs */\n/*-------------------------------------------------*/\np, tbody {\n  color: white;\n  text-align: left;\n}\ntable {\n  table-layout: fixed;\n  /*width: 100px;*/\n}\ntd, div {\n  overflow: hidden; \n  white-space: nowrap;\n  text-overflow: ellipsis;\n  text-align: left;\n}\n.card-header {\n  background: #00796B;\n}\n.clickable:nth-child(odd){\n  background:#0D151F;\n}\n.clickable:nth-child(even){\n  background:#111923;\n}\ntbody,\n.card,\n.card-table p {\n  background:#0D151F;\n}\n.search-box {\n  margin-bottom: 20px;\n}\n.query-name {\n  -webkit-text-emphasis: bold;\n          text-emphasis: bold;\n  color: #FC7D14;\n}\n.block-info {\n  margin-left: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9ibG9jay9ibG9jay5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9EQUFvRDtBQUNwRCx3QkFBd0I7QUFDeEIsb0RBQW9EO0FBRXBEO0VBQ0UsY0FBYyxFQUFFLGlCQUFpQjtFQUNqQyxjQUFjO0FBQ2hCO0FBRUE7RUFDRSxZQUFZO0FBQ2Q7QUFDQSxvREFBb0Q7QUFDcEQsZUFBZTtBQUNmLG9EQUFvRDtBQUNwRDtFQUNFLFlBQVk7RUFDWixnQkFBZ0I7QUFDbEI7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixnQkFBZ0I7QUFDbEI7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCO0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjtBQUVBOzs7RUFHRSxrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjtBQUVBO0VBQ0UsMkJBQW1CO1VBQW5CLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCO0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2Jsb2NrL2Jsb2NrLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogUmV1c2FibGUgQ29tcG9uZW50cyAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLnJvdyB7XG4gIG1heC13aWR0aDogOTAlOyAvKjExNDBweCBvciBpbiAlKi9cbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbnAge1xuICBwYWRkaW5nOiAxcHg7XG59XG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogUGFyYWdyYXBocyAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbnAsIHRib2R5IHtcbiAgY29sb3I6IHdoaXRlO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG50YWJsZSB7XG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XG4gIC8qd2lkdGg6IDEwMHB4OyovXG59XG5cbnRkLCBkaXYge1xuICBvdmVyZmxvdzogaGlkZGVuOyBcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5jYXJkLWhlYWRlciB7XG4gIGJhY2tncm91bmQ6ICMwMDc5NkI7XG59XG5cbi5jbGlja2FibGU6bnRoLWNoaWxkKG9kZCl7XG4gIGJhY2tncm91bmQ6IzBEMTUxRjtcbn1cblxuLmNsaWNrYWJsZTpudGgtY2hpbGQoZXZlbil7XG4gIGJhY2tncm91bmQ6IzExMTkyMztcbn1cblxudGJvZHksXG4uY2FyZCxcbi5jYXJkLXRhYmxlIHAge1xuICBiYWNrZ3JvdW5kOiMwRDE1MUY7XG59XG5cbi5zZWFyY2gtYm94IHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLnF1ZXJ5LW5hbWUge1xuICB0ZXh0LWVtcGhhc2lzOiBib2xkO1xuICBjb2xvcjogI0ZDN0QxNDtcbn1cblxuLmJsb2NrLWluZm8ge1xuICBtYXJnaW4tbGVmdDogOHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/components/block/block.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/block/block.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row search-box\">\n    <div class=\"field has-addons\">\n        <div class=\"control\">\n          <input class=\"input\" placeholder = \"Enter block height\" #queryInputRef >\n        </div>\n        <div class=\"control\">\n          <a \n            class = \"button is-info\" \n            (click) = 'clickButton(queryInputRef.value)' >\n              Search\n          </a>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n  <div *ngIf=\"(block?.last_commit); else elseBlock\" class=\"card events-card\">\n          <div class=\"card-header\">\n            <p class=\"card-header-title\"><i class=\"fab fa-codepen\"></i>Block&nbsp;&nbsp;&nbsp;#{{block.header.height}}</p>\n          </div>\n\n          <div class=\"row block-info\">\n            <div class=\"col span-1-of-3\">\n                <div class=\"card-table table-block\">\n                    <table class=\"table is-fullwidth\">\n                      <tbody>\n                        <tr class=\"query-name\">Height</tr>\n                        <tr class=\"query-name\">Hash</tr>\n                        <tr class=\"query-name\">Proposer</tr>\n                        <tr><a (click)=\"showHideElem()\">Precommits ({{block.last_commit?.precommits?.length}})</a></tr> \n                      </tbody>\n                    </table>\n                  </div>\n            </div>\n            <div class=\"col span-2-of-3\">\n                <div class=\"card-table table-block\">\n                    <table class=\"table is-fullwidth\">\n                      <tbody>\n                        <tr>{{block.header.height}}</tr>\n                        <tr>{{block.header.app_hash}}</tr>\n                        <tr>{{block.header.proposer_address}}</tr>\n                        <tr>{{block.header.time}}</tr>\n                      </tbody>\n                    </table>\n                  </div>\n            </div>\n          </div>\n\n          <div class=\"card-table table-precommits\" [style.display]=\"displayCommits ? 'flex': 'none'\" id=\"precommits\">\n            <table class=\"table is-fullwidth\">\n              <tbody>\n                  <tr *ngFor=\"let validator of block.last_commit.precommits\">\n                     <td *ngIf=\"(validator === null)\">Abscent!</td>\n                     <td \n                       *ngIf=\"(validator !== null)\"\n                       routerLink=\"/validator/{{validator.validator_address}}\" \n                       class=\"clickable\"\n                         >{{validator.validator_address}}\n                     </td>\n                   </tr>\n              </tbody>\n            </table>\n          </div>\n  </div>\n\n  <ng-template #elseBlock>No block found at {{queryHeight}}!</ng-template>\n  \n</div>"

/***/ }),

/***/ "./src/app/components/block/block.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/block/block.component.ts ***!
  \*****************************************************/
/*! exports provided: BlockComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockComponent", function() { return BlockComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../config.js */ "./src/config.js");







var BlockComponent = /** @class */ (function () {
    function BlockComponent(http, document, route, router) {
        this.http = http;
        this.route = route;
        this.router = router;
        this.block = {};
        this.queryHeight = 0;
        this.displayCommits = false;
    }
    BlockComponent.prototype.clickButton = function (value) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.router.navigate(["block/" + value])];
                    case 1:
                        _a.sent();
                        this.fetchBlock();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockComponent.prototype.ngOnInit = function () {
        this.fetchBlock();
    };
    BlockComponent.prototype.fetchBlock = function () {
        var _this = this;
        this.queryHeight = Number(this.route.snapshot.paramMap.get('height'));
        this.http.get(_config_js__WEBPACK_IMPORTED_MODULE_5__["nodeRpc"] + "//block?height=" + this.queryHeight).subscribe(function (data) {
            if (data['error'] === undefined)
                _this.block = data['result'].block;
            else
                _this.block = {};
        });
    };
    BlockComponent.prototype.showHideElem = function () {
        this.displayCommits = !this.displayCommits;
    };
    BlockComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-block',
            template: __webpack_require__(/*! ./block.component.html */ "./src/app/components/block/block.component.html"),
            styles: [__webpack_require__(/*! ./block.component.css */ "./src/app/components/block/block.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], Object, _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], BlockComponent);
    return BlockComponent;
}());



/***/ }),

/***/ "./src/app/components/blocks/blocks.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/blocks/blocks.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*-------------------------------------------------*/\n/* Reusable Components */\n/*-------------------------------------------------*/\n.row {\n  max-width: 90%;\n  margin: 0 auto;\n\n}\np {\n  padding: 1px;\n}\n/*-------------------------------------------------*/\n/* Table */\n/*-------------------------------------------------*/\ntable {\n  table-layout: fixed;\n  width: 100%;\n  border-collapse: collapse;\n  /* border: 3px solid purple; */\n}\ntd {\n  overflow: hidden; /* to hide anything that doesn't fit in the containing element. */\n  white-space: nowrap; /* to make sure the line doesn't break when it is longer than the containing div. */\n  text-overflow: ellipsis;\n  text-align: left;\n}\nthead th:nth-child(1) {\n  width: 10%;\n}\nthead th:nth-child(2) {\n  width: 10%;\n}\nthead th:nth-child(3) {\n  width: 20%;\n}\nthead th:nth-child(4) {\n  width: 20%;\n}\nth, td {\n  padding: 20px;\n}\ntbody tr:nth-child(odd){\n  background:#0D151F;\n}\ntbody tr:nth-child(even){\n  background:#111923;\n}\nbutton {\n  margin: 15px;\n}\n.card-header {\n  background: #00796B;\n}\n.card-header p {\n  margin-left: 6px;\n}\np,\ntbody {\n  color: white;\n}\n.td-1 {\n  color: #FC7D14;\n}\n.td-2 {\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9ibG9ja3MvYmxvY2tzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0RBQW9EO0FBQ3BELHdCQUF3QjtBQUN4QixvREFBb0Q7QUFDcEQ7RUFDRSxjQUFjO0VBQ2QsY0FBYzs7QUFFaEI7QUFFQTtFQUNFLFlBQVk7QUFDZDtBQUNBLG9EQUFvRDtBQUNwRCxVQUFVO0FBQ1Ysb0RBQW9EO0FBQ3BEO0VBQ0UsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCx5QkFBeUI7RUFDekIsOEJBQThCO0FBQ2hDO0FBRUE7RUFDRSxnQkFBZ0IsRUFBRSxpRUFBaUU7RUFDbkYsbUJBQW1CLEVBQUUsbUZBQW1GO0VBQ3hHLHVCQUF1QjtFQUN2QixnQkFBZ0I7QUFDbEI7QUFFQTtFQUNFLFVBQVU7QUFDWjtBQUVBO0VBQ0UsVUFBVTtBQUNaO0FBRUE7RUFDRSxVQUFVO0FBQ1o7QUFFQTtFQUNFLFVBQVU7QUFDWjtBQUVBO0VBQ0UsYUFBYTtBQUNmO0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjtBQUlBO0VBQ0UsWUFBWTtBQUNkO0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBOztFQUVFLFlBQVk7QUFDZDtBQUVBO0VBQ0UsY0FBYztBQUNoQjtBQUVBO0VBQ0UsWUFBWTtBQUNkIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9ibG9ja3MvYmxvY2tzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogUmV1c2FibGUgQ29tcG9uZW50cyAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi5yb3cge1xuICBtYXgtd2lkdGg6IDkwJTtcbiAgbWFyZ2luOiAwIGF1dG87XG5cbn1cblxucCB7XG4gIHBhZGRpbmc6IDFweDtcbn1cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBUYWJsZSAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbnRhYmxlIHtcbiAgdGFibGUtbGF5b3V0OiBmaXhlZDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIC8qIGJvcmRlcjogM3B4IHNvbGlkIHB1cnBsZTsgKi9cbn1cblxudGQge1xuICBvdmVyZmxvdzogaGlkZGVuOyAvKiB0byBoaWRlIGFueXRoaW5nIHRoYXQgZG9lc24ndCBmaXQgaW4gdGhlIGNvbnRhaW5pbmcgZWxlbWVudC4gKi9cbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgLyogdG8gbWFrZSBzdXJlIHRoZSBsaW5lIGRvZXNuJ3QgYnJlYWsgd2hlbiBpdCBpcyBsb25nZXIgdGhhbiB0aGUgY29udGFpbmluZyBkaXYuICovXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG50aGVhZCB0aDpudGgtY2hpbGQoMSkge1xuICB3aWR0aDogMTAlO1xufVxuXG50aGVhZCB0aDpudGgtY2hpbGQoMikge1xuICB3aWR0aDogMTAlO1xufVxuXG50aGVhZCB0aDpudGgtY2hpbGQoMykge1xuICB3aWR0aDogMjAlO1xufVxuXG50aGVhZCB0aDpudGgtY2hpbGQoNCkge1xuICB3aWR0aDogMjAlO1xufVxuXG50aCwgdGQge1xuICBwYWRkaW5nOiAyMHB4O1xufVxuXG50Ym9keSB0cjpudGgtY2hpbGQob2RkKXtcbiAgYmFja2dyb3VuZDojMEQxNTFGO1xufVxuXG50Ym9keSB0cjpudGgtY2hpbGQoZXZlbil7XG4gIGJhY2tncm91bmQ6IzExMTkyMztcbn1cblxuXG5cbmJ1dHRvbiB7XG4gIG1hcmdpbjogMTVweDtcbn1cblxuLmNhcmQtaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogIzAwNzk2Qjtcbn1cblxuLmNhcmQtaGVhZGVyIHAge1xuICBtYXJnaW4tbGVmdDogNnB4O1xufVxuXG5wLFxudGJvZHkge1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi50ZC0xIHtcbiAgY29sb3I6ICNGQzdEMTQ7XG59XG5cbi50ZC0yIHtcbiAgY29sb3I6IHdoaXRlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/components/blocks/blocks.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/blocks/blocks.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"field has-addons\">\n    <div class=\"control\">\n      <input class=\"input\" placeholder = \"Enter block height\" #queryInputRef >\n    </div>\n    <div class=\"control\">\n      <a \n        class = \"button is-info\" \n        (click) = 'clickButton(queryInputRef.value)' >\n          Search\n      </a>\n    </div>\n  </div>\n  \n  <div class=\"card events-card\">\n    <div class=\"card-header\">\n      <p class=\"card-header-title\"><i class=\"fas fa-vector-square\"></i>Blocks</p>\n    </div>\n    <div class=\"card-table\">\n        <table class=\"table is-fullwidth\">\n          <thead>\n            <tr>\n              <th >Height</th>\n              <th>Transactions</th>\n              <!-- <th>Hash</th> -->\n              <th>Proposer</th>\n              <th>Timestamp (UTC)</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr routerLink=\"/block/{{block.height}}\" class=\"clickable\" *ngFor=\"let block of blocks\">\n              <td class=\"td-1\">{{block.height}}</td>\n              <td class=\"td-2\">{{block.txs}}</td>\n              <td class=\"td-1\">{{block.proposer}}</td>\n              <td class=\"td-2\">{{block.time}}</td>\n              <!-- <td><a class=\"button is-small is-primary\" href=\"#\">{{validator.power}}</a></td> -->\n            </tr>\n          </tbody>\n        </table>\n    </div>\n  </div>\n  <nav class=\"pagination\" role=\"navigation\" aria-label=\"pagination\">\n    <button disabled id=\"btn-newer\" (click)=\"displayNewerBlocks()\" class=\"pagination-previous button is-dark\">Newer</button>\n    <button id=\"btn-older\" (click)=\"displayOlderBlocks()\" class=\"pagination-next button is-dark\">Older</button>\n  </nav>\n</div>\n"

/***/ }),

/***/ "./src/app/components/blocks/blocks.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/blocks/blocks.component.ts ***!
  \*******************************************************/
/*! exports provided: BlocksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlocksComponent", function() { return BlocksComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../config.js */ "./src/config.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");






var BlocksComponent = /** @class */ (function () {
    function BlocksComponent(http, router) {
        this.http = http;
        this.router = router;
        this.currentBlock = 0;
        this.startBlock = 0;
        this.blocksToDisplay = 20;
    }
    BlocksComponent.prototype.clearBlocks = function () {
        this.blocks = [];
    };
    BlocksComponent.prototype.clickButton = function (value) {
        console.log(value);
        this.router.navigate(["block/" + value]);
    };
    BlocksComponent.prototype.fetchBlocks = function () {
        var _this = this;
        this.http.get(_config_js__WEBPACK_IMPORTED_MODULE_3__["nodeRpc"] + "/blockchain?minHeight=" + (this.currentBlock - this.blocksToDisplay + 1) + "&maxHeight=" + this.currentBlock)
            .subscribe(function (data) {
            _this.clearBlocks();
            data['result'].block_metas.forEach(function (block) {
                var datePipe = new _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"]('en-US');
                var formattedTime = datePipe.transform(block.header.time, 'h:mm:ss a, MMM d, y');
                _this.blocks.push({
                    hash: block.block_id.hash,
                    height: block.header.height,
                    time: formattedTime,
                    txs: block.header.num_txs,
                    proposer: block.header.proposer_address
                });
            });
        });
    };
    BlocksComponent.prototype.displayOlderBlocks = function () {
        if (this.currentBlock - this.blocksToDisplay > 20) {
            document.getElementById('btn-newer').removeAttribute('disabled');
            this.currentBlock -= this.blocksToDisplay;
        }
        this.fetchBlocks();
    };
    BlocksComponent.prototype.displayNewerBlocks = function () {
        if (this.currentBlock + this.blocksToDisplay == this.startBlock) {
            document.getElementById('btn-newer').setAttribute('disabled', 'true');
            this.currentBlock += this.blocksToDisplay;
        }
        else if (this.currentBlock + this.blocksToDisplay < this.startBlock) {
            this.currentBlock += this.blocksToDisplay;
        }
        this.fetchBlocks();
    };
    BlocksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get(_config_js__WEBPACK_IMPORTED_MODULE_3__["nodeRpc"] + "/status").subscribe(function (data) {
            _this.startBlock = data['result'].sync_info.latest_block_height;
            _this.currentBlock = _this.startBlock;
            _this.fetchBlocks();
        });
    };
    BlocksComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-blocks',
            template: __webpack_require__(/*! ./blocks.component.html */ "./src/app/components/blocks/blocks.component.html"),
            styles: [__webpack_require__(/*! ./blocks.component.css */ "./src/app/components/blocks/blocks.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], BlocksComponent);
    return BlocksComponent;
}());



/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*-------------------------------------------------*/\n/* Reusable Components */\n/*-------------------------------------------------*/\n.row {\n  max-width: 90%;\n  margin: 0 auto;\n\n}\ntable {\n  table-layout: fixed;\n  /*width: 100px;*/\n}\ntd {\n  overflow: hidden; /* to hide anything that doesn't fit in the containing element. */\n  white-space: nowrap; /* to make sure the line doesn't break when it is longer than the containing div. */\n  text-overflow: ellipsis;\n}\n.dash-card-table {\n  max-height: 200px;\n  overflow-y: scroll;\n}\n.card-header {\n  background: rgb(0, 87, 77);\n}\np,\ntbody {\n  color: white;\n}\n.clickable:nth-child(odd){\n  background:#0D151F;\n}\n.clickable:nth-child(even){\n  background:#111923;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0RBQW9EO0FBQ3BELHdCQUF3QjtBQUN4QixvREFBb0Q7QUFDcEQ7RUFDRSxjQUFjO0VBQ2QsY0FBYzs7QUFFaEI7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixnQkFBZ0I7QUFDbEI7QUFFQTtFQUNFLGdCQUFnQixFQUFFLGlFQUFpRTtFQUNuRixtQkFBbUIsRUFBRSxtRkFBbUY7RUFDeEcsdUJBQXVCO0FBQ3pCO0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCO0FBRUE7RUFDRSwwQkFBMEI7QUFDNUI7QUFFQTs7RUFFRSxZQUFZO0FBQ2Q7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjtBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogUmV1c2FibGUgQ29tcG9uZW50cyAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi5yb3cge1xuICBtYXgtd2lkdGg6IDkwJTtcbiAgbWFyZ2luOiAwIGF1dG87XG5cbn1cblxudGFibGUge1xuICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xuICAvKndpZHRoOiAxMDBweDsqL1xufVxuXG50ZCB7XG4gIG92ZXJmbG93OiBoaWRkZW47IC8qIHRvIGhpZGUgYW55dGhpbmcgdGhhdCBkb2Vzbid0IGZpdCBpbiB0aGUgY29udGFpbmluZyBlbGVtZW50LiAqL1xuICB3aGl0ZS1zcGFjZTogbm93cmFwOyAvKiB0byBtYWtlIHN1cmUgdGhlIGxpbmUgZG9lc24ndCBicmVhayB3aGVuIGl0IGlzIGxvbmdlciB0aGFuIHRoZSBjb250YWluaW5nIGRpdi4gKi9cbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5kYXNoLWNhcmQtdGFibGUge1xuICBtYXgtaGVpZ2h0OiAyMDBweDtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xufVxuXG4uY2FyZC1oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiByZ2IoMCwgODcsIDc3KTtcbn1cblxucCxcbnRib2R5IHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uY2xpY2thYmxlOm50aC1jaGlsZChvZGQpe1xuICBiYWNrZ3JvdW5kOiMwRDE1MUY7XG59XG5cbi5jbGlja2FibGU6bnRoLWNoaWxkKGV2ZW4pe1xuICBiYWNrZ3JvdW5kOiMxMTE5MjM7XG59Il19 */"

/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"columns\">\n        <div class=\"column is-6\">\n          <div class=\"card events-card\">\n            <header class=\"card-header\">\n              <p class=\"card-header-title\">\n                <i class=\"fas fa-vector-square\"></i>\n                Recent Blocks\n              </p>\n            </header>\n            <div class=\"card-table dash-card-table\">\n              <div class=\"content\">\n                <table class=\"table\">\n                  <tbody>\n                    <tr routerLink=\"/block/{{block.header.height}}\" class=\"clickable\" *ngFor=\"let block of (appState | async).blocks\">\n                      <td class=\"block-title\">{{block.header.app_hash}}</td>\n                      <td width=\"20%\">{{block.header.height}}</td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n            </div>\n            <footer class=\"card-footer\">\n              <a routerLink=\"/blocks\" class=\"card-footer-item\">View More</a>\n            </footer>\n          </div>\n        </div>\n        <div class=\"column is-6\">\n          <div class=\"card events-card\">\n            <header class=\"card-header\">\n              <p class=\"card-header-title\">\n                <i class=\"fas fa-exchange-alt\"></i>\n                Recent Transactions\n              </p>\n            </header>\n            <div class=\"card-table dash-card-table\">\n              <div class=\"content\">\n                <table class=\"table is-fullwidth\">\n                  <tbody>\n                    <tr routerLink=\"/tx/{{tx.hash}}\" class=\"clickable\" *ngFor=\"let tx of (appState | async).txs\">            \n                      <td class=\"block-title\">{{tx.hash}}</td>\n                      <td width=\"20%\">{{tx.height}}</td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n            </div>\n            <footer class=\"card-footer\">\n              <a routerLink=\"/txs\" class=\"card-footer-item\">View More</a>\n            </footer>\n          </div>\n        </div>\n      </div>\n</div>"

/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.ts ***!
  \*************************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");



var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(store) {
        this.store = store;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.appState = this.store.select('App');
    };
    DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/components/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/components/dashboard/dashboard.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/components/last-block/last-block.component.css":
/*!****************************************************************!*\
  !*** ./src/app/components/last-block/last-block.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\ntable {\n  table-layout: fixed;\n  /*width: 100px;*/\n}\n\ntd, div, h1, h3 {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sYXN0LWJsb2NrL2xhc3QtYmxvY2suY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9sYXN0LWJsb2NrL2xhc3QtYmxvY2suY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG50YWJsZSB7XG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XG4gIC8qd2lkdGg6IDEwMHB4OyovXG59XG5cbnRkLCBkaXYsIGgxLCBoMyB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/components/last-block/last-block.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/components/last-block/last-block.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let block of (appState | async).blocks.slice(0,1)\" class=\"card events-card\">\n  <div class=\"card-table\">\n    <div class=\"content\">\n      <article class=\"message\">\n        <div class=\"message-header\">\n          <i class=\"fab fa-codepen\"></i>\n          <p>Latest Block</p>\n        </div>\n        <div class=\"message-body\">\n          <h3>Block at {{block.header.height}}</h3>\n          <h3>App-Hash: {{block.header.app_hash}}</h3>\n          <table class=\"table is-fullwidth is-striped\">\n            <tbody *ngIf=\"block.last_commit\">\n              <tr>\n                <th><a (click)=\"showHideElem()\">Precommits ({{block.last_commit.precommits.length}})</a></th>\n              </tr>\n              <div [style.display]=\"displayCommits ? 'flex': 'none'\" id=\"precommits\">\n                <tr *ngFor=\"let validator of block.last_commit.precommits\">\n                  <td *ngIf=\"(validator === null)\">Abscent!</td><td \n                    *ngIf=\"(validator !== null)\"\n                    routerLink=\"/validator/{{validator.validator_address}}\" \n                    class=\"clickable\"\n                      >{{validator.validator_address}}\n                  </td>\n                </tr>\n              </div>\n            </tbody>\n          </table>\n        </div>\n      </article>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/last-block/last-block.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/last-block/last-block.component.ts ***!
  \***************************************************************/
/*! exports provided: LastBlockComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LastBlockComponent", function() { return LastBlockComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");



var LastBlockComponent = /** @class */ (function () {
    function LastBlockComponent(store) {
        this.store = store;
        this.displayCommits = false;
    }
    LastBlockComponent.prototype.ngOnInit = function () {
        this.appState = this.store.select('App');
    };
    LastBlockComponent.prototype.showHideElem = function () {
        this.displayCommits = !this.displayCommits;
    };
    LastBlockComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-last-block',
            template: __webpack_require__(/*! ./last-block.component.html */ "./src/app/components/last-block/last-block.component.html"),
            styles: [__webpack_require__(/*! ./last-block.component.css */ "./src/app/components/last-block/last-block.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"]])
    ], LastBlockComponent);
    return LastBlockComponent;
}());



/***/ }),

/***/ "./src/app/components/navigation/header/header.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/components/navigation/header/header.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a {\n  text-decoration: none;\n  color: white;\n}\n\n\na:hover,\na:active {\n  color: lightgray;\n}\n\n\n.nav-items {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n\n.nav-elem {\n  display: inline-block;\n  padding: 6px;\n}\n\n\n.logo {\n  padding: 10px; \n  height: 120px;\n  width: auto;\n  float: left;\n  margin-top: 20px;\n}\n\n\n.mat-toolbar.mat-primary {\n  background: #111923;\n  height: 10vh;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9uYXZpZ2F0aW9uL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFxQjtFQUNyQixZQUFZO0FBQ2Q7OztBQUdBOztFQUVFLGdCQUFnQjtBQUNsQjs7O0FBR0E7RUFDRSxnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFNBQVM7QUFDWDs7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsWUFBWTtBQUNkOzs7QUFFQTtFQUNFLGFBQWE7RUFDYixhQUFhO0VBQ2IsV0FBVztFQUNYLFdBQVc7RUFDWCxnQkFBZ0I7QUFDbEI7OztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLFlBQVk7QUFDZCIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbmF2aWdhdGlvbi9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjb2xvcjogd2hpdGU7XG59XG5cblxuYTpob3ZlcixcbmE6YWN0aXZlIHtcbiAgY29sb3I6IGxpZ2h0Z3JheTtcbn1cblxuXG4ubmF2LWl0ZW1zIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xufVxuXG4ubmF2LWVsZW0ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmc6IDZweDtcbn1cblxuLmxvZ28ge1xuICBwYWRkaW5nOiAxMHB4OyBcbiAgaGVpZ2h0OiAxMjBweDtcbiAgd2lkdGg6IGF1dG87XG4gIGZsb2F0OiBsZWZ0O1xuICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG4ubWF0LXRvb2xiYXIubWF0LXByaW1hcnkge1xuICBiYWNrZ3JvdW5kOiAjMTExOTIzO1xuICBoZWlnaHQ6IDEwdmg7XG59Il19 */"

/***/ }),

/***/ "./src/app/components/navigation/header/header.component.html":
/*!********************************************************************!*\
  !*** ./src/app/components/navigation/header/header.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n  <div fxHide.gt-xs>\n    <button\n      mat-icon-button \n      (click)=\"onToggle()\">\n      <i class=\"fas fa-bars\"></i>\n    </button>\n  </div>\n  <div><a><img src=\"../../../../assets/img/Coris_logo.png\" class=\"logo\"></a></div>\n  <div fxFlex fxLayout fxLayoutAlign=\"flex-end\" fxHide.xs>\n    <ul fxLayout fxLayoutGap=\"10px\" class=\"nav-items\">\n      <li><a routerLink=\"/validators\">Validators</a></li>\n      <li><a routerLink=\"/blocks\">Blocks</a></li>\n      <li><a routerLink=\"/txs\">Transactions</a></li>\n    </ul>\n  </div>\n</mat-toolbar>  "

/***/ }),

/***/ "./src/app/components/navigation/header/header.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/components/navigation/header/header.component.ts ***!
  \******************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        this.sidenavToggle = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.onToggle = function () {
        this.sidenavToggle.emit();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], HeaderComponent.prototype, "sidenavToggle", void 0);
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/components/navigation/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/components/navigation/header/header.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/components/navigation/sidenav-list/sidenav-list.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/components/navigation/sidenav-list/sidenav-list.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a {\n  text-decoration: none;\n  color: white;\n}\n\n\na:hover,\na:active {\n  color: lightgray;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9uYXZpZ2F0aW9uL3NpZGVuYXYtbGlzdC9zaWRlbmF2LWxpc3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFxQjtFQUNyQixZQUFZO0FBQ2Q7OztBQUdBOztFQUVFLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbmF2aWdhdGlvbi9zaWRlbmF2LWxpc3Qvc2lkZW5hdi1saXN0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjb2xvcjogd2hpdGU7XG59XG5cblxuYTpob3ZlcixcbmE6YWN0aXZlIHtcbiAgY29sb3I6IGxpZ2h0Z3JheTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/navigation/sidenav-list/sidenav-list.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/components/navigation/sidenav-list/sidenav-list.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-nav-list>\n  <a mat-list-item routerLink=\"/validators\" (click)=\"onSidenavClose()\">\n    <span class=\"nav-elem\">Validators</span>\n  </a>\n  <a mat-list-item routerLink=\"/blocks\" (click)=\"onSidenavClose()\">\n    <span class=\"nav-elem\">Block</span>\n  </a>\n  <a mat-list-item routerLink=\"/txs\" (click)=\"onSidenavClose()\">\n    <span class=\"nav-elem\">Transaction</span>\n  </a>\n</mat-nav-list>"

/***/ }),

/***/ "./src/app/components/navigation/sidenav-list/sidenav-list.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/components/navigation/sidenav-list/sidenav-list.component.ts ***!
  \******************************************************************************/
/*! exports provided: SidenavListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidenavListComponent", function() { return SidenavListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SidenavListComponent = /** @class */ (function () {
    function SidenavListComponent() {
        this.sidenavClose = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    SidenavListComponent.prototype.ngOnInit = function () { };
    SidenavListComponent.prototype.onSidenavClose = function () {
        this.sidenavClose.emit();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SidenavListComponent.prototype, "sidenavClose", void 0);
    SidenavListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sidenav-list',
            template: __webpack_require__(/*! ./sidenav-list.component.html */ "./src/app/components/navigation/sidenav-list/sidenav-list.component.html"),
            styles: [__webpack_require__(/*! ./sidenav-list.component.css */ "./src/app/components/navigation/sidenav-list/sidenav-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SidenavListComponent);
    return SidenavListComponent;
}());



/***/ }),

/***/ "./src/app/components/new-tx/new-tx.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/new-tx/new-tx.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbmV3LXR4L25ldy10eC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/new-tx/new-tx.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/new-tx/new-tx.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p style=\"color:rgb(165, 42, 42);\">\n  Testing Data flow {{txData}}\n</p>\n<p>\n   {{txData|json}}\n</p>\n"

/***/ }),

/***/ "./src/app/components/new-tx/new-tx.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/new-tx/new-tx.component.ts ***!
  \*******************************************************/
/*! exports provided: NewTxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewTxComponent", function() { return NewTxComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_txs_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/txs.service */ "./src/app/services/txs.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var NewTxComponent = /** @class */ (function () {
    function NewTxComponent(txsService, route) {
        this.txsService = txsService;
        this.route = route;
        // @aakatev testing addr
        // delegatorAddr = 'cosmos1pjmngrwcsatsuyy8m3qrunaun67sr9x78qhlvr';
        this.delegatorAddr = '';
        this.delegatorAddr = this.route.snapshot.paramMap.get('delegator');
    }
    NewTxComponent.prototype.initTx = function () {
        var _this = this;
        this.txsService.postData(this.delegatorAddr).then(function (data) {
            _this.txData = data;
        });
    };
    NewTxComponent.prototype.ngOnInit = function () {
        this.initTx();
    };
    NewTxComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-new-tx',
            template: __webpack_require__(/*! ./new-tx.component.html */ "./src/app/components/new-tx/new-tx.component.html"),
            styles: [__webpack_require__(/*! ./new-tx.component.css */ "./src/app/components/new-tx/new-tx.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_txs_service__WEBPACK_IMPORTED_MODULE_2__["TxsService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], NewTxComponent);
    return NewTxComponent;
}());



/***/ }),

/***/ "./src/app/components/tx/tx.component.css":
/*!************************************************!*\
  !*** ./src/app/components/tx/tx.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*-------------------------------------------------*/\n/* Reusable Components */\n/*-------------------------------------------------*/\n.row {\n  max-width: 90%; /*1140px or in %*/\n  margin: 0 auto;\n}\np {\n  padding: 1px;\n}\n/*-------------------------------------------------*/\n/* Paragraphs */\n/*-------------------------------------------------*/\np, tbody {\n  color: white;\n  text-align: left;\n}\ntable {\n  table-layout: fixed;\n  /*width: 100px;*/\n}\ntd, div {\n  overflow: hidden; \n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.card-header {\n  background: #00796B;\n}\ntbody,\n.card,\n.card-table p {\n  background:#0D151F;\n}\n.search-box {\n  margin-bottom: 20px;\n}\n.query-name {\n  -webkit-text-emphasis: bold;\n          text-emphasis: bold;\n  color: #FC7D14;\n}\n.tx-info {\n  margin-left: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy90eC90eC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9EQUFvRDtBQUNwRCx3QkFBd0I7QUFDeEIsb0RBQW9EO0FBRXBEO0VBQ0UsY0FBYyxFQUFFLGlCQUFpQjtFQUNqQyxjQUFjO0FBQ2hCO0FBRUE7RUFDRSxZQUFZO0FBQ2Q7QUFDQSxvREFBb0Q7QUFDcEQsZUFBZTtBQUNmLG9EQUFvRDtBQUNwRDtFQUNFLFlBQVk7RUFDWixnQkFBZ0I7QUFDbEI7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixnQkFBZ0I7QUFDbEI7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCO0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7QUFFQTs7O0VBR0Usa0JBQWtCO0FBQ3BCO0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7QUFFQTtFQUNFLDJCQUFtQjtVQUFuQixtQkFBbUI7RUFDbkIsY0FBYztBQUNoQjtBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy90eC90eC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIFJldXNhYmxlIENvbXBvbmVudHMgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi5yb3cge1xuICBtYXgtd2lkdGg6IDkwJTsgLyoxMTQwcHggb3IgaW4gJSovXG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG5wIHtcbiAgcGFkZGluZzogMXB4O1xufVxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIFBhcmFncmFwaHMgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5wLCB0Ym9keSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxudGFibGUge1xuICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xuICAvKndpZHRoOiAxMDBweDsqL1xufVxuXG50ZCwgZGl2IHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4uY2FyZC1oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiAjMDA3OTZCO1xufVxuXG50Ym9keSxcbi5jYXJkLFxuLmNhcmQtdGFibGUgcCB7XG4gIGJhY2tncm91bmQ6IzBEMTUxRjtcbn1cblxuLnNlYXJjaC1ib3gge1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4ucXVlcnktbmFtZSB7XG4gIHRleHQtZW1waGFzaXM6IGJvbGQ7XG4gIGNvbG9yOiAjRkM3RDE0O1xufVxuXG4udHgtaW5mbyB7XG4gIG1hcmdpbi1sZWZ0OiA4cHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/components/tx/tx.component.html":
/*!*************************************************!*\
  !*** ./src/app/components/tx/tx.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <<<<<<< j -->\n<div class=\"row search-box\">\n  <div class=\"field has-addons\">\n    <div class=\"control\">\n      <input class=\"input\" placeholder = \"Enter tx hash\" #queryInputRef >\n    </div>\n    <div class=\"control\">\n      <a \n        class = \"button is-info\" \n        (click) = 'clickButton(queryInputRef.value)' >\n          Search\n      </a>\n    </div>\n  </div>\n</div>\n\n\n<div class=\"row\">\n  <div *ngIf=\"(tx?.hash); else elseBlock\" class=\"card events-card\">\n          <div class=\"card-header\">\n            <p class=\"card-header-title\"><i class=\"fab fa-codepen\"></i>Tx Height&nbsp;&nbsp;&nbsp;#{{tx.height}}</p>\n          </div>\n\n          <div class=\"row tx-info\">\n              <div class=\"col span-1-of-3\">\n                  <table class=\"table is-fullwidth\">\n                    <tbody>\n                      <tr class=\"query-name\">Hash</tr>\n                      <tr class=\"query-name\">Height</tr>\n                      <tr class=\"query-name\">Gas</tr>\n                      <tr class=\"query-name\">TX</tr>\n                      <tr class=\"query-name\" *ngFor=\"let tag of tx.tagsDecod\">{{tag.key | titlecase }}</tr>\n                    </tbody>\n                    </table>\n              </div>\n              <div class=\"col span-2-of-3\">\n                  <div class=\"card-table table-tx\">\n                      <table class=\"table is-fullwidth\">\n                        <tbody>\n                          <tr>{{tx.hash}}</tr>\n                          <tr>{{tx.height}}</tr>\n                          <tr>{{tx.gasUsed}}/{{tx.gasWanted}}</tr>\n                          <tr>{{tx.txBase64}}</tr>\n                          <tr *ngFor=\"let tag of tx.tagsDecod\">{{tag.value}}</tr>\n                        </tbody>\n                      </table>\n                    </div>\n              </div>\n          </div>\n  </div>\n  <ng-template #elseBlock>No tx found</ng-template>\n</div>"

/***/ }),

/***/ "./src/app/components/tx/tx.component.ts":
/*!***********************************************!*\
  !*** ./src/app/components/tx/tx.component.ts ***!
  \***********************************************/
/*! exports provided: TxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TxComponent", function() { return TxComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../config.js */ "./src/config.js");
/* harmony import */ var _interfaces_tx_interface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../interfaces/tx.interface */ "./src/app/interfaces/tx.interface.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");






var TxComponent = /** @class */ (function () {
    function TxComponent(http, route, router) {
        this.http = http;
        this.route = route;
        this.router = router;
        this.initTxHash();
    }
    TxComponent.prototype.clickButton = function (value) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Debugging @aakatev
                    // console.log(value);
                    return [4 /*yield*/, this.router.navigate(["tx/" + value])];
                    case 1:
                        // Debugging @aakatev
                        // console.log(value);
                        _a.sent();
                        this.queryTx();
                        return [2 /*return*/];
                }
            });
        });
    };
    TxComponent.prototype.initTxHash = function () {
        this.txHash = this.route.snapshot.paramMap.get('hash');
    };
    TxComponent.prototype.ngOnInit = function () {
        this.queryTx();
    };
    TxComponent.prototype.queryTx = function () {
        var _this = this;
        this.initTxHash();
        this.http.get(_config_js__WEBPACK_IMPORTED_MODULE_3__["nodeRpc"] + "/tx_search?query=\"tx.hash='" + this.txHash + "'\"").subscribe(function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var dataTx, dataTagsDecod_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(data['error'] === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, data['result'].txs[0]];
                    case 1:
                        dataTx = _a.sent();
                        dataTagsDecod_1 = [];
                        dataTx.tx_result.tags.forEach(function (tag) {
                            dataTagsDecod_1.push(Object(_interfaces_tx_interface__WEBPACK_IMPORTED_MODULE_4__["decodeTag"])(tag));
                        });
                        this.tx = {
                            hash: dataTx.hash,
                            height: dataTx.height,
                            gasUsed: dataTx.tx_result.gasUsed,
                            gasWanted: dataTx.tx_result.gasWanted,
                            txBase64: dataTx.tx,
                            txDecod: atob(dataTx.tx),
                            tagsBase64: dataTx.tx_result.tags,
                            tagsDecod: dataTagsDecod_1
                        };
                        console.log(this.tx);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    TxComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tx',
            template: __webpack_require__(/*! ./tx.component.html */ "./src/app/components/tx/tx.component.html"),
            styles: [__webpack_require__(/*! ./tx.component.css */ "./src/app/components/tx/tx.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], TxComponent);
    return TxComponent;
}());



/***/ }),

/***/ "./src/app/components/txs/txs.component.css":
/*!**************************************************!*\
  !*** ./src/app/components/txs/txs.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*-------------------------------------------------*/\n/* Reusable Components */\n/*-------------------------------------------------*/\n.row {\n  max-width: 90%;\n  margin: 0 auto;\n\n}\np {\n  padding: 1px;\n}\n.box {\n  padding: 1%;\n}\n/*-------------------------------------------------*/\n/* Table */\n/*-------------------------------------------------*/\ntable {\n  table-layout: fixed;\n  width: 100%;\n  border-collapse: collapse;\n  /* border: 3px solid purple; */\n}\n/* thead th:nth-child(1) {\n  width: 10%;\n}\n\nthead th:nth-child(2) {\n  width: 10%;\n}\n\nthead th:nth-child(3) {\n  width: 20%;\n}\n\nthead th:nth-child(4) {\n  width: 20%;\n} */\nth, td {\n  width: 30%;\n  overflow: hidden; /* to hide anything that doesn't fit in the containing element. */\n  white-space: nowrap; /* to make sure the line doesn't break when it is longer than the containing div. */\n  text-overflow: ellipsis;\n  /* flex: 20%; */\n}\nbutton {\n  margin: 15px;\n}\n.card-header {\n  background: #00796B;\n}\n.card-header p {\n  margin-left: 6px;\n}\ntbody tr:nth-child(odd){\n  background:#0D151F;\n}\ntbody tr:nth-child(even){\n  background:#111923;\n}\np,\ntbody {\n  color: white;\n}\n.td-1 {\n  color: #FC7D14;\n}\n.td-2 {\n  color: #00A58F;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy90eHMvdHhzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0RBQW9EO0FBQ3BELHdCQUF3QjtBQUN4QixvREFBb0Q7QUFDcEQ7RUFDRSxjQUFjO0VBQ2QsY0FBYzs7QUFFaEI7QUFFQTtFQUNFLFlBQVk7QUFDZDtBQUVBO0VBQ0UsV0FBVztBQUNiO0FBRUEsb0RBQW9EO0FBQ3BELFVBQVU7QUFDVixvREFBb0Q7QUFDcEQ7RUFDRSxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLHlCQUF5QjtFQUN6Qiw4QkFBOEI7QUFDaEM7QUFFQTs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUVIO0VBQ0UsVUFBVTtFQUNWLGdCQUFnQixFQUFFLGlFQUFpRTtFQUNuRixtQkFBbUIsRUFBRSxtRkFBbUY7RUFDeEcsdUJBQXVCO0VBQ3ZCLGVBQWU7QUFDakI7QUFFQTtFQUNFLFlBQVk7QUFDZDtBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCO0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjtBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCO0FBRUE7O0VBRUUsWUFBWTtBQUNkO0FBRUE7RUFDRSxjQUFjO0FBQ2hCO0FBRUE7RUFDRSxjQUFjO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy90eHMvdHhzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogUmV1c2FibGUgQ29tcG9uZW50cyAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi5yb3cge1xuICBtYXgtd2lkdGg6IDkwJTtcbiAgbWFyZ2luOiAwIGF1dG87XG5cbn1cblxucCB7XG4gIHBhZGRpbmc6IDFweDtcbn1cblxuLmJveCB7XG4gIHBhZGRpbmc6IDElO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogVGFibGUgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG50YWJsZSB7XG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICAvKiBib3JkZXI6IDNweCBzb2xpZCBwdXJwbGU7ICovXG59XG5cbi8qIHRoZWFkIHRoOm50aC1jaGlsZCgxKSB7XG4gIHdpZHRoOiAxMCU7XG59XG5cbnRoZWFkIHRoOm50aC1jaGlsZCgyKSB7XG4gIHdpZHRoOiAxMCU7XG59XG5cbnRoZWFkIHRoOm50aC1jaGlsZCgzKSB7XG4gIHdpZHRoOiAyMCU7XG59XG5cbnRoZWFkIHRoOm50aC1jaGlsZCg0KSB7XG4gIHdpZHRoOiAyMCU7XG59ICovXG5cbnRoLCB0ZCB7XG4gIHdpZHRoOiAzMCU7XG4gIG92ZXJmbG93OiBoaWRkZW47IC8qIHRvIGhpZGUgYW55dGhpbmcgdGhhdCBkb2Vzbid0IGZpdCBpbiB0aGUgY29udGFpbmluZyBlbGVtZW50LiAqL1xuICB3aGl0ZS1zcGFjZTogbm93cmFwOyAvKiB0byBtYWtlIHN1cmUgdGhlIGxpbmUgZG9lc24ndCBicmVhayB3aGVuIGl0IGlzIGxvbmdlciB0aGFuIHRoZSBjb250YWluaW5nIGRpdi4gKi9cbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIC8qIGZsZXg6IDIwJTsgKi9cbn1cblxuYnV0dG9uIHtcbiAgbWFyZ2luOiAxNXB4O1xufVxuXG4uY2FyZC1oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiAjMDA3OTZCO1xufVxuXG4uY2FyZC1oZWFkZXIgcCB7XG4gIG1hcmdpbi1sZWZ0OiA2cHg7XG59XG5cbnRib2R5IHRyOm50aC1jaGlsZChvZGQpe1xuICBiYWNrZ3JvdW5kOiMwRDE1MUY7XG59XG5cbnRib2R5IHRyOm50aC1jaGlsZChldmVuKXtcbiAgYmFja2dyb3VuZDojMTExOTIzO1xufVxuXG5wLFxudGJvZHkge1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi50ZC0xIHtcbiAgY29sb3I6ICNGQzdEMTQ7XG59XG5cbi50ZC0yIHtcbiAgY29sb3I6ICMwMEE1OEY7XG59Il19 */"

/***/ }),

/***/ "./src/app/components/txs/txs.component.html":
/*!***************************************************!*\
  !*** ./src/app/components/txs/txs.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"field has-addons\">\n    <div class=\"control\">\n      <input class=\"input\" placeholder = \"Enter tx hash\" #queryInputRef >\n    </div>\n    <div class=\"control\">\n      <a \n        class = \"button is-info\" \n        (click) = 'clickButton(queryInputRef.value)' >\n          Search\n      </a>\n    </div>\n  </div>\n  <div class=\"card events-card\">\n    <header class=\"card-header\">\n      <p class=\"card-header-title\"><i class=\"fas fa-exchange-alt\"></i>Transactions</p>\n<!--       <a routerLink=\"/new/tx\" class=\"pagination-next button is-primary\">New</a> -->\n    </header>\n    <div class=\"card-table\">\n      <table class=\"table is-fullwidth\">\n        <thead>\n          <tr>\n            <th>Hash</th>\n            <th>Type</th>\n            <th>Fee</th>\n            <th>Height</th>\n            <th>Timestamp (UTC)</th>\n          </tr>\n        </thead>\n        <tbody>\n        </tbody>\n          <tr *ngIf=\"!txs?.length\">\n            <td style=\"color: black\">No recent txs</td>\n          </tr>\n          <tr routerLink=\"/tx/{{tx.hash}}\" class=\"clickable\" *ngFor=\"let tx of txs\">\n            <td class=\"td-1\">{{tx.hash}}</td>\n            <td *ngIf=\"tx.tagsDecod\" class=\"td-2\">{{tx.tagsDecod[0].value | titlecase}}</td>\n            <td>{{tx.gasUsed}}</td>\n            <td class=\"td-1\">{{tx.height}}</td>\n            <td>{{'Add time'}}</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n  <nav class=\"pagination\" role=\"navigation\" aria-label=\"pagination\">\n    <button (click)=\"displayOlderTxs()\" id=\"btn-older\" class=\"pagination-next button is-dark\">Older</button>\n  </nav>\n</div>\n"

/***/ }),

/***/ "./src/app/components/txs/txs.component.ts":
/*!*************************************************!*\
  !*** ./src/app/components/txs/txs.component.ts ***!
  \*************************************************/
/*! exports provided: TxsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TxsComponent", function() { return TxsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../config.js */ "./src/config.js");
/* harmony import */ var _interfaces_tx_interface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../interfaces/tx.interface */ "./src/app/interfaces/tx.interface.ts");








var TxsComponent = /** @class */ (function () {
    function TxsComponent(http, document, router) {
        this.http = http;
        this.router = router;
        this.minHeight = 0;
        this.lastBlock = 0;
        // @aakatev TODO lookup how to query more than 30 txs at json
        this.blocksToScan = 3000;
    }
    TxsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get(_config_js__WEBPACK_IMPORTED_MODULE_5__["nodeRpc"] + "/status").subscribe(function (data) {
            _this.lastBlock = data['result'].sync_info.latest_block_height;
            _this.minHeight = _this.lastBlock - _this.blocksToScan;
            _this.clearTxs();
            _this.fetchTxs();
        });
    };
    TxsComponent.prototype.clearTxs = function () {
        this.txs = [];
    };
    TxsComponent.prototype.clickButton = function (value) {
        console.log(value);
        this.router.navigate(["tx/" + value]);
    };
    TxsComponent.prototype.fetchTxs = function () {
        var _this = this;
        document.getElementById('btn-older').classList.add('is-loading');
        this.http.get(_config_js__WEBPACK_IMPORTED_MODULE_5__["nodeRpc"] + "/tx_search?query=\"tx.height>" + this.minHeight + "\"").subscribe(function (data) {
            // console.log(`${nodeRpc}/tx_search?query="tx.height>${this.minHeight}"`);
            var currTxs = data['result'].txs.reverse();
            console.log(data['result'].txs);
            currTxs.forEach(function (dataTx) {
                if (dataTx.height < _this.minHeight + _this.blocksToScan) {
                    // const dataTx = await data['result'].txs[0];
                    var dataTagsDecod_1 = [];
                    // Debugging
                    // console.log(dataTx);
                    if (dataTx.tx_result.tags) {
                        dataTx.tx_result.tags.forEach(function (tag) {
                            dataTagsDecod_1.push(Object(_interfaces_tx_interface__WEBPACK_IMPORTED_MODULE_6__["decodeTag"])(tag));
                        });
                    }
                    else {
                        // @aakatev TODO add handling to other faulty txs
                        var errValue = "faulty";
                        if (dataTx.tx_result.code === 12) {
                            errValue = "Out of gas(Wanted: " + dataTx.tx_result.gasWanted + ")";
                        }
                        // Debugging
                        // console.log("Faulty_tx", dataTx);
                        dataTagsDecod_1.push({
                            key: "type",
                            value: errValue
                        });
                    }
                    // console.log(dataTagsDecod);
                    // console.log(this.decodeTag(dataTx.tx_result.tags[1]));
                    _this.txs.push({
                        hash: dataTx.hash,
                        height: dataTx.height,
                        gasUsed: dataTx.tx_result.gasUsed,
                        gasWanted: dataTx.tx_result.gasWanted,
                        txBase64: dataTx.tx,
                        txDecod: atob(dataTx.tx),
                        tagsBase64: dataTx.tx_result.tags,
                        tagsDecod: dataTagsDecod_1
                    });
                }
            });
            if (_this.txs.length > 0) {
                console.log(_this.txs);
            }
            document.getElementById('btn-older').classList.remove('is-loading');
        });
    };
    // TODO: Double check whether this fxn is inclusive
    TxsComponent.prototype.displayOlderTxs = function () {
        this.minHeight -= this.blocksToScan;
        this.fetchTxs();
    };
    TxsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-txs',
            template: __webpack_require__(/*! ./txs.component.html */ "./src/app/components/txs/txs.component.html"),
            styles: [__webpack_require__(/*! ./txs.component.css */ "./src/app/components/txs/txs.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], Object, _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], TxsComponent);
    return TxsComponent;
}());



/***/ }),

/***/ "./src/app/components/validator/validator.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/validator/validator.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvdmFsaWRhdG9yL3ZhbGlkYXRvci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/validator/validator.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/validator/validator.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div \n  *ngIf=\"selectedValidator!==-1\"\n  class=\"card events-card\">\n    <div class=\"card-table\">\n      <div class=\"content\">\n        <article class=\"message\">\n          <div class=\"message-header\">\n            <i class=\"fab fa-codepen\"></i>\n            <p>Validator</p>\n          </div>\n          <div class=\"message-body\">\n            <!-- <h3>Validator {{(appState | async).validators[selectedValidator].data?.description.moniker}}</h3>\n            <h4>Address: {{(appState | async).validators[selectedValidator].address}}</h4>\n            <h4>Operator: Address {{(appState | async).validators[selectedValidator].data?.operator_address}}</h4>\n            <h4>Description</h4>\n            <p>Details {{(appState | async).validators[selectedValidator].data?.description.details}}</p>\n            <p>Website {{(appState | async).validators[selectedValidator].data?.description.website}}</p>\n            <h4>Info</h4>\n            <p>Tokens {{(appState | async).validators[selectedValidator].data?.tokens}}</p>\n            <p>Jailed? {{(appState | async).validators[selectedValidator].data?.jailed}}</p>\n            <h4>Comission</h4>\n            <p>Max. change rate {{(appState | async).validators[selectedValidator].data?.commission.max_change_rate}}</p>\n            <p>Max. rate {{(appState | async).validators[selectedValidator].data?.commission.max_rate}}</p>\n            <p>Rate {{(appState | async).validators[selectedValidator].data?.commission.rate}}</p>\n            <h3>Delegations</h3>\n            <div *ngFor=\"let deleg of delegationInfo; let i = index\">\n              <h4>{{i+1}}. Accounts</h4> \n              <p>{{deleg.delegator_address}}</p>  \n              <p>Shares {{deleg.shares}}</p>  \n              <a class=\"button is-dark\" routerLink=\"/new/tx/{{deleg.delegator_address}}\">Delegate</a>\n              <h5>Txs</h5>\n              <div *ngFor=\"let tx of deleg.txs; let i2 = index\">\n                <p>Hash {{tx.txhash}}</p>\n                <p>Height {{tx.height}}</p>\n                <a routerLink=\"/tx/{{tx.txhash}}\">View</a>\n              </div>\n              <br>\n            </div> -->\n            <table class=\"table is-fullwidth is-striped\">\n              <tbody>\n                <tr>\n                  <th><a (click)=\"showHideElem()\">Pub Keys</a></th>\n                </tr>  \n                <div *ngIf=\"(appState | async).validators[selectedValidator].keys!==undefined\" [style.display]=\"displayKeys ? 'flex': 'none'\" id=\"precommits\">\n                  <tr><td>ADDRESS {{(appState | async).validators[selectedValidator].keys?.Addres}}</td></tr>\n                  <tr><td>BECH32 ACC {{(appState | async).validators[selectedValidator].keys['Bech32 Acc']}}</td></tr>\n                  <tr><td>BECH32 VAL CONSEN {{(appState | async).validators[selectedValidator].keys['Bech32 Validator Consensus']}}</td></tr>\n                  <tr><td>BECH32 VAL OPERATOR {{(appState | async).validators[selectedValidator].keys['Bech32 Validator Operator']}}</td></tr>\n                  <tr><td>HEX {{(appState | async).validators[selectedValidator].keys['Hex']}}</td></tr>\n                  <tr><td>Tendermint ed25519 {{(appState | async).validators[selectedValidator].keys['JSON (base64)'].value}}</td></tr>\n                </div>\n                <tr>\n                  <th routerLink=\"/validators\" fragment=\"{{(appState | async).validators[selectedValidator].keys?.Addres}}\"><a>Back</a></th>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </article>\n      </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/validator/validator.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/validator/validator.component.ts ***!
  \*************************************************************/
/*! exports provided: ValidatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidatorComponent", function() { return ValidatorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");





var ValidatorComponent = /** @class */ (function () {
    function ValidatorComponent(store, route, http) {
        this.store = store;
        this.route = route;
        this.http = http;
        this.displayKeys = false;
        this.selectedValidator = -1;
        this.delegationInfo = [];
    }
    ValidatorComponent.prototype.getDelegations = function (cosmosValoperAddr) {
        var _this = this;
        this.http.get("https://aakatev.me/node_txs/staking/validators/" + cosmosValoperAddr + "/delegations").subscribe(function (data) {
            _this.delegationInfo = data;
            for (var i = 0; i < _this.delegationInfo.length; i++) {
                _this.getTxs(_this.delegationInfo[i].delegator_address, i);
            }
        });
    };
    ValidatorComponent.prototype.getTxs = function (cosmosDelegAddr, delegIndex) {
        var _this = this;
        this.http.get("https://aakatev.me/node_txs/staking/delegators/" + cosmosDelegAddr + "/txs").subscribe(function (data) {
            _this.delegationInfo[delegIndex]['txs'] = data;
        });
    };
    ValidatorComponent.prototype.findValidator = function (validators) {
        for (var validator_index in validators) {
            if (validators[validator_index].keys !== undefined
                && validators[validator_index].keys.Addres === this.route.snapshot.paramMap.get('address')) {
                this.selectedValidator = Number(validator_index);
                // Debugging @aakatev
                this.getDelegations(validators[this.selectedValidator].operator_address);
                // console.log(this.delegationService.getDelegationInfo());
                // console.log(this.selectedValidator);
            }
        }
        // TODO figuire how to unsubscribe
        // this.subscription.unsubscribe();
    };
    ValidatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appState = this.store.select('App');
        this.subscription = this.appState.subscribe(function (currentState) {
            if (currentState.validators.length !== 0 && _this.selectedValidator === -1) {
                console.log(currentState.validators);
                _this.findValidator(currentState.validators);
            }
        });
    };
    ValidatorComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.selectedValidator = -1;
    };
    ValidatorComponent.prototype.showHideElem = function () {
        this.displayKeys = !this.displayKeys;
    };
    ValidatorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-validator',
            template: __webpack_require__(/*! ./validator.component.html */ "./src/app/components/validator/validator.component.html"),
            styles: [__webpack_require__(/*! ./validator.component.css */ "./src/app/components/validator/validator.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]])
    ], ValidatorComponent);
    return ValidatorComponent;
}());



/***/ }),

/***/ "./src/app/components/validators/validators.component.css":
/*!****************************************************************!*\
  !*** ./src/app/components/validators/validators.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*-------------------------------------------------*/\n/* Reusable Components */\n/*-------------------------------------------------*/\n.row {\n  max-width: 90%;\n  margin: 0 auto;\n}\np {\n  padding: 1px;\n}\n/*-------------------------------------------------*/\n/* Table */\n/*-------------------------------------------------*/\ntable {\n  table-layout: fixed;\n  width: 100%;\n  border-collapse: collapse;\n  /* border: 3px solid purple; */\n}\ntd {\n  overflow: hidden; /* to hide anything that doesn't fit in the containing element. */\n  white-space: nowrap; /* to make sure the line doesn't break when it is longer than the containing div. */\n  text-overflow: ellipsis;\n  text-align: left;\n}\n/* thead th:nth-child(1) {\n  width: 10%;\n}\n\nthead th:nth-child(2) {\n  width: 10%;\n}\n\nthead th:nth-child(3) {\n  width: 20%;\n}\n\nthead th:nth-child(4) {\n  width: 20%;\n} */\nth, td {\n  padding: 20px;\n}\ntbody tr:nth-child(odd){\n  background:#0D151F;\n}\ntbody tr:nth-child(even){\n  background:#111923;\n}\n.validator-card{\n  padding: 1rem;\n}\n.validator_body{\n  box-shadow: inset 0 0 10px rgb(24, 24, 24);\n}\n.validator-card-header{\n  background: #00796B;\n  color: #F7F7F7;\n  display: flex;\n  align-items: center;\n  padding: 1rem;\n}\n.validator-card-text{\n  /* background: #36393F; */\n  color: #F7F7F7;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  \n}\n.validator__text--body{\n  display: flex;\n  width: 100%;\n}\n.validator__text--body :first-child{\n  font-weight: bold;\n  font-size: 105%;\n  width: 25%;\n}\nbutton {\n  margin: 15px;\n}\n.card-header {\n  background: #00796B;\n}\n.card-header p {\n  margin-left: 6px;\n}\np,\ntbody {\n  color: white;\n}\n.td-1 {\n  color: #FC7D14;\n}\n.td-2 {\n  color: white;\n}\n.avatar {\n  size: 50%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy92YWxpZGF0b3JzL3ZhbGlkYXRvcnMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvREFBb0Q7QUFDcEQsd0JBQXdCO0FBQ3hCLG9EQUFvRDtBQUNwRDtFQUNFLGNBQWM7RUFDZCxjQUFjO0FBQ2hCO0FBRUE7RUFDRSxZQUFZO0FBQ2Q7QUFFQSxvREFBb0Q7QUFDcEQsVUFBVTtBQUNWLG9EQUFvRDtBQUNwRDtFQUNFLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLDhCQUE4QjtBQUNoQztBQUVBO0VBQ0UsZ0JBQWdCLEVBQUUsaUVBQWlFO0VBQ25GLG1CQUFtQixFQUFFLG1GQUFtRjtFQUN4Ryx1QkFBdUI7RUFDdkIsZ0JBQWdCO0FBQ2xCO0FBRUE7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFFSDtFQUNFLGFBQWE7QUFDZjtBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCO0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLGFBQWE7QUFDZjtBQUVBO0VBQ0UsMENBQTBDO0FBQzVDO0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsY0FBYztFQUNkLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsYUFBYTtBQUNmO0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsY0FBYztFQUNkLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0JBQXNCOztBQUV4QjtBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjtBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixVQUFVO0FBQ1o7QUFFQTtFQUNFLFlBQVk7QUFDZDtBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCO0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7QUFFQTs7RUFFRSxZQUFZO0FBQ2Q7QUFFQTtFQUNFLGNBQWM7QUFDaEI7QUFFQTtFQUNFLFlBQVk7QUFDZDtBQUVBO0VBQ0UsU0FBUztBQUNYIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy92YWxpZGF0b3JzL3ZhbGlkYXRvcnMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBSZXVzYWJsZSBDb21wb25lbnRzICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLnJvdyB7XG4gIG1heC13aWR0aDogOTAlO1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxucCB7XG4gIHBhZGRpbmc6IDFweDtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIFRhYmxlICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xudGFibGUge1xuICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgLyogYm9yZGVyOiAzcHggc29saWQgcHVycGxlOyAqL1xufVxuXG50ZCB7XG4gIG92ZXJmbG93OiBoaWRkZW47IC8qIHRvIGhpZGUgYW55dGhpbmcgdGhhdCBkb2Vzbid0IGZpdCBpbiB0aGUgY29udGFpbmluZyBlbGVtZW50LiAqL1xuICB3aGl0ZS1zcGFjZTogbm93cmFwOyAvKiB0byBtYWtlIHN1cmUgdGhlIGxpbmUgZG9lc24ndCBicmVhayB3aGVuIGl0IGlzIGxvbmdlciB0aGFuIHRoZSBjb250YWluaW5nIGRpdi4gKi9cbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi8qIHRoZWFkIHRoOm50aC1jaGlsZCgxKSB7XG4gIHdpZHRoOiAxMCU7XG59XG5cbnRoZWFkIHRoOm50aC1jaGlsZCgyKSB7XG4gIHdpZHRoOiAxMCU7XG59XG5cbnRoZWFkIHRoOm50aC1jaGlsZCgzKSB7XG4gIHdpZHRoOiAyMCU7XG59XG5cbnRoZWFkIHRoOm50aC1jaGlsZCg0KSB7XG4gIHdpZHRoOiAyMCU7XG59ICovXG5cbnRoLCB0ZCB7XG4gIHBhZGRpbmc6IDIwcHg7XG59XG5cbnRib2R5IHRyOm50aC1jaGlsZChvZGQpe1xuICBiYWNrZ3JvdW5kOiMwRDE1MUY7XG59XG5cbnRib2R5IHRyOm50aC1jaGlsZChldmVuKXtcbiAgYmFja2dyb3VuZDojMTExOTIzO1xufVxuXG4udmFsaWRhdG9yLWNhcmR7XG4gIHBhZGRpbmc6IDFyZW07XG59XG5cbi52YWxpZGF0b3JfYm9keXtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDEwcHggcmdiKDI0LCAyNCwgMjQpO1xufVxuXG4udmFsaWRhdG9yLWNhcmQtaGVhZGVye1xuICBiYWNrZ3JvdW5kOiAjMDA3OTZCO1xuICBjb2xvcjogI0Y3RjdGNztcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuLnZhbGlkYXRvci1jYXJkLXRleHR7XG4gIC8qIGJhY2tncm91bmQ6ICMzNjM5M0Y7ICovXG4gIGNvbG9yOiAjRjdGN0Y3O1xuICBwYWRkaW5nOiAxcmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBcbn1cblxuLnZhbGlkYXRvcl9fdGV4dC0tYm9keXtcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi52YWxpZGF0b3JfX3RleHQtLWJvZHkgOmZpcnN0LWNoaWxke1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiAxMDUlO1xuICB3aWR0aDogMjUlO1xufVxuXG5idXR0b24ge1xuICBtYXJnaW46IDE1cHg7XG59XG5cbi5jYXJkLWhlYWRlciB7XG4gIGJhY2tncm91bmQ6ICMwMDc5NkI7XG59XG5cbi5jYXJkLWhlYWRlciBwIHtcbiAgbWFyZ2luLWxlZnQ6IDZweDtcbn1cblxucCxcbnRib2R5IHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4udGQtMSB7XG4gIGNvbG9yOiAjRkM3RDE0O1xufVxuXG4udGQtMiB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmF2YXRhciB7XG4gIHNpemU6IDUwJTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/validators/validators.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/components/validators/validators.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"field is-grouped\">\n    <p class=\"control\">\n        <a \n        class=\"button is-primary tag\" \n        (click)=\"sortByPower()\"\n        style=\"font-size: 2rem;\">\n          Sort By Power\n      </a>\n    </p>\n  </div>\n\n  <!-- <div\n    *ngFor=\"let validator of (appState | async).validators\"\n    class=\"validator-card\"\n    id=\"{{validator.keys?.Addres}}\">\n      <article class=\"validator_body\">\n\n        <div class=\"validator-card-header\">\n          <i *ngIf=\"!validator.jailed\" class=\"fas fa-user-check\"></i>\n          <i *ngIf=\"validator.jailed\" class=\"fas fa-skull-crossbones\"><span style=\"padding-left: 5px;\">jailed</span></i>\n          <p>Validator</p>\n        </div>\n\n        <div class=\"validator-card-text\">\n          \n          <figure class=\"image is-128x128\" *ngIf=\"validator.keybase\">\n            <img  *ngIf=\"!validator.picture; else elseBlock\" \n              src=\"https://ui-avatars.com/api/?size=128&name={{validator.description.moniker}}\" \n              alt=\"avatar\"\n            >\n            <ng-template #elseBlock>\n              <img src=\"{{validator.picture}}\" alt=\"avatar\">\n            </ng-template>\n          </figure>\n\n          <div class=\"validator__text--body\">\n            <p>Moniker:</p>\n            <p>{{validator.description.moniker}}</p>\n          </div>\n\n          <div class=\"validator__text--body\">\n              <p>Tokens:</p>\n              <p>{{validator.tokens}}</p>\n              <br>\n          </div>\n\n          <div class=\"validator__text--body\">\n              <p>Commits:</p>\n              <p \n                *ngFor=\"let block of (appState | async).blocks.slice(0,1)\"\n                class=\"title chain-queries-title\"\n                [innerHTML]=\n                  \"block.header?.height !== null \n                  ? (block.header.height-validator.slashing?.start_height-validator.slashing?.missed_blocks_counter) : 0\">\n              </p>\n          </div>\n\n          <table class=\"\">\n            <tbody>\n              <tr>\n                <th><a routerLink=\"/validator/{{validator.keys?.Addres}}\">Learn more</a></th>\n              </tr>\n            </tbody>\n          </table>\n\n        </div>\n      </article>\n  </div> -->\n\n  <div class=\"card events-card\">\n      <div class=\"card-header\">\n        <p class=\"card-header-title\"><i class=\"fas fa-vector-square\"></i>Validators</p>\n      </div>\n      <div class=\"card-table\">\n          <table class=\"table is-fullwidth\">\n            <thead>\n              <tr>\n                <th >Name</th>\n                <th>Status/Uptime</th>\n                <th>Voting Weight</th>\n                <th>Precommits</th>\n                <th>Self-bond</th>\n                <th>Commission</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let validator of (appState | async).validators\"\n              class=\"validator-card\"\n              id=\"{{validator.keys?.Addres}}\">\n                <td class=\"td-1\">\n                  <div class=\"col span-1-of-2\">\n                      <figure class=\"validatoe-avatar is-128x128\" *ngIf=\"validator.keybase\">\n                          <img  *ngIf=\"!validator.picture; else elseBlock\" \n                            src=\"https://ui-avatars.com/api/?size=50&name={{validator.description.moniker}}\" \n                            alt=\"avatar\"\n                          >\n                          <ng-template #elseBlock>\n                            <img src=\"{{validator.picture}}\" alt=\"avatar\">\n                          </ng-template>\n                      </figure>\n                  </div>\n                  <div class=\"col span-1-of-2\">\n                      {{validator.description.moniker}}\n                  </div>\n                </td>\n                <td class=\"td-2\">\n                  <span *ngIf=\"validator.jailed\">Jailed</span>\n                  <span *ngIf=\"!validator.jailed\">Not-Jailed</span>\n                  <br>\n                  <span\n                    *ngFor=\"let block of (appState | async).blocks.slice(0,1)\"\n                    [innerHTML]=\n                    \"block.header?.height !== null\n                    ? 100-validator.slashing?.missed_blocks_counter/(block.header.height-validator.slashing?.start_height) : 0\"></span>\n                </td>\n                <td class=\"td-1\">{{validator.tokens}}<br>Weight%</td>\n                <td class=\"td-2\"\n                *ngFor=\"let block of (appState | async).blocks.slice(0,1)\"\n                class=\"title chain-queries-title\"\n                [innerHTML]=\n                  \"block.header?.height !== null \n                  ? (block.header.height-validator.slashing?.start_height-validator.slashing?.missed_blocks_counter) : 0\">\n                </td>\n                <td class=\"td-2\">in token<br>in %</td>\n                <td class=\"td-2\">{{validator.commission?.rate}}</td>\n                <!-- <td><a class=\"button is-small is-primary\" href=\"#\">{{validator.power}}</a></td> -->\n              </tr>\n            </tbody>\n          </table>\n      </div>\n  </div>\n  \n\n</div>\n\n\n\n"

/***/ }),

/***/ "./src/app/components/validators/validators.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/validators/validators.component.ts ***!
  \***************************************************************/
/*! exports provided: ValidatorsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidatorsComponent", function() { return ValidatorsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_validators_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/validators.service */ "./src/app/services/validators.service.ts");





var ValidatorsComponent = /** @class */ (function () {
    function ValidatorsComponent(store, route, validatorsService) {
        this.store = store;
        this.route = route;
        this.validatorsService = validatorsService;
        this.fragment = null;
        this.valsUptime = new Map;
    }
    ValidatorsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appState = this.store.select('App');
        this.route.fragment.subscribe(function (fragment) { _this.fragment = fragment; });
        // this.appState.subscribe(data => {
        //   data.validators.forEach(validator => {
        //     if(validator['slashing']) {
        //       console.log(
        //         validator['slashing']['missed_blocks_counter']/
        //         (data.blocks.slice(0,1)[0]['header']['height'] - 
        //         validator['slashing']['start_height'])
        //       );
        //     }
        //   })
        // })
    };
    ValidatorsComponent.prototype.sortByPower = function () {
        this.validatorsService.sortValidators("tokens");
    };
    ValidatorsComponent.prototype.sortByPriority = function () {
        this.validatorsService.sortValidators("proposer_priority");
    };
    ValidatorsComponent.prototype.ngAfterViewInit = function () {
        try {
            if (this.fragment) {
                document.querySelector('#' + this.fragment).scrollIntoView();
            }
        }
        catch (e) {
            // @aakatev hacky way of handling terminal errors dump
            // TODO look for a better solution later
        }
    };
    ValidatorsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-validators',
            template: __webpack_require__(/*! ./validators.component.html */ "./src/app/components/validators/validators.component.html"),
            styles: [__webpack_require__(/*! ./validators.component.css */ "./src/app/components/validators/validators.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _services_validators_service__WEBPACK_IMPORTED_MODULE_4__["ValidatorsService"]])
    ], ValidatorsComponent);
    return ValidatorsComponent;
}());



/***/ }),

/***/ "./src/app/interfaces/tx.interface.ts":
/*!********************************************!*\
  !*** ./src/app/interfaces/tx.interface.ts ***!
  \********************************************/
/*! exports provided: decodeTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeTag", function() { return decodeTag; });
function decodeTag(tagsBase64) {
    return ({
        key: atob(tagsBase64.key),
        value: atob(tagsBase64.value)
    });
}


/***/ }),

/***/ "./src/app/lib/bech32.ts":
/*!*******************************!*\
  !*** ./src/app/lib/bech32.ts ***!
  \*******************************/
/*! exports provided: decodeBech32, encodeBech32, toWords, fromWords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeBech32", function() { return decodeBech32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeBech32", function() { return encodeBech32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toWords", function() { return toWords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromWords", function() { return fromWords; });
var ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
// pre-compute lookup table
var ALPHABET_MAP = {};
for (var z = 0; z < ALPHABET.length; z++) {
    var x = ALPHABET.charAt(z);
    if (ALPHABET_MAP[x] !== undefined)
        throw new TypeError(x + ' is ambiguous');
    ALPHABET_MAP[x] = z;
}
function polymodStep(pre) {
    var b = pre >> 25;
    return ((pre & 0x1FFFFFF) << 5) ^
        (-((b >> 0) & 1) & 0x3b6a57b2) ^
        (-((b >> 1) & 1) & 0x26508e6d) ^
        (-((b >> 2) & 1) & 0x1ea119fa) ^
        (-((b >> 3) & 1) & 0x3d4233dd) ^
        (-((b >> 4) & 1) & 0x2a1462b3);
}
function prefixChk(prefix) {
    var chk = 1;
    for (var i = 0; i < prefix.length; ++i) {
        var c = prefix.charCodeAt(i);
        if (c < 33 || c > 126)
            throw new Error('Invalid prefix (' + prefix + ')');
        chk = polymodStep(chk) ^ (c >> 5);
    }
    chk = polymodStep(chk);
    for (i = 0; i < prefix.length; ++i) {
        var v = prefix.charCodeAt(i);
        chk = polymodStep(chk) ^ (v & 0x1f);
    }
    return chk;
}
function encodeBech32(prefix, words, LIMIT) {
    if (LIMIT === void 0) { LIMIT = 90; }
    if ((prefix.length + 7 + words.length) > LIMIT)
        throw new TypeError('Exceeds length limit');
    prefix = prefix.toLowerCase();
    // determine chk mod
    var chk = prefixChk(prefix);
    var result = prefix + '1';
    for (var i = 0; i < words.length; ++i) {
        var x = words[i];
        if ((x >> 5) !== 0)
            throw new Error('Non 5-bit word');
        chk = polymodStep(chk) ^ x;
        result += ALPHABET.charAt(x);
    }
    for (i = 0; i < 6; ++i) {
        chk = polymodStep(chk);
    }
    chk ^= 1;
    for (i = 0; i < 6; ++i) {
        var v = (chk >> ((5 - i) * 5)) & 0x1f;
        result += ALPHABET.charAt(v);
    }
    return result;
}
function decodeBech32(str, LIMIT) {
    if (LIMIT === void 0) { LIMIT = 90; }
    if (str.length < 8)
        throw new TypeError(str + ' too short');
    if (str.length > LIMIT)
        throw new TypeError('Exceeds length limit');
    // don't allow mixed case
    var lowered = str.toLowerCase();
    var uppered = str.toUpperCase();
    if (str !== lowered && str !== uppered)
        throw new Error('Mixed-case string ' + str);
    str = lowered;
    var split = str.lastIndexOf('1');
    if (split === -1)
        throw new Error('No separator character for ' + str);
    if (split === 0)
        throw new Error('Missing prefix for ' + str);
    var prefix = str.slice(0, split);
    var wordChars = str.slice(split + 1);
    if (wordChars.length < 6)
        throw new Error('Data too short');
    var chk = prefixChk(prefix);
    var words = [];
    for (var i = 0; i < wordChars.length; ++i) {
        var c = wordChars.charAt(i);
        var v = ALPHABET_MAP[c];
        if (v === undefined)
            throw new Error('Unknown character ' + c);
        chk = polymodStep(chk) ^ v;
        // not in the checksum?
        if (i + 6 >= wordChars.length)
            continue;
        words.push(v);
    }
    if (chk !== 1)
        throw new Error('Invalid checksum for ' + str);
    return { prefix: prefix, words: words };
}
function convert(data, inBits, outBits, pad) {
    var value = 0;
    var bits = 0;
    var maxV = (1 << outBits) - 1;
    var result = [];
    for (var i = 0; i < data.length; ++i) {
        value = (value << inBits) | data[i];
        bits += inBits;
        while (bits >= outBits) {
            bits -= outBits;
            result.push((value >> bits) & maxV);
        }
    }
    if (pad) {
        if (bits > 0) {
            result.push((value << (outBits - bits)) & maxV);
        }
    }
    else {
        if (bits >= inBits)
            throw new Error('Excess padding');
        if ((value << (outBits - bits)) & maxV)
            throw new Error('Non-zero padding');
    }
    return result;
}
function toWords(bytes) {
    return convert(bytes, 8, 5, true);
}
function fromWords(words) {
    return convert(words, 5, 8, false);
}



/***/ }),

/***/ "./src/app/lib/hex.ts":
/*!****************************!*\
  !*** ./src/app/lib/hex.ts ***!
  \****************************/
/*! exports provided: hex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hex", function() { return hex; });
var hex = {
    hexToBytes: function (hex) {
        var bytes = [];
        for (var c = 0; c < hex.length; c += 2) {
            bytes.push(parseInt(hex.substr(c, 2), 16));
        }
        return bytes;
    },
    bytesToHex: function (bytes) {
        var hex = [];
        for (var i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join("").toUpperCase();
    },
    stringToHex: function (str) {
        var bytes = [];
        for (var i = 0; i < str.length; i++) {
            bytes.push(str.charCodeAt(i).toString(16));
        }
        return bytes.join("");
    },
    isHex: function (str) {
        str = str.replace("0x", "");
        return /^[0-9a-fA-F]*$/i.test(str);
    }
};



/***/ }),

/***/ "./src/app/material.module.ts":
/*!************************************!*\
  !*** ./src/app/material.module.ts ***!
  \************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");



var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatOptionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"]
            ],
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatOptionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"]
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "./src/app/services/txs.service.ts":
/*!*****************************************!*\
  !*** ./src/app/services/txs.service.ts ***!
  \*****************************************/
/*! exports provided: TxsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TxsService", function() { return TxsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



// import { Observable, of } from 'rxjs';
// import { nodeRpc, nodeWs, nodeRpcTest } from '../../config.js'
var TxsService = /** @class */ (function () {
    function TxsService(http) {
        this.http = http;
    }
    TxsService.prototype.postData = function (delegatorAddr) {
        var _this = this;
        return new Promise(function (resolve) {
            var postOptions = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                    'Content-Type': 'application/json'
                })
            };
            var postBody = {
                "base_req": {
                    "from": "" + delegatorAddr,
                    "memo": "test",
                    "chain_id": "gaia-13002",
                    "account_number": "0",
                    "sequence": "1",
                    "gas": "200000",
                    "gas_adjustment": "1.2",
                    "fees": [
                        {
                            "denom": "muon",
                            "amount": "50000"
                        }
                    ],
                    "simulate": false
                },
                "delegator_address": "" + delegatorAddr,
                "validator_address": "cosmosvaloper1yds9h4lqn0xggm3kahn0vznhv59cljjlfh3sa2",
                "delegation": {
                    "denom": "muon",
                    "amount": "100000"
                }
            };
            // this.http.post(`http://149.28.228.142:1317/staking/delegators/${delegatorAddr}/delegations`, postBody, postOptions)
            _this.http.post("https://aakatev.me/node_txs/staking/delegators/" + delegatorAddr + "/delegations", postBody, postOptions)
                .subscribe(function (val) {
                // @aakatev debugging
                console.log(val);
                resolve(val);
            }, function (error) {
                console.log(error);
            }, function () { });
        });
    };
    TxsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], TxsService);
    return TxsService;
}());

// nginx angular POST proxy example
// # node 1317 proxy
// location /node_txs/ 
//     {
//     if ($request_method = 'OPTIONS') 
//     {
//         add_header 'Access-Control-Allow-Origin' '*';
//         add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
//         #
//         # Custom headers and headers various browsers *should* be OK with but aren't
//         #
//         add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
//         #
//         # Tell client that this pre-flight info is valid for 20 days
//         #
//         add_header 'Access-Control-Max-Age' 1728000;
//         add_header 'Content-Type' 'text/plain; charset=utf-8';
//         add_header 'Content-Length' 0;
//         return 204;
//     }
//     add_header 'Access-Control-Allow-Origin' '*' always; 
//     add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
//     add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range' always;
//     add_header 'Access-Control-Allow-Credentials' 'true' always;
//     add_header 'Access-Control-Max-Age' '1728000';
//     add_header 'Content-Type' 'text/plain charset=UTF-8' always;
//     #add_header 'Content-Length' '0';
//     proxy_pass http://149.28.228.142:1317/;
//     #proxy_http_version 1.1;
//     #proxy_set_header Upgrade $http_upgrade;
//     #proxy_set_header Connection "Upgrade";
// }
// End nginx angular POST proxy example


/***/ }),

/***/ "./src/app/services/validators.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/validators.service.ts ***!
  \************************************************/
/*! exports provided: ValidatorsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidatorsService", function() { return ValidatorsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app.actions */ "./src/app/app.actions.ts");
/* harmony import */ var _lib_bech32__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/bech32 */ "./src/app/lib/bech32.ts");
/* harmony import */ var _lib_hex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/hex */ "./src/app/lib/hex.ts");
/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! js-sha256 */ "./node_modules/js-sha256/src/sha256.js");
/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(js_sha256__WEBPACK_IMPORTED_MODULE_7__);



// import { Observable, of } from 'rxjs';


// import { nodeRpc, nodeWs, nodeRpcTest } from '../../config.js'



var ValidatorsService = /** @class */ (function () {
    function ValidatorsService(store, http) {
        this.store = store;
        this.http = http;
        this.wsValidatorsStore = null;
        this.wsValidatorsMapping = new Map;
        this.MAX_STORE_INDEX = 10;
        this.initValidators();
    }
    // Validators mapping
    ValidatorsService.prototype.setValidators = function (validators) {
        this.wsValidatorsStore = validators;
        this.store.dispatch(new _app_actions__WEBPACK_IMPORTED_MODULE_4__["UpdateValidators"](this.wsValidatorsStore));
    };
    ValidatorsService.prototype.updateValidators = function () {
        this.store.dispatch(new _app_actions__WEBPACK_IMPORTED_MODULE_4__["UpdateValidators"](this.wsValidatorsStore));
        this.store.dispatch(new _app_actions__WEBPACK_IMPORTED_MODULE_4__["UpdateValsMap"](this.wsValidatorsMapping));
        console.log(this.wsValidatorsStore);
        // console.log(this.wsValidatorsMapping);
    };
    ValidatorsService.prototype.getValidatorsDetails = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("https://aakatev.me/node_txs/staking/validators").subscribe(function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                    // console.log(data);
                    if (data !== null) {
                        this.setValidators(data);
                    }
                    resolve();
                    return [2 /*return*/];
                });
            }); });
        });
    };
    ValidatorsService.prototype.getValidatorsRanking = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // this.http.get(`${nodeRpcTest}/validators_ranking`).subscribe(data => {
            _this.http.get("https://aakatev.me/node_txs/validatorsets/latest").subscribe(function (data) {
                // Debugging
                // console.log(data);
                if (data !== null) {
                    _this.mergeProperties(_this.wsValidatorsStore, "consensus_pubkey", data['validators'], "pub_key", "ranking")
                        .then(function () {
                        _this.updateValidators();
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        });
    };
    ValidatorsService.prototype.mergeProperties = function (targetArray, targetArrayProperty, propertyArray, propertyArrayProperty, propertyName) {
        return new Promise(function (resolve) {
            for (var targetIndex in targetArray) {
                for (var propertyIndex in propertyArray) {
                    if (propertyArray[propertyIndex][propertyArrayProperty] === targetArray[targetIndex][targetArrayProperty]) {
                        targetArray[targetIndex][propertyName] = propertyArray[propertyIndex];
                        // Debugging
                        // console.log(targetArray[targetIndex]);  
                    }
                }
            }
            resolve();
        });
    };
    ValidatorsService.prototype.getValidatorSlashing = function (validator) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("https://aakatev.me/node_txs/slashing/validators/" + validator.consensus_pubkey + "/signing_info")
                .subscribe(function (data) {
                // Debugging
                // console.log(data);
                validator.slashing = data;
                resolve();
            });
        });
    };
    ValidatorsService.prototype.getValidatorAvatars = function (validator) {
        var _this = this;
        return new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                // TODO @aakatev
                // Comment out later after setting up keybase auth
                // 
                // let regex = await validator.description.moniker.replace(/\s/g, '').match(/[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*/i)[0];
                // this.http.get(`https://keybase.io/_/api/1.0/user/lookup.json?usernames=${regex}&fields=pictures`)
                //   .subscribe(async data => {
                //     // Debugging
                //     // console.log(`https://keybase.io/_/api/1.0/user/lookup.json?usernames=${validator.data.description.moniker.replace(/\s/g, '')}&fields=pictures`);
                //     // console.log(data['them']);
                //     // Debugging regex to parse moniker
                //     // console.log(validator.data.description.moniker.replace(/\s/g, '').match(/[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*/i)[0]);
                //     if (data['status'].code === 0) {
                //       validator.keybase = data['them']; 
                //       if(data['them'][0] !== null && data['them'][0].pictures !== undefined) { 
                //         validator.picture = data['them'][0].pictures.primary.url; 
                //       }
                //     } else {
                //       validator.keybase = [null];
                //     }
                //     resolve();
                //   });
                // End comment out later
                validator.keybase = [null];
                return [2 /*return*/];
            });
        }); });
    };
    ValidatorsService.prototype.getHexAddress = function (pubKey) {
        var decodedPubkey = Object(_lib_bech32__WEBPACK_IMPORTED_MODULE_5__["decodeBech32"])(pubKey);
        var pubKeyHex = _lib_hex__WEBPACK_IMPORTED_MODULE_6__["hex"].bytesToHex(Object(_lib_bech32__WEBPACK_IMPORTED_MODULE_5__["fromWords"])(decodedPubkey.words)).substr(10);
        return this.hashSha256(pubKeyHex).substr(0, 40);
    };
    ValidatorsService.prototype.hashSha256 = function (pubkey) {
        var hash = js_sha256__WEBPACK_IMPORTED_MODULE_7__["sha256"].create();
        var bytes = _lib_hex__WEBPACK_IMPORTED_MODULE_6__["hex"].hexToBytes(pubkey);
        hash.update(bytes);
        return hash.hex().toUpperCase();
    };
    ValidatorsService.prototype.getValidatorHex = function (validator) {
        var _this = this;
        return new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var hexAddr;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getHexAddress(validator['consensus_pubkey'])];
                    case 1:
                        hexAddr = _a.sent();
                        validator['hex_address'] = hexAddr;
                        this.wsValidatorsMapping.set(hexAddr, validator['description'].moniker);
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ValidatorsService.prototype.getValidatorDelegations = function (validator) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("https://aakatev.me/node_txs/staking/validators/" + _this.wsValidatorsStore[validator].operator_address + "/delegations")
                .subscribe(function (data) {
                // Debugging
                console.log(data);
                _this.wsValidatorsStore[validator].delegations = data;
                resolve();
            });
        });
    };
    ValidatorsService.prototype.initValidators = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getValidatorsDetails()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getValidatorsRanking()];
                    case 2:
                        _a.sent();
                        this.wsValidatorsStore.forEach(function (validator) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getValidatorSlashing(validator)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.wsValidatorsStore.forEach(function (validator) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getValidatorAvatars(validator)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.wsValidatorsStore.forEach(function (validator) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getValidatorHex(validator)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        // TODO @aakatev decide on version
                        // Async version
                        // await this.asyncGetDelegations().then(done => {
                        //   console.log('All delegators loaded');
                        // });
                        // Nonasync version
                        // this.getDelegations().then(data => {
                        //   console.log('333');
                        // });
                        // Debugging
                        console.log("Validators init done!");
                        this.updateValidators();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    // End validators mapping
    ValidatorsService.prototype.asyncGetDelegations = function () {
        var _this = this;
        return new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var _a, _b, _i, validator;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = [];
                        for (_b in this.wsValidatorsStore)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        validator = _a[_i];
                        // Debugging
                        // console.log(this.wsValidatorsStore[validator]);
                        return [4 /*yield*/, this.getValidatorDelegations(validator)];
                    case 2:
                        // Debugging
                        // console.log(this.wsValidatorsStore[validator]);
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ValidatorsService.prototype.getDelegations = function () {
        var _this = this;
        return new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var validator;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                for (validator in this.wsValidatorsStore) {
                    // Debugging
                    // console.log(this.wsValidatorsStore[validator]);
                    this.getValidatorDelegations(validator);
                }
                resolve();
                return [2 /*return*/];
            });
        }); });
    };
    ValidatorsService.prototype.sortValidators = function (property) {
        this.wsValidatorsStore.sort(function (a, b) { return parseFloat(b[property]) - parseFloat(a[property]); });
        this.updateValidators();
    };
    ValidatorsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], ValidatorsService);
    return ValidatorsService;
}());



/***/ }),

/***/ "./src/app/services/ws.service.ts":
/*!****************************************!*\
  !*** ./src/app/services/ws.service.ts ***!
  \****************************************/
/*! exports provided: WsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WsService", function() { return WsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app.actions */ "./src/app/app.actions.ts");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../config.js */ "./src/config.js");






var WsService = /** @class */ (function () {
    function WsService(store, http) {
        var _this = this;
        this.store = store;
        this.http = http;
        this.newWebSocket = new WebSocket(_config_js__WEBPACK_IMPORTED_MODULE_5__["nodeWs"]);
        this.wsBlockStore = [];
        this.wsTxStore = [];
        // TODO test remove withitn next few commits
        // wsValidatorsStore = null;
        // wsValidatorsMapping: Map<string,string> = new Map;
        // numOfValidators;
        this.MAX_STORE_INDEX = 10;
        // Unsubscribe
        this.unsubBlockMsg = {
            "jsonrpc": "2.0",
            "method": "unsubscribe_all",
            "id": "0",
            "params": {}
        };
        this.subBlockMsg = {
            "jsonrpc": "2.0",
            "method": "subscribe",
            "id": "0",
            "params": {
                "query": "tm.event='NewBlock'"
            }
        };
        this.subTxMsg = {
            "jsonrpc": "2.0",
            "method": "subscribe",
            "id": "0",
            "params": {
                "query": "tm.event='Tx'"
            }
        };
        this.subValMsg = {
            "jsonrpc": "2.0",
            "method": "subscribe",
            "id": "0",
            "params": {
                "query": "tm.event='ValidatorSetUpdate'"
            }
        };
        this.subRoundMsg = {
            "jsonrpc": "2.0",
            "method": "subscribe",
            "id": "0",
            "params": {
                "query": "tm.event='NewRound'"
            }
        };
        this.subRoundStepMsg = {
            "jsonrpc": "2.0",
            "method": "subscribe",
            "id": "0",
            "params": {
                "query": "tm.event='NewRoundStep'"
            }
        };
        this.http.get(_config_js__WEBPACK_IMPORTED_MODULE_5__["nodeRpc"] + "/status").subscribe(function (data) {
            // Debugging
            // let currValidators = data['result'].genesis.validators;
            var lastBlock = data['result'].sync_info.latest_block_height;
            _this.http.get(_config_js__WEBPACK_IMPORTED_MODULE_5__["nodeRpc"] + "/tx_search?query=\"tx.height>" + (lastBlock - 100) + "\"").subscribe(function (data) {
                _this.wsTxStore = data['result'].txs.reverse();
                _this.store.dispatch(new _app_actions__WEBPACK_IMPORTED_MODULE_4__["UpdateTxs"](_this.wsTxStore));
            });
            _this.http.get(_config_js__WEBPACK_IMPORTED_MODULE_5__["nodeRpc"] + "/blockchain?minHeight=" + (lastBlock - 50) + "&maxHeight=" + lastBlock).subscribe(function (data) {
                _this.wsBlockStore = data['result'].block_metas.reverse();
                _this.store.dispatch(new _app_actions__WEBPACK_IMPORTED_MODULE_4__["UpdateBlocks"](_this.wsBlockStore));
            });
        });
        // WS handlers
        this.newWebSocket.onopen = function (event) {
            _this.subscribe();
        };
        this.newWebSocket.onmessage = function (event) {
            var json = JSON.parse(event.data);
            if (Object.keys(json.result).length !== 0) {
                if (json.result.data.type === 'tendermint/event/NewBlock') {
                    // Debugging
                    // console.log('NewBlock!');
                    if (Object.keys(_this.wsBlockStore).length >= _this.MAX_STORE_INDEX) {
                        _this.wsBlockStore.shift();
                    }
                    _this.wsBlockStore.push(json.result.data.value.block);
                    // Debugging
                    // console.log(json.result.data.value);
                    // Update Store
                    _this.store.dispatch(new _app_actions__WEBPACK_IMPORTED_MODULE_4__["UpdateBlocks"](_this.wsBlockStore));
                }
                else if (json.result.data.type === 'tendermint/event/Tx') {
                    // Debugging
                    // console.log('NewTx!');
                    _this.http.get(_config_js__WEBPACK_IMPORTED_MODULE_5__["nodeRpc"] + "/tx_search?query=\"tx.height=" + json.result.data.value.TxResult.height + "\"").subscribe(function (data) {
                        if (Object.keys(_this.wsTxStore).length >= _this.MAX_STORE_INDEX) {
                            _this.wsTxStore.shift();
                        }
                        // Debugging
                        // console.log('Data', data);
                        // console.log('Json', json.result);
                        _this.wsTxStore.unshift(data['result'].txs[json.result.data.value.TxResult.index]);
                        // Update store
                        _this.store.dispatch(new _app_actions__WEBPACK_IMPORTED_MODULE_4__["UpdateTxs"](_this.wsTxStore));
                    });
                    // TODO call validator service to update
                    // } else if(json.result.data.type === 'tendermint/event/ValidatorSetUpdates') {
                    //   // TODO check if this logic is sufficient
                    //   this.initValidators();
                }
                else if (json.result.data.type === 'tendermint/event/NewRound') {
                    // Debugging
                    // console.log(json.result.data.value);
                    // Update Store
                    _this.store.dispatch(new _app_actions__WEBPACK_IMPORTED_MODULE_4__["UpdateRound"](json.result.data.value));
                }
                else if (json.result.data.type === 'tendermint/event/RoundState') {
                    // Debugging
                    // console.log(json.result.data.value);
                    // Update Store
                    _this.store.dispatch(new _app_actions__WEBPACK_IMPORTED_MODULE_4__["UpdateRoundStep"](json.result.data.value));
                }
            }
        };
    }
    ;
    WsService.prototype.getWsBlockStore = function () { return this.wsBlockStore; };
    ;
    WsService.prototype.getWsTxStore = function () { return this.wsTxStore; };
    ;
    WsService.prototype.subscribe = function () {
        this.newWebSocket.send(JSON.stringify(this.subBlockMsg));
        this.newWebSocket.send(JSON.stringify(this.subTxMsg));
        this.newWebSocket.send(JSON.stringify(this.subValMsg));
        this.newWebSocket.send(JSON.stringify(this.subRoundMsg));
        this.newWebSocket.send(JSON.stringify(this.subRoundStepMsg));
    };
    ;
    WsService.prototype.unsubscribe = function () {
        this.newWebSocket.send(JSON.stringify(this.unsubBlockMsg));
    };
    ;
    WsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], WsService);
    return WsService;
}());

// @aakatev
// 
// Possible ws sub queries
// 
// subQuery = [
//   'Tx', 
//   'NewBlock', 
//   'NewBlockHeader', 
//   'Vote', 
//   'NewRound', 
//   'NewRoundStep', 
//   'Polka', 
//   'Relock', 
//   'TimeoutPropose', 
//   'TimeoutWait', 
//   'Unlock', 
//   'ValidBlock', 
//   'ValidatorSetUpdates', 
//   'Lock', 
//   'CompleteProposal',
// // ];
// getwsBlockStore = () => {
//   return wsBlockStore;
// }
// end


/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: nodeRpc, nodeWs, nodeRpcTest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeRpc", function() { return nodeRpc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeWs", function() { return nodeWs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeRpcTest", function() { return nodeRpcTest; });
const nodeRpc = 'https://aakatev.me/node';
const nodeWs = 'wss://aakatev.me/node/websocket';
const nodeRpcTest = 'https://aakatev.me/node_test';


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/aakatev/cosmos/irisnet-explorer/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map