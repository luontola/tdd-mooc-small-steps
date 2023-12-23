import { createApp } from "./prices_typed";
import { InMemoryDatabase } from "./database";

const port = 5010;
const app = createApp(new InMemoryDatabase().withTestData());
app.listen(port);

console.log(`LiftPassPricing API started on port ${port}.
You can open http://localhost:${port}/prices?type=night&age=23&date=2019-02-18
and you'll get the price of the list pass for the day.`);
