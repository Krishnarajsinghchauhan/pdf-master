import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function ExcelToPDF() {
  return (
    <ToolPage title="Excel to PDF" tool="excel-to-pdf">
      <FileUploader tool="excel-to-pdf" />
    </ToolPage>
  );
}
