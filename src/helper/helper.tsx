import { color } from "csx/lib";

export function getContrast50(colorValue: string) {
  try {
    return color(colorValue).lightness() > .5 ? "black" : "white";
  }
  catch (e) {
    return "black";
  }
}