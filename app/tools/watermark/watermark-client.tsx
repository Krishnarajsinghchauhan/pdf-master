"use client";

import { useState } from "react";
import WatermarkControls from "@/components/WatermarkControls";
import FileUploader from "@/components/FileUploader";

export default function WatermarkClient() {
  const [options, setOptions] = useState({});

  return (
    <div>
      <WatermarkControls onChange={setOptions} />
      <FileUploader tool="watermark" options={options} />
    </div>
  );
}
