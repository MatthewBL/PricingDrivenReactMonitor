"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureContext = void 0;
var react_1 = __importDefault(require("react"));
var FeatureRetriever_1 = __importDefault(require("./FeatureRetriever"));
exports.FeatureContext = react_1.default.createContext({
    featureRetriever: new FeatureRetriever_1.default({
        baseUrl: "http://localhost:4000",
    }),
});
