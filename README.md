# [TDD MOOC](https://tdd-mooc.luontola.fi/): Small, safe steps

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

---

_This exercise is part of the [TDD MOOC](https://tdd-mooc.luontola.fi) at the University of Helsinki, brought to you
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

Start the application

    npm run start

Code reformat

    npm run format
