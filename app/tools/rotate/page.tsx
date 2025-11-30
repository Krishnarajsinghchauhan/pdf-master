import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function Rotate() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Rotate PDF Pages" tool="rotate">
        <FileUploader tool="rotate" />
      </ToolPage>
    </>
  );
}
