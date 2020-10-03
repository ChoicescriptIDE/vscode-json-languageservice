import { Position, SelectionRange, TextDocument } from '../jsonLanguageTypes';
import { JSONDocument } from '../parser/jsonParser';
export declare function getSelectionRanges(document: TextDocument, positions: Position[], doc: JSONDocument): SelectionRange[];
