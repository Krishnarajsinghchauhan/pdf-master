import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function Compress() {
  return (
    <ToolPage title="Compress PDF" tool="compress">
      <FileUploader tool="compress" />
    </ToolPage>
  );
}
