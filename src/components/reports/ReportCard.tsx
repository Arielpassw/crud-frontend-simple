type Props = {
  title: string;
  description: string;
  file: string;
};

export default function ReportCard({
  title,
  description,
  file,
}: Props) {

  // EXCEL
  const csvFile =
    file.replace(".pdf", ".csv");

  return (

    <div className="border rounded-xl p-6 shadow bg-gray-50">

      <h2 className="text-2xl font-bold mb-2">
        {title}
      </h2>

      <p className="mb-4 text-gray-600">
        {description}
      </p>

      <div className="flex gap-4 flex-wrap">

        {/* VER PDF */}
        <a
          href={file}
          target="_blank"
          rel="noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Ver PDF
        </a>

        {/* DESCARGAR PDF */}
        <a
          href={file}
          download
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Descargar PDF
        </a>

        {/* DESCARGAR EXCEL */}
        <a
          href={csvFile}
          download
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          Descargar Excel
        </a>

      </div>

    </div>
  );
}