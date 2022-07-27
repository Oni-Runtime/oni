import assert from 'oni/std/assert.js';
import path from 'oni/std/path.js';

Oni.test('should resolve path', () => {
    assert(path.resolve('/foo/bar', './baz') === '/foo/bar/baz', `resolved ${path.resolve('/foo/bar', './baz')}`);
});

Oni.test('should resolve path traversing up one time', () => {
    assert(path.resolve('/foo/bar', '../baz') === '/foo/baz', `resolved ${path.resolve('/foo/bar', '../baz')}`);
});

Oni.test('should resolve path traversing up two times', () => {
    assert(path.resolve('/foo/bar', '../../baz') === '/baz', `resolved ${path.resolve('/foo/bar', '../../baz')}`);
});

Oni.test('should resolve multiples paths', () => {
    assert(path.resolve('/foo/bar', './baz', './buzz') === '/foo/bar/baz/buzz', `resolved ${path.resolve('/foo/bar', './baz', './buzz')}`);
});