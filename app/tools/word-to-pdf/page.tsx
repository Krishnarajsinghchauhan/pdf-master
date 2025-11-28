import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";

export default function WordToPDF() {
  return (
    <ToolPage title="Word to PDF" tool="word-to-pdf">
      <FileUploader tool="word-to-pdf" />
    </ToolPage>
  );
}
