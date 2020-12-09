import { DocumentLink } from 'vscode-languageserver-types';
import { TextDocument, Thenable } from '../jsonLanguageTypes';
import { JSONDocument } from '../parser/jsonParser';
export declare function findLinks(document: TextDocument, doc: JSONDocument): Thenable<DocumentLink[]>;
