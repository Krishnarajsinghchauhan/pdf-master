import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function Rotate() {
  return (
    <ToolPage title="Rotate PDF Pages" tool="rotate">
      <FileUploader tool="rotate" />
    </ToolPage>
  );
}
