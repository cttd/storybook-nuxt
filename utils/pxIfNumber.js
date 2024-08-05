export function pxIfNumber(value) {
  return typeof value === "number" ? `${value}px` : value;
}
