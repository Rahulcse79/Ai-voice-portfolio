import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const runtime = "edge";
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(1200px 600px at 80% -10%, #1d4ed8 0%, transparent 60%), radial-gradient(900px 500px at -10% 110%, #7c3aed 0%, transparent 55%), #020617",
          color: "#e5e7eb",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#22c55e",
              boxShadow: "0 0 24px #22c55e",
            }}
          />
          <div style={{ fontSize: 24, color: "#94a3b8", letterSpacing: 1 }}>
            {profile.location.toUpperCase()} · OPEN TO WORK
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#ffffff",
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: 40, color: "#cbd5e1", maxWidth: 1000 }}>
            {profile.role} · Distributed Systems · Real-Time AI
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginTop: 8,
            }}
          >
            {["50K+ daily reqs", "99.9% uptime", "<200ms voice AI", "Top 8% LeetCode"].map(
              (m) => (
                <div
                  key={m}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 999,
                    background: "rgba(59,130,246,0.18)",
                    border: "1px solid rgba(96,165,250,0.45)",
                    color: "#bfdbfe",
                    fontSize: 26,
                  }}
                >
                  {m}
                </div>
              )
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#64748b",
            fontSize: 24,
          }}
        >
          <div>github.com/Rahulcse79 · linkedin.com/in/rahul-singh-a32261206</div>
          <div style={{ color: "#60a5fa", fontWeight: 600 }}>
            ai-voice-portfolio.onrender.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
