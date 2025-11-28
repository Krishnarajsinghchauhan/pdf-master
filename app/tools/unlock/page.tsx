import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function Unlock() {
  return (
    <ToolPage title="Unlock PDF" tool="unlock">
      <FileUploader tool="unlock" />
    </ToolPage>
  );
}
