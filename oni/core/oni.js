const console = {
    log: (...args) => Console.WriteLine(args.join('')),
};

const argv = (() => {
    const _argv = [];

    for (let i = 0; i < args.Length; i++) {
        _argv.push(args[i]);
    }

    return _argv;
})();