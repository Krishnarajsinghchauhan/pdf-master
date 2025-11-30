import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function EnhanceScan() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Scanned PDF Enhancer" tool="scanned-enhance">
        <FileUploader tool="scanned-enhance" />
      </ToolPage>
    </>
  );
}
