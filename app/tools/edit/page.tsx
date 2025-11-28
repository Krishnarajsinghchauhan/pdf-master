import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function EditPDF() {
  return (
    <ToolPage title="Edit PDF" tool="edit">
      <FileUploader tool="edit" />
    </ToolPage>
  );
}
