import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function DeletePages() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Delete PDF Pages" tool="delete-pages">
        <FileUploader tool="delete-pages" />
      </ToolPage>
    </>
  );
}
