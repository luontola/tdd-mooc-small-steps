import {Temporal, toTemporalInstant} from "@js-temporal/polyfill";

// TODO: remove after the Temporal API is released and included in Node.js
global.Temporal = Temporal;
Date.prototype.toTemporalInstant = toTemporalInstant;
