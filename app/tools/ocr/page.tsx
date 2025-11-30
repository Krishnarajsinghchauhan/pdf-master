import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function OCR() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="OCR PDF (Scan to Text)" tool="ocr">
        <FileUploader tool="ocr" />
      </ToolPage>
    </>
  );
}
