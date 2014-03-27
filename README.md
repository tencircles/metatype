metatype
========

metatype is a simple bit of code for using objects and prototypes as if you were writing javascript.

## metatype.extend

`metatype.extend(prototype1, prototype2, ...)`

Creates a new object that inherits from the prototypes given as arguments.
Accepts any number of prototypes. Prototypes should be formatted as an Object.create propertiesObject.
For more info on propertiesObject and Object.create, see [this article on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).
Keep in mind that order is important, a value on prototype2 will override a value on prototype1 and so on.

**IMPORTANT**

*Remember if you set a .value, the default is that that value is not writable. So if you want to to modify properties on the prototype after creation, you must set* `propertiesObject.writable: true`.

## metatype.create

`metatype.create(arg1, arg2, ...)`

Create a new object from a prototype. If the prototype has a method named `init`, that method will be called with the arguments passed to this method.

    var b = metatype.extend({
            init: {
                value: function (a, b) {
                    this.a = a;
                    this.b = b.
                }
            }
        }).create("one", "two")

    console.log(b.a  === "one"); //true
    console.log(b.b  === "two"); //true

## metatype.set

`metatype.set(keyString, value)`

Really more of a bonus method to set properties. Will vivify any undefined properties.

    b.set("foo.bar.0.baz", "vivified");
    console.log(b.foo.bar[0].baz === "vivified"); // true;

## metatype.get

`metatype.get(keyString)`

Getter using same syntax as above.

    console.log(Array.isArray(b.get("foo.bar"))); //true
    console.log(b.get("foo.bar.0.baz") === "vivified"); //true

## Disclaimer

With great power comes great responsibility.
If you don't understand the code in metatype.js, don't use it or you'll just end up
shooting yourself in the foot. It's < 40 lines of code, take a few minutes and make sure you understand what's going on.

For example:

    var person = metatype.extend({
            knowledge: {
                value: {
                    javascript: false,
                    html: false,
                    css: false
                }
            }
        });

    var me = person.create();

    me.set("knowledge.javascript", true);

If you don't know why `person.knowledge.javascript` is true in the above example, you should learn a bit more about prototypes and object in JS!

Enjoy!
