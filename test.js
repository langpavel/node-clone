if(module.parent === null) {
  console.log('Run this test file with nodeunit:');
  console.log('$ nodeunit test.js');
}


var clone = require('./'),
    util = require('util'),
    _ = require('underscore');



exports["clone string"] = function(test) {
  test.expect(2); // how many tests?

  var a = "foo";
  test.strictEqual(clone(a), a);
  a = "";
  test.strictEqual(clone(a), a);

  test.done();
};



exports["clone number"] = function(test) {
  test.expect(5); // how many tests?

  var a = 0;
  test.strictEqual(clone(a), a);
  a = 1;
  test.strictEqual(clone(a), a);
  a = -1000;
  test.strictEqual(clone(a), a);
  a = 3.1415927;
  test.strictEqual(clone(a), a);
  a = -3.1415927;
  test.strictEqual(clone(a), a);

  test.done();
};



exports["clone date"] = function(test) {
  test.expect(3); // how many tests?

  var a = new Date;
  var c = clone(a);
  test.ok(a instanceof Date);
  test.ok(c instanceof Date);
  test.equal(c.getTime(), a.getTime());

  test.done();
};



exports["clone object"] = function(test) {
  test.expect(2); // how many tests?

  var a = { foo: { bar: "baz" } };
  var b = clone(a);

  test.ok(_(a).isEqual(b), "underscore equal");
  test.deepEqual(b, a);

  test.done();
};



exports["clone array"] = function(test) {
  test.expect(2); // how many tests?

  var a = [
    { foo: "bar" },
    "baz"
  ];
  var b = clone(a);

  test.ok(_(a).isEqual(b), "underscore equal");
  test.deepEqual(b, a);

  test.done();
};



exports["clone object containing array"] = function(test) {
  test.expect(2); // how many tests?

  var a = {
    arr1: [ { a: '1234', b: '2345' } ],
    arr2: [ { c: '345', d: '456' } ]
  };
  var b = clone(a);

  test.ok(_(a).isEqual(b), "underscore equal");
  test.deepEqual(b, a);

  test.done();
};



exports["clone object with circular reference"] = function(test) {
  test.expect(8); // how many tests?

  var _ = test.ok;
  var c = [1, "foo", {'hello': 'bar'}, function() {}, false, [2]];
  var b = [c, 2, 3, 4];
  var a = {'b': b, 'c': c};
  a.loop = a;
  a.loop2 = a;
  c.loop = c;
  c.aloop = a;
  var aCopy = clone(a);
  _(a != aCopy);
  _(a.c != aCopy.c);
  _(aCopy.c == aCopy.b[0]);
  _(aCopy.c.loop.loop.aloop == aCopy);
  _(aCopy.c[0] == a.c[0]);
  
  //console.log(util.inspect(aCopy, true, null) );
  //console.log("------------------------------------------------------------");
  //console.log(util.inspect(a, true, null) );
  _(eq(a, aCopy));
  aCopy.c[0] = 2;
  _(!eq(a, aCopy));
  aCopy.c = "2";
  _(!eq(a, aCopy));
  //console.log("------------------------------------------------------------");
  //console.log(util.inspect(aCopy, true, null) );

  function eq(x, y) {
    return util.inspect(x, true, null) === util.inspect(y, true, null);
  }

  test.done();
};



exports['prototypeClone'] = function(test) {
  test.expect(3); // how many tests?

  var a = {
    a: "aaa",
    x: 123,
    y: 45.65
  };
  var b = clone.prototypeClone(a);

  test.strictEqual(b.a, a.a);
  test.strictEqual(b.x, a.x);
  test.strictEqual(b.y, a.y);

  test.done();
}