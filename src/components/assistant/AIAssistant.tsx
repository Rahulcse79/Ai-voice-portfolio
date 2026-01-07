"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SessionStatus } from "@/app/types";

interface AIAssistantProps {
  sessionStatus: SessionStatus;
  onToggleConnection: () => void;
}

const AIRobotRecorder = ({
  sessionStatus,
  onToggleConnection,
}: AIAssistantProps) => {
  const isConnected = sessionStatus === "CONNECTED";
  const isConnecting = sessionStatus === "CONNECTING";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed z-50 right-3 sm:right-6"
      style={{ bottom: "max(10vh, env(safe-area-inset-bottom))" }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={
          isConnecting
            ? "relative cursor-not-allowed group"
            : "relative cursor-pointer group"
        }
        onClick={isConnecting ? undefined : onToggleConnection}
      >
        {/* Outer Pulse Ring (when recording) */}
        <AnimatePresence>
          {(isConnected || isConnecting) && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-green-500/20 blur-xl"
            />
          )}
        </AnimatePresence>

        {/* Status Indicator with Enhanced Glow */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          {/* Multiple Glow Layers */}
          <motion.div
            animate={{
              scale: [1, 2, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`absolute inset-0 rounded-full blur-lg ${
              isConnected || isConnecting ? "bg-green-400/60" : "bg-red-400/60"
            }`}
          />
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0.2, 0.8],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className={`absolute inset-0 rounded-full blur-md ${
              isConnected || isConnecting ? "bg-green-500/50" : "bg-red-500/50"
            }`}
          />

          {/* Core Status Dot */}
          <motion.div
            animate={{
              boxShadow:
                isConnected || isConnecting
                  ? [
                      "0 0 8px 2px rgba(34, 197, 94, 0.6)",
                      "0 0 16px 4px rgba(34, 197, 94, 0.8)",
                      "0 0 8px 2px rgba(34, 197, 94, 0.6)",
                    ]
                  : [
                      "0 0 8px 2px rgba(239, 68, 68, 0.6)",
                      "0 0 16px 4px rgba(239, 68, 68, 0.8)",
                      "0 0 8px 2px rgba(239, 68, 68, 0.6)",
                    ],
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className={`w-5 h-5 rounded-full border-2 border-white/90 dark:border-gray-800 ${
              isConnected || isConnecting
                ? "bg-gradient-to-br from-green-400 to-green-600"
                : "bg-gradient-to-br from-red-400 to-red-600"
            }`}
          />
        </div>

        {/* Robot Image with Hover Effect, centered */}
        <div className="w-full flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Image
              src="/assets/images/ai-robot.png"
              alt="AI Assistant"
              width={120}
              height={120}
              priority
              className="drop-shadow-2xl w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36"
            />
          </motion.div>
        </div>

        {/* Voice Wave Animation (shows when connected / connecting) */}
        <AnimatePresence>
          {(isConnected || isConnecting) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center absolute left-1 -translate-x-1/2 top-[calc(100%+8px)]"
            >
              {/* Status Text */}
              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xs text-center mb-2 text-green-500 dark:text-green-400 font-medium tracking-wide"
              >
                {isConnecting ? "Connecting..." : "Listening..."}
              </motion.p>

              {/* Wave Container with Glass Effect */}
              <div className="flex items-end justify-center gap-[3px] px-3 sm:px-4 py-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isConnecting ? [6, 18, 6] : [6, 24, 6],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: isConnecting ? 0.95 : 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                    className="w-[2px] sm:w-[3px] rounded-full bg-gradient-to-t from-green-500 to-green-300 shadow-sm shadow-green-500/50"
                    style={{ minHeight: 6 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Base Glow Effect */}
        <motion.span
          animate={{
            opacity: isConnected || isConnecting ? [0.3, 0.5, 0.3] : 0.2,
            scale: isConnected || isConnecting ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-0 -z-10 rounded-full blur-2xl ${
            isConnected || isConnecting
              ? "bg-gradient-to-br from-green-500/30 to-emerald-500/20"
              : "bg-gradient-to-br from-red-500/20 to-orange-500/10"
          }`}
        />

        {/* Tooltip on Hover */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-gray-900/90 dark:bg-gray-100/90 text-white dark:text-gray-900 text-xs font-medium whitespace-nowrap shadow-lg">
            {isConnecting
              ? "Connecting..."
              : isConnected
              ? "Click to disconnect"
              : "Click to connect"}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIRobotRecorder;
