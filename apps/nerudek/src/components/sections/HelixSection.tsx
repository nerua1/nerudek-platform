"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

const codeLines = [
  { text: "$ nerudek init --mode=creative", type: "cmd" },
  { text: "> Initializing NERUDEK Engine...", type: "sys" },
  { text: "> Analyzing creative DNA patterns...", type: "sys" },
  { text: "", type: "blank" },
  { text: 'const analysis = await NERUDEK.scan({', type: "code" },
  { text: '  style: "ethereal_blush",', type: "code" },
  { text: '  palette: ["#E8B4B4", "#B8D4E3"],', type: "code" },
  { text: '  mood: "avant_garde",', type: "code" },
  { text: "  vibeScore: 0.97", type: "code" },
  { text: "});", type: "code" },
  { text: "", type: "blank" },
  { text: "NERUDEK_AGENT> Vibe fusion sequence initiated...", type: "agent" },
];

function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || lineIdx >= codeLines.length) return;
    const line = codeLines[lineIdx]!.text;
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setLines((prev) => {
          const u = [...prev];
          u[lineIdx] = line.substring(0, charIdx + 1);
          return u;
        });
        setCharIdx((c) => c + 1);
      }, 18 + Math.random() * 22);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
        setLines((prev) => [...prev, ""]);
      }, 60);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, started]);

  const color = (idx: number) => {
    const t = codeLines[idx]?.type;
    if (t === "cmd") return "text-[#27c93f]";
    if (t === "sys") return "text-[#64d97b]";
    if (t === "agent") return "text-gold";
    return "text-[#E8C8C8]";
  };

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl font-mono text-[11px]"
      style={{
        background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)",
        boxShadow: "0 20px 56px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-black/20 px-4 py-3">
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => (
          <div
            key={i}
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: c }}
          />
        ))}
        <span className="ml-auto text-[9px] text-white/20">nerudek-terminal</span>
      </div>
      {/* Terminal body */}
      <div className="relative min-h-[210px] px-5 py-4">
        {lines.map((line, i) => (
          <div key={i} className={`min-h-[22px] leading-[2] ${color(i)}`}>
            {line}
            {i === lineIdx && lineIdx < codeLines.length && (
              <span className="ml-px animate-pulse text-white">▊</span>
            )}
          </div>
        ))}
        {lineIdx >= codeLines.length && (
          <span className="animate-pulse text-[#27c93f]">▊</span>
        )}
      </div>
    </div>
  );
}

function NetworkViz() {
  const nodes = useRef(
    Array.from({ length: 14 }, (_, i) => ({
      x: 50 + Math.cos((i * Math.PI) / 7) * (26 + Math.random() * 16),
      y: 50 + Math.sin((i * Math.PI) / 7) * (26 + Math.random() * 16),
      r: 2 + Math.random() * 3,
    }))
  ).current;

  return (
    <svg
      width="100%"
      height="170"
      viewBox="0 0 100 100"
      className="opacity-50"
    >
      {nodes.map((n, i) =>
        nodes.slice(i + 1).filter(() => Math.random() > 0.4).map((m, j) => (
          <line
            key={`l${i}-${j}`}
            x1={n.x} y1={n.y} x2={m.x} y2={m.y}
            stroke="#C5A882" strokeWidth="0.2" opacity="0.4"
          >
            <animate
              attributeName="opacity"
              values="0.15;0.55;0.15"
              dur={`${3 + Math.random() * 4}s`}
              repeatCount="indefinite"
            />
          </line>
        ))
      )}
      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <circle cx={n.x} cy={n.y} r={n.r} fill="rgba(197,168,130,0.45)">
            <animate
              attributeName="r"
              values={`${n.r};${n.r + 1};${n.r}`}
              dur={`${2.5 + Math.random() * 3}s`}
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={n.x} cy={n.y} r="1.2" fill="#C5A882" />
        </g>
      ))}
    </svg>
  );
}

export default function HelixSection() {
  const t = useTranslations("helix");

  return (
    <section
      id="helix"
      aria-label={t("heading")}
      className="relative bg-surface py-24 lg:py-32"
    >
      <div className="mx-auto max-w-lg px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h3 className="font-serif text-2xl font-semibold tracking-wide text-gold lg:text-3xl">
            {t("heading")}
          </h3>
          <p className="mt-3 font-sans text-base text-muted lg:text-lg">
            {t("subheading")}
          </p>
        </div>

        <Terminal />
        <div className="mt-6">
          <NetworkViz />
        </div>

        {/* Skill bars */}
        <div className="mt-8 flex justify-center gap-5">
          {(["creativity", "precision", "vibe"] as const).map((key) => (
            <div key={key} className="flex-1 text-center">
              <div className="mx-auto mb-3.5 h-[70px] w-2 overflow-hidden rounded bg-line/30">
                <div
                  className="w-full rounded"
                  style={{
                    height: `${key === "creativity" ? 85 : key === "precision" ? 72 : 90}%`,
                    background:
                      key === "creativity"
                        ? "linear-gradient(to top, #C5A882, #C5A88288)"
                        : key === "precision"
                          ? "linear-gradient(to top, #B8D4E3, #B8D4E388)"
                          : "linear-gradient(to top, #E8B4B4, #E8B4B488)",
                  }}
                />
              </div>
              <span className="font-sans text-xs font-medium text-muted">
                {t(`skills.${key}`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <div className="mx-auto mt-20 h-px w-full max-w-6xl px-4 lg:px-8" aria-hidden="true">
        <div className="h-full bg-gradient-to-r from-transparent via-line/40 to-transparent" />
      </div>
    </section>
  );
}
