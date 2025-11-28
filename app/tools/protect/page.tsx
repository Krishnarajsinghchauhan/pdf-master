import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function Protect() {
  return (
    <ToolPage title="Protect PDF">
      <FileUploader tool="protect" />
    </ToolPage>
  );
}
