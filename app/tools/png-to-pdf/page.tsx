import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PNGToPDF() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PNG to PDF" tool="png-to-pdf">
        <FileUploader tool="png-to-pdf" />
      </ToolPage>
    </>
  );
}
