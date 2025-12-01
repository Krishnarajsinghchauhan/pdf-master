import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export const dynamic = "force-dynamic";

export default function FillableForms() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Create Fillable PDF Forms" tool="fillable-forms">
        <FileUploader tool="fillable-forms" />
      </ToolPage>
    </>
  );
}
