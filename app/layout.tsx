import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://honda-clean-service-preview.n-0313-yuuki.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "本田クリーンサービス｜福岡市早良区の清掃・エアコンサービス",
  description:
    "福岡市早良区を拠点に、入退去清掃・定期清掃・エアコン取付／清掃を夫婦二人で丁寧に行う地域密着の清掃会社です。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "本田クリーンサービス",
    title: "本田クリーンサービス｜福岡の暮らしを、二人で丁寧に。",
    description:
      "福岡市早良区を中心に、入退去清掃・定期清掃・エアコン取付／清掃に対応します。",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "本田クリーンサービス 福岡の暮らしを、二人で丁寧に。",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "本田クリーンサービス｜福岡の暮らしを、二人で丁寧に。",
    description: "福岡市早良区を中心に、清掃とエアコンサービスを夫婦二人で丁寧に。",
    images: ["/og.png"],
  },
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
