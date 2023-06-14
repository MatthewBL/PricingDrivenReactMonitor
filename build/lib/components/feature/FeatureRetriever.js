"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var Attribute_1 = require("../../logic/model/Attribute");
var Feature_1 = require("../../logic/model/Feature");
var featureResponse_1 = require("../../../protobuf/featureResponse");
var buffer_1 = require("buffer");
var featureRequest_1 = require("../../../protobuf/featureRequest");
var FeatureRetriever = (function () {
    function FeatureRetriever(config) {
        this.DEFAULT_WINDOW_DELAY = 1000;
        this.DEFAULT_REQUEST_TIMEOUT = 5000;
        this.queueMain = {};
        this.queueRequest = {};
        this.featureMap = {};
        this.config = {
            windowDelay: config.windowDelay || this.DEFAULT_WINDOW_DELAY,
            requestTimeout: config.requestTimeout || this.DEFAULT_REQUEST_TIMEOUT,
            baseUrl: config.baseUrl,
        };
        this.axiosInstance = axios_1.default.create({
            baseURL: this.config.baseUrl,
            timeout: this.config.requestTimeout,
        });
    }
    FeatureRetriever.prototype.tickRequestQueue = function () {
        var _this = this;
        console.log("Ticking...", this.queueMain);
        if (Object.keys(this.queueMain).length === 0) {
            return;
        }
        this.queueRequest = __assign({}, this.queueMain);
        this.queueMain = {};
        var ids = Object.keys(this.queueRequest);
        var encodedIds = buffer_1.Buffer.from(featureRequest_1.FeatureRequest.encode({
            features: ids,
        }).finish());
        this.axiosInstance
            .post("/feature", encodedIds, {
            headers: {
                "Content-Type": "application/octet-stream",
            }
        })
            .then(function (response) {
            console.log(response);
            var decoded = featureResponse_1.FeatureResponse.decode(buffer_1.Buffer.from(response.data));
            _this.processFeatureResponse(decoded);
            _this.tickTimeout = setTimeout(function () { return _this.tickRequestQueue(); }, _this.config.windowDelay);
        })
            .catch(function (error) {
            console.error(error);
            for (var _i = 0, _a = Object.values(_this.queueRequest); _i < _a.length; _i++) {
                var featureRequest = _a[_i];
                for (var _b = 0, featureRequest_2 = featureRequest; _b < featureRequest_2.length; _b++) {
                    var req = featureRequest_2[_b];
                    req.onError();
                }
            }
            _this.queueRequest = {};
        });
    };
    FeatureRetriever.prototype.isBoolean = function (value) {
        return typeof value === "boolean";
    };
    FeatureRetriever.prototype.isAttribute = function (value) {
        return typeof value === "string" || typeof value === "number";
    };
    FeatureRetriever.prototype.getFeature = function (id) {
        var _this = this;
        console.log("getting feature", id);
        return new Promise(function (resolve, reject) {
            if (id in _this.featureMap) {
                var value = _this.featureMap[id];
                _this.tryResolveFeatureValue(value, resolve, false);
            }
            else {
                _this.addFeatureToQueue(id, function (v) {
                    _this.tryResolveFeatureValue(v, resolve, false);
                }, reject);
            }
        });
    };
    FeatureRetriever.prototype.tryResolveFeatureValue = function (value, resolve, shouldBeAttribute) {
        if (shouldBeAttribute) {
            if (this.isAttribute(value)) {
                resolve(value);
            }
            else {
                console.error("Feature is not an attribute", value);
            }
        }
        else {
            if (this.isBoolean(value)) {
                resolve(value);
            }
            else {
                console.error("Feature is not boolean", value);
            }
        }
    };
    FeatureRetriever.prototype.getAttribute = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (id in _this.featureMap) {
                var value = _this.featureMap[id];
                _this.tryResolveFeatureValue(value, resolve, true);
            }
            else {
                _this.addFeatureToQueue(id, function (v) {
                    _this.tryResolveFeatureValue(v, resolve, true);
                }, reject);
            }
        });
    };
    FeatureRetriever.prototype.evalFeatureExpression = function (ids) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Promise.all(ids.map(function (id) {
                    return _this.getFeature(id);
                }))
                    .then(function (values) {
                    resolve(values.every(function (v) { return v; }));
                })
                    .catch(function () {
                    reject();
                });
                return [2];
            });
        }); });
    };
    FeatureRetriever.prototype.addFeatureToQueue = function (featureId, onComplete, onError) {
        var _this = this;
        if (!this.tickTimeout) {
            this.tickTimeout = setTimeout(function () { return _this.tickRequestQueue(); }, this.config.windowDelay);
        }
        if (featureId in this.queueMain) {
            this.queueMain[featureId].push({ onComplete: onComplete, onError: onError });
        }
        else if (featureId in this.queueRequest) {
            this.queueRequest[featureId].push({ onComplete: onComplete, onError: onError });
        }
        else {
            this.queueMain[featureId] = [{ onComplete: onComplete, onError: onError }];
        }
    };
    FeatureRetriever.prototype.processFeatureResponse = function (featureResponse) {
        var retrievedFeatures = featureResponse.featureMap;
        console.log("received features", retrievedFeatures);
        for (var _i = 0, _a = Object.keys(retrievedFeatures); _i < _a.length; _i++) {
            var featureId = _a[_i];
            this.setFeature(featureId, retrievedFeatures[featureId]);
            delete this.queueRequest[featureId];
        }
        for (var _b = 0, _c = Object.keys(this.queueRequest); _b < _c.length; _b++) {
            var featureId = _c[_b];
            for (var _d = 0, _e = this.queueRequest[featureId]; _d < _e.length; _d++) {
                var req = _e[_d];
                req.onError();
            }
            console.warn("Feature ".concat(featureId, " wasn't returned by the server. Check the feature id?"));
            delete this.queueRequest[featureId];
        }
    };
    FeatureRetriever.prototype.setFeature = function (id, feature) {
        var value;
        if (feature.valueType === featureResponse_1.FeatureResponse_Feature_ValueType.BOOLEAN) {
            value = feature.booleanValue;
        }
        else if (feature.valueType === featureResponse_1.FeatureResponse_Feature_ValueType.NUMERIC) {
            value = feature.numericValue;
        }
        else if (feature.valueType === featureResponse_1.FeatureResponse_Feature_ValueType.STRING) {
            value = feature.stringValue;
        }
        else {
            throw new Error("Bad feature value type");
        }
        this.featureMap[id] = value;
        for (var _i = 0, _a = Object.entries(this.queueRequest); _i < _a.length; _i++) {
            var _b = _a[_i], featureId = _b[0], featureRequest = _b[1];
            if (featureId === id) {
                for (var _c = 0, featureRequest_3 = featureRequest; _c < featureRequest_3.length; _c++) {
                    var req = featureRequest_3[_c];
                    req.onComplete(value);
                }
            }
        }
    };
    FeatureRetriever.prototype.getLogicFeature = function (id) {
        return (0, Feature_1.feature)(id, this);
    };
    FeatureRetriever.prototype.getLogicAttribute = function (id) {
        return (0, Attribute_1.attribute)(id, this);
    };
    return FeatureRetriever;
}());
exports.default = FeatureRetriever;
