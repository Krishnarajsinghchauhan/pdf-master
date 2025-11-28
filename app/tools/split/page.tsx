// app/tools/split/page.tsx
import ToolPage from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";

export default function Split() {
  return (
    <ToolPage title="Split PDF">
      <FileUploader tool="split" />
    </ToolPage>
  );
}
