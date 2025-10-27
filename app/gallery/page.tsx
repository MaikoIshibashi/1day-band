import GalleryClient from "./GalleryClient";

export default function GalleryPage() {
  const galleries = [
    {
      id: "3rd",
      title: "3rd in Nagoya",
      date: "2025.10",
      description: "第3回 名古屋セッション フォトギャラリー",
      photos: Array.from({ length: 30 }, (_, i) => ({
        src: `/gallery/3rd/pt${i + 1}.jpg`, // ← ここ！
        alt: `3rd Session Photo ${i + 1}`,
      })),
    },
    {
      id: "4th",
      title: "4th in Fukuoka",
      date: "2026.04",
      description: "イベント終了後公開予定",
      photos: [],
    },
  ];

  return <GalleryClient galleries={galleries} />;
}
