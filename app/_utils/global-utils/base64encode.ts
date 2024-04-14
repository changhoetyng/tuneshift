export const base64encode = (input: ArrayBuffer) => {
  let exercicesId = Array.from(new Uint8Array(input));
  return btoa(String.fromCharCode(...exercicesId))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};
