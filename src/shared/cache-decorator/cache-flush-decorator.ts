import { cacheClient } from "../../tools/cache-client";

export async function flushGroupKeys(groupKeys: string[]): Promise<void> {
  await Promise.all(groupKeys.map((groupKey) => cacheClient.removeByPattern(groupKey)));
}
