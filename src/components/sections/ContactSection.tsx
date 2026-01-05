"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

const MAX_SUBJECT_WORDS = 50;
const MAX_MESSAGE_WORDS = 500;

const countWords = (text: string) =>
  text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const handleSubmit = async () => {
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
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Submission failed.");
        return;
      }

      setSuccess("Message sent successfully!");
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
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <Container>
        <SectionTitle
          title="Contact"
          subtitle="Let’s discuss your idea or opportunity"
        />

        <div className="mx-auto max-w-2xl space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 p-6 shadow">
          {error && (
            <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-lg bg-green-100 p-3 text-sm text-green-700">
              {success}
            </p>
          )}

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 bg-white dark:bg-gray-900"
          />

          <input
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 bg-white dark:bg-gray-900"
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 bg-white dark:bg-gray-900"
          />

          <input
            name="subject"
            placeholder="Subject (max 50 words)"
            value={form.subject}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 bg-white dark:bg-gray-900"
          />

          <textarea
            name="message"
            placeholder="Message (max 500 words)"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 bg-white dark:bg-gray-900"
          />

          {!otpSent && (
            <div className="flex justify-center">
              <Button className="w-1/2" onClick={sendOtp} disabled={loading}>
                {loading ? "Sending mail OTP..." : "Send mail OTP"}
              </Button>
            </div>
          )}

          {otpSent && !otpVerified && (
            <>
              <input
                name="otp"
                placeholder="Enter 6-digit OTP"
                value={form.otp}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 bg-white dark:bg-gray-900"
              />
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="w-1/2"
                  onClick={verifyOtp}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
            </>
          )}

          {otpVerified && (
            <div className="flex justify-center">
              <Button
                className="w-1/2"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Send Message"}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
