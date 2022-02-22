# [TDD MOOC](https://tdd.mooc.fi): Small, safe steps

This is a refactoring exercise to practise doing small, safe steps.

**Refactor the code in [src/prices.mjs](src/prices.mjs) to replace all usages of
the [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) class with
the [Temporal.PlainDate](https://tc39.es/proposal-temporal/docs/plaindate.html) class.**

Repeat this refactoring many times.

Focus on doing as small changes as possible, so that all the tests will pass between every change. It's even possible to
do this refactoring by changing only one line at a time.

Try out different approaches. For example refactor starting from where the `Date` value is created vs. where it is used.

Get to know your IDE and the automated refactorings it provides.
Try [refactoring golf](http://codemanship.co.uk/parlezuml/blog/?postid=1360) and get the lowest score possible.

## When is a change small?

Whether a change is big or small, is not always proportional to its diff size. What matters is the locality of the
change. Real applications contain more code than is feasible to read and keep in your head. Thus while refactoring, you
should minimize the amount of information that needs to be kept in your head.

A change is small when just by looking at a local change (e.g. the code within a single function) you can prove that it
doesn't break any code elsewhere in the system.

Such changes can be made mechanically in a second or two, without much thinking, so you can quickly do lots of them.
Running all tests between every change, you'll find out immediately if you broke something, so fixing it is easy and
quick. Often the fastest fix is to just undo the failed change and try again, but with even smaller steps.

### Example: parallel change

One refactoring strategy is to start from where the old value is produced, create the new value there, and pass it
side-by-side with the old value deeper down the call chain.

Example:

```js
const date = parseDate(req.query.date);
const cost = calculateCost(age, type, date, baseCost);
```

Add the new `date2` variable and pass it to every function that takes the old `date` variable:

```js
const date = parseDate(req.query.date);
const date2 = parsePlainDate(req.query.date);
const cost = calculateCost(age, type, date, baseCost, date2);
```

Next go inside the `calculateCost` function, change it to use `date2`, and forward the variable to the next level of
functions. Repeat until every function has been migrated use `date2`.

This refactoring strategy is demonstrated at https://youtu.be/MMAXNUCPMBw

### Example: conversion propagation

Another refactoring strategy is to start where the old value is used, convert it there to the new value, and push the
conversion up the call stack one function at a time.

Example:

```js
function isMonday(date) {
  return date.getDay() === 1;
}
```

Migrate the lowest level function to use the converted value:

```js
function isMonday(date) {
  return convert(date).dayOfWeek === 1;
}
```

Then do the [extract parameter](https://www.jetbrains.com/help/idea/extract-parameter.html) refactoring and push the
conversion to the caller of `isMonday`. The call site changes from `isMonday(date)` to `isMonday(convert(date))` and the
function now takes the new value as a parameter:

```js
function isMonday(date) {
  return date.dayOfWeek === 1;
}
```

Repeat for each function, until the conversion has propagated up to the place where the old value is produced and you
can produce the new value there directly.

This refactoring strategy is demonstrated at https://youtu.be/5jXgXip5LhA

## TCR challenge

If you set the environment variable `MAX_CHANGES` to `1` or higher, the tests will automatically check with Git that at
most that many lines have been modified.

This can be combined with [TCR](https://medium.com/@kentbeck_7670/test-commit-revert-870bbd756864): use
the `npm run tcr` command to commit or revert the changes automatically depending on whether the tests passed.

By default the TCR script will set `MAX_CHANGES=1`, but if you want to practise with a more lenient limit, try
the `MAX_CHANGES=2 npm run tcr` command at first.

If your editor runs [Prettier](https://prettier.io/) automatically on save, you might want to disable it to avoid
accidentally changed lines.

---

_This exercise is part of the [TDD MOOC](https://tdd.mooc.fi) at the University of Helsinki, brought to you
by [Esko Luontola](https://twitter.com/EskoLuontola) and [Nitor](https://nitor.com/). This exercise is based on
the [Lift Pass Pricing Refactoring Kata](https://github.com/martinsson/Refactoring-Kata-Lift-Pass-Pricing)
by [Johan Martinsson](https://twitter.com/johan_alps)._

## Prerequisites

You'll need a recent [Node.js](https://nodejs.org/) version. Then download this project's dependencies with:

    npm install

## Developing

This project uses [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/)
and [SuperTest](https://github.com/visionmedia/supertest) for testing.

Run tests once

    npm run test

Run tests continuously

    npm run autotest

Run tests [TCR](https://medium.com/@kentbeck_7670/test-commit-revert-870bbd756864) style. Defaults to `MAX_CHANGES=1`

    npm run tcr
    MAX_CHANGES=2 npm run tcr

Start the application

    npm run start

Code reformat

    npm run format
