import { describe, it } from "vitest";
import { expect } from "chai";
import "../src/polyfills";
import { Temporal } from "@js-temporal/polyfill";

// Some examples of using the Temporal API
// See https://tc39.es/proposal-temporal/docs/

describe("Date conversion", () => {
  it("String -> PlainDate", () => {
    expect(Temporal.PlainDate.from("2000-12-31").equals(new Temporal.PlainDate(2000, 12, 31))).to.be.true;
  });

  it("Date -> Instant", () => {
    expect(new Date(42).toTemporalInstant().equals(Temporal.Instant.fromEpochMilliseconds(42))).to.be.true;
  });

  it("Date -> PlainDate", () => {
    expect(
      new Date(42)
        .toTemporalInstant()
        .toZonedDateTimeISO("UTC")
        .toPlainDate()
        .equals(new Temporal.PlainDate(1970, 1, 1)),
    ).to.be.true;
  });
});
