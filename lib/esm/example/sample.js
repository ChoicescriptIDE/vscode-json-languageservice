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
import { getLanguageService, TextDocument } from '../jsonLanguageService';
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var jsonContentUri, jsonContent, jsonSchemaUri, jsonSchema, textDocument, jsonLanguageService, jsonDocument, diagnostics, competionResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jsonContentUri = 'foo://server/example.data.json';
                    jsonContent = "{\n       \"name\": 12\n       \"country\": \"Ireland\"\n    }";
                    jsonSchemaUri = "foo://server/data.schema.json";
                    jsonSchema = {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string"
                            },
                            "country": {
                                "type": "string",
                                "enum": ["Ireland", "Iceland"]
                            }
                        }
                    };
                    textDocument = TextDocument.create(jsonContentUri, 'json', 1, jsonContent);
                    jsonLanguageService = getLanguageService({
                        schemaRequestService: function (uri) {
                            if (uri === jsonSchemaUri) {
                                return Promise.resolve(JSON.stringify(jsonSchema));
                            }
                            return Promise.reject("Unabled to load schema at " + uri);
                        }
                    });
                    // associate `*.data.json` with the `foo://server/data.schema.json` schema
                    jsonLanguageService.configure({ allowComments: false, schemas: [{ fileMatch: ["*.data.json"], uri: jsonSchemaUri }] });
                    jsonDocument = jsonLanguageService.parseJSONDocument(textDocument);
                    return [4 /*yield*/, jsonLanguageService.doValidation(textDocument, jsonDocument)];
                case 1:
                    diagnostics = _a.sent();
                    console.log('Validation results:', diagnostics.map(function (d) { return "[line " + d.range.start.line + "] " + d.message; }));
                    return [4 /*yield*/, jsonLanguageService.doComplete(textDocument, { line: 2, character: 18 }, jsonDocument)];
                case 2:
                    competionResult = _a.sent();
                    console.log('Completion proposals:', competionResult === null || competionResult === void 0 ? void 0 : competionResult.items.map(function (i) { return "" + i.label; }));
                    return [2 /*return*/];
            }
        });
    });
}
main();
