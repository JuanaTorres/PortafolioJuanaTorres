import { beforeEach, describe, expect, it } from "vitest";
import {
  FIELD_LIMITS,
  SUBMIT_COOLDOWN_MS,
  getCooldownRemaining,
  markMessageSent,
  sanitizeContactForm,
  validateContactForm,
} from "../utils/contact";

describe("validateContactForm", () => {
  it("returns no errors for a fully valid form", () => {
    const errors = validateContactForm({
      name: "Juana Torres",
      email: "juanavtp0216@gmail.com",
      message: "Hola, me gustaría conversar sobre un proyecto.",
    });

    expect(errors).toEqual({});
  });

  it("flags a missing name", () => {
    const errors = validateContactForm({
      name: "  ",
      email: "juanavtp0216@gmail.com",
      message: "Hola",
    });

    expect(errors.name).toBe("contact.errors.nameRequired");
  });

  it("flags a missing email", () => {
    const errors = validateContactForm({ name: "Juana", email: "", message: "Hola" });

    expect(errors.email).toBe("contact.errors.emailRequired");
  });

  it("flags a malformed email", () => {
    const errors = validateContactForm({
      name: "Juana",
      email: "no-es-un-correo",
      message: "Hola",
    });

    expect(errors.email).toBe("contact.errors.emailInvalid");
  });

  it("flags a missing message", () => {
    const errors = validateContactForm({
      name: "Juana",
      email: "juanavtp0216@gmail.com",
      message: "   ",
    });

    expect(errors.message).toBe("contact.errors.messageRequired");
  });

  it("flags fields that exceed their maximum length", () => {
    const errors = validateContactForm({
      name: "a".repeat(FIELD_LIMITS.name + 1),
      email: "juana@example.com",
      message: "b".repeat(FIELD_LIMITS.message + 1),
    });

    expect(errors.name).toBe("contact.errors.nameTooLong");
    expect(errors.message).toBe("contact.errors.messageTooLong");
  });
});

describe("sanitizeContactForm", () => {
  it("removes line breaks from single-line fields to prevent header injection", () => {
    const clean = sanitizeContactForm({
      name: "Juana\r\nBcc: victim@example.com",
      email: "juana@example.com\nBcc: victim@example.com",
      message: "Hola",
    });

    expect(clean.name).not.toMatch(/[\r\n]/);
    expect(clean.email).not.toMatch(/[\r\n]/);
  });

  it("keeps line breaks in the message but strips other control characters", () => {
    const clean = sanitizeContactForm({
      name: "Juana",
      email: "juana@example.com",
      message: " Línea 1\r\nLínea 2\u0000 ",
    });

    expect(clean.message).toBe("Línea 1\nLínea 2");
  });
});

describe("submit cooldown", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("has no cooldown before any message is sent", () => {
    expect(getCooldownRemaining()).toBe(0);
  });

  it("reports the remaining cooldown after a message is sent", () => {
    markMessageSent(1_000);

    expect(getCooldownRemaining(1_000)).toBe(SUBMIT_COOLDOWN_MS);
    expect(getCooldownRemaining(1_000 + SUBMIT_COOLDOWN_MS)).toBe(0);
  });
});
