(function () {
    const verifyTypes = (arg) => {
        const isObjectArg = arg.constructor.toString().indexOf('Object') > -1;
        const isArrayArg = arg.constructor.toString().indexOf('Array') > -1;
        const isFunctionArg = typeof arg === 'function';
        const isInWhitelistType = isObjectArg || isArrayArg || isFunctionArg;
        if (isInWhitelistType) {
            return JSON.stringify(arg, null, 2);
        }
        return arg;
    };

    console.log = (...args) => {
        Console.WriteLine(args.map(verifyTypes).join(''));
    };

    console.error = (...args) => {
        Console.Error.WriteLine(args.map(verifyTypes).join(''));
    };
})();