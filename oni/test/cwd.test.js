import assert from 'oni/std/assert.js';

Oni.test('should be current working directory', () => {
    assert(Oni.cwd().indexOf('oni') > -1, 'current working directory is correct');
});