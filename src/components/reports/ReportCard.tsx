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

  return (

    <div className="border rounded-xl p-6 shadow bg-gray-50">

      <h2 className="text-2xl font-bold mb-2">
        {title}
      </h2>

      <p className="mb-4 text-gray-600">
        {description}
      </p>

      <div className="flex gap-4">

        {/* VER */}
        <a
          href={file}
          target="_blank"
          rel="noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Ver Reporte
        </a>

        {/* DESCARGAR */}
        <a
          href={file}
          download
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Descargar
        </a>

      </div>

    </div>
  );
}