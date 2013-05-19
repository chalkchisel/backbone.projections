// Generated by CoffeeScript 1.6.2
var Capped, Collection, Filtered, Model, Reversed, Sorted, deepEqual, equal, ok, _ref, _ref1, _ref2,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ref = (typeof window !== "undefined" && window !== null ? window.Backbone : void 0) || require('backbone'), Collection = _ref.Collection, Model = _ref.Model;

_ref1 = (typeof window !== "undefined" && window !== null ? window.BackboneProjections : void 0) || require('../lib/index'), Capped = _ref1.Capped, Filtered = _ref1.Filtered, Sorted = _ref1.Sorted, Reversed = _ref1.Reversed;

_ref2 = (typeof window !== "undefined" && window !== null ? window.assert : void 0) || require('assert'), equal = _ref2.equal, deepEqual = _ref2.deepEqual, ok = _ref2.ok;

describe('Capped', function() {
  describe('initialization from a collection', function() {
    var assertUnderlying, underlying;

    underlying = new Collection([
      {
        a: 1,
        b: 2
      }, {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 4
      }
    ]);
    assertUnderlying = function(underlying) {
      equal(underlying.length, 4);
      equal(underlying.at(0).get('a'), 1);
      equal(underlying.at(1).get('a'), 2);
      equal(underlying.at(2).get('a'), 3);
      return equal(underlying.at(3).get('a'), 4);
    };
    it('caps a collection', function() {
      var c;

      c = new Capped(underlying, {
        cap: 2
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 1);
      equal(c.at(1).get('a'), 2);
      equal(c.at(2), void 0);
      return assertUnderlying(underlying);
    });
    return it('uses a comparator if provided', function() {
      var c;

      c = new Capped(underlying, {
        cap: 2,
        comparator: function(model) {
          return model.get('b');
        }
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 3);
      equal(c.at(1).get('a'), 1);
      equal(c.at(2), void 0);
      return assertUnderlying(underlying);
    });
  });
  describe('responding to an underlying reset event', function() {
    var assertUnderlying, underlyingItems;

    underlyingItems = [
      {
        a: 1,
        b: 2
      }, {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 4
      }
    ];
    assertUnderlying = function(underlying) {
      equal(underlying.length, 4);
      equal(underlying.at(0).get('a'), 1);
      equal(underlying.at(1).get('a'), 2);
      equal(underlying.at(2).get('a'), 3);
      return equal(underlying.at(3).get('a'), 4);
    };
    it('caps on reset', function() {
      var c, underlying;

      underlying = new Collection([]);
      c = new Capped(underlying, {
        cap: 2
      });
      equal(c.length, 0);
      underlying.reset(underlyingItems);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 1);
      equal(c.at(1).get('a'), 2);
      equal(c.at(2), void 0);
      return assertUnderlying(underlying);
    });
    return it('uses a comparator if provided', function() {
      var c, underlying;

      underlying = new Collection([]);
      c = new Capped(underlying, {
        cap: 2,
        comparator: function(model) {
          return model.get('b');
        }
      });
      equal(c.length, 0);
      underlying.reset(underlyingItems);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 3);
      equal(c.at(1).get('a'), 1);
      equal(c.at(2), void 0);
      return assertUnderlying(underlying);
    });
  });
  describe('responding to an underlying add event', function() {
    it('responds to an add event', function() {
      var c, underlying;

      underlying = new Collection([]);
      c = new Capped(underlying, {
        cap: 2
      });
      equal(c.length, 0);
      underlying.add({
        a: 1
      });
      equal(underlying.length, 1);
      equal(c.length, 1);
      underlying.add([
        {
          a: 2
        }, {
          a: 3
        }
      ]);
      equal(underlying.length, 3);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 1);
      equal(c.at(0).get('a'), underlying.at(0).get('a'));
      equal(c.at(1).get('a'), 2);
      equal(c.at(1).get('a'), underlying.at(1).get('a'));
      equal(c.at(2), void 0);
      underlying.add({
        a: 4
      }, {
        at: 1
      });
      equal(underlying.length, 4);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 1);
      equal(c.at(0).get('a'), underlying.at(0).get('a'));
      equal(c.at(1).get('a'), 4);
      equal(c.at(1).get('a'), underlying.at(1).get('a'));
      underlying.add({
        a: 5
      }, {
        at: 0
      });
      equal(underlying.length, 5);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 5);
      equal(c.at(0).get('a'), underlying.at(0).get('a'));
      equal(c.at(1).get('a'), 1);
      return equal(c.at(1).get('a'), underlying.at(1).get('a'));
    });
    return it('responds to an add event w/ comparator provided', function() {
      var c, underlying;

      underlying = new Collection([]);
      c = new Capped(underlying, {
        cap: 2,
        comparator: function(model) {
          return model.get('b');
        }
      });
      equal(c.length, 0);
      underlying.add({
        a: 1,
        b: 3
      });
      equal(underlying.length, 1);
      equal(c.length, 1);
      underlying.add([
        {
          a: 2,
          b: 1
        }, {
          a: 3,
          b: 2
        }
      ]);
      equal(underlying.length, 3);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 2);
      equal(c.at(1).get('a'), 3);
      underlying.add({
        a: 4,
        b: 4
      }, {
        at: 1
      });
      equal(underlying.length, 4);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 2);
      equal(c.at(1).get('a'), 3);
      underlying.add({
        a: 5,
        b: 1.5
      }, {
        at: 0
      });
      equal(underlying.length, 5);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 2);
      return equal(c.at(1).get('a'), 5);
    });
  });
  describe('responding to an underlying remove event', function() {
    it('responds to an remove event', function() {
      var c, underlying;

      underlying = new Collection([
        {
          a: 1,
          b: 2
        }, {
          a: 2,
          b: 3
        }, {
          a: 3,
          b: 1
        }, {
          a: 4,
          b: 4
        }
      ]);
      c = new Capped(underlying, {
        cap: 2
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 1);
      equal(c.at(0).get('a'), underlying.at(0).get('a'));
      equal(c.at(1).get('a'), 2);
      equal(c.at(1).get('a'), underlying.at(1).get('a'));
      underlying.remove(underlying.at(2));
      equal(c.length, 2);
      equal(c.at(0).get('a'), 1);
      equal(c.at(0).get('a'), underlying.at(0).get('a'));
      equal(c.at(1).get('a'), 2);
      equal(c.at(1).get('a'), underlying.at(1).get('a'));
      underlying.remove(underlying.at(0));
      equal(c.length, 2);
      equal(c.at(0).get('a'), 2);
      equal(c.at(0).get('a'), underlying.at(0).get('a'));
      equal(c.at(1).get('a'), 4);
      return equal(c.at(1).get('a'), underlying.at(1).get('a'));
    });
    return it('responds to a remove event w/ comparator provided', function() {
      var c, underlying;

      underlying = new Collection([
        {
          a: 1,
          b: 2
        }, {
          a: 2,
          b: 3
        }, {
          a: 3,
          b: 1
        }, {
          a: 4,
          b: 4
        }
      ]);
      c = new Capped(underlying, {
        cap: 2,
        comparator: function(model) {
          return model.get('b');
        }
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 3);
      equal(c.at(1).get('a'), 1);
      underlying.remove(underlying.at(2));
      equal(c.length, 2);
      equal(c.at(0).get('a'), 1);
      equal(c.at(1).get('a'), 2);
      underlying.remove(underlying.at(1));
      equal(c.length, 2);
      equal(c.at(0).get('a'), 1);
      return equal(c.at(1).get('a'), 4);
    });
  });
  describe('handling of an underlying sort event', function() {
    var underlyingItems;

    underlyingItems = [
      {
        a: 1,
        b: 2
      }, {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 4
      }
    ];
    it('responds to a sort event if no comparator is provided', function() {
      var c, underlying;

      underlying = new Collection([], {
        comparator: function(model) {
          return model.get('b');
        }
      });
      underlying.add(underlyingItems, {
        sort: false
      });
      c = new Capped(underlying, {
        cap: 2
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 1);
      equal(c.at(0).get('a'), underlying.at(0).get('a'));
      equal(c.at(1).get('a'), 2);
      equal(c.at(1).get('a'), underlying.at(1).get('a'));
      underlying.sort();
      equal(c.at(0).get('a'), 3);
      equal(c.at(0).get('a'), underlying.at(0).get('a'));
      equal(c.at(1).get('a'), 1);
      return equal(c.at(1).get('a'), underlying.at(1).get('a'));
    });
    return it('ignores a sort event if comparator is provided', function() {
      var c, underlying;

      underlying = new Collection([], {
        comparator: function(model) {
          return model.get('b');
        }
      });
      underlying.add(underlyingItems, {
        sort: false
      });
      c = new Capped(underlying, {
        cap: 2,
        comparator: function(model) {
          return model.get('b');
        }
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 3);
      equal(c.at(1).get('a'), 1);
      underlying.sort();
      equal(c.at(0).get('a'), 3);
      return equal(c.at(1).get('a'), 1);
    });
  });
  return describe('resizing', function() {
    it('upsizes', function() {
      var c, underlying;

      underlying = new Collection([
        {
          a: 1,
          b: 2
        }, {
          a: 2,
          b: 3
        }, {
          a: 3,
          b: 1
        }, {
          a: 4,
          b: 4
        }
      ]);
      c = new Capped(underlying, {
        cap: 2
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 1);
      equal(c.at(1).get('a'), 2);
      c.resize(4);
      equal(c.length, 4);
      equal(c.at(0).get('a'), 1);
      equal(c.at(1).get('a'), 2);
      equal(c.at(2).get('a'), 3);
      return equal(c.at(3).get('a'), 4);
    });
    it('upsizes w/ comparator', function() {
      var c, underlying;

      underlying = new Collection([
        {
          a: 1,
          b: 2
        }, {
          a: 2,
          b: 3
        }, {
          a: 3,
          b: 1
        }, {
          a: 4,
          b: 4
        }
      ]);
      c = new Capped(underlying, {
        cap: 2,
        comparator: function(model) {
          return model.get('b');
        }
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 3);
      equal(c.at(1).get('a'), 1);
      c.resize(4);
      equal(c.length, 4);
      equal(c.at(0).get('a'), 3);
      equal(c.at(1).get('a'), 1);
      equal(c.at(2).get('a'), 2);
      return equal(c.at(3).get('a'), 4);
    });
    it('downsizes', function() {
      var c, underlying;

      underlying = new Collection([
        {
          a: 1,
          b: 2
        }, {
          a: 2,
          b: 3
        }, {
          a: 3,
          b: 1
        }, {
          a: 4,
          b: 4
        }
      ]);
      c = new Capped(underlying, {
        cap: 2
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 1);
      equal(c.at(1).get('a'), 2);
      c.resize(1);
      equal(c.length, 1);
      return equal(c.at(0).get('a'), 1);
    });
    return it('downsizes w/ comparator', function() {
      var c, underlying;

      underlying = new Collection([
        {
          a: 1,
          b: 2
        }, {
          a: 2,
          b: 3
        }, {
          a: 3,
          b: 1
        }, {
          a: 4,
          b: 4
        }
      ]);
      c = new Capped(underlying, {
        cap: 2,
        comparator: function(model) {
          return model.get('b');
        }
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 3);
      equal(c.at(1).get('a'), 1);
      c.resize(1);
      equal(c.length, 1);
      return equal(c.at(0).get('a'), 3);
    });
  });
});

describe('Filtered', function() {
  describe('initialization from a collection', function() {
    var assertUnderlying, underlying;

    underlying = new Collection([
      {
        a: 1,
        b: 2
      }, {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 4
      }
    ]);
    assertUnderlying = function(underlying) {
      equal(underlying.length, 4);
      equal(underlying.at(0).get('a'), 1);
      equal(underlying.at(1).get('a'), 2);
      equal(underlying.at(2).get('a'), 3);
      return equal(underlying.at(3).get('a'), 4);
    };
    it('filters a collection', function() {
      var c;

      c = new Filtered(underlying, {
        filter: function(model) {
          return model.get('a') < 4 && model.get('a') > 1;
        }
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 2);
      equal(c.at(1).get('a'), 3);
      equal(c.at(2), void 0);
      return assertUnderlying(underlying);
    });
    return it('uses a comparator if provided', function() {
      var c;

      c = new Filtered(underlying, {
        filter: function(model) {
          return model.get('a') < 4 && model.get('a') > 1;
        },
        comparator: function(model) {
          return model.get('b');
        }
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 3);
      equal(c.at(1).get('a'), 2);
      equal(c.at(2), void 0);
      return assertUnderlying(underlying);
    });
  });
  describe('responding to an underlying reset event', function() {
    var assertUnderlying, underlyingItems;

    underlyingItems = [
      {
        a: 1,
        b: 2
      }, {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 4
      }
    ];
    assertUnderlying = function(underlying) {
      equal(underlying.length, 4);
      equal(underlying.at(0).get('a'), 1);
      equal(underlying.at(1).get('a'), 2);
      equal(underlying.at(2).get('a'), 3);
      return equal(underlying.at(3).get('a'), 4);
    };
    it('filters on reset', function() {
      var c, underlying;

      underlying = new Collection([]);
      c = new Filtered(underlying, {
        filter: function(model) {
          return model.get('a') < 4 && model.get('a') > 1;
        }
      });
      equal(c.length, 0);
      underlying.reset(underlyingItems);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 2);
      equal(c.at(1).get('a'), 3);
      equal(c.at(2), void 0);
      return assertUnderlying(underlying);
    });
    return it('uses a comparator if provided', function() {
      var c, underlying;

      underlying = new Collection([]);
      c = new Filtered(underlying, {
        filter: function(model) {
          return model.get('a') < 4 && model.get('a') > 1;
        },
        comparator: function(model) {
          return model.get('b');
        }
      });
      equal(c.length, 0);
      underlying.reset(underlyingItems);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 3);
      equal(c.at(1).get('a'), 2);
      equal(c.at(2), void 0);
      return assertUnderlying(underlying);
    });
  });
  describe('responding to an underlying remove event', function() {
    it('responds to an remove event', function() {
      var c, underlying;

      underlying = new Collection([
        {
          a: 1,
          b: 2
        }, {
          a: 2,
          b: 3
        }, {
          a: 3,
          b: 1
        }, {
          a: 4,
          b: 4
        }
      ]);
      c = new Filtered(underlying, {
        filter: function(model) {
          return model.get('a') < 4 && model.get('a') > 1;
        }
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 2);
      equal(c.at(1).get('a'), 3);
      underlying.remove(underlying.at(2));
      equal(c.length, 1);
      equal(c.at(0).get('a'), 2);
      underlying.remove(underlying.at(0));
      equal(c.length, 1);
      return equal(c.at(0).get('a'), 2);
    });
    return it('responds to a remove event w/ comparator provided', function() {
      var c, underlying;

      underlying = new Collection([
        {
          a: 1,
          b: 2
        }, {
          a: 2,
          b: 3
        }, {
          a: 3,
          b: 1
        }, {
          a: 4,
          b: 4
        }
      ]);
      c = new Filtered(underlying, {
        filter: function(model) {
          return model.get('a') < 4 && model.get('a') > 1;
        },
        comparator: function(model) {
          return model.get('b');
        }
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 3);
      equal(c.at(1).get('a'), 2);
      underlying.remove(underlying.at(2));
      equal(c.length, 1);
      equal(c.at(0).get('a'), 2);
      underlying.remove(underlying.at(1));
      return equal(c.length, 0);
    });
  });
  describe('responding to an underlying add event', function() {
    it('responds to an add event', function() {
      var c, underlying;

      underlying = new Collection([]);
      c = new Filtered(underlying, {
        filter: function(model) {
          return model.get('a') < 4 && model.get('a') > 1;
        }
      });
      equal(c.length, 0);
      underlying.add({
        a: 1
      });
      equal(underlying.length, 1);
      equal(c.length, 0);
      underlying.add([
        {
          a: 2
        }, {
          a: 3
        }
      ]);
      equal(underlying.length, 3);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 2);
      equal(c.at(1).get('a'), 3);
      equal(c.at(2), void 0);
      underlying.add({
        a: 4
      }, {
        at: 1
      });
      equal(underlying.length, 4);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 2);
      return equal(c.at(1).get('a'), 3);
    });
    return it('responds to an add event w/ comparator provided', function() {
      var c, underlying;

      underlying = new Collection([]);
      c = new Filtered(underlying, {
        filter: function(model) {
          return model.get('a') < 4 && model.get('a') > 1;
        },
        comparator: function(model) {
          return model.get('b');
        }
      });
      equal(c.length, 0);
      underlying.add({
        a: 1,
        b: 3
      });
      equal(underlying.length, 1);
      equal(c.length, 0);
      underlying.add([
        {
          a: 2,
          b: 1
        }, {
          a: 3,
          b: 2
        }
      ]);
      equal(underlying.length, 3);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 2);
      equal(c.at(1).get('a'), 3);
      underlying.add({
        a: 4,
        b: 4
      }, {
        at: 1
      });
      equal(underlying.length, 4);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 2);
      return equal(c.at(1).get('a'), 3);
    });
  });
  describe('handling model change events', function() {
    it('responds to an underlying change event', function() {
      var c, underlying;

      underlying = new Collection([
        {
          a: 1,
          b: 2
        }, {
          a: 2,
          b: 3
        }, {
          a: 3,
          b: 1
        }, {
          a: 4,
          b: 4
        }
      ]);
      c = new Filtered(underlying, {
        filter: function(model) {
          return model.get('a') < 4 && model.get('a') > 1;
        }
      });
      equal(c.length, 2);
      underlying.at(0).set('a', 1.5);
      equal(c.length, 3);
      equal(c.at(0).get('a'), 1.5);
      equal(c.at(1).get('a'), 2);
      equal(c.at(2).get('a'), 3);
      underlying.at(1).set('a', 5);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 1.5);
      return equal(c.at(1).get('a'), 3);
    });
    return it('responds to an underlying change event w/ comparator', function() {
      var c, underlying;

      underlying = new Collection([
        {
          a: 1,
          b: 2
        }, {
          a: 2,
          b: 3
        }, {
          a: 3,
          b: 1
        }, {
          a: 4,
          b: 4
        }
      ]);
      c = new Filtered(underlying, {
        filter: function(model) {
          return model.get('a') < 4 && model.get('a') > 1;
        },
        comparator: function(model) {
          return model.get('b');
        }
      });
      equal(c.length, 2);
      underlying.at(0).set('a', 1.5);
      equal(c.length, 3);
      equal(c.at(0).get('a'), 3);
      equal(c.at(1).get('a'), 1.5);
      equal(c.at(2).get('a'), 2);
      underlying.at(2).set('a', 5);
      equal(c.length, 2);
      equal(c.at(0).get('a'), 1.5);
      return equal(c.at(1).get('a'), 2);
    });
  });
  describe('handling of an underlying sort event', function() {
    var underlyingItems;

    underlyingItems = [
      {
        a: 1,
        b: 2
      }, {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 4
      }
    ];
    it('responds to a sort event if no comparator is provided', function() {
      var c, underlying;

      underlying = new Collection([], {
        comparator: function(model) {
          return model.get('b');
        }
      });
      underlying.add(underlyingItems, {
        sort: false
      });
      c = new Filtered(underlying, {
        filter: function(model) {
          return model.get('a') < 4 && model.get('a') > 1;
        }
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 2);
      equal(c.at(1).get('a'), 3);
      underlying.sort();
      equal(c.at(0).get('a'), 3);
      return equal(c.at(1).get('a'), 2);
    });
    return it('ignores a sort event if comparator is provided', function() {
      var c, underlying;

      underlying = new Collection([], {
        comparator: function(model) {
          return model.get('b');
        }
      });
      underlying.add(underlyingItems, {
        sort: false
      });
      c = new Filtered(underlying, {
        filter: function(model) {
          return model.get('a') < 4 && model.get('a') > 1;
        },
        comparator: function(model) {
          return model.get('b');
        }
      });
      equal(c.length, 2);
      equal(c.at(0).get('a'), 3);
      equal(c.at(1).get('a'), 2);
      underlying.sort();
      equal(c.at(0).get('a'), 3);
      return equal(c.at(1).get('a'), 2);
    });
  });
  describe('implementation of a difference between two collections', function() {
    var Difference, a, b, c, d, diff, subtrahend, underlying;

    Difference = (function(_super) {
      __extends(Difference, _super);

      function Difference(underlying, subtrahend, options) {
        if (options == null) {
          options = {};
        }
        options.filter = function(model) {
          return !subtrahend.contains(model);
        };
        Difference.__super__.constructor.call(this, underlying, options);
        this.listenTo(subtrahend, 'add remove reset', this.update.bind(this));
      }

      return Difference;

    })(Filtered);
    a = new Model();
    b = new Model();
    c = new Model();
    d = new Model();
    underlying = new Collection([a, b, c]);
    subtrahend = new Collection([b, c, d]);
    diff = new Difference(underlying, subtrahend);
    it('contains models from minuend', function() {
      equal(diff.length, 1);
      return ok(diff.contains(a));
    });
    it('does not contain models from subtrahend', function() {
      ok(!diff.contains(b));
      return ok(!diff.contains(c));
    });
    return it('updates on changes in subtrahend', function() {
      subtrahend.remove(b);
      equal(diff.length, 2);
      ok(diff.contains(b));
      subtrahend.add(a);
      equal(diff.length, 1);
      ok(!diff.contains(a));
      subtrahend.reset([d]);
      equal(diff.length, 3);
      ok(diff.contains(a));
      ok(diff.contains(b));
      return ok(diff.contains(c));
    });
  });
  return describe('implementation of an efficient difference between two collections', function() {
    var EfficientDifference, a, b, c, d, diff, subtrahend, underlying;

    EfficientDifference = (function(_super) {
      __extends(EfficientDifference, _super);

      function EfficientDifference(underlying, subtrahend, options) {
        var _this = this;

        if (options == null) {
          options = {};
        }
        options.filter = function(model) {
          return !subtrahend.contains(model);
        };
        EfficientDifference.__super__.constructor.call(this, underlying, options);
        this.listenTo(subtrahend, {
          add: function(model) {
            if (_this.contains(model)) {
              return _this.remove(model);
            }
          },
          remove: function(model) {
            if (_this.underlying.contains(model)) {
              return _this.add(model);
            }
          },
          reset: this.update.bind(this)
        });
      }

      return EfficientDifference;

    })(Filtered);
    a = new Model();
    b = new Model();
    c = new Model();
    d = new Model();
    underlying = new Collection([a, b, c]);
    subtrahend = new Collection([b, c, d]);
    diff = new EfficientDifference(underlying, subtrahend);
    it('contains models from minuend', function() {
      equal(diff.length, 1);
      return ok(diff.contains(a));
    });
    it('does not contain models from subtrahend', function() {
      ok(!diff.contains(b));
      return ok(!diff.contains(c));
    });
    return it('updates on changes in subtrahend', function() {
      subtrahend.remove(b);
      equal(diff.length, 2);
      ok(diff.contains(b));
      subtrahend.add(a);
      equal(diff.length, 1);
      ok(!diff.contains(a));
      subtrahend.reset([d]);
      equal(diff.length, 3);
      ok(diff.contains(a));
      ok(diff.contains(b));
      return ok(diff.contains(c));
    });
  });
});

describe('Sorted', function() {
  it('initializes from a collection', function() {
    var assertUnderlying, c, underlying;

    underlying = new Collection([
      {
        a: 1,
        b: 2
      }, {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 4
      }
    ]);
    assertUnderlying = function(underlying) {
      equal(underlying.length, 4);
      equal(underlying.at(0).get('a'), 1);
      equal(underlying.at(1).get('a'), 2);
      equal(underlying.at(2).get('a'), 3);
      return equal(underlying.at(3).get('a'), 4);
    };
    c = new Sorted(underlying, {
      comparator: function(model) {
        return model.get('b');
      }
    });
    equal(c.length, 4);
    equal(c.at(0).get('a'), 3);
    equal(c.at(1).get('a'), 1);
    equal(c.at(2).get('a'), 2);
    equal(c.at(3).get('a'), 4);
    return assertUnderlying(underlying);
  });
  it('responds to an underlying reset event', function() {
    var assertUnderlying, c, underlying, underlyingItems;

    underlyingItems = [
      {
        a: 1,
        b: 2
      }, {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 4
      }
    ];
    assertUnderlying = function(underlying) {
      equal(underlying.length, 4);
      equal(underlying.at(0).get('a'), 1);
      equal(underlying.at(1).get('a'), 2);
      equal(underlying.at(2).get('a'), 3);
      return equal(underlying.at(3).get('a'), 4);
    };
    underlying = new Collection([]);
    c = new Sorted(underlying, {
      comparator: function(model) {
        return model.get('b');
      }
    });
    equal(c.length, 0);
    underlying.reset(underlyingItems);
    equal(c.length, 4);
    equal(c.at(0).get('a'), 3);
    equal(c.at(1).get('a'), 1);
    equal(c.at(2).get('a'), 2);
    equal(c.at(3).get('a'), 4);
    return assertUnderlying(underlying);
  });
  it('responds to an underlying remove event', function() {
    var c, underlying;

    underlying = new Collection([
      {
        a: 1,
        b: 2
      }, {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 4
      }
    ]);
    c = new Sorted(underlying, {
      comparator: function(model) {
        return model.get('b');
      }
    });
    equal(c.length, 4);
    equal(c.at(0).get('a'), 3);
    equal(c.at(1).get('a'), 1);
    equal(c.at(2).get('a'), 2);
    equal(c.at(3).get('a'), 4);
    underlying.remove(underlying.at(2));
    equal(c.length, 3);
    equal(c.at(0).get('a'), 1);
    equal(c.at(1).get('a'), 2);
    equal(c.at(2).get('a'), 4);
    underlying.remove(underlying.at(0));
    equal(c.length, 2);
    equal(c.at(0).get('a'), 2);
    return equal(c.at(1).get('a'), 4);
  });
  return it('responds to an underlying add event', function() {
    var c, underlying;

    underlying = new Collection([]);
    c = new Sorted(underlying, {
      comparator: function(model) {
        return model.get('b');
      }
    });
    equal(c.length, 0);
    underlying.add({
      a: 1,
      b: 2
    });
    equal(underlying.length, 1);
    equal(c.length, 1);
    underlying.add([
      {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }
    ]);
    equal(underlying.length, 3);
    equal(c.length, 3);
    equal(c.at(0).get('a'), 3);
    equal(c.at(1).get('a'), 1);
    equal(c.at(2).get('a'), 2);
    underlying.add({
      a: 4,
      b: 4
    }, {
      at: 1
    });
    equal(underlying.length, 4);
    equal(c.length, 4);
    equal(c.at(0).get('a'), 3);
    equal(c.at(1).get('a'), 1);
    equal(c.at(2).get('a'), 2);
    return equal(c.at(3).get('a'), 4);
  });
});

describe('Reversed', function() {
  it('initializes from a collection', function() {
    var assertUnderlying, c, underlying;

    underlying = new Collection([
      {
        a: 1,
        b: 2
      }, {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 4
      }
    ]);
    assertUnderlying = function(underlying) {
      equal(underlying.length, 4);
      equal(underlying.at(0).get('a'), 1);
      equal(underlying.at(1).get('a'), 2);
      equal(underlying.at(2).get('a'), 3);
      return equal(underlying.at(3).get('a'), 4);
    };
    c = new Reversed(underlying);
    equal(c.length, 4);
    equal(c.at(0).get('a'), 4);
    equal(c.at(1).get('a'), 3);
    equal(c.at(2).get('a'), 2);
    equal(c.at(3).get('a'), 1);
    return assertUnderlying(underlying);
  });
  it('responds to an underlying reset event', function() {
    var assertUnderlying, c, underlying, underlyingItems;

    underlyingItems = [
      {
        a: 1,
        b: 2
      }, {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 4
      }
    ];
    assertUnderlying = function(underlying) {
      equal(underlying.length, 4);
      equal(underlying.at(0).get('a'), 1);
      equal(underlying.at(1).get('a'), 2);
      equal(underlying.at(2).get('a'), 3);
      return equal(underlying.at(3).get('a'), 4);
    };
    underlying = new Collection([]);
    c = new Reversed(underlying);
    equal(c.length, 0);
    underlying.reset(underlyingItems);
    equal(c.length, 4);
    equal(c.at(0).get('a'), 4);
    equal(c.at(1).get('a'), 3);
    equal(c.at(2).get('a'), 2);
    equal(c.at(3).get('a'), 1);
    return assertUnderlying(underlying);
  });
  it('responds to an underlying remove event', function() {
    var c, underlying;

    underlying = new Collection([
      {
        a: 1,
        b: 2
      }, {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 4
      }
    ]);
    c = new Reversed(underlying);
    equal(c.length, 4);
    equal(c.at(0).get('a'), 4);
    equal(c.at(1).get('a'), 3);
    equal(c.at(2).get('a'), 2);
    equal(c.at(3).get('a'), 1);
    underlying.remove(underlying.at(2));
    equal(c.length, 3);
    equal(c.at(0).get('a'), 4);
    equal(c.at(1).get('a'), 2);
    equal(c.at(2).get('a'), 1);
    underlying.remove(underlying.at(0));
    equal(c.length, 2);
    equal(c.at(0).get('a'), 4);
    return equal(c.at(1).get('a'), 2);
  });
  it('responds to an underlying add event', function() {
    var c, underlying;

    underlying = new Collection([]);
    c = new Reversed(underlying);
    equal(c.length, 0);
    underlying.add({
      a: 1,
      b: 2
    });
    equal(underlying.length, 1);
    equal(c.length, 1);
    underlying.add([
      {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }
    ]);
    equal(underlying.length, 3);
    equal(c.length, 3);
    equal(c.at(0).get('a'), 3);
    equal(c.at(1).get('a'), 2);
    equal(c.at(2).get('a'), 1);
    underlying.add({
      a: 4,
      b: 4
    });
    equal(underlying.length, 4);
    equal(c.length, 4);
    equal(c.at(0).get('a'), 4);
    equal(c.at(1).get('a'), 3);
    equal(c.at(2).get('a'), 2);
    return equal(c.at(3).get('a'), 1);
  });
  return it('responds to an underlying sort event', function() {
    var c, underlying, underlyingItems;

    underlyingItems = [
      {
        a: 1,
        b: 2
      }, {
        a: 2,
        b: 3
      }, {
        a: 3,
        b: 1
      }, {
        a: 4,
        b: 4
      }
    ];
    underlying = new Collection([], {
      comparator: function(model) {
        return model.get('b');
      }
    });
    underlying.add(underlyingItems, {
      sort: false
    });
    c = new Reversed(underlying);
    equal(c.length, 4);
    equal(c.at(0).get('a'), 4);
    equal(c.at(1).get('a'), 3);
    equal(c.at(2).get('a'), 2);
    equal(c.at(3).get('a'), 1);
    underlying.sort();
    equal(c.at(0).get('a'), 4);
    equal(c.at(1).get('a'), 2);
    equal(c.at(2).get('a'), 1);
    return equal(c.at(3).get('a'), 3);
  });
});
