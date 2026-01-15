import { Sparkles, FileText, ArrowRight } from "lucide-react";

export default function ExtractDetailsBox({
  value,
  onChange,
  onExtract,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm mb-8">

      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-gray-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Auto-Fill Product Details
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Paste product specs or descriptions to automatically fill fields
          </p>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Example:
MacBook Pro 14-inch
16GB RAM
512GB SSD
M2 Pro
Liquid Retina XDR
Condition: Like New`}
        className="
          w-full
          bg-gray-50
          border border-gray-300
          rounded-2xl
          px-4 py-3
          text-gray-800
          placeholder-gray-400
          resize-none
          outline-none
          transition
          focus:border-gray-900
          focus:ring-2
          focus:ring-gray-900/10
        "
      />

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">

        {/* Helper Text */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FileText className="w-4 h-4" />
          <span>Supports specs, ads, invoices, or plain text</span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onExtract}
          className="
            inline-flex items-center gap-2
            px-6 py-2.5
            rounded-xl
            bg-gray-900
            text-white
            font-medium
            transition
            hover:bg-gray-800
            active:scale-[0.98]
          "
        >
          Extract Details
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
