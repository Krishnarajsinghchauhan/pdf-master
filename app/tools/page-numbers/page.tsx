import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PageNumbers() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Add Page Numbers" tool="page-numbers">
        <FileUploader tool="page-numbers" />
      </ToolPage>
    </>
  );
}
