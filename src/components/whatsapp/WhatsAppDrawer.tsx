"use client";

import React from "react";
import clsx from "clsx";
import Button from "@/components/ui/Button";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Message = {
  from: "agent" | "user";
  text: string;
};

type ProductType = "Refrigerator" | "TV" | "Washing Machine";

export default function WhatsAppDrawer({ open, onClose }: Props) {
  const [step, setStep] = React.useState<
    "name" | "product" | "issue" | "confirm"
  >("name");

  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [name, setName] = React.useState("");
  const [product, setProduct] = React.useState<ProductType | "">("");
  const [issue, setIssue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    setMessages([
      { from: "agent", text: "Hello, what is your name?" },
    ]);

    setStep("name");
    setInput("");
    setName("");
    setProduct("");
    setIssue("");
  }, [open]);

  React.useEffect(() => {
    if (!open) document.body.style.overflow = "";
  }, [open]);

  const pushAgent = (text: string) =>
    setMessages((m) => [...m, { from: "agent", text }]);

  const pushUser = (text: string) =>
    setMessages((m) => [...m, { from: "user", text }]);

  const sendText = () => {
    if (!input.trim()) return;

    const value = input.trim();
    pushUser(value);
    setInput("");

    if (step === "name") {
      setName(value);
      pushAgent("Which product are you facing an issue with?");
      setStep("product");
      return;
    }

    if (step === "issue") {
      setIssue(value);
      pushAgent("Can I create a ticket?");
      setStep("confirm");
    }
  };

  const selectProduct = (p: ProductType) => {
    setProduct(p);
    pushUser(p);
    pushAgent("What is your problem?");
    setStep("issue");
  };

  const createTicket = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/whatsapp-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          product,
          issue,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        pushAgent(`Ticket created successfully. ID: ${data.ticketId}`);
      } else {
        pushAgent("Failed to create ticket. Please try again.");
      }
    } catch {
      pushAgent("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[99999]",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={clsx(
          "absolute inset-0 bg-black/60",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Drawer */}
      <aside
        className={clsx(
          "absolute left-0 top-0 h-full w-[360px]",
          "bg-white shadow-2xl",
          "transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="bg-emerald-600 text-white px-4 py-3 font-semibold">
          WhatsApp Support
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((m, i) => (
            <ChatBubble key={i} agent={m.from === "agent"}>
              {m.text}
            </ChatBubble>
          ))}

          {/* Product selector */}
          {step === "product" && (
            <div className="ml-9 space-y-2">
              {["Refrigerator", "TV", "Washing Machine"].map((p) => (
                <button
                  key={p}
                  onClick={() => selectProduct(p as ProductType)}
                  className="block w-full rounded-lg border bg-white px-4 py-2 text-left text-sm hover:bg-emerald-50"
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input / Action */}
        <div className="border-t p-3 bg-white">
          {step === "name" || step === "issue" ? (
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  step === "name"
                    ? "Type your name..."
                    : "Describe your problem..."
                }
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
              <button
                onClick={sendText}
                className="bg-emerald-600 text-white px-4 rounded"
              >
                Send
              </button>
            </div>
          ) : step === "confirm" ? (
            <Button
              className="w-full"
              onClick={createTicket}
              disabled={loading}
            >
              {loading ? "Creating ticket..." : "Create Ticket"}
            </Button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function ChatBubble({
  children,
  agent,
}: {
  children: React.ReactNode;
  agent?: boolean;
}) {
  return (
    <div
      className={clsx(
        "max-w-[80%] px-4 py-2 rounded-2xl text-sm",
        agent
          ? "bg-white border text-gray-900"
          : "bg-emerald-100 text-emerald-900 ml-auto"
      )}
    >
      {children}
    </div>
  );
}
