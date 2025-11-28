import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PDFToPNG() {
  return (
    <ToolPage title="PDF to PNG">
      <FileUploader tool="pdf-to-png" />
    </ToolPage>
  );
}
