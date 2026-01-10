"use client";

import * as React from "react";
import clsx from "clsx";
import Button from "@/components/ui/Button";

const MAX_SUBJECT_WORDS = 50;
const MAX_MESSAGE_WORDS = 500;

const countWords = (text: string) =>
  text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

function generateTicketId() {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `WA-${y}${m}${d}-${rand}`;
}

type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function WhatsAppDrawer({ open, onClose }: DrawerProps) {
  // IMPORTANT: don't generate random values during initial render (SSR/CSR mismatch).
  const [ticketId, setTicketId] = React.useState<string>("WA-—");
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    otp: "",
  });

  const [composerText, setComposerText] = React.useState("");

  const [otpSent, setOtpSent] = React.useState(false);
  const [otpVerified, setOtpVerified] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const generatedForOpenRef = React.useRef(false);

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    // Lock body scroll while drawer open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  React.useEffect(() => {
    if (!open) {
      generatedForOpenRef.current = false;
      return;
    }

    setError("");
    setSuccess("");

    if (!generatedForOpenRef.current) {
      generatedForOpenRef.current = true;
      setTicketId(generateTicketId());
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const canSend = () => {
    if (!composerText.trim()) return false;
    // In chat mode, we still need the same base details before OTP.
    if (!form.name || !form.email || !form.mobile || !form.subject) return false;
    return true;
  };

  const handleComposerSend = () => {
    // Copy chat message into the real payload field.
    setForm((prev) => ({ ...prev, message: composerText }));
    setComposerText("");
  };

  const validateBaseFields = () => {
    if (
      !form.name ||
      !form.email ||
      !form.mobile ||
      !form.subject ||
      !form.message
    ) {
      setError("All fields are required.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Invalid email address.");
      return false;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      setError("Mobile number must be 10 digits.");
      return false;
    }

    if (countWords(form.subject) > MAX_SUBJECT_WORDS) {
      setError("Subject must be within 50 words.");
      return false;
    }

    if (countWords(form.message) > MAX_MESSAGE_WORDS) {
      setError("Message must be within 500 words.");
      return false;
    }

    setError("");
    return true;
  };

  const sendOtp = async () => {
    if (!validateBaseFields()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, name: form.name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send OTP.");
        return;
      }

      setOtpSent(true);
      setSuccess("OTP sent to your email. Please check your inbox.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (form.otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp: form.otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid OTP.");
        return;
      }

      setOtpVerified(true);
      setSuccess("OTP verified successfully!");
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  const submitTicket = async () => {
    if (!otpVerified) {
      setError("Please verify OTP before submitting.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          subject: `(${ticketId}) ${form.subject}`,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Submission failed.");
        return;
      }

      setSuccess(`Ticket created: ${ticketId}. We\"ll get back to you soon.`);
      setForm({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
        otp: "",
      });
      setOtpSent(false);
      setOtpVerified(false);
      setTicketId(generateTicketId());
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  const regenerateTicket = () => {
    setTicketId(generateTicketId());
    setSuccess("");
    setError("");
  };

  return (
    <div
      className={clsx(
        // Use viewport anchors (not relative-to-navbar) so it doesn't appear centered/offset.
        "fixed left-0 top-0 h-[100dvh] w-screen z-[9999]",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className={clsx(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        aria-label="Close WhatsApp drawer"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="WhatsApp ticket drawer"
        className={clsx(
          "absolute left-0 top-0 h-full w-[92vw] max-w-md",
          "bg-white dark:bg-gray-950",
          "border-r border-gray-200 dark:border-gray-800",
          "shadow-2xl",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* WhatsApp-like Header */}
        <div className="flex items-center justify-between gap-3 border-b border-emerald-700/20 bg-emerald-600 px-4 py-3 text-white">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center font-semibold">
              WA
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">WhatsApp Support</p>
              <p className="text-[11px] text-white/80">online • ticket assistant</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-white/90 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        {/* Chat area + composer */}
        <div className="h-[calc(100%-52px)] flex flex-col">
          {/* Scroll area (chat) */}
          <div className="flex-1 overflow-y-auto px-4 py-4 whatsapp-drawer-scroll bg-gray-50 dark:bg-gray-900">
            {/* System / Ticket */}
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-black/5 dark:bg-white/10 px-3 py-1 text-xs text-gray-700 dark:text-gray-200">
                Ticket: <span className="font-mono">{ticketId}</span>
                <button
                  type="button"
                  onClick={regenerateTicket}
                  className="ml-2 underline underline-offset-2 text-emerald-700 dark:text-emerald-300"
                >
                  regenerate
                </button>
              </div>
            </div>

            {/* Bot bubble */}
            <div className="mb-3 flex items-end gap-2">
              <div className="h-7 w-7 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                WA
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 px-4 py-3 shadow-sm">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  Hi! Share your requirement and verify OTP. I\'ll create a support ticket.
                </p>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Please fill your details below.
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-3 flex justify-center">
                <div className="max-w-[90%] rounded-xl bg-red-100 px-4 py-2 text-sm text-red-700">
                  {error}
                </div>
              </div>
            )}

            {success && (
              <div className="mb-3 flex justify-center">
                <div className="max-w-[90%] rounded-xl bg-green-100 px-4 py-2 text-sm text-green-700">
                  {success}
                </div>
              </div>
            )}

            {/* Details card (still required for APIs) */}
            <div className="mb-4 ml-9 max-w-[92%] rounded-2xl rounded-bl-md bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
              <div className="grid grid-cols-1 gap-3">
                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 bg-white dark:bg-gray-950"
                />

                <input
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 bg-white dark:bg-gray-950"
                />

                <input
                  name="mobile"
                  placeholder="Mobile Number"
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 bg-white dark:bg-gray-950"
                />

                <input
                  name="subject"
                  placeholder="Subject (max 50 words)"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 bg-white dark:bg-gray-950"
                />
              </div>
            </div>

            {/* Outgoing message preview bubble */}
            {form.message && (
              <div className="mb-3 flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-900 px-4 py-3">
                  <p className="text-sm text-emerald-950 dark:text-emerald-100 whitespace-pre-wrap">
                    {form.message}
                  </p>
                  <p className="mt-2 text-[11px] text-emerald-800/70 dark:text-emerald-200/60 text-right">
                    ready to send
                  </p>
                </div>
              </div>
            )}

            {/* OTP block as chat card */}
            {!otpSent && (
              <div className="mb-4 ml-9 max-w-[92%] rounded-2xl rounded-bl-md bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
                <Button
                  className="w-full"
                  onClick={async () => {
                    // Ensure message is captured from composer if user didn't hit send.
                    if (composerText.trim() && !form.message) handleComposerSend();
                    await sendOtp();
                  }}
                  disabled={loading}
                >
                  {loading ? "Sending mail OTP..." : "Send mail OTP"}
                </Button>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  OTP will be sent to your email.
                </p>
              </div>
            )}

            {otpSent && !otpVerified && (
              <div className="mb-4 ml-9 max-w-[92%] rounded-2xl rounded-bl-md bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4 shadow-sm space-y-3">
                <input
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={form.otp}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 bg-white dark:bg-gray-950"
                />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={verifyOtp}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
            )}

            {otpVerified && (
              <div className="mb-8 ml-9 max-w-[92%] rounded-2xl rounded-bl-md bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4 shadow-sm space-y-3">
                <Button
                  className="w-full"
                  onClick={submitTicket}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Create Ticket"}
                </Button>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  Or open WhatsApp chat
                </a>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-3 py-3">
            <div className="flex items-end gap-2">
              <div className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2">
                <textarea
                  value={composerText}
                  onChange={(e) => setComposerText(e.target.value)}
                  rows={1}
                  placeholder="Type a message..."
                  className="w-full resize-none bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleComposerSend}
                disabled={!composerText.trim()}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm font-semibold",
                  composerText.trim()
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed"
                )}
                title="Send message"
              >
                Send
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
              <span>
                Tip: Press “Send” to preview your message bubble.
              </span>
              <span className={canSend() ? "text-emerald-700 dark:text-emerald-300" : ""}>
                {canSend() ? "Ready for OTP" : "Fill details + message"}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
