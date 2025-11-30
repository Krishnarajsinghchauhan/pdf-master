import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PDFToExcel() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PDF to Excel" tool="pdf-to-excel">
        <FileUploader tool="pdf-to-excel" />
      </ToolPage>
    </>
  );
}
