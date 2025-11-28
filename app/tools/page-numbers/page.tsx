import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function PageNumbers() {
  return (
    <ToolPage title="Add Page Numbers">
      <FileUploader tool="page-numbers" />
    </ToolPage>
  );
}
