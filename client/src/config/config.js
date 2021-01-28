export const foobar = process.env.VUE_APP_FOO_BAR;
export const bar = "bar"
export default foobar;

export const BACKEND_URL = process.env.VUE_APP_BACKEND_URL;

export function url(addr) {
  return BACKEND_URL + addr;
}

const developMode = process.env.NODE_ENV === "development";
export function log(message) {
  if (developMode) {
    console.log(message);
  }
}