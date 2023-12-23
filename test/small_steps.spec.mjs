import { describe, it } from "vitest";
import { expect } from "chai";
import util from "node:util";

const exec = util.promisify(require("child_process").exec);

function tryParseInt(str) {
  return str ? parseInt(str, 10) : null;
}

describe("Small steps", () => {
  const maxChanges = tryParseInt(process.env.MAX_CHANGES);
  const maxChangesText = maxChanges ?? "MAX_CHANGES";

  it(`At most ${maxChangesText} lines should be changed at a time`, async (context) => {
    if (!maxChanges) {
      context.skip();
    } else {
      const { stdout } = await exec("git diff --numstat -- src");

      const changes = stdout
        .split("\n")
        .map((line) => line.split("\t"))
        .filter((parts) => parts.length === 3)
        .map(([added, removed, _filename]) => Math.max(parseInt(added, 10), parseInt(removed, 10)))
        .reduce((a, b) => a + b, 0);

      expect(changes, "number of changed lines").to.be.lessThanOrEqual(maxChanges);
    }
  });
});
