import { describe, expect, it, vi } from "vitest";
import { EmailServiceError, getEmailConfig, sendContactForm } from "../services/email";

const config = { serviceId: "service_x", templateId: "template_x", publicKey: "public_x" };
const formElement = document.createElement("form");

describe("getEmailConfig", () => {
  it("returns null when any variable is missing", () => {
    expect(getEmailConfig({ VITE_EMAILJS_SERVICE_ID: "a" })).toBeNull();
  });

  it("reads the three EmailJS identifiers", () => {
    expect(
      getEmailConfig({
        VITE_EMAILJS_SERVICE_ID: "a",
        VITE_EMAILJS_TEMPLATE_ID: "b",
        VITE_EMAILJS_PUBLIC_KEY: "c",
      })
    ).toEqual({ serviceId: "a", templateId: "b", publicKey: "c" });
  });
});

describe("sendContactForm", () => {
  it("fails fast when the service is not configured", async () => {
    await expect(sendContactForm(formElement, { config: null })).rejects.toMatchObject({
      code: "not-configured",
    });
  });

  it("sends the form with emailjs.sendForm and the public key", async () => {
    const client = { sendForm: vi.fn().mockResolvedValue({ status: 200, text: "OK" }) };

    await sendContactForm(formElement, { config, client });

    expect(client.sendForm).toHaveBeenCalledWith("service_x", "template_x", formElement, {
      publicKey: "public_x",
      blockHeadless: true,
    });
  });

  it("wraps EmailJS errors without exposing their details", async () => {
    const client = { sendForm: vi.fn().mockRejectedValue({ status: 429, text: "Too many" }) };

    const error = await sendContactForm(formElement, { config, client }).catch((e) => e);

    expect(error).toBeInstanceOf(EmailServiceError);
    expect(error.code).toBe("http-429");
  });

  it("wraps network failures", async () => {
    const client = { sendForm: vi.fn().mockRejectedValue(new TypeError("Failed to fetch")) };

    await expect(sendContactForm(formElement, { config, client })).rejects.toMatchObject({
      code: "network",
    });
  });
});
