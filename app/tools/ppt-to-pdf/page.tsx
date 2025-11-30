import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PPTToPDF() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PowerPoint to PDF" tool="ppt-to-pdf">
        <FileUploader tool="ppt-to-pdf" />
      </ToolPage>
    </>
  );
}
