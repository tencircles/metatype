(function (definition) {
  if (typeof define === "function" && define.amd) {
    define(definition);
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = definition();
  } else {
    this.metatype = definition();
  }
})(function () {
  function init (obj, args) {
    return (obj.init && obj.init.apply(obj, args)), obj;
  }
  function getter (obj, key) {
    return (obj && obj[key]) ? obj[key] : void 0;
  }
  function injectValue(obj, key) {
    var v = obj[key];
    if (!v.value && !v.get)
      Object.defineProperty(obj, key, { value: v, enumerable: true });
  }
  function injectValues(obj) {
    for (var key in obj) injectValue(obj, key);
    return obj;
  }
  function extender(obj, proto) {
    return Object.create(obj, injectValues(proto));
  }
  return {
    extend: function() {
      return [].reduce.call(arguments, extender, this);
    },
    create: function() {
      return init(Object.create(this), arguments);
    },
    get: function(keys) {
      return keys.split(/\./).reduce(getter, this);
    },
    set: function(keysString, value) {
      var keys = keysString.split(/\./),
          obj = this,
          key;

      while (key = keys.shift(), keys.length) {
        obj = typeof obj[key] !== "undefined" ? obj[key] :
          obj[key] = isNaN(+keys[0]) ? {}: [];
      }
      return !keys.length ? obj[key] = value : null;
    }
  };
});
