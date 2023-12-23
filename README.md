# [TDD MOOC](https://tdd.mooc.fi): Small, safe steps

This is a refactoring exercise to practise doing small, safe steps.

**Refactor the code in [src/prices.mjs](src/prices.mjs) to replace all usages of
the [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) class with
the [Temporal.PlainDate](https://tc39.es/proposal-temporal/docs/plaindate.html) class.**

Alternatively you may refactor the statically typed version: [src/prices_typed.ts](src/prices_typed.ts)

(In [test/date_conversion.spec.mjs](test/date_conversion.spec.mjs) there are learning tests about using the Temporal
API.)

Repeat this refactoring many times.

Focus on doing as small changes as possible, so that all the tests will pass between every change. Make it your goal to
change at most _2 lines_ at a time. It's even possible to do this refactoring by changing only _1 line_ at a time,
though that will require some unconventional refactoring strategies and good familiarity with JavaScript, because then
you can no longer change a function signature and all calls to that function at the same time. (In real life, changing
1-3 lines at a time is normal.)

Try out different approaches. For example refactor starting from where the `Date` value is created vs. where it is used.
You may also try copying a function, changing the new function, and then migrating all code to use it one-by-one,
instead of changing an existing function.

Get to know your IDE and the automated refactorings it provides.
Try [refactoring golf](https://github.com/daviddenton/refactoring-golf#readme) and get the lowest score possible.

## When is a change small?

Whether a change is big or small, is not always proportional to its diff size. What matters is the locality of the
change. Real applications contain more code than is feasible to read and keep in your head. Thus while refactoring, you
should minimize the amount of information that needs to be kept in your head.

A change is small when just by looking at a local change (e.g. the code within a single function) you can prove that it
doesn't break any code elsewhere in the system.

Such changes can be made mechanically in a second or two, without much thinking, so you can quickly do lots of them.
Running all tests between every change, you'll find out immediately if you broke something, so fixing it is easy and
quick. Often the fastest fix is to just undo the failed change and try again, but with even smaller steps.

With good support for automated refactorings in your IDE, it can expand the range of safe moves. For example, it may
allow changing a function signature and all calls to that function in a single step.

### Example: parallel change

One very common refactoring strategy is to have the new and old code exist side-by-side, until all code has been
migrated to use the new code, and the old code can be removed.

(It works also for entire systems, such as the change from [NMT](https://en.wikipedia.org/wiki/Nordic_Mobile_Telephone)
to [GSM](https://en.wikipedia.org/wiki/GSM) networks. And lots of public sector IT projects fail because of doing a big
bang release instead of parallel change.)

For example, start from where the old value is produced, create the new value there, and pass it side-by-side with the
old value deeper down the call chain.

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

Another refactoring strategy is to create a migration boundary at one edge of the codebase, and push the migration
incrementally through the whole codebase. This works when the old value contains all data necessary for producing the
new value. (There's no official name for this refactoring, so let's call it _conversion propagation_ for now.)

For example, start where the old value is used, and convert it to the new value right before using it. Push the
conversion up the call stack one function at a time, until you reach where the old value was originally created.

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

This can be combined with
[test && commit || revert](https://medium.com/@kentbeck_7670/test-commit-revert-870bbd756864) (TCR):

Use the `npm run tcr` command to commit or revert the changes automatically depending on whether the tests passed.

By default the `npm run tcr` command sets `MAX_CHANGES=2`. To increase the difficulty, you can use the
command: `MAX_CHANGES=1 npm run tcr` (Mac/Linux).

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

This project uses [Vitest](https://vitest.dev/), [Chai](https://www.chaijs.com/)
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
