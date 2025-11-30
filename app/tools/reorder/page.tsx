import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function Reorder() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Reorder Pages" tool="reorder">
        <FileUploader tool="reorder" />
      </ToolPage>
    </>
  );
}
