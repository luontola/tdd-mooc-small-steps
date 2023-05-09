import "./polyfills.mjs";
import express from "express";

// Refactor the following code to get rid of the legacy Date class.
// Use Temporal.PlainDate instead. See /test/date_conversion.spec.mjs for examples.

function createApp(database) {
  const app = express();

  app.put("/prices", (req, res) => {
    const liftPassCost = req.query.cost;
    const liftPassType = req.query.type;
    database.setBasePrice(liftPassType, liftPassCost);
    res.json();
  });

  app.get("/prices", (req, res) => {
    const age = req.query.age;
    const type = req.query.type;
    const baseCost = database.findBasePriceByType(type).cost;
    const date = parseDate(req.query.date);
    const date2 = req.query.date ? Temporal.PlainDate.from(req.query.date) : null;
    const cost = calculateCost(age, type, date, baseCost, date2);
    res.json({ cost });
  });

  function parseDate(dateString) {
    if (dateString) {
      return new Date(dateString);
    }
  }

  function calculateCost(age, type, date, baseCost, date2) {
    if (type === "night") {
      return calculateCostForNightTicket(age, baseCost);
    } else {
      return calculateCostForDayTicket(age, date, baseCost, date2);
    }
  }

  function calculateCostForNightTicket(age, baseCost) {
    if (age === undefined) {
      return 0;
    }
    if (age < 6) {
      return 0;
    }
    if (age > 64) {
      return Math.ceil(baseCost * 0.4);
    }
    return baseCost;
  }

  function calculateCostForDayTicket(age, date, baseCost, date2) {
    let reduction = calculateReduction(date2);
    if (age === undefined) {
      return Math.ceil(baseCost * (1 - reduction / 100));
    }
    if (age < 6) {
      return 0;
    }
    if (age < 15) {
      return Math.ceil(baseCost * 0.7);
    }
    if (age > 64) {
      return Math.ceil(baseCost * 0.75 * (1 - reduction / 100));
    }
    return Math.ceil(baseCost * (1 - reduction / 100));
  }

  function calculateReduction(date2) {
    let reduction = 0;
    if (date2 && isMonday(date2) && !isHoliday(date2)) {
      reduction = 35;
    }
    return reduction;
  }

  function isMonday(date2) {
    return date2.dayOfWeek === 1;
  }

  function isHoliday(date2) {
    const holidays = database.getHolidays();
    for (let row of holidays) {
      let holiday = Temporal.PlainDate.from(row.holiday);
      if (
        date2 && date2.equals(holiday)
      ) {
        return true;
      }
    }
    return false;
  }

  return app;
}

export { createApp };
