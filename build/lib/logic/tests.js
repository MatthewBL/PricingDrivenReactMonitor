"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ArithmeticFunction_1 = require("./model/ArithmeticFunction");
var BinaryLogicalPredicate_1 = require("./model/BinaryLogicalPredicate");
var BinaryRelationalPredicate_1 = require("./model/BinaryRelationalPredicate");
var Constant_1 = __importDefault(require("./model/Constant"));
describe("BinaryLogicalPredicate", function () {
    describe("AND", function () {
        it("should return true if both arguments are true", function () {
            var a = (0, Constant_1.default)(true);
            var b = (0, Constant_1.default)(true);
            var c = (0, BinaryLogicalPredicate_1.and)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
        it("should return false if one argument is false", function () {
            var a = (0, Constant_1.default)(true);
            var b = (0, Constant_1.default)(false);
            var c = (0, BinaryLogicalPredicate_1.and)(a, b);
            expect(c.eval()).resolves.toEqual(false);
        });
        it("should return false if both arguments are false", function () {
            var a = (0, Constant_1.default)(false);
            var b = (0, Constant_1.default)(false);
            var c = (0, BinaryLogicalPredicate_1.and)(a, b);
            expect(c.eval()).resolves.toEqual(false);
        });
    });
    describe("OR", function () {
        it("should return true if one argument is true", function () {
            var a = (0, Constant_1.default)(true);
            var b = (0, Constant_1.default)(false);
            var c = (0, BinaryLogicalPredicate_1.or)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
    });
    describe("IFF", function () {
        it("should return true if both arguments are true", function () {
            var a = (0, Constant_1.default)(true);
            var b = (0, Constant_1.default)(true);
            var c = (0, BinaryLogicalPredicate_1.iff)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
    });
    describe("IMPLIES", function () {
        it("should return true if left argument is false", function () {
            var a = (0, Constant_1.default)(false);
            var b = (0, Constant_1.default)(true);
            var c = (0, BinaryLogicalPredicate_1.iff)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
    });
});
describe("BinaryRelationalPredicate", function () {
    describe("LT", function () {
        it("should return true if left argument is less than right argument", function () {
            var a = (0, Constant_1.default)(1);
            var b = (0, Constant_1.default)(2);
            var c = (0, BinaryRelationalPredicate_1.lt)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
        it("should return false if left argument is greater than right argument", function () {
            var a = (0, Constant_1.default)(2);
            var b = (0, Constant_1.default)(1);
            var c = (0, BinaryRelationalPredicate_1.lt)(a, b);
            expect(c.eval()).resolves.toEqual(false);
        });
        it("should return false if left argument is equal to right argument", function () {
            var a = (0, Constant_1.default)(1);
            var b = (0, Constant_1.default)(1);
            var c = (0, BinaryRelationalPredicate_1.lt)(a, b);
            expect(c.eval()).resolves.toEqual(false);
        });
    });
    describe("LTE", function () {
        it("should return true if left argument is less than or equal to right argument", function () {
            var a = (0, Constant_1.default)(1);
            var b = (0, Constant_1.default)(2);
            var c = (0, BinaryRelationalPredicate_1.lte)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
        it("should return true if left argument is equal to right argument", function () {
            var a = (0, Constant_1.default)(2);
            var b = (0, Constant_1.default)(2);
            var c = (0, BinaryRelationalPredicate_1.lte)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
        it("should return false if left argument is greater than right argument", function () {
            var a = (0, Constant_1.default)(2);
            var b = (0, Constant_1.default)(1);
            var c = (0, BinaryRelationalPredicate_1.lte)(a, b);
            expect(c.eval()).resolves.toEqual(false);
        });
    });
    describe("GT", function () {
        it("should return true if left argument is greater than right argument", function () {
            var a = (0, Constant_1.default)(2);
            var b = (0, Constant_1.default)(1);
            var c = (0, BinaryRelationalPredicate_1.gt)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
        it("should return false if left argument is less than or equal to right argument", function () {
            var a = (0, Constant_1.default)(1);
            var b = (0, Constant_1.default)(2);
            var c = (0, BinaryRelationalPredicate_1.gt)(a, b);
            expect(c.eval()).resolves.toEqual(false);
        });
        it("should return false if left argument is equal to right argument", function () {
            var a = (0, Constant_1.default)(2);
            var b = (0, Constant_1.default)(2);
            var c = (0, BinaryRelationalPredicate_1.gt)(a, b);
            expect(c.eval()).resolves.toEqual(false);
        });
    });
    describe("GTE", function () {
        it("should return true if left argument is greater than or equal to right argument", function () {
            var a = (0, Constant_1.default)(2);
            var b = (0, Constant_1.default)(1);
            var c = (0, BinaryRelationalPredicate_1.gte)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
        it("should return true if left argument is equal to right argument", function () {
            var a = (0, Constant_1.default)(2);
            var b = (0, Constant_1.default)(2);
            var c = (0, BinaryRelationalPredicate_1.gte)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
        it("should return false if left argument is less than right argument", function () {
            var a = (0, Constant_1.default)(1);
            var b = (0, Constant_1.default)(2);
            var c = (0, BinaryRelationalPredicate_1.gte)(a, b);
            expect(c.eval()).resolves.toEqual(false);
        });
    });
    describe("EQ", function () {
        it("NUMBER COMPARISON. should return true if left argument is equal to right argument", function () {
            var a = (0, Constant_1.default)(1);
            var b = (0, Constant_1.default)(1);
            var c = (0, BinaryRelationalPredicate_1.eq)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
        it("NUMBER COMPARISON. should return false if left argument is not equal to right argument", function () {
            var a = (0, Constant_1.default)(1);
            var b = (0, Constant_1.default)(2);
            var c = (0, BinaryRelationalPredicate_1.eq)(a, b);
            expect(c.eval()).resolves.toEqual(false);
        });
        it("STRING COMPARISON. should return true if left argument is equal to right argument", function () {
            var a = (0, Constant_1.default)("a");
            var b = (0, Constant_1.default)("a");
            var c = (0, BinaryRelationalPredicate_1.eq)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
        it("STRING COMPARISON. should return false if left argument is not equal to right argument", function () {
            var a = (0, Constant_1.default)("a");
            var b = (0, Constant_1.default)("b");
            var c = (0, BinaryRelationalPredicate_1.eq)(a, b);
            expect(c.eval()).resolves.toEqual(false);
        });
    });
    describe("NOTEQ", function () {
        it("NUMBER COMPARISON. should return true if left argument is not equal to right argument", function () {
            var a = (0, Constant_1.default)(1);
            var b = (0, Constant_1.default)(2);
            var c = (0, BinaryRelationalPredicate_1.neq)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
        it("NUMBER COMPARISON. should return false if left argument is equal to right argument", function () {
            var a = (0, Constant_1.default)(1);
            var b = (0, Constant_1.default)(1);
            var c = (0, BinaryRelationalPredicate_1.neq)(a, b);
            expect(c.eval()).resolves.toEqual(false);
        });
        it("STRING COMPARISON. should return true if left argument is not equal to right argument", function () {
            var a = (0, Constant_1.default)("a");
            var b = (0, Constant_1.default)("b");
            var c = (0, BinaryRelationalPredicate_1.neq)(a, b);
            expect(c.eval()).resolves.toEqual(true);
        });
        it("STRING COMPARISON. should return false if left argument is equal to right argument", function () {
            var a = (0, Constant_1.default)("a");
            var b = (0, Constant_1.default)("a");
            var c = (0, BinaryRelationalPredicate_1.neq)(a, b);
            expect(c.eval()).resolves.toEqual(false);
        });
    });
});
describe("ArithmeticFunction", function () {
    describe("PLUS", function () {
        it("should return the sum of left and right argument", function () {
            var a = (0, Constant_1.default)(1);
            var b = (0, Constant_1.default)(2);
            var c = (0, ArithmeticFunction_1.plus)(a, b);
            expect(c.eval()).resolves.toEqual(3);
        });
    });
    describe("MINUS", function () {
        it("should return the difference of left and right argument", function () {
            var a = (0, Constant_1.default)(2);
            var b = (0, Constant_1.default)(1);
            var c = (0, ArithmeticFunction_1.minus)(a, b);
            expect(c.eval()).resolves.toEqual(1);
        });
    });
    describe("MULTIPLY", function () {
        it("should return the product of left and right argument", function () {
            var a = (0, Constant_1.default)(2);
            var b = (0, Constant_1.default)(3);
            var c = (0, ArithmeticFunction_1.mul)(a, b);
            expect(c.eval()).resolves.toEqual(6);
        });
    });
    describe("DIVIDE", function () {
        it("should return the quotient of left and right argument", function () {
            var a = (0, Constant_1.default)(6);
            var b = (0, Constant_1.default)(3);
            var c = (0, ArithmeticFunction_1.div)(a, b);
            expect(c.eval()).resolves.toEqual(2);
        });
    });
    describe("MODULO", function () {
        it("should return the remainder of left and right argument", function () {
            var a = (0, Constant_1.default)(7);
            var b = (0, Constant_1.default)(3);
            var c = (0, ArithmeticFunction_1.mod)(a, b);
            expect(c.eval()).resolves.toEqual(1);
        });
    });
    describe("POWER", function () {
        it("should return the power of left and right argument", function () {
            var a = (0, Constant_1.default)(2);
            var b = (0, Constant_1.default)(3);
            var c = (0, ArithmeticFunction_1.pow)(a, b);
            expect(c.eval()).resolves.toEqual(8);
        });
    });
});
