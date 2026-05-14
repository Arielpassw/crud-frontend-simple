import { FaEye, FaFilePdf, FaFileExcel } from "react-icons/fa";

type Props = {
  title: string;
  description: string;
  pdf: string;
  excel: string;
};

export default function ReportCard({
  title,
  description,
  pdf,
  excel,
}: Props) {
  return (
    <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white hover:shadow-lg transition-all duration-300">

      {/* TITULO */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {title}
      </h2>

      {/* DESCRIPCION */}
      <p className="text-gray-500 text-sm mb-5">
        {description}
      </p>

      {/* BOTONES */}
      <div className="flex gap-4">

        {/* VER PDF */}
        <a
          href={pdf}
          target="_blank"
          rel="noreferrer"
          title="Ver PDF"
          className="
            w-11 h-11 flex items-center justify-center
            rounded-full bg-blue-600 text-white
            hover:bg-blue-700 hover:scale-110
            transition-all duration-200
            shadow-md
          "
        >
          <FaEye />
        </a>

        {/* DESCARGAR PDF */}
        <a
          href={pdf}
          download
          title="Descargar PDF"
          className="
            w-11 h-11 flex items-center justify-center
            rounded-full bg-red-600 text-white
            hover:bg-red-700 hover:scale-110
            transition-all duration-200
            shadow-md
          "
        >
          <FaFilePdf />
        </a>

        {/* DESCARGAR EXCEL */}
        <a
          href={excel}
          download
          title="Descargar Excel"
          className="
            w-11 h-11 flex items-center justify-center
            rounded-full bg-green-600 text-white
            hover:bg-green-700 hover:scale-110
            transition-all duration-200
            shadow-md
          "
        >
          <FaFileExcel />
        </a>

      </div>
    </div>
  );
}