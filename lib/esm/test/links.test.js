/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
        while (_) try {
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
import * as assert from 'assert';
import { getLanguageService, Range, TextDocument, ClientCapabilities } from '../jsonLanguageService';
suite('JSON Find Links', function () {
    var testFindLinksFor = function (value, expected) {
        var ls = getLanguageService({ clientCapabilities: ClientCapabilities.LATEST });
        var document = TextDocument.create('test://test/test.json', 'json', 0, value);
        var jsonDoc = ls.parseJSONDocument(document);
        return ls.findLinks(document, jsonDoc).then(function (list) {
            if (expected) {
                assert.notDeepEqual(list, []);
                var expectedPos = document.positionAt(expected.target);
                var expectedTarget = document.uri + "#" + (expectedPos.line + 1) + "," + (expectedPos.character + 1);
                assert.equal(list[0].target, expectedTarget);
                assert.deepEqual(list[0].range, Range.create(document.positionAt(expected.offset), document.positionAt(expected.offset + expected.length)));
            }
            else {
                assert.deepEqual(list, []);
            }
        });
    };
    test('FindDefinition invalid ref', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testFindLinksFor('{}', null)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor('{"name": "John"}', null)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor('{"name": "John", "$ref": "#/john/name"}', null)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor('{"name": "John", "$ref": "#/"}', null)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    test('FindDefinition valid ref', function () {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testFindLinksFor('{"name": "John", "$ref": "#/name"}', { target: 9, offset: 26, length: 6 })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor('{"name": "John", "$ref": "#"}', { target: 0, offset: 26, length: 1 })];
                    case 2:
                        _a.sent();
                        doc = function (ref) { return "{\"foo\": [\"bar\", \"baz\"],\"\": 0,\"a/b\": 1,\"c%d\": 2,\"e^f\": 3,\"i\\\\j\": 5,\"k\\\"l\": 6,\" \": 7,\"m~n\": 8, \"$ref\": \"" + ref + "\"}"; };
                        return [4 /*yield*/, testFindLinksFor(doc('#'), { target: 0, offset: 102, length: 1 })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor(doc('#/foo'), { target: 8, offset: 102, length: 5 })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor(doc('#/foo/0'), { target: 9, offset: 102, length: 7 })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor(doc('#/foo/1'), { target: 16, offset: 102, length: 7 })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor(doc('#/foo/01'), null)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor(doc('#/'), { target: 27, offset: 102, length: 2 })];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor(doc('#/a~1b'), { target: 36, offset: 102, length: 6 })];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor(doc('#/c%d'), { target: 45, offset: 102, length: 5 })];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor(doc('#/e^f'), { target: 54, offset: 102, length: 5 })];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor(doc('#/i\\\\j'), { target: 64, offset: 102, length: 6 })];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor(doc('#/k\\"l'), { target: 74, offset: 102, length: 6 })];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor(doc('#/ '), { target: 81, offset: 102, length: 3 })];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, testFindLinksFor(doc('#/m~0n'), { target: 90, offset: 102, length: 6 })];
                    case 15:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
