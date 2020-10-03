import { JSONSchema } from '../jsonSchema';
import * as Parser from '../parser/jsonParser';
import { SchemaRequestService, WorkspaceContextService, PromiseConstructor, Thenable, MatchingSchema, TextDocument } from '../jsonLanguageTypes';
export interface IJSONSchemaService {
    /**
     * Registers a schema file in the current workspace to be applicable to files that match the pattern
     */
    registerExternalSchema(uri: string, filePatterns?: string[], unresolvedSchema?: JSONSchema): ISchemaHandle;
    /**
     * Clears all cached schema files
     */
    clearExternalSchemas(): void;
    /**
     * Registers contributed schemas
     */
    setSchemaContributions(schemaContributions: ISchemaContributions): void;
    /**
     * Looks up the appropriate schema for the given URI
     */
    getSchemaForResource(resource: string, document?: Parser.JSONDocument): Thenable<ResolvedSchema | undefined>;
    /**
     * Returns all registered schema ids
     */
    getRegisteredSchemaIds(filter?: (scheme: string) => boolean): string[];
}
export interface SchemaAssociation {
    pattern: string[];
    uris: string[];
}
export interface ISchemaContributions {
    schemas?: {
        [id: string]: JSONSchema;
    };
    schemaAssociations?: SchemaAssociation[];
}
export interface ISchemaHandle {
    /**
     * The schema id
     */
    url: string;
    /**
     * The schema from the file, with potential $ref references
     */
    getUnresolvedSchema(): Thenable<UnresolvedSchema>;
    /**
     * The schema from the file, with references resolved
     */
    getResolvedSchema(): Thenable<ResolvedSchema>;
}
declare type SchemaDependencies = {
    [uri: string]: true;
};
export declare class UnresolvedSchema {
    schema: JSONSchema;
    errors: string[];
    constructor(schema: JSONSchema, errors?: string[]);
}
export declare class ResolvedSchema {
    schema: JSONSchema;
    errors: string[];
    constructor(schema: JSONSchema, errors?: string[]);
    getSection(path: string[]): JSONSchema | undefined;
    private getSectionRecursive;
}
export declare class JSONSchemaService implements IJSONSchemaService {
    private contributionSchemas;
    private contributionAssociations;
    private schemasById;
    private filePatternAssociations;
    private registeredSchemasIds;
    private contextService;
    private callOnDispose;
    private requestService;
    private promiseConstructor;
    private cachedSchemaForResource;
    constructor(requestService?: SchemaRequestService, contextService?: WorkspaceContextService, promiseConstructor?: PromiseConstructor);
    getRegisteredSchemaIds(filter?: (scheme: string) => boolean): string[];
    get promise(): PromiseConstructor;
    dispose(): void;
    onResourceChange(uri: string): boolean;
    setSchemaContributions(schemaContributions: ISchemaContributions): void;
    private addSchemaHandle;
    private getOrAddSchemaHandle;
    private addFilePatternAssociation;
    registerExternalSchema(uri: string, filePatterns?: string[], unresolvedSchemaContent?: JSONSchema): ISchemaHandle;
    clearExternalSchemas(): void;
    getResolvedSchema(schemaId: string): Thenable<ResolvedSchema | undefined>;
    loadSchema(url: string): Thenable<UnresolvedSchema>;
    resolveSchemaContent(schemaToResolve: UnresolvedSchema, schemaURL: string, dependencies: SchemaDependencies): Thenable<ResolvedSchema>;
    getSchemaForResource(resource: string, document?: Parser.JSONDocument): Thenable<ResolvedSchema | undefined>;
    private createCombinedSchema;
    getMatchingSchemas(document: TextDocument, jsonDocument: Parser.JSONDocument, schema?: JSONSchema): Thenable<MatchingSchema[]>;
}
export {};
