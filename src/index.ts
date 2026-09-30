export * from './types';
// `./types` resolves to the sibling `types.ts` file (Node/TS module
// resolution prefers an exact file match over a same-named directory), so
// `types/index.ts` was never actually reachable through the package root —
// its `EscrowState`/`EscrowParams`/`EscrowId` types silently shadowed by
// nothing, just unexported. Explicit path re-exports both without collision
// since none of its names overlap with the flat `Escrow` in types.ts (#80).
export * from './types/index';
export * from './types/contract';
export * from './types/events';
export * from './types/multisig';
export * from './types/juror';
export * from './types/profile';
export * from './constants';
export * from './escrow';
export * from './juror';
export * from './profile';
export * from './storage';
export * from './auth';
export * from './stellar';
export * from './utils/validation';
export * from './utils/format';
export * from './utils/i128';
export * from './tx-pipeline';
export * from './wallet/mock';
export { TrustFlowClient } from './client';
export * from './errors';

// Zod runtime validation schemas (#45) — re-exported by name rather than
// `export *` because `Network` and `ClientConfig` already exist as plain
// TS types from './types'; only the schema objects and the composite
// "*Input" types are exposed here to avoid ambiguous re-exports.
export {
  StellarAddressSchema,
  ContractIdSchema,
  StroopsSchema,
  NetworkSchema,
  CreateEscrowSchema,
  ReleaseEscrowSchema,
  DisputeEscrowSchema,
  ClientConfigSchema,
} from './schemas';
export type { CreateEscrowInput, ReleaseEscrowInput, DisputeEscrowInput } from './schemas';
