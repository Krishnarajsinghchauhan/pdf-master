import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PDFToPPT() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PDF to PowerPoint" tool="pdf-to-ppt">
        <FileUploader tool="pdf-to-ppt" />
      </ToolPage>
    </>
  );
}
