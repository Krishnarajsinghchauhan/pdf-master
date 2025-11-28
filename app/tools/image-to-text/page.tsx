import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function ImageToText() {
  return (
    <ToolPage title="Image to Text (OCR)" tool="image-to-text">
      <FileUploader tool="image-to-text" />
    </ToolPage>
  );
}
