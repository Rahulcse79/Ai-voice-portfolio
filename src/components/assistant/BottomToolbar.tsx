import React from "react";
import { SessionStatus } from "@/app/types";

interface BottomToolbarProps {
  sessionStatus: SessionStatus;
  onToggleConnection: () => void;
}

function BottomToolbar({
  sessionStatus,
  onToggleConnection,
}: BottomToolbarProps) {
  const isConnected = sessionStatus === "CONNECTED";
  const isConnecting = sessionStatus === "CONNECTING";

  function getConnectionButtonLabel() {
    if (isConnected) return "Disconnect";
    if (isConnecting) return "Connecting...";
    return "Connect";
  }

  function getConnectionButtonClasses() {
    const baseClasses = "ui-btn text-base h-11 w-36";
    const cursorClass = isConnecting ? "cursor-not-allowed" : "cursor-pointer";

    if (isConnected) {
      return `bg-red-600 hover:bg-red-700 ${cursorClass} ${baseClasses}`;
    }
    return `ui-btn-primary ${cursorClass} ${baseClasses}`;
  }

  return (
    <div className="px-4 pb-4">
      <div className="ui-panel app-soft flex flex-row flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-3 rounded-2xl">
        <button
          onClick={onToggleConnection}
          className={getConnectionButtonClasses()}
          disabled={isConnecting}
        >
          {getConnectionButtonLabel()}
        </button>
      </div>
    </div>
  );
}

export default BottomToolbar;
