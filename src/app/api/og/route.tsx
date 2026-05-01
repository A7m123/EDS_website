import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Energy Driven Systems").slice(0, 120);
  const eyebrow = (searchParams.get("eyebrow") ?? "Engineering & Technology R&D").slice(0, 60);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0a0b0d 0%, #14161a 100%)",
          color: "#f0f1f3",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#9ca3ad",
          }}
        >
          <span style={{ width: 32, height: 2, background: "#ff7a33" }} />
          <span>{eyebrow}</span>
        </div>

        <div
          style={{
            fontSize: 88,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#9ca3ad",
          }}
        >
          <span style={{ color: "#f0f1f3", fontWeight: 600 }}>
            energydriven.me
          </span>
          <span>Dubai · UAE</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
