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

export default {
    join: joinHandler,
    combine: combineHandler,
    changeExtension: changeExtensionHandler,
    getDirectoryName: getDirectoryNameHandler,
    getExtension: getExtensionHandler,
}