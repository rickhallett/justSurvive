function leftPad(attr, points, padLength = 20) {
  return `${attr}${` `.repeat(padLength - attr.length)}-> ${points}`;
}
