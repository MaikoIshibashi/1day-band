export const metadata = {
  title: "参加者アンケート",
  description: "イベント参加者向けアンケートページです",
  robots: {
    index: false, // インデックス禁止
    follow: false, // リンクも辿らない
  },
};
 
export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-black text-white min-h-screen">
      {children}
    </section>
  );
}
