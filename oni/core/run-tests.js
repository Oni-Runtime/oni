for await (const filePath of Oni.argv.filter(v => v !== '--test')) {
    try {
        await import(filePath);
    } catch (err) {
        console.error(err);
    }
}
Oni.runTests();