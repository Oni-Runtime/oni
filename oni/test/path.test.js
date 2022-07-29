import assert from 'oni/std/assert.js';
import path from 'oni/std/path.js';

Oni.test('should resolve path', () => {
    assert(path.join('C:\\foo\\bar', 'baz') === 'C:\\foo\\bar\\baz', `resolved ${path.join('C:\\foo\\bar', 'baz')}`);
});

// Oni.test('should resolve path traversing up one time', () => {
//     assert(path.resolve('/foo/bar', '../baz') === '/foo/baz', `resolved ${path.resolve('/foo/bar', '../baz')}`);
// });

// Oni.test('should resolve path traversing up two times', () => {
//     assert(path.resolve('/foo/bar', '../../baz') === '/baz', `resolved ${path.resolve('/foo/bar', '../../baz')}`);
// });

// Oni.test('should resolve multiples paths', () => {
//     assert(path.resolve('/foo/bar', './baz', './buzz') === '/foo/bar/baz/buzz', `resolved ${path.resolve('/foo/bar', './baz', './buzz')}`);
// });