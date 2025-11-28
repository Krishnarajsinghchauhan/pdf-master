import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PDFToWord() {
  return (
    <ToolPage title="PDF to Word" tool="pdf-to-word">
      <FileUploader tool="pdf-to-word" />
    </ToolPage>
  );
}
