import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PDFToPPT() {
  return (
    <ToolPage title="PDF to PowerPoint" tool="pdf-to-ppt">
      <FileUploader tool="pdf-to-ppt" />
    </ToolPage>
  );
}
