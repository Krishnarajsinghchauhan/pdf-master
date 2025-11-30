import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PDFToJPG() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PDF to JPG" tool="pdf-to-jpg">
        <FileUploader tool="pdf-to-jpg" />
      </ToolPage>
    </>
  );
}
