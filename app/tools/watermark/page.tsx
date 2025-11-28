import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function Watermark() {
  return (
    <ToolPage title="Add Watermark">
      <FileUploader tool="watermark" />
    </ToolPage>
  );
}
