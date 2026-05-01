"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";

type ToolId = "jpg2png" | "rmbg" | "compress" | "qr" | "favicon";

interface ToolDef {
  id: ToolId;
  icon: string;
}

const toolDefs: ToolDef[] = [
  { id: "jpg2png", icon: "🔄" },
  { id: "rmbg", icon: "✂️" },
  { id: "compress", icon: "📦" },
  { id: "qr", icon: "▦" },
  { id: "favicon", icon: "✦" },
];

export default function ToolsSection() {
  const t = useTranslations("tools");
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleTool = useCallback(
    async (_toolId: ToolId) => {
      setActiveTool(_toolId);
      setProcessing(true);
      setResult(null);
      // Simulate WASM processing — real WASM modules to be integrated
      await new Promise((r) => setTimeout(r, 1500));
      setResult(t(`tools.${_toolId}.placeholder`));
      setProcessing(false);
    },
    [t],
  );

  return (
    <section
      id="tools"
      aria-label={t("heading")}
      className="relative bg-surface py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center lg:mb-16">
          <h3 className="font-serif text-2xl font-semibold tracking-wide text-gold lg:text-3xl">
            {t("heading")}
          </h3>
          <p className="mt-3 font-sans text-base text-muted lg:text-lg">
            {t("subheading")}
          </p>
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {toolDefs.map((tool) => {
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => handleTool(tool.id)}
                disabled={processing}
                className={`group relative flex flex-col items-center gap-2 rounded-2xl border p-6 transition-all duration-300 ${
                  isActive
                    ? "border-gold bg-gold/5 shadow-sm"
                    : "border-line/30 bg-bg hover:border-gold/40 hover:shadow-sm"
                } disabled:cursor-wait`}
              >
                <span className="text-2xl" aria-hidden="true">
                  {tool.icon}
                </span>
                <span
                  className={`font-sans text-xs font-medium uppercase tracking-wider transition-colors ${
                    isActive ? "text-gold" : "text-ink group-hover:text-gold"
                  }`}
                >
                  {t(`tools.${tool.id}.label`)}
                </span>
                {processing && isActive && (
                  <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-bg/80 backdrop-blur-sm">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Result container */}
        {result && (
          <div className="mt-8 rounded-2xl border border-line/20 bg-bg p-6 text-center shadow-sm">
            <p className="font-sans text-sm text-muted">{result}</p>
          </div>
        )}

        {/* Info footnote */}
        <p className="mt-6 text-center font-sans text-xs text-muted/60">
          {t("footnote")}
        </p>
      </div>

      {/* Decorative line */}
      <div className="mx-auto mt-20 h-px w-full max-w-6xl px-4 lg:px-8" aria-hidden="true">
        <div className="h-full bg-gradient-to-r from-transparent via-line/40 to-transparent" />
      </div>
    </section>
  );
}
