import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function WordToPDF() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Word to PDF" tool="word-to-pdf">
        <FileUploader tool="word-to-pdf" />
      </ToolPage>
    </>
  );
}
