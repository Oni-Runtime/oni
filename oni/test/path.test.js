import assert from 'oni/std/assert.js';
import path from 'oni/std/path.js';

Oni.test('should join path on win', () => {
    assert(path.join('C:\\foo\\bar', 'baz') === 'C:\\foo\\bar\\baz', `resolved join ${path.join('C:\\foo\\bar', 'baz')}`);
});

Oni.test('should combine path on win', () => {
    assert(path.combine('foo', 'bar') === 'foo\\bar', `resolved combine ${path.combine('foo', 'bar')}`);
});

Oni.test('should change extension on win', () => {
    assert(path.changeExtension('foo.js', '.ts') === 'foo.ts', `resolve change extension ${path.changeExtension('foo.js', 'foo.ts')}`);
});

Oni.test('should get directory name on win', () => {
    assert(path.getDirectoryName('C:\\src') === 'C:\\', `resolve get directory name ${path.getDirectoryName('C:\\src')}`);
});

Oni.test('should get extension name on win', () => {
    assert(path.getExtension('foo.js') === '.js', `resolve get extension name ${path.getExtension('foo.js')}`);
});

Oni.test('should get file name on win', () => {
    assert(path.getFileName('C:\\src\\oni.js') === 'oni.js', `resolve get file name ${path.getFileName('C:\\src\\oni.js')}`);
});

Oni.test('should get file name without extension on win', () => {
    assert(path.getFileNameWithoutExtension('C:\\src\\oni.js') === 'oni', `resolve get file name without extension ${path.getFileNameWithoutExtension('C:\\src\\oni.js')}`);
});