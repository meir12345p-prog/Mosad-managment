export const atbash = (input) => {
  return input
    .split("")
    .map((char) => {
      if (char >= "a" && char <= "z") {
        return String.fromCharCode("z".charCodeAt(0) - (char.charCodeAt(0) - "a".charCodeAt(0)));
      }
      if (char >= "A" && char <= "Z") {
        return String.fromCharCode("Z".charCodeAt(0) - (char.charCodeAt(0) - "A".charCodeAt(0)));
      }
      return char;
    })
    .join("")
}
