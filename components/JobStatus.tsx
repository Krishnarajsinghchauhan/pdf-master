"use client";

import { useEffect, useState } from "react";

export default function JobStatus({ jobId }: { jobId: string }) {
  const [status, setStatus] = useState("processing");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/job-status?id=${jobId}`);
      const data = await res.json();

      setStatus(data.status);
      if (data.status === "completed") {
        setDownloadUrl(data.result);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId]);

  if (downloadUrl)
    return (
      <a
        href={downloadUrl}
        download
        className="bg-green-600 text-white px-4 py-2 rounded shadow"
      >
        Download Final PDF
      </a>
    );

  return <p className="text-blue-600 font-medium">Processing… ({status})</p>;
}
