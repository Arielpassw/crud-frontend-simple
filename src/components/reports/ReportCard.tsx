import { useState } from "react";
import {
  FaEye,
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";

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

  const [openPreview, setOpenPreview] =
    useState(false);

  return (
    <>
      {/* CARD */}
      <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white hover:shadow-lg transition">

        <h2 className="text-xl font-bold mb-2">
          {title}
        </h2>

        <p className="text-gray-500 text-sm mb-5">
          {description}
        </p>

        {/* BOTÓN VER REPORTE */}
        <div className="flex justify-center">

          <button
            onClick={() => setOpenPreview(true)}
            title="Ver Reporte"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition hover:scale-105"
          >
            <FaEye />
            Ver Reporte
          </button>

        </div>

      </div>

      {/* 🔥 MODAL PREVIEW */}
      {openPreview && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] h-[90%] rounded-xl overflow-hidden relative shadow-2xl flex flex-col">

            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b bg-gray-100">

              <h2 className="font-bold text-lg">
                {title}
              </h2>

              <div className="flex gap-3">

                {/* DESCARGAR PDF */}
                <a
                  href={pdf}
                  target="_blank"
                  rel="noreferrer"
                  title="Descargar PDF"
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <FaFilePdf />
                  PDF
                </a>

                {/* DESCARGAR EXCEL */}
                <a
                  href={excel}
                  download
                  title="Descargar Excel"
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <FaFileExcel />
                  Excel
                </a>

                {/* CERRAR */}
                <button
                  onClick={() => setOpenPreview(false)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Cerrar
                </button>

              </div>

            </div>

            {/* VISUALIZACIÓN PDF */}
            <iframe
              src={pdf}
              className="w-full flex-1"
            />

          </div>

        </div>

      )}
    </>
  );
}