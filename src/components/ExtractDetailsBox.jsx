import { Sparkles, FileText, ArrowRight } from "lucide-react";

export default function ExtractDetailsBox({
  value,
  onChange,
  onExtract,
}) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm mb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">
            Auto-Fill Product Details
          </h2>
          <p className="text-sm text-slate-400">
            Paste product specs or description — fields will be filled automatically
          </p>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Example:
iPhone 14 Pro Max
256GB Storage
8GB RAM
A16 Bionic
6.7-inch OLED
Color: Space Black
Condition: Used (6 months)`}
        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none resize-none transition-all"
      />

      {/* Action */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <FileText className="w-4 h-4" />
          <span>Supports specs, ads, invoices, or plain text</span>
        </div>

        <button
          type="button"
          onClick={onExtract}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
        >
          Extract Details
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
