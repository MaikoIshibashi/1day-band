export const metadata = {
  title: "参加者アンケート",
  robots: "noindex, nofollow",
};

export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
