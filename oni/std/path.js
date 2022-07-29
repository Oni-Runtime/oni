function joinHandler(left, right) {
    return Path.Join(left, right);
}

function combineHandler(left, right) {
    return Path.Combine(left, right);
}

function changeExtensionHandler(left, right) {
    return Path.ChangeExtension(left, right);
}

function getDirectoryNameHandler(path) {
    return Path.GetDirectoryName(path);
}

function getExtensionHandler(fileName) {
    return Path.GetExtension(fileName);
}

function getFileNameHandler(path) {
    return Path.GetFileName(path);
}

function getFileNameWithoutExtensionHandler(path) {
    return Path.GetFileNameWithoutExtension(path);
}

export default {
    join: joinHandler,
    combine: combineHandler,
    changeExtension: changeExtensionHandler,
    getDirectoryName: getDirectoryNameHandler,
    getExtension: getExtensionHandler,
    getFileName: getFileNameHandler,
    getFileNameWithoutExtension: getFileNameWithoutExtensionHandler,
}