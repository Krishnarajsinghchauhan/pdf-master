// app/tools/merge/page.tsx
import ToolPage from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import AdsterraNative from "@/app/ads/AdsterraNative";

export default function MergePDF() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Merge PDF" tool="merge">
        <FileUploader tool="merge" />
      </ToolPage>
    </>
  );
}
