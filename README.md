# [TDD MOOC](https://tdd.mooc.fi): Small, safe steps

This is a refactoring exercise to practise doing small, safe steps.

**Refactor the code in [src/prices.mjs](src/prices.mjs) to replace all usages of
the [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) class with
the [Temporal.PlainDate](https://tc39.es/proposal-temporal/docs/plaindate.html) class.**

Repeat this refactoring many times.

Focus on doing as small changes as possible, so that all the tests will pass between every change. Preferably change
only one line at a time.

Try out different approaches. For example refactor starting from where the `Date` value is created vs. where it is used.

Get to know your IDE and the automated refactorings it provides.
Try [refactoring golf](http://codemanship.co.uk/parlezuml/blog/?postid=1360) and get the lowest score possible.

### TCR challenge

If you set the environment variable `MAX_CHANGES` to `1` or higher, the tests will automatically check with Git that at
most that many lines have been modified.

This can be combined with [TCR](https://medium.com/@kentbeck_7670/test-commit-revert-870bbd756864): use
the `npm run tcr` command to commit or revert the changes automatically depending on whether the tests passed.

By default the TCR script will set `MAX_CHANGES=1`, but if you want to practise with a more lenient limit, try
the `MAX_CHANGES=2 npm run tcr` command at first.

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
