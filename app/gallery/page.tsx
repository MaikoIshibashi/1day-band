import fs from "fs";
import path from "path";
import GalleryClient from "./GalleryClient";

// イベント一覧
const sessions = [
  { id: "1st", title: "1st in Tokyo", date: "2024.10.27", hasGallery: false },
  { id: "2nd", title: "2nd in Osaka", date: "2025.04.26", hasGallery: false },
  { id: "3rd", title: "3rd in Nagoya", date: "2025.10.12", hasGallery: true },
  { id: "4th", title: "4th in Fukuoka", date: "2026.04", hasGallery: false },
];

export default function GalleryPage() {
  const today = new Date();

  const galleries = sessions.map((session) => {
    const dirPath = path.join(process.cwd(), `public/gallery/${session.id}`);
    let photos: { src: string; alt: string }[] = [];

    // ギャラリーがある回だけ写真を読み込む
    if (session.hasGallery && fs.existsSync(dirPath)) {
      const files = fs
        .readdirSync(dirPath)
        .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
        .sort((a, b) => {
          const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
          const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
          return numA - numB;
        });
      photos = files.map((file, i) => ({
        src: `/gallery/${session.id}/${file}`,
        alt: `${session.title} Photo ${i + 1}`,
      }));
    }

    const sessionDate = new Date(
      session.date.replace(".", "/").replace(".", "/")
    );
    const isPast = sessionDate < today;

    return {
      ...session,
      photos,
      isPast,
    };
  });

  return <GalleryClient galleries={galleries} />;
}
