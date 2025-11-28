import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function HeaderFooter() {
  return (
    <ToolPage title="Header & Footer Editor" tool="header-footer">
      <FileUploader tool="header-footer" />
    </ToolPage>
  );
}
