"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("buffer");
function parseJwt(token) {
    return JSON.parse(buffer_1.Buffer.from(token.split('.')[1], 'base64').toString());
}
var TokenService = (function () {
    function TokenService() {
    }
    TokenService.prototype.getLocalRefreshToken = function () {
        var user = JSON.parse(localStorage.getItem("user"));
        return user === null || user === void 0 ? void 0 : user.refreshToken;
    };
    TokenService.prototype.getLocalAccessToken = function () {
        var jwt = JSON.parse(localStorage.getItem("jwt"));
        return jwt ? jwt : null;
    };
    TokenService.prototype.getFromToken = function (key) {
        var jwt = JSON.parse(localStorage.getItem("jwt"));
        if (jwt) {
            var jwtBody = parseJwt(jwt);
            return jwtBody[key];
        }
        return null;
    };
    TokenService.prototype.updateLocalAccessToken = function (token) {
        window.localStorage.setItem("jwt", JSON.stringify(token));
    };
    TokenService.prototype.getUser = function () {
        return JSON.parse(localStorage.getItem("user"));
    };
    TokenService.prototype.setUser = function (user) {
        window.localStorage.setItem("user", JSON.stringify(user));
    };
    TokenService.prototype.removeUser = function () {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("jwt");
    };
    TokenService.prototype.updateJWTToken = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fetch("/api/v1/auth/refreshToken", {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer ".concat(_this.getLocalAccessToken()),
                    'Content-Type': 'application/json'
                },
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log(data);
                _this.updateLocalAccessToken(data.newToken);
                resolve();
            }).catch(function (error) { reject(error); });
        });
    };
    return TokenService;
}());
var tokenService = new TokenService();
exports.default = tokenService;
