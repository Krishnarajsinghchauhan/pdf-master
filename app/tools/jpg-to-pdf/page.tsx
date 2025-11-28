import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function JPGToPDF() {
  return (
    <ToolPage title="JPG to PDF" tool="jpg-to-pdf">
      <FileUploader tool="jpg-to-pdf" />
    </ToolPage>
  );
}
