// app/tools/split/page.tsx
import ToolPage from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import AdsterraNative from "@/app/ads/AdsterraNative";

export default function Split() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Split PDF" tool="split">
        <FileUploader tool="split" />
      </ToolPage>
    </>
  );
}
