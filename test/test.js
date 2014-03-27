(function (metatype) {
    function expect (stub, pass, result) {
        var s = "<p>" + stub + " : " + (pass === result ?
                        "passed" : "failed") + "</p>";
        document.body.insertAdjacentHTML("beforeEnd", s);
    }
    function identity (x) {
        return x;
    }
    function test () {
        var a, b, c, d, e, f;
        a = metatype.extend();
        b = {
            shoot: {
                value: function () {
                    return "bang";
                }
            }
        };
        c = {
            kill: {
                value: function () {
                    return "dead";
                }
            }
        };
        d = {
            walk: {
                value: function () {
                    this.isWalking = true;
                    this.isRunning = false;
                }
            }
        };
        e = {
            run: {
                value: function () {
                    this.isWalking = false;
                    this.isRunning = true;
                }
            },
            init: {
                value: function (name, location) {
                    this.name = name;
                    this.location = location;
                }
            }
        };

        expect("Does not create unneeded prototypes", a, metatype);
        f = a.extend(b, c, d, {
            isMonkey: {
                value: false
            }
        });

        expect("Creates new objects from prototypes", true,
            !!f.extend && !!f.walk && !!f.kill && !!f.shoot);

        f = a.extend(c, d, {
            walk: {
                value: function () {
                    this.isWalking = false;
                }
            }
        });

        expect("Correctly overwrites methods", false, (f.walk(), f.isWalking));

        f = a.extend(e).create("Bill", "CA");
        expect("Run initialization functions", true, f.name === "Bill" && f.location === "CA");

        f.set("foo", 100);
        expect("Gets and sets properties", 100, f.get("foo"));

        f.set("bar.0.baz", "vivified");
        expect("Vivifies undefined properties", true, [
            Array.isArray(f.get("bar")),
            typeof f.get("bar.0") === "object",
            f.get("bar.0.baz") === "vivified"
        ].every(identity));
    }
    test();
})(window.metatype);
