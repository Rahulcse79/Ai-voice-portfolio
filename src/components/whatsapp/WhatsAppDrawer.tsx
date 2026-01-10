"use client";

import React from "react";
import clsx from "clsx";
import Button from "@/components/ui/Button";
import { IoClose } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

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
  const [ticketCreated, setTicketCreated] = React.useState(false);

  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, step]);

  React.useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    setMessages([{ from: "agent", text: "Hello, what is your name?" }]);

    setStep("name");
    setInput("");
    setName("");
    setProduct("");
    setIssue("");
    setTicketCreated(false);
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
        setTicketCreated(true);
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
          "absolute inset-0 bg-black/70 backdrop-blur-sm transition-all duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Drawer */}
      <aside
        className={clsx(
          "absolute left-0 top-0 bottom-0 w-[400px] max-w-[92vw] flex flex-col",
          "bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 shadow-2xl",
          "transition-all duration-500 ease-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ height: "100dvh" }}
      >
        {/* Header */}
        <div className="flex-shrink-0 relative overflow-hidden">
          {/* Gradient Background with Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative px-5 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white/30">
                  <BsWhatsapp className="w-6 h-6 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-emerald-600 animate-pulse" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-white tracking-tight">
                  Support Chat
                </h2>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  <p className="text-xs text-emerald-100 font-medium">
                    Online • Ready to help
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Close"
            >
              <IoClose className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Chat */}
        <div
          ref={chatContainerRef}
          className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-slate-100/50 to-white scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          {messages.map((m, i) => (
            <ChatBubble key={i} agent={m.from === "agent"}>
              {m.text}
            </ChatBubble>
          ))}

          {/* Product selector */}
          {step === "product" && (
            <div className="ml-2 space-y-2.5 animate-fadeIn">
              <p className="text-xs text-gray-500 font-medium ml-1 mb-3">
                Select a product:
              </p>
              {["Refrigerator", "TV", "Washing Machine"].map((p, idx) => (
                <button
                  key={p}
                  onClick={() => selectProduct(p as ProductType)}
                  className={clsx(
                    "group block w-full rounded-2xl border-2 bg-white px-5 py-4 text-left text-sm font-semibold text-gray-700",
                    "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-400 hover:text-emerald-700",
                    "transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-100",
                    "transform hover:-translate-y-0.5 active:translate-y-0",
                    "border-gray-100"
                  )}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span>{p}</span>
                    <span className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-emerald-500 flex items-center justify-center transition-all duration-300">
                      <IoMdSend className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Loading indicator */}
          {loading && (
            <div className="flex items-center gap-2 ml-2 animate-pulse">
              <div className="flex gap-1">
                <span
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <span className="text-xs text-gray-400">Creating ticket...</span>
            </div>
          )}
        </div>

        {/* Input / Action */}
        <div className="flex-shrink-0 border-t border-gray-100 p-4 bg-white/80 backdrop-blur-lg">
          {step === "name" || step === "issue" ? (
            <div className="flex gap-3 items-center">
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendText()}
                  placeholder={
                    step === "name"
                      ? "Enter your name..."
                      : "Describe your issue..."
                  }
                  className="w-full border-2 border-gray-200 rounded-2xl px-5 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all duration-200 bg-gray-50/50"
                />
              </div>
              <button
                onClick={sendText}
                disabled={!input.trim()}
                className={clsx(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg",
                  input.trim()
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white hover:scale-105 active:scale-95 shadow-emerald-200"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
              >
                <IoMdSend className="w-5 h-5" />
              </button>
            </div>
          ) : step === "confirm" ? (
            ticketCreated ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 py-2">
                  <FaCheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-700">
                    Ticket Created Successfully!
                  </span>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  onClick={onClose}
                >
                  <IoClose className="w-4 h-4" />
                  Close Chat
                </Button>
              </div>
            ) : (
              <Button
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={createTicket}
                disabled={loading}
              >
                <HiSparkles className="w-4 h-4" />
                {loading ? "Creating..." : "Create Support Ticket"}
              </Button>
            )
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
        "max-w-[85%] px-4 py-3 text-sm animate-slideIn",
        agent
          ? "bg-white rounded-2xl rounded-tl-md text-gray-800 shadow-md shadow-gray-100/50 border border-gray-100"
          : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl rounded-tr-md ml-auto shadow-lg shadow-emerald-200/50"
      )}
    >
      <p className="leading-relaxed">{children}</p>
      <div
        className={clsx(
          "flex items-center gap-1 mt-1.5",
          agent ? "justify-start" : "justify-end"
        )}
      >
        <span
          className={clsx(
            "text-[10px] font-medium",
            agent ? "text-gray-400" : "text-emerald-100"
          )}
        >
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        {!agent && (
          <span className="text-emerald-100">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 15">
              <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}
