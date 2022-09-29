import { describe, it, expect } from "vitest";
import lengthToTime from "@/helpers/lengthToTime";

describe("lengthToTime", () => {
  it("return correct value when length is less then 60", () => {
    expect(lengthToTime(59)).toBe("59min");
  });
  it("return correct value when length is 60", () => {
    expect(lengthToTime(60)).toBe("1h 0min");
  });
  it("return correct value when length is over 60", () => {
    expect(lengthToTime(69)).toBe("1h 9min");
  });
  it("it handles 0 value correctly", () => {
    expect(lengthToTime(0)).toBe("0min");
  });
});
