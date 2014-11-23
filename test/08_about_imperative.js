var Rx = require('rx'),
    Observable = Rx.Observable;

QUnit.module('Imperative');

var __ = 'Fill in the blank';

test('can make a decision with an if with no else', function () {
  var results = [];
  Observable.range(1, 10)
    .flatMap(function (x) {
      return Rx.Observable.if(
        function () { return x % 2 === 0; },
        Observable.just(x)
      );
    })
    .subscribe(results.push.bind(results));

  equal(__, results.join(''));
});

test('can make a decision with an if with an else', function () {
  var results = [];
  Observable.range(1, 5)
    .flatMap(function (x, i) {
      return Rx.Observable.if(
        function () { return x % 2 === 0; },
        Observable.just(x),
        Observable.range(x, i)
      );
    })
    .subscribe(results.push.bind(results));

  equal(__, results.join(''));
});

test('we can make test cases', function () {
  var result = '';

  var cases = {
    'matt': Observable.just(1),
    'erik': Observable.just(2),
    'bart': Observable.just(3),
    'wes': Observable.just(4)
  };

  Observable.just(__)
    .flatMap(function (x) {
      return Observable.case(
        function () { return x; },
        cases
      );
    })
    .subscribe(function (x) { result = x; });

  equal(4, result);
});
