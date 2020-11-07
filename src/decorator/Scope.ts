import { getMetadataArgsStorage, ObjectType } from "..";
import { Connection } from "../connection/Connection";
import { QueryExpressionMap } from '../query-builder/QueryExpressionMap';

export type ScopeOptions = {
    apply(sql: string, scope: Object, expressionMap: QueryExpressionMap): string;
    enabled: boolean;
};

/**
 * Defines scoping behavior for a given table
 */
export function Scope(scope: ScopeOptions): ClassDecorator {
    return function (target) {
        const table = getMetadataArgsStorage().tables.find(
            (table) => table.target === target
        );

        if (table) {
            table.scope = scope;
        } else {
            throw new Error(
                "Could not find current entity in metadata store, maybe put @Scope() before @Entity()?"
            );
        }
    };
}

/**
 * Should be used for local override of scoping behavior
 * for a single query
 */
export function unscoped<Entity>(
    connection: Connection,
    target: ObjectType<Entity>
) {
    const metadata = connection.getMetadata(target).tableMetadataArgs;

    if (metadata.scope) {
        metadata.scope.enabled = false;
    }

    return target;
}
