const Oni = {};
const console = {};

(function () {
    const loadFile = (filePath) => {
        var script = mscorlib.System.IO.File.ReadAllText(mscorlib.System.IO.Directory.GetCurrentDirectory() + "/" + filePath);
        engine.Execute(script);
    };

    loadFile('oni/core/console.js');
    
    const argv = (() => {
        const _argv = [];
    
        for (let i = 0; i < args.Length; i++) {
            _argv.push(args[i]);
        }
    
        return _argv;
    })();
    Oni.argv = argv;

    delete mscorlib;
    delete engine;
})();