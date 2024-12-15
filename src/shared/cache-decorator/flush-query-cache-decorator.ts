import { flushGroupKeys } from "./cache-flush-decorator";

function createGroupKeys(handlers: any[]) {
  return handlers.map((handler) => `Queries:${handler.name}:*`);
}

export interface FlushCachedQueriesDependencies {
  handlers: any[];
}

export async function flushCachedQueries({ handlers }: FlushCachedQueriesDependencies) {
  return flushGroupKeys(createGroupKeys(handlers));
}
