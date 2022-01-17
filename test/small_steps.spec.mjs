import "../src/polyfills.mjs";
import { expect } from "chai";
import { exec } from "child_process";

function tryParseInt(str) {
  return str ? parseInt(str, 10) : null;
}

describe("Small steps", () => {
  const maxChanges = tryParseInt(process.env.MAX_CHANGES);

  it(`At most ${
    maxChanges ? maxChanges : "MAX_CHANGES"
  } lines should be changed at a time`, function (done) {
    if (!maxChanges) {
      this.skip();
      done();
    } else {
      exec("git diff --numstat", (error, stdout, stderr) => {
        expect(error, "error running git").to.be.null;

        const changes = stdout
          .split("\n")
          .map((line) => line.split("\t"))
          .filter((parts) => parts.length === 3)
          .map(([added, removed, _filename]) =>
            Math.max(parseInt(added, 10), parseInt(removed, 10))
          )
          .reduce((a, b) => a + b, 0);

        expect(changes, "number of changed lines").to.be.lessThanOrEqual(
          maxChanges
        );
        done();
      });
    }
  });
});
