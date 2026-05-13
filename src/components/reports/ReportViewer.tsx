type Props = {
  file: string;
};

export default function ReportViewer({
  file,
}: Props) {

  return (

    <iframe
      src={file}
      width="100%"
      height="700px"
      className="rounded-xl border"
    />

  );
}