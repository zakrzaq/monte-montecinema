import { describe, it, expect } from "vitest";
import touchAll from "@/helpers/touchAll";

const mock = {
  key1: false,
  key2: false,
};

describe("touchAll", () => {
  it("returns valid object", () => {
    touchAll(mock);
    expect(mock).toBeTruthy();
  });
  it("turns all object keys values to true", () => {
    touchAll(mock);
    expect(mock).toMatchObject({ key1: true, key2: true });
  });
});
