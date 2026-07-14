import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "本田クリーンサービス｜福岡市早良区の清掃・エアコンサービス",
  description:
    "福岡市早良区を拠点に、入退去清掃・定期清掃・エアコン取付／清掃を夫婦二人で丁寧に対応します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
