"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attrValueFunction = exports.booleanFunction = exports.numberFunction = exports.makeFeatureAttributeRetrievers = void 0;
var Attribute_1 = require("./Attribute");
var Feature_1 = require("./Feature");
var Constant_1 = __importDefault(require("./Constant"));
function makeFeatureAttributeRetrievers(featureRetriever) {
    return {
        feature: function (featureId) { return (0, Feature_1.feature)(featureId, featureRetriever); },
        attribute: function (attributeId) {
            return (0, Attribute_1.attribute)(attributeId, featureRetriever);
        },
    };
}
exports.makeFeatureAttributeRetrievers = makeFeatureAttributeRetrievers;
function numberFunction(left, right, factory) {
    var l = typeof left === "number" ? (0, Constant_1.default)(left) : left;
    var r = typeof right === "number" ? (0, Constant_1.default)(right) : right;
    return factory(l, r);
}
exports.numberFunction = numberFunction;
function booleanFunction(left, right, factory) {
    var l = typeof left === "boolean" ? (0, Constant_1.default)(left) : left;
    var r = typeof right === "boolean" ? (0, Constant_1.default)(right) : right;
    return factory(l, r);
}
exports.booleanFunction = booleanFunction;
function attrValueFunction(left, right, factory) {
    var l = typeof left === "string" || typeof left === "number"
        ? (0, Constant_1.default)(left)
        : left;
    var r = typeof right === "string" || typeof right === "number"
        ? (0, Constant_1.default)(right)
        : right;
    return factory(l, r);
}
exports.attrValueFunction = attrValueFunction;
