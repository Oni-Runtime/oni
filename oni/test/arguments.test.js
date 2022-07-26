import assert from 'oni/std/assert.js';

Oni.test('should argv have length as array', () => {
    assert(Oni.argv.length > 0, 'arguments provided');
});