import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function DeletePages() {
  return (
    <ToolPage title="Delete PDF Pages" tool="delete-pages">
      <FileUploader tool="delete-pages" />
    </ToolPage>
  );
}
