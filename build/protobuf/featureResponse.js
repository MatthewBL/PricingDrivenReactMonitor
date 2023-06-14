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
exports.FeatureResponse_FeatureMapEntry = exports.FeatureResponse_Feature = exports.FeatureResponse = exports.featureResponse_Feature_ValueTypeToJSON = exports.featureResponse_Feature_ValueTypeFromJSON = exports.FeatureResponse_Feature_ValueType = exports.protobufPackage = void 0;
var long_1 = __importDefault(require("long"));
var _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "";
var FeatureResponse_Feature_ValueType;
(function (FeatureResponse_Feature_ValueType) {
    FeatureResponse_Feature_ValueType[FeatureResponse_Feature_ValueType["BOOLEAN"] = 0] = "BOOLEAN";
    FeatureResponse_Feature_ValueType[FeatureResponse_Feature_ValueType["STRING"] = 1] = "STRING";
    FeatureResponse_Feature_ValueType[FeatureResponse_Feature_ValueType["NUMERIC"] = 2] = "NUMERIC";
    FeatureResponse_Feature_ValueType[FeatureResponse_Feature_ValueType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(FeatureResponse_Feature_ValueType = exports.FeatureResponse_Feature_ValueType || (exports.FeatureResponse_Feature_ValueType = {}));
function featureResponse_Feature_ValueTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "BOOLEAN":
            return FeatureResponse_Feature_ValueType.BOOLEAN;
        case 1:
        case "STRING":
            return FeatureResponse_Feature_ValueType.STRING;
        case 2:
        case "NUMERIC":
            return FeatureResponse_Feature_ValueType.NUMERIC;
        case -1:
        case "UNRECOGNIZED":
        default:
            return FeatureResponse_Feature_ValueType.UNRECOGNIZED;
    }
}
exports.featureResponse_Feature_ValueTypeFromJSON = featureResponse_Feature_ValueTypeFromJSON;
function featureResponse_Feature_ValueTypeToJSON(object) {
    switch (object) {
        case FeatureResponse_Feature_ValueType.BOOLEAN:
            return "BOOLEAN";
        case FeatureResponse_Feature_ValueType.STRING:
            return "STRING";
        case FeatureResponse_Feature_ValueType.NUMERIC:
            return "NUMERIC";
        case FeatureResponse_Feature_ValueType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.featureResponse_Feature_ValueTypeToJSON = featureResponse_Feature_ValueTypeToJSON;
function createBaseFeatureResponse() {
    return { featureMap: {} };
}
exports.FeatureResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        Object.entries(message.featureMap).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            exports.FeatureResponse_FeatureMapEntry.encode({ key: key, value: value }, writer.uint32(10).fork()).ldelim();
        });
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseFeatureResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    var entry1 = exports.FeatureResponse_FeatureMapEntry.decode(reader, reader.uint32());
                    if (entry1.value !== undefined) {
                        message.featureMap[entry1.key] = entry1.value;
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            featureMap: isObject(object.featureMap)
                ? Object.entries(object.featureMap).reduce(function (acc, _a) {
                    var key = _a[0], value = _a[1];
                    acc[key] = exports.FeatureResponse_Feature.fromJSON(value);
                    return acc;
                }, {})
                : {},
        };
    },
    toJSON: function (message) {
        var obj = {};
        obj.featureMap = {};
        if (message.featureMap) {
            Object.entries(message.featureMap).forEach(function (_a) {
                var k = _a[0], v = _a[1];
                obj.featureMap[k] = exports.FeatureResponse_Feature.toJSON(v);
            });
        }
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseFeatureResponse();
        message.featureMap = Object.entries((_a = object.featureMap) !== null && _a !== void 0 ? _a : {}).reduce(function (acc, _a) {
            var key = _a[0], value = _a[1];
            if (value !== undefined) {
                acc[key] = exports.FeatureResponse_Feature.fromPartial(value);
            }
            return acc;
        }, {});
        return message;
    },
};
function createBaseFeatureResponse_Feature() {
    return {
        valueType: 0,
        booleanValue: undefined,
        stringValue: undefined,
        numericValue: undefined,
    };
}
exports.FeatureResponse_Feature = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.valueType !== 0) {
            writer.uint32(8).int32(message.valueType);
        }
        if (message.booleanValue !== undefined) {
            writer.uint32(16).bool(message.booleanValue);
        }
        if (message.stringValue !== undefined) {
            writer.uint32(26).string(message.stringValue);
        }
        if (message.numericValue !== undefined) {
            writer.uint32(32).int32(message.numericValue);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseFeatureResponse_Feature();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.valueType = reader.int32();
                    break;
                case 2:
                    message.booleanValue = reader.bool();
                    break;
                case 3:
                    message.stringValue = reader.string();
                    break;
                case 4:
                    message.numericValue = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            valueType: isSet(object.valueType)
                ? featureResponse_Feature_ValueTypeFromJSON(object.valueType)
                : 0,
            booleanValue: isSet(object.booleanValue)
                ? Boolean(object.booleanValue)
                : undefined,
            stringValue: isSet(object.stringValue)
                ? String(object.stringValue)
                : undefined,
            numericValue: isSet(object.numericValue)
                ? Number(object.numericValue)
                : undefined,
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.valueType !== undefined &&
            (obj.valueType = featureResponse_Feature_ValueTypeToJSON(message.valueType));
        message.booleanValue !== undefined &&
            (obj.booleanValue = message.booleanValue);
        message.stringValue !== undefined &&
            (obj.stringValue = message.stringValue);
        message.numericValue !== undefined &&
            (obj.numericValue = Math.round(message.numericValue));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d;
        var message = createBaseFeatureResponse_Feature();
        message.valueType = (_a = object.valueType) !== null && _a !== void 0 ? _a : 0;
        message.booleanValue = (_b = object.booleanValue) !== null && _b !== void 0 ? _b : undefined;
        message.stringValue = (_c = object.stringValue) !== null && _c !== void 0 ? _c : undefined;
        message.numericValue = (_d = object.numericValue) !== null && _d !== void 0 ? _d : undefined;
        return message;
    },
};
function createBaseFeatureResponse_FeatureMapEntry() {
    return { key: "", value: undefined };
}
exports.FeatureResponse_FeatureMapEntry = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== undefined) {
            exports.FeatureResponse_Feature.encode(message.value, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseFeatureResponse_FeatureMapEntry();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = exports.FeatureResponse_Feature.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            key: isSet(object.key) ? String(object.key) : "",
            value: isSet(object.value)
                ? exports.FeatureResponse_Feature.fromJSON(object.value)
                : undefined,
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined &&
            (obj.value = message.value
                ? exports.FeatureResponse_Feature.toJSON(message.value)
                : undefined);
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseFeatureResponse_FeatureMapEntry();
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
        message.value =
            object.value !== undefined && object.value !== null
                ? exports.FeatureResponse_Feature.fromPartial(object.value)
                : undefined;
        return message;
    },
};
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function isSet(value) {
    return value !== null && value !== undefined;
}
