for await (const filePath of Oni.argv.filter(v => v !== '--test')) {
    await import(filePath);
}
Oni.runTests();