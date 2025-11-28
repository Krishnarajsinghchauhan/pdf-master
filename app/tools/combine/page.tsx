import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function Combine() {
  return (
    <ToolPage title="PDF Combine (All File Types)" tool="combine">
      <FileUploader tool="combine" />
    </ToolPage>
  );
}
