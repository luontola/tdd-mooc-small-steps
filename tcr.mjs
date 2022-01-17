import { execSync } from "child_process";
import fs from "fs";

fs.watch("src", { recursive: true }, (_event, _filename) => {
  const changes = execSync("git diff --numstat", { encoding: "utf8" });
  if (changes !== "") {
    try {
      execSync("npm run test", {
        stdio: "inherit",
        env: { ...process.env, MAX_CHANGES: process.env.MAX_CHANGES || "1" },
      });
      console.log("Tests passed -> Commit changes");
      execSync("git commit --all --message='tcr: tests pass'", {
        stdio: "inherit",
      });
    } catch (e) {
      console.log("Test failed -> Revert changes");
      execSync("git reset --hard", { stdio: "inherit" });
    }
  }
});
