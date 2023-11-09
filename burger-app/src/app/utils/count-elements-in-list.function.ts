export function countElementsInList(array: Array<string>, searched: string) {
  return array.filter(element => element === searched).length;
}
