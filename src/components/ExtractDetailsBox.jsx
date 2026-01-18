import { Sparkles, FileText, ArrowRight, Loader2 } from "lucide-react";

export default function ExtractDetailsBox({
  value,
  onChange,
  onExtract,
  loading,
  compact = true
}) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-4 ${compact ? 'compact' : ''}`}>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-gray-700" />
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-gray-900">
            Auto-Fill Product Details
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Paste product specs to auto-fill fields
          </p>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Example:
MacBook Pro 14-inch
16GB RAM
512GB SSD
M2 Pro
Condition: Like New`}
        className="
          w-full
          bg-gray-50
          border border-gray-300
          rounded-lg
          px-3 py-2
          text-gray-800
          placeholder-gray-400
          resize-none
          outline-none
          transition
          text-sm
          focus:border-gray-900
          focus:ring-2
          focus:ring-gray-900/10
        "
      />

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">

        {/* Helper Text */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <FileText className="w-3 h-3 flex-shrink-0" />
          <span>Supports specs, ads, invoices, or plain text</span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onExtract}
          disabled={loading}
          className="
            inline-flex items-center gap-1.5
            px-4 py-2
            rounded-lg
            bg-gray-900
            text-white
            text-sm
            font-medium
            transition
            hover:bg-gray-800
            disabled:opacity-50
            disabled:cursor-not-allowed
            flex-shrink-0
          "
        >
          {loading ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              Extracting...
            </>
          ) : (
            <>
              Extract Details
              <ArrowRight className="w-3 h-3" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}