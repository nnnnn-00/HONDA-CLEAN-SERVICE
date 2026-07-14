const navItems = [
  { label: "私たちについて", href: "#about" },
  { label: "サービス", href: "#service" },
  { label: "施工事例", href: "#works" },
  { label: "ご依頼の流れ", href: "#flow" },
];

export default function Home() {
  return (
    <main>
      <section className="hero-shell" aria-label="本田クリーンサービス メインビジュアル">
        <div className="hero-visual">
          <div className="hero-slides" aria-hidden="true">
            <div className="hero-slide hero-slide-one" />
            <div className="hero-slide hero-slide-two" />
            <div className="hero-slide hero-slide-three" />
          </div>
          <div className="hero-shade" />

          <header className="hero-header">
            <a className="brand" href="#top" aria-label="本田クリーンサービス トップ">
              <span className="brand-mark">H</span>
              <span className="brand-copy">
                <strong>本田クリーンサービス</strong>
                <small>HONDA CLEAN SERVICE</small>
              </span>
            </a>
            <div className="header-actions">
              <span className="header-area">福岡市早良区を中心に対応</span>
              <a className="header-contact" href="#contact">
                無料見積り <span aria-hidden="true">↗</span>
              </a>
            </div>
          </header>

          <div className="hero-copy" id="top">
            <p className="hero-eyebrow">
              <span /> FUKUOKA · SAWARA
            </p>
            <h1>
              <span className="desktop-copy">福岡の暮らしと建物を、</span>
              <span className="mobile-copy">福岡の毎日を、</span>
              <br />
              <em>二人で丁寧に。</em>
            </h1>
            <p className="hero-lead">
              入退去清掃・定期清掃・エアコン取付／清掃。
              <br />
              ご相談から作業完了まで、夫婦二人が責任をもって対応します。
            </p>
            <div className="hero-buttons">
              <a className="button-primary" href="#contact">
                無料で見積りを相談する <span aria-hidden="true">→</span>
              </a>
              <a className="button-secondary" href="#service">
                サービスを見る
              </a>
            </div>
          </div>

          <div className="hero-note">
            <span>LOCAL &amp; PERSONAL</span>
            <small>写真は撮影後に実際のお二人へ差し替えます</small>
          </div>

          <nav className="floating-nav" aria-label="主要メニュー">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <span className="nav-divider" />
            <a className="nav-target" href="#personal">
              個人のお客様
            </a>
            <a className="nav-target nav-target-blue" href="#business">
              管理会社・オーナー様
            </a>
          </nav>
        </div>
      </section>

      <section className="intro" id="about">
        <div className="intro-copy">
          <p className="section-label">ABOUT US</p>
          <h2>
            顔の見える二人が、
            <br />
            いつもの場所を心地よく。
          </h2>
          <p>
            本田クリーンサービスは、福岡市早良区を拠点に夫婦二人で営む清掃サービスです。
            大きな会社ではないからこそ、一件一件のお困りごとを直接伺い、最後まで同じ二人が丁寧に担当します。
          </p>
          <a className="text-link" href="#profile">
            私たちについて <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="intro-gallery" aria-label="作業イメージ写真">
          <div className="gallery-photo gallery-main" />
          <div className="gallery-photo gallery-sub" />
          <div className="gallery-accent">
            <strong>地域密着</strong>
            <span>福岡市周辺</span>
          </div>
        </div>
      </section>

      <section className="service-preview" id="service">
        <p className="section-label">OUR SERVICE</p>
        <h2>暮らしにも、管理物件にも。</h2>
        <div className="service-tags">
          <span>入退去清掃</span>
          <span>定期清掃</span>
          <span>エアコン取付・清掃</span>
        </div>
      </section>

      <div className="mobile-contact" id="contact">
        <a href="tel:0000000000">電話相談</a>
        <a href="#estimate">無料見積り</a>
      </div>
    </main>
  );
}
