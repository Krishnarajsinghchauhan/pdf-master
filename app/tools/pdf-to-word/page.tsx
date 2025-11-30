import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PDFToWord() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PDF to Word" tool="pdf-to-word">
        <FileUploader tool="pdf-to-word" />
      </ToolPage>
    </>
  );
}
