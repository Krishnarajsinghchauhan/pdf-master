import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function Unlock() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Unlock PDF" tool="unlock">
        <FileUploader tool="unlock" />
      </ToolPage>
    </>
  );
}
