import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function FillableForms() {
  return (
    <ToolPage title="Create Fillable PDF Forms">
      <FileUploader tool="fillable-forms" />
    </ToolPage>
  );
}
