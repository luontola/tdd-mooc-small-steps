import { Temporal, toTemporalInstant } from "@js-temporal/polyfill";

// TODO: remove after the Temporal API is released and included in Node.js
// @ts-ignore
global.Temporal = Temporal;
// @ts-ignore
Date.prototype.toTemporalInstant = toTemporalInstant;
