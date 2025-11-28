import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function EnhanceScan() {
  return (
    <ToolPage title="Scanned PDF Enhancer" tool="scanned-enhance">
      <FileUploader tool="scanned-enhance" />
    </ToolPage>
  );
}
