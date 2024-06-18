export function isEmpty(arr: string[]) {
  for (let str of arr) {
    if (str.length === 0) {
      return true;
    }
  }
}
