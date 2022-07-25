console.log = (...args) => {
    Console.WriteLine(args.map(arg => JSON.stringify(arg, null, 2)).join(''));
};