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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature = exports.ErrorFallback = exports.Loading = exports.Default = exports.On = void 0;
var useGenericFeature_1 = __importDefault(require("./useGenericFeature"));
var react_1 = __importStar(require("react"));
function On(_a) {
    var children = _a.children, expression = _a.expression;
    return react_1.default.createElement(react_1.default.Fragment, null, children);
}
exports.On = On;
function Default(_a) {
    var children = _a.children;
    return react_1.default.createElement(react_1.default.Fragment, null, children);
}
exports.Default = Default;
function Loading(_a) {
    var children = _a.children;
    return react_1.default.createElement(react_1.default.Fragment, null, children);
}
exports.Loading = Loading;
function ErrorFallback(_a) {
    var children = _a.children;
    return react_1.default.createElement(react_1.default.Fragment, null, children);
}
exports.ErrorFallback = ErrorFallback;
function Feature(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(0), key = _b[0], setKey = _b[1];
    var _c = (0, react_1.useState)([]), onChildren = _c[0], setOnChildren = _c[1];
    var _d = (0, react_1.useState)([]), defaultChildren = _d[0], setDefaultChildren = _d[1];
    var _e = (0, react_1.useState)([]), loadingChildren = _e[0], setLoadingChildren = _e[1];
    var _f = (0, react_1.useState)([]), errorChildren = _f[0], setErrorChildren = _f[1];
    var onExpressions = (0, react_1.useMemo)(function () {
        return onChildren.map(function (child) {
            return {
                on: child.props.children,
                expression: child.props.expression,
            };
        });
    }, [onChildren]);
    (0, react_1.useEffect)(function () {
        setKey(key + 1);
        var on = react_1.default.Children.toArray(children).filter(function (child) {
            var c = child;
            return c.type === On;
        });
        setOnChildren(on);
        var def = react_1.default.Children.toArray(children).filter(function (child) {
            var c = child;
            return c.type === Default;
        });
        setDefaultChildren(def);
        var loading = react_1.default.Children.toArray(children).filter(function (child) {
            var c = child;
            return c.type === Loading;
        });
        setLoadingChildren(loading);
        var err = react_1.default.Children.toArray(children).filter(function (child) {
            var c = child;
            return c.type === ErrorFallback;
        });
        setErrorChildren(err);
    }, [children]);
    var feature = (0, useGenericFeature_1.default)({
        key: key.toString(),
        on: onExpressions,
        default: defaultChildren,
        loading: loadingChildren,
        error: errorChildren,
    });
    return react_1.default.createElement(react_1.default.Fragment, null, feature);
}
exports.Feature = Feature;
