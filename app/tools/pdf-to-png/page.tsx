import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PDFToPNG() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PDF to PNG" tool="pdf-to-png">
        <FileUploader tool="pdf-to-png" />
      </ToolPage>
    </>
  );
}
