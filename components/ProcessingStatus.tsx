"use client";

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
    <div className="mt-6 p-6 bg-white shadow rounded text-center space-y-4">
      {/* Animated Loader */}
      {isLoading && (
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Status Title */}
      <h2 className="text-xl font-semibold capitalize">
        {status === "uploading" && "Uploading your file…"}
        {status === "creating-job" && "Creating processing job…"}
        {status === "processing" && "Processing your file…"}
        {status === "completed" && "Your file is ready!"}
        {status === "error" && "Something went wrong!"}
      </h2>

      {/* Message */}
      <p className="text-gray-600">{message}</p>

      {/* Download Button */}
      {status === "completed" && downloadUrl && (
        <a
          href={downloadUrl}
          download
          className="block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded mt-4"
        >
          Download File
        </a>
      )}

      {/* Reset Button */}
      {(status === "completed" || status === "error") && (
        <button
          onClick={onReset}
          className="mt-4 text-blue-600 hover:underline text-sm"
        >
          Process another file
        </button>
      )}
    </div>
  );
}
