import _ from "lodash";

export function addElementLast<T>(array: T[], elem: T) {
  const newArray = array.slice();
  newArray.push(elem);
  return newArray;
}

export function removeItems<T>(array: T[], idx: number, count: number) {
  const copy = array.slice();
  copy.splice(idx, count);
  return copy;
}

export function deepCopy<T extends Object>(object: T) {
  return _.cloneDeep(object);
}

export function arraySet<T>(array: T[], idx: number, value: T): T[] {
  return withArrayCopy(array, function (copy) {
    copy[idx] = value;
  });
}

export function withArrayCopy<T>(array: T[], modify: (copy: T[]) => void) {
  const copy = array.slice();
  modify(copy);
  return copy;
}

function push<T>(array: T[], elem: T) {
  return withArrayCopy(array, function (copy) {
    copy.push(elem);
  });
}

function dropLast<T>(array: T[], elem: T) {
  return withArrayCopy(array, function (copy) {
    copy.pop();
  });
}

function dropFirst<T>(array: T[], elem: T) {
  return withArrayCopy(array, function (copy) {
    copy.shift();
  });
}

export function withObjectCopy<T extends Object>(
  object: T,
  modify: (copy: T) => void
) {
  const copy = Object.assign({}, object);
  modify(copy);
  return copy;
}

export function objectSet<T extends Object>(object: T, key: keyof T, value) {
  return withObjectCopy(object, function (copy) {
    copy[key] = value;
  });
}

export function objectDelete<T extends Object>(object: T, key: keyof T) {
  return withObjectCopy(object, function (copy) {
    delete copy[key];
  });
}
