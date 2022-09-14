import { describe, it, expect } from "vitest";
import { prettyDate } from "@/helpers/prettyDate";

const mock = "2022-09-02T06:17:24.549Z";

describe("prettyDate", () => {
  it("to contain year 2022", () => {
    expect(prettyDate(mock)).toContain("2022");
  });
  it("to contain month 09", () => {
    expect(prettyDate(mock)).toContain("09");
  });
  it("contain day ", () => {
    expect(prettyDate(mock)).toContain("02");
  });
  it("to contain day name, Friday", () => {
    expect(prettyDate(mock)).toContain("Friday");
  });
  it("displays date in correct format", () => {
    expect(prettyDate(mock)).toBe("Friday, 02/09/2022");
  });
});
