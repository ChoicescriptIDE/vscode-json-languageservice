import { DefinitionLink, Position, TextDocument, Thenable } from '../jsonLanguageTypes';
import { JSONDocument } from '../parser/jsonParser';
export declare function findDefinition(document: TextDocument, position: Position, doc: JSONDocument): Thenable<DefinitionLink[]>;
