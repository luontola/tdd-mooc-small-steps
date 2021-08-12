import express from "express";

function parseDate(dateString) {
  if (dateString) {
    return new Date(dateString);
  }
}

function createApp(database) {
  const app = express();

  function isHoliday(date) {
    const holidays = database.getHolidays();
    for (let row of holidays) {
      let holiday = new Date(row.holiday);
      if (
        date &&
        date.getFullYear() === holiday.getFullYear() &&
        date.getMonth() === holiday.getMonth() &&
        date.getDate() === holiday.getDate()
      ) {
        return true;
      }
    }
    return false;
  }

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

    let reduction;
    if (age < 6) {
      res.json({ cost: 0 });
    } else {
      reduction = 0;
      if (type !== "night") {
        if (date && !isHoliday(date) && date.getDay() === 1) {
          reduction = 35;
        }

        // TODO apply reduction for others
        if (age < 15) {
          res.json({ cost: Math.ceil(baseCost * 0.7) });
        } else {
          if (age === undefined) {
            let cost = baseCost * (1 - reduction / 100);
            res.json({ cost: Math.ceil(cost) });
          } else {
            if (age > 64) {
              let cost = baseCost * 0.75 * (1 - reduction / 100);
              res.json({ cost: Math.ceil(cost) });
            } else {
              let cost = baseCost * (1 - reduction / 100);
              res.json({ cost: Math.ceil(cost) });
            }
          }
        }
      } else {
        if (age >= 6) {
          if (age > 64) {
            res.json({ cost: Math.ceil(baseCost * 0.4) });
          } else {
            res.json(database.findBasePriceByType(type));
          }
        } else {
          res.json({ cost: 0 });
        }
      }
    }
  });
  return app;
}

export { createApp };
