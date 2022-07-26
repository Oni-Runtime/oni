const Oni = {};
const console = {};

(function () {
    const loadFile = (filePath) => {
        var script = mscorlib.System.IO.File.ReadAllText(mscorlib.System.IO.Directory.GetCurrentDirectory() + "/" + filePath);
        engine.Execute(script);
    };

    loadFile('oni/core/console.js');
    
    // Begin program suite common
    const argv = (() => {
        const _argv = [];
    
        for (let i = 0; i < args.Length; i++) {
            _argv.push(args[i]);
        }
    
        return _argv;
    })();
    Oni.argv = argv;

    const _lib = mscorlib;

    const cwdHandler = () => {
        return _lib.System.IO.Directory.GetCurrentDirectory();
    };
    Oni.cwd = cwdHandler;
    // End program suite common

    // Begin tests suite common
    const _tests = {};

    function specHandler(message, fn) {
        if (Object.keys(_tests).indexOf(message) > -1) {
            throw new Error(`Test \"${message}\" already exists`);
        }
        _tests[message] = fn;
    }
    Oni.test = specHandler;

    Oni.runTests = () => {
        let passed = 0;
        for (let message in _tests) {
            const fn = _tests[message];
            try {
                fn();
                passed += 1;
            } catch (e) {
                console.error(`Test \"${message}\" failed: ${e.message}`);
                console.error(e.stack);
            }
        }
        console.log(`PASSED: ${passed}/${Object.keys(_tests).length}`);
    };
    // End tests suite common

    delete mscorlib;
    delete engine;
    delete args;
})();