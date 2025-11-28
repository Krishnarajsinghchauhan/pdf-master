import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function ESign() {
  return (
    <ToolPage title="eSign PDF" tool="esign">
      <FileUploader tool="esign" />
    </ToolPage>
  );
}
