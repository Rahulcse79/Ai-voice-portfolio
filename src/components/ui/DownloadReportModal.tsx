"use client";

import React from "react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import { FaFileExcel, FaFilePdf } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";
import { FaCalendarAlt } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormatType = "excel" | "pdf" | null;

export default function DownloadReportModal({ open, onClose }: Props) {
  const [selectedFormat, setSelectedFormat] = React.useState<FormatType>(null);
  const [selectedDate, setSelectedDate] = React.useState<string>("");
  const [filterByDate, setFilterByDate] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [notification, setNotification] = React.useState<{ show: boolean; message: string }>({ show: false, message: "" });

  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    setSelectedFormat(null);
    setSelectedDate("");
    setFilterByDate(false);
    setLoading(false);
    setNotification({ show: false, message: "" });
  }, [open]);

  React.useEffect(() => {
    if (!open) document.body.style.overflow = "";
  }, [open]);

  // Auto-hide notification after 4 seconds
  React.useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const handleDownload = async () => {
    if (!selectedFormat) return;

    setLoading(true);
    setNotification({ show: false, message: "" });

    try {
      const dateQuery = filterByDate && selectedDate ? `&date=${selectedDate}` : "";
      const response = await fetch(`/api/tickets-report?format=${selectedFormat}${dateQuery}`);
      
      // Check if no records found
      if (response.status === 404) {
        const errorData = await response.json();
        setNotification({ show: true, message: errorData.message || "No tickets found" });
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setNotification({ show: true, message: "Failed to download report. Please try again." });
        setLoading(false);
        return;
      }

      const contentType = response.headers.get("content-type") || "";

      // If server returned JSON (error) but response.ok is true/false, show message and stop.
      if (contentType.includes("application/json")) {
        const errorData = await response.json().catch(() => null);
        setNotification({
          show: true,
          message: errorData?.message || "Unexpected server response. Please try again.",
        });
        setLoading(false);
        return;
      }

      // Validate file type to avoid saving wrong blob as .pdf/.csv
      if (selectedFormat === "pdf" && !contentType.includes("application/pdf")) {
        setNotification({
          show: true,
          message: "PDF generation failed (invalid content). Please try again.",
        });
        setLoading(false);
        return;
      }
      if (selectedFormat === "excel" && !contentType.includes("text/csv")) {
        setNotification({
          show: true,
          message: "Excel report generation failed (invalid content). Please try again.",
        });
        setLoading(false);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tickets-report-${selectedDate || "all"}-${Date.now()}.${selectedFormat === "excel" ? "csv" : "pdf"}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      onClose();
    } catch (error) {
      console.error("Download error:", error);
      setNotification({ show: true, message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for max date
  const today = new Date().toISOString().split("T")[0];

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
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Modal */}
      <div
        className={clsx(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[420px] max-w-[92vw] rounded-3xl",
          "bg-white dark:bg-gray-900 shadow-2xl",
          "transition-all duration-300 ease-out",
          open ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Download Report
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Select format to download tickets report
          </p>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-200"
            aria-label="Close"
          >
            <IoClose className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Notification */}
          {notification.show && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 animate-fadeIn">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                <IoWarning className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-amber-800 dark:text-amber-200 text-sm">
                  No Records Found
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-300 mt-0.5">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => setNotification({ show: false, message: "" })}
                className="w-8 h-8 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-800 flex items-center justify-center transition-colors"
              >
                <IoClose className="w-4 h-4 text-amber-600 dark:text-amber-300" />
              </button>
            </div>
          )}

          {/* Excel Option */}
          <button
            onClick={() => setSelectedFormat("excel")}
            className={clsx(
              "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200",
              selectedFormat === "excel"
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 bg-white dark:bg-gray-800"
            )}
          >
            <div
              className={clsx(
                "w-14 h-14 rounded-xl flex items-center justify-center",
                selectedFormat === "excel"
                  ? "bg-green-500 text-white"
                  : "bg-green-100 dark:bg-green-900/30 text-green-600"
              )}
            >
              <FaFileExcel className="w-7 h-7" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Excel / CSV
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Download as spreadsheet file
              </p>
            </div>
            <div
              className={clsx(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                selectedFormat === "excel"
                  ? "border-green-500 bg-green-500"
                  : "border-gray-300 dark:border-gray-600"
              )}
            >
              {selectedFormat === "excel" && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </button>

          {/* PDF Option */}
          <button
            onClick={() => setSelectedFormat("pdf")}
            className={clsx(
              "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200",
              selectedFormat === "pdf"
                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 bg-white dark:bg-gray-800"
            )}
          >
            <div
              className={clsx(
                "w-14 h-14 rounded-xl flex items-center justify-center",
                selectedFormat === "pdf"
                  ? "bg-red-500 text-white"
                  : "bg-red-100 dark:bg-red-900/30 text-red-600"
              )}
            >
              <FaFilePdf className="w-7 h-7" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                PDF Document
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Download as printable PDF
              </p>
            </div>
            <div
              className={clsx(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                selectedFormat === "pdf"
                  ? "border-red-500 bg-red-500"
                  : "border-gray-300 dark:border-gray-600"
              )}
            >
              {selectedFormat === "pdf" && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </button>

          {/* Date Filter Section */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-gray-900 dark:text-white text-sm">
                  Filter by Date
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterByDate}
                  onChange={(e) => {
                    setFilterByDate(e.target.checked);
                    if (!e.target.checked) setSelectedDate("");
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 dark:peer-focus:ring-blue-900 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {filterByDate && (
              <div className="animate-fadeIn">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={today}
                  className={clsx(
                    "w-full px-4 py-3 rounded-xl border-2 text-sm font-medium",
                    "bg-gray-50 dark:bg-gray-800",
                    "border-gray-200 dark:border-gray-700",
                    "focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900",
                    "text-gray-900 dark:text-white",
                    "outline-none transition-all duration-200"
                  )}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {selectedDate 
                    ? `Showing tickets from ${new Date(selectedDate).toLocaleDateString("en-IN", { 
                        weekday: "long", 
                        year: "numeric", 
                        month: "long", 
                        day: "numeric" 
                      })}`
                    : "Select a date to filter tickets"
                  }
                </p>
              </div>
            )}

            {!filterByDate && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Download all tickets (no date filter)
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handleDownload}
            disabled={!selectedFormat || loading || (filterByDate && !selectedDate)}
            className={clsx(
              "w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold transition-all duration-300",
              selectedFormat && (!filterByDate || selectedDate)
                ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
            )}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <HiDownload className="w-5 h-5" />
                <span>Download Report</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
