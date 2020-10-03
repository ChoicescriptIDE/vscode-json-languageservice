import * as Parser from '../parser/jsonParser';
import * as SchemaService from './jsonSchemaService';
import { JSONWorkerContribution } from '../jsonContributions';
import { TextDocument, PromiseConstructor, Thenable, Position, Hover } from '../jsonLanguageTypes';
export declare class JSONHover {
    private schemaService;
    private contributions;
    private promise;
    constructor(schemaService: SchemaService.IJSONSchemaService, contributions: JSONWorkerContribution[] | undefined, promiseConstructor: PromiseConstructor);
    doHover(document: TextDocument, position: Position, doc: Parser.JSONDocument): Thenable<Hover | null>;
}
