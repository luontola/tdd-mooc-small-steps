export class InMemoryDatabase {
  basePrice = [];
  holidays = [];

  withTestData() {
    this.setBasePrice("1jour", 35);
    this.setBasePrice("night", 19);
    this.addHoliday("2019-02-18", "winter");
    this.addHoliday("2019-02-25", "winter");
    this.addHoliday("2019-03-04", "winter");
    return this;
  }

  setBasePrice(type, cost) {
    type = type + "";
    cost = parseInt(cost);
    this.basePrice = this.basePrice.filter((row) => row.type !== type);
    this.basePrice.push({ type, cost });
  }

  findBasePriceByType(type) {
    const row = this.basePrice.find((row) => row.type === type);
    if (row !== undefined) {
      return { cost: row.cost };
    }
  }

  addHoliday(holiday, description) {
    holiday = holiday + "";
    description = description + "";
    this.holidays.push({ holiday, description });
  }

  getHolidays() {
    return this.holidays.map((row) => ({ ...row }));
  }
}
