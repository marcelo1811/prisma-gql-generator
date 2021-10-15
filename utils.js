function transformLowerSneakCaseToUppercase(string) {
  const sneakCaseRegex = /(_\w)/gm;
  string = string.replace(sneakCaseRegex, (match, capture) => {
    return match.replace(capture, capture.toUpperCase().replace('_', ''))
  });
}