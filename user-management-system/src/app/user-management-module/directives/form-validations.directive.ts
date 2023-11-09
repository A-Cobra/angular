export class MyValidations {
  static passwordStrength(password: string) {
    const containsNumbers = password.match(/[0-9]+/);
    const containsSpecialChars = password.match(/[^0-9A-Za-z]+/);
    const longerThan11Chars = password.length >= 12;
    return containsNumbers && containsSpecialChars && longerThan11Chars
      ? true
      : false;
  }
}
