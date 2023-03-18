function changeExtension(left, right) {
  return Path.ChangeExtension(left, right);
}

function exists(args) {
  return Path.Exists(...args);
}

function getDirectoryName(value) {
  return Path.GetDirectoryName(value);
}

function getExtension(value) {
  return Path.GetExtension(value);
}

function getFileName(value) {
  return Path.GetFileName(value);
}

function getFileNameWithoutExtension(value) {
  return Path.GetFileNameWithoutExtension(value);
}

function getRandomFileName() {
  return Path.GetRandomFileName();
}

function isPathFullyQualified(value) {
  return Path.IsPathFullyQualified(value);
}

function hasExtension(value) {
  return Path.HasExtension(value);
}

function combine(left, right) {
  return Path.Combine(left, right);
}

function join(left, right) {
  return Path.Join(left, right);
}

function tryJoin(args) {
  return Path.TryJoin(...args);
}

function getRelativePath(left, right) {
  return Path.GetRelativePath(left, right);
}

function trimEndingDirectorySeparator(args) {
  return Path.TrimEndingDirectorySeparator(...args);
}

function endsInDirectorySeparator(args) {
  return Path.EndsInDirectorySeparator(...args);
}

function getInvalidFileNameChars(args) {
  return Path.GetInvalidFileNameChars(...args);
}

function getInvalidPathChars(args) {
  return Path.GetInvalidPathChars(...args);
}

function getFullPath(value) {
  return Path.GetFullPath(value);
}

function getTempPath() {
  return Path.GetTempPath();
}

function getTempFileName(args) {
  return Path.GetTempFileName(...args);
}

function isPathRooted(args) {
  return Path.IsPathRooted(...args);
}

function getPathRoot(value) {
  return Path.GetPathRoot(value);
}

function getType(args) {
  return Path.GetType(...args);
}

function toString(args) {
  return Path.ToString(...args);
}

function equals(args) {
  return Path.Equals(...args);
}

function getHashCode(args) {
  return Path.GetHashCode(...args);
}

export default {
  changeExtension,
  exists,
  getDirectoryName,
  getExtension,
  getFileName,
  getFileNameWithoutExtension,
  getRandomFileName,
  isPathFullyQualified,
  hasExtension,
  combine,
  join,
  tryJoin,
  getRelativePath,
  trimEndingDirectorySeparator,
  endsInDirectorySeparator,
  getInvalidFileNameChars,
  getInvalidPathChars,
  getFullPath,
  getTempPath,
  getTempFileName,
  isPathRooted,
  getPathRoot,
  getType,
  toString,
  equals,
  getHashCode,
}

