import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function ExcelToPDF() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Excel to PDF" tool="excel-to-pdf">
        <FileUploader tool="excel-to-pdf" />
      </ToolPage>
    </>
  );
}
