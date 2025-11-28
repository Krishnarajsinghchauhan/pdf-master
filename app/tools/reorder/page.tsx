import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function Reorder() {
  return (
    <ToolPage title="Reorder Pages" tool="reorder">
      <FileUploader tool="reorder" />
    </ToolPage>
  );
}
