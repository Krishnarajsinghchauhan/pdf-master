"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faCloudDownloadAlt,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  status: string;
  message: string;
  downloadUrl?: string;
  onReset: () => void;
}

export default function ProcessingStatus({
  status,
  message,
  downloadUrl,
  onReset,
}: Props) {
  const isLoading = status !== "completed" && status !== "error";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 p-8 rounded-2xl shadow-xl backdrop-blur-xl bg-white/70 border border-white/40 max-w-xl mx-auto text-center"
    >
      {/* ⭐ Animated Loader */}
      {isLoading && (
        <div className="flex justify-center mb-4">
          <div className="relative">
            {/* Pulsing ring */}
            <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-blue-400 animate-ping opacity-40"></div>

            {/* Spinning loader */}
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* ⭐ Completed */}
      {status === "completed" && (
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          className="flex justify-center mb-4"
        >
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-green-600 drop-shadow-lg"
            size="4x"
          />
        </motion.div>
      )}

      {/* ⭐ Error */}
      {status === "error" && (
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          className="flex justify-center mb-4"
        >
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-500 drop-shadow-lg"
            size="4x"
          />
        </motion.div>
      )}

      {/* ⭐ Title */}
      <h2 className="text-2xl font-extrabold text-gray-800 mt-2">
        {status === "uploading" && "Uploading your files…"}
        {status === "creating-job" && "Preparing your job…"}
        {status === "processing" && "Processing your file…"}
        {status === "completed" && "Your file is ready!"}
        {status === "error" && "Something went wrong"}
      </h2>

      {/* ⭐ Subtitle */}
      <p className="text-gray-600 mt-2">{message}</p>

      {/* ⭐ Download Button */}
      {status === "completed" && downloadUrl && (
        <motion.a
          whileTap={{ scale: 0.96 }}
          href={downloadUrl}
          download
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
        >
          <FontAwesomeIcon icon={faCloudDownloadAlt} />
          Download File
        </motion.a>
      )}

      {/* ⭐ Reset */}
      {(status === "completed" || status === "error") && (
        <button
          onClick={onReset}
          className="mt-5 block mx-auto text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2"
        >
          Process another file
        </button>
      )}
    </motion.div>
  );
}
