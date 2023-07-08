"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var FeatureContext_1 = require("./FeatureContext");
function useGenericFeature(options) {
    var _a, _b, _c, _d;
    var featureRetriever = (0, react_1.useContext)(FeatureContext_1.FeatureContext).featureRetriever;
    var _e = (0, react_1.useState)(false), errored = _e[0], setErrored = _e[1];
    var _f = (0, react_1.useState)(true), isLoading = _f[0], setIsLoading = _f[1];
    var _g = (0, react_1.useState)(), value = _g[0], setValue = _g[1];
    if (!options.on) {
        throw new Error("On Expression list must be provided");
    }
    (0, react_1.useEffect)(function () {
        if (options.on) {
            setIsLoading(true);
            var expressionPromises = options.on.map(function (on) {
                return on.expression.eval();
            });
            if (expressionPromises.length === 0) {
                setIsLoading(false);
                setValue(undefined);
                return;
            }
            Promise.all(expressionPromises).then(function (values) {
                values.forEach(function (value) {
                    if (value.isError) {
                        console.warn("Error evaluating feature", value.errorMessage);
                    }
                });
                var isErrored = values.some(function (value) { return value.isError; });
                if (isErrored) {
                    setErrored(true);
                    setIsLoading(false);
                    return;
                }
                var index = values.findIndex(function (value) { return value.value === true; });
                if (index !== -1) {
                    setValue(index);
                }
                else {
                    setValue(undefined);
                }
                setIsLoading(false);
            });
        }
        else {
            setErrored(true);
            setIsLoading(false);
        }
    }, [options.key]);
    var returnedComponent;
    if (errored) {
        returnedComponent = (_a = options.error) !== null && _a !== void 0 ? _a : react_1.default.createElement(react_1.default.Fragment, null);
    }
    else if (isLoading) {
        returnedComponent = (_b = options.loading) !== null && _b !== void 0 ? _b : react_1.default.createElement(react_1.default.Fragment, null);
    }
    else {
        if (value !== undefined) {
            returnedComponent = (_c = options.on[value].on) !== null && _c !== void 0 ? _c : react_1.default.createElement(react_1.default.Fragment, null);
        }
        else {
            returnedComponent = (_d = options.default) !== null && _d !== void 0 ? _d : react_1.default.createElement(react_1.default.Fragment, null);
        }
    }
    return react_1.default.createElement(react_1.default.Fragment, null, returnedComponent);
}
exports.default = useGenericFeature;
