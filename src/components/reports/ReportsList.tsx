import ReportCard from "./ReportCard";

import {
  reportsData,
} from "../../api/reports";

export default function ReportsList() {

  return (

    <div className="space-y-6">

      {reportsData.map((report) => (

        <ReportCard
          key={report.id}
          title={report.title}
          description={
            report.description
          }
          file={report.file}
        />

      ))}

    </div>
  );
}