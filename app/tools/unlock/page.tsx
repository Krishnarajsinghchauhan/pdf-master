import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function Unlock() {
  return (
    <ToolPage title="Unlock PDF">
      <FileUploader tool="unlock" />
    </ToolPage>
  );
}
