import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function HeaderFooter() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Header & Footer Editor" tool="header-footer">
        <FileUploader tool="header-footer" />
      </ToolPage>
    </>
  );
}
