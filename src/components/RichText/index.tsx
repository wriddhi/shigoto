export function RichText({ html }: { html: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="prose-code:font-mono w-full"
    ></div>
  );
}
