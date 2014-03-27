(function (definition) {
    typeof define === "function" && define.amd ?
    define(definition) :
    typeof module !== "undefined" && module.exports ?
    module.exports = definition() :
    this.metatype = definition();
})(function () {
    function init (obj, args) {
        return (obj.init && obj.init.apply(obj, args)), obj;
    }
    function getter (obj, key) {
        return (obj && obj[key]) ? obj[key] : void 0;
    }
    function setter (value, obj, key, i, keys) {
        if (typeof obj[key] === "undefined") {
            obj[key] = +key === +key ? [] : {};
        }
        return i === keys.length - 1 ? (obj[key] = value) : obj[key];
    }

    return {
        extend: function extend () {
            return [].reduce.call(arguments, Object.create, this);
        },
        create: function create () {
            return init(Object.create(this), arguments);
        },
        get: function get (keys) {
            return keys.split(/\./).reduce(getter, this);
        },
        set: function set (keys, value) {
            var keys = keys.split(/\./),
                obj = this,
                key;

            while (key = keys.shift(), keys.length) {
                obj = typeof obj[key] !== "undefined" ? obj[key] :
                    obj[key] = +keys[0] === +keys[0] ? [] : {};
            }
            return !keys.length ? obj[key] = value : null;
        },
        has: function has (keys) {
            return typeof this.get(keys) !== "undefined";
        }
    };
});
