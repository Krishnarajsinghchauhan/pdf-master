// app/tools/merge/page.tsx
import ToolPage from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";

export default function MergePDF() {
  return (
    <ToolPage title="Merge PDF">
      <FileUploader tool="merge" />
    </ToolPage>
  );
}
