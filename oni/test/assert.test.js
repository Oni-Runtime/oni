import assert from 'oni/std/assert.js';

Oni.test('should assert be a function', () => {
    assert(typeof assert === 'function', '\"assert\" is a function');
});