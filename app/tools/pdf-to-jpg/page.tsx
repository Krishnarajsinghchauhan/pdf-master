import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PDFToJPG() {
  return (
    <ToolPage title="PDF to JPG" tool="pdf-to-jpg">
      <FileUploader tool="pdf-to-jpg" />
    </ToolPage>
  );
}
