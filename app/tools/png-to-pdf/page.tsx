import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PNGToPDF() {
  return (
    <ToolPage title="PNG to PDF" tool="png-to-pdf">
      <FileUploader tool="png-to-pdf" />
    </ToolPage>
  );
}
