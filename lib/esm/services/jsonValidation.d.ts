import { JSONSchemaService } from './jsonSchemaService';
import { JSONDocument } from '../parser/jsonParser';
import { TextDocument, PromiseConstructor, Thenable, LanguageSettings, DocumentLanguageSettings, Diagnostic } from '../jsonLanguageTypes';
import { JSONSchema } from '../jsonSchema';
export declare class JSONValidation {
    private jsonSchemaService;
    private promise;
    private validationEnabled;
    private commentSeverity;
    constructor(jsonSchemaService: JSONSchemaService, promiseConstructor: PromiseConstructor);
    configure(raw: LanguageSettings): void;
    doValidation(textDocument: TextDocument, jsonDocument: JSONDocument, documentSettings?: DocumentLanguageSettings, schema?: JSONSchema): Thenable<Diagnostic[]>;
}
