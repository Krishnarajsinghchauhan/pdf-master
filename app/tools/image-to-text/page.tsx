import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function ImageToText() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Image to Text (OCR)" tool="image-to-text">
        <FileUploader tool="image-to-text" />
      </ToolPage>
    </>
  );
}
