import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function Compress() {
  return (
    <ToolPage title="Compress PDF">
      <FileUploader tool="compress" />
    </ToolPage>
  );
}
