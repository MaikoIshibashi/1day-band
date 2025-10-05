import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#111",
        padding: "2rem",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        marginTop: "4rem",
      }}
    >
      <p style={{ margin: 0, color: "gray", fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} 1Day Studio Band. All rights reserved.
      </p>

<div
  style={{
    marginTop: "1rem",
    fontSize: "1.5rem",
    display: "flex",
    justifyContent: "center", // 中央寄せ
    gap: "1.5rem",            // アイコン間のスペース
  }}
>
  <a
    href="https://x.com/1DayStudioBand"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "var(--color-accent)" }}
  >
    <FaXTwitter />
  </a>
  <a
    href="https://www.youtube.com/@1DayStudioBand"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "var(--color-accent)" }}
  >
    <FaYoutube />
  </a>
  <a
    href="mailto:info@1daystudioband.com"
    style={{ color: "var(--color-accent)" }}
  >
    <MdEmail />
  </a>

</div>
    </footer>
  );
}
