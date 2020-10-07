"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPodcast = exports.parsePodcast = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const parse_1 = require("./parse");
Object.defineProperty(exports, "parsePodcast", { enumerable: true, get: function () { return parse_1.parsePodcast; } });
function fetchPodcast(url) {
    return cross_fetch_1.default(url)
        .then((res) => res.text())
        .then(parse_1.parsePodcast);
}
exports.fetchPodcast = fetchPodcast;
exports.default = fetchPodcast;
