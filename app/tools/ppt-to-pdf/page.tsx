import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PPTToPDF() {
  return (
    <ToolPage title="PowerPoint to PDF" tool="ppt-to-pdf">
      <FileUploader tool="ppt-to-pdf" />
    </ToolPage>
  );
}
