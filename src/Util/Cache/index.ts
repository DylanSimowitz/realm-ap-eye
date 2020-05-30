import { ExpirationStrategy, MemoryStorage } from "@hokify/node-ts-cache";
export const cacheStrategy = new ExpirationStrategy(new MemoryStorage());
