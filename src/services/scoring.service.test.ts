import { describe, expect, it } from "vitest";
import { calculateScore } from "./scoring.service";

describe("calculateScore", () => {
  it("scores a qualified installation lead", () => {
    expect(calculateScore({
      phone: "0600000000",
      service: "installation",
      message: "Je souhaite améliorer la couverture Wi-Fi de mon logement.",
    })).toBe(90);
  });

  it("returns zero for an incomplete lead", () => {
    expect(calculateScore({ phone: "", service: "diagnostic", message: "" })).toBe(0);
  });
});
