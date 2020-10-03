import * as Parser from '../parser/jsonParser';
import { TextDocument, Thenable, ColorInformation, ColorPresentation, Color, DocumentSymbolsContext, Range, SymbolInformation, DocumentSymbol } from "../jsonLanguageTypes";
import { IJSONSchemaService } from "./jsonSchemaService";
export declare class JSONDocumentSymbols {
    private schemaService;
    constructor(schemaService: IJSONSchemaService);
    findDocumentSymbols(document: TextDocument, doc: Parser.JSONDocument, context?: DocumentSymbolsContext): SymbolInformation[];
    findDocumentSymbols2(document: TextDocument, doc: Parser.JSONDocument, context?: DocumentSymbolsContext): DocumentSymbol[];
    private getSymbolKind;
    private getKeyLabel;
    findDocumentColors(document: TextDocument, doc: Parser.JSONDocument, context?: DocumentSymbolsContext): Thenable<ColorInformation[]>;
    getColorPresentations(document: TextDocument, doc: Parser.JSONDocument, color: Color, range: Range): ColorPresentation[];
}
