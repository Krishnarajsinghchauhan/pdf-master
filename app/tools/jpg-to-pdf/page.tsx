import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function JPGToPDF() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="JPG to PDF" tool="jpg-to-pdf">
        <FileUploader tool="jpg-to-pdf" />
      </ToolPage>
    </>
  );
}
