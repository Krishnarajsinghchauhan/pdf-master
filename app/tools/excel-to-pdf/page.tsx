import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "Excel to PDF Converter — XLSX to PDF Online | PixelPDF",
  description:
    "Convert Excel spreadsheets (XLS/XLSX) to PDF in one click. Free, fast and secure converter.",
  alternates: { canonical: "https://pixelpdf.in/tools/excel-to-pdf" },
  keywords: [
    "excel to pdf",
    "xlsx to pdf",
    "convert excel to pdf",
    "xls to pdf",
  ],
};

export default function ExcelToPDF() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Excel to PDF" tool="excel-to-pdf">
        <FileUploader tool="excel-to-pdf" />

        <ToolSEO
          title="Excel to PDF Converter Online — Free Tool"
          description="Convert XLS and XLSX spreadsheets to PDF instantly. Free, easy, and secure."
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Will the table layout stay intact?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF preserves rows, columns, and formatting while converting to PDF.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Excel to PDF conversion free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Excel to PDF is completely free and requires no registration.",
                  },
                },
              ],
            }),
          }}
        />
      </ToolPage>
    </>
  );
}
