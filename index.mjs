import { createApp } from "./src/prices.mjs";
import { InMemoryDatabase } from "./src/database.mjs";

const app = createApp(new InMemoryDatabase().withTestData());
app.listen(5010);

console.log(`LiftPassPricing Api started on 5010,
you can open http://localhost:5010/prices?type=night&age=23&date=2019-02-18 in a navigator
and you'll get the price of the list pass for the day.`);
