"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.value = exports.error = void 0;
function error(message) {
    return {
        isError: true,
        errorMessage: message
    };
}
exports.error = error;
function value(value) {
    return {
        value: value,
        isError: false
    };
}
exports.value = value;
