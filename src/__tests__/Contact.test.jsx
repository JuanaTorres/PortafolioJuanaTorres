import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Contact from "../components/Contact";
import { sendContactForm } from "../services/email";
import { renderWithProviders } from "../test-utils";

vi.mock("../services/email", () => ({
  sendContactForm: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(sendContactForm).mockReset().mockResolvedValue(undefined);
  window.sessionStorage.clear();
});

async function fillValidForm(user) {
  await user.type(screen.getByLabelText(/^nombre$/i), "Juana");
  await user.type(screen.getByLabelText(/^correo electrónico$/i), "juana@example.com");
  await user.type(screen.getByLabelText(/^mensaje$/i), "Hola, quiero conversar.");
}

describe("Contact form", () => {
  it("uses the EmailJS template variable names on the fields", () => {
    const { container } = renderWithProviders(<Contact />);

    expect(screen.getByLabelText(/^nombre$/i)).toHaveAttribute("name", "user_name");
    expect(screen.getByLabelText(/^correo electrónico$/i)).toHaveAttribute("name", "user_email");
    expect(screen.getByLabelText(/^mensaje$/i)).toHaveAttribute("name", "message");
    expect(container.querySelector('input[name="language"]')).toHaveValue("es");
  });


  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(await screen.findByText(/ingresa tu nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/ingresa tu correo/i)).toBeInTheDocument();
    expect(screen.getByText(/escribe un mensaje/i)).toBeInTheDocument();
    expect(sendContactForm).not.toHaveBeenCalled();
  });

  it("flags an invalid email format", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.type(screen.getByLabelText(/^nombre$/i), "Juana");
    await user.type(screen.getByLabelText(/^correo electrónico$/i), "no-es-un-correo");
    await user.type(screen.getByLabelText(/^mensaje$/i), "Hola, quiero conversar.");
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(await screen.findByText(/correo electrónico válido/i)).toBeInTheDocument();
  });

  it("sends the message directly and clears the form", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(await screen.findByText(/tu mensaje fue enviado/i)).toBeInTheDocument();
    const [sentForm] = vi.mocked(sendContactForm).mock.calls[0];
    expect(sentForm).toBeInstanceOf(HTMLFormElement);
    expect(sendContactForm).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText(/^nombre$/i)).toHaveValue("");
  });

  it("shows an error and keeps the data when sending fails", async () => {
    vi.mocked(sendContactForm).mockRejectedValue(new Error("network"));
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(await screen.findByText(/no se pudo enviar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^nombre$/i)).toHaveValue("Juana");
  });

  it("silently drops submissions that fill the honeypot field", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<Contact />);

    await fillValidForm(user);
    await user.type(container.querySelector('input[name="website"]'), "spam.example");
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(await screen.findByText(/tu mensaje fue enviado/i)).toBeInTheDocument();
    expect(sendContactForm).not.toHaveBeenCalled();
  });

  it("blocks a second message during the cooldown", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));
    await screen.findByText(/tu mensaje fue enviado/i);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    expect(await screen.findByText(/espera \d+ segundos/i)).toBeInTheDocument();
    expect(sendContactForm).toHaveBeenCalledTimes(1);
  });

  it("renders labels and messages in English", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />, { language: "en" });

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
  });
});
