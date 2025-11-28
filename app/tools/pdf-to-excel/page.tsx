import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PDFToExcel() {
  return (
    <ToolPage title="PDF to Excel">
      <FileUploader tool="pdf-to-excel" />
    </ToolPage>
  );
}
