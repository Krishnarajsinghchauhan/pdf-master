import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function OCR() {
  return (
    <ToolPage title="OCR PDF (Scan to Text)">
      <FileUploader tool="ocr" />
    </ToolPage>
  );
}
