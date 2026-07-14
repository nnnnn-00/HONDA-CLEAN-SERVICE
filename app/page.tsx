const services = [
  {
    number: "01",
    title: "入退去清掃",
    lead: "次に暮らす人へ、気持ちよく渡せる空間に。",
    body: "空室全体の汚れや水まわり、床、窓まで、物件の状態に合わせて丁寧に整えます。管理会社さま・オーナーさまからの継続依頼にも対応します。",
    image:
      "https://images.pexels.com/photos/3616735/pexels-photo-3616735.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "明るく整えられた空室",
    className: "service-block service-block--move",
  },
  {
    number: "02",
    title: "定期清掃",
    lead: "いつ見ても、きちんと気持ちのいい共用部へ。",
    body: "マンション・アパート・店舗などを定期的に訪問。いつもの担当が状態の変化まで見ながら、日常のきれいを無理なく保ちます。",
    image:
      "https://images.pexels.com/photos/6195273/pexels-photo-6195273.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "掃除機を使って室内を清掃する様子",
    className: "service-block service-block--regular",
  },
  {
    number: "03",
    title: "エアコン取付・清掃",
    lead: "設置も、内部の汚れも。まとめて相談できます。",
    body: "家庭用エアコンの取付から分解洗浄まで対応します。気になるにおいや効き具合など、暮らしの中の小さな違和感も気軽にお聞かせください。",
    image:
      "https://images.pexels.com/photos/5463580/pexels-photo-5463580.jpeg?auto=compress&cs=tinysrgb&w=1800",
    alt: "壁掛けエアコンを点検する作業員",
    className: "service-block service-block--aircon",
  },
];

const flow = [
  ["01", "お問い合わせ", "気になる場所やご希望の時期をお知らせください。"],
  ["02", "内容の確認", "現地確認または写真をもとに、作業範囲を整理します。"],
  ["03", "お見積り", "内容と金額をご確認いただいてから日程を決めます。"],
  ["04", "作業・ご確認", "夫婦二人で丁寧に作業し、仕上がりをご確認いただきます。"],
];

const faqs = [
  ["見積りだけでも相談できますか？", "はい。まずは清掃場所やご希望を伺い、必要な作業を整理したうえでご案内します。"],
  ["福岡市外にも来てもらえますか？", "早良区を中心に、福岡市内と近郊へ伺います。場所によって調整しますので、まずはご相談ください。"],
  ["管理物件を定期的にお願いできますか？", "はい。物件の規模や頻度に合わせ、管理会社さま・オーナーさま向けの定期清掃にも対応します。"],
  ["エアコンは取付と清掃を一緒に頼めますか？", "機種や設置状況を確認したうえでご案内します。写真があると、よりスムーズに確認できます。"],
];

export default function Home() {
  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero__photo"
          src="https://images.pexels.com/photos/6195882/pexels-photo-6195882.jpeg?auto=compress&cs=tinysrgb&w=2400"
          alt="清掃道具を車から運ぶ二人のスタッフ"
        />
        <div className="hero__veil" aria-hidden="true" />

        <header className="site-header">
          <a className="brand" href="#top" aria-label="本田クリーンサービス ホーム">
            <span className="brand__name">本田クリーンサービス</span>
            <span className="brand__sub">HONDA CLEAN SERVICE</span>
          </a>

          <nav className="global-nav" aria-label="メインナビゲーション">
            <a href="#about">私たちについて</a>
            <a href="#service">サービス</a>
            <a href="#area">対応エリア</a>
            <a href="#faq">よくある質問</a>
          </nav>

          <a className="header-contact" href="#contact">
            <span>CONTACT</span>
            無料で相談する
          </a>

          <details className="mobile-menu">
            <summary aria-label="メニューを開く"><span /><span /></summary>
            <nav aria-label="スマートフォンメニュー">
              <a href="#about">私たちについて</a>
              <a href="#service">サービス</a>
              <a href="#area">対応エリア</a>
              <a href="#faq">よくある質問</a>
              <a href="#contact">無料で相談する</a>
            </nav>
          </details>
        </header>

        <div className="hero__copy">
          <p className="eyebrow eyebrow--light">FUKUOKA / SAWARA</p>
          <h1 id="hero-title">
            福岡の暮らしを、
            <br />
            二人で丁寧に。
          </h1>
          <p className="hero__service">入退去清掃・定期清掃・エアコン取付／清掃</p>
        </div>

        <div className="hero-wave" aria-hidden="true">
          <span className="hero-wave__large" />
          <span className="hero-wave__small" />
        </div>

        <nav className="hero-index" aria-label="サービスへのショートカット">
          <a href="#move-cleaning"><b>01</b><span>入退去清掃</span></a>
          <a href="#regular-cleaning"><b>02</b><span>定期清掃</span></a>
          <a href="#aircon-cleaning"><b>03</b><span>エアコン取付・清掃</span></a>
        </nav>
      </section>

      <section className="message section-shell" id="about">
        <div className="message__side">
          <p className="eyebrow">OUR THOUGHTS</p>
          <span className="vertical-note">地域のすぐそばで、顔の見える仕事を。</span>
        </div>
        <div className="message__main">
          <h2>いつもの場所を、<br />気持ちのいい場所へ。</h2>
          <div className="message__body">
            <p>
              本田クリーンサービスは、福岡市早良区を拠点に、夫婦二人で営む清掃会社です。
              大きな会社のような派手さはなくても、相談した人と作業する人の顔がきちんとつながることを大切にしています。
            </p>
            <p>
              個人のお客さまの「ちょっと困った」から、管理会社さま・オーナーさまの継続的なご依頼まで。
              一件ずつ状態を見て、必要なことをまっすぐ、丁寧に行います。
            </p>
          </div>
        </div>
      </section>

      <section className="services" id="service" aria-labelledby="service-heading">
        <div className="section-heading section-shell">
          <div>
            <p className="eyebrow">OUR SERVICES</p>
            <h2 id="service-heading">暮らしと建物の、<br />きれいを支えます。</h2>
          </div>
          <p className="section-heading__note">個人のお客さまから、管理会社さま・オーナーさままで。</p>
        </div>

        {services.map((service, index) => (
          <article
            className={service.className}
            id={index === 0 ? "move-cleaning" : index === 1 ? "regular-cleaning" : "aircon-cleaning"}
            key={service.number}
          >
            <figure className="service-photo">
              <img src={service.image} alt={service.alt} loading="lazy" />
              {index === 2 && <span className="service-photo__wave" aria-hidden="true" />}
            </figure>
            <div className="service-copy">
              <p className="service-copy__number">SERVICE <b>{service.number}</b></p>
              <h3>{service.title}</h3>
              <p className="service-copy__lead">{service.lead}</p>
              <p className="service-copy__body">{service.body}</p>
              <a className="text-link" href="#contact">このサービスを相談する <span>→</span></a>
            </div>
          </article>
        ))}
      </section>

      <section className="works section-shell" id="works" aria-labelledby="works-heading">
        <div className="works__intro">
          <p className="eyebrow">OUR WORK</p>
          <h2 id="works-heading">きれいになった、<br />その先まで。</h2>
          <p>
            ただ汚れを落とすだけでなく、次に使う人が気持ちよく過ごせる状態を目指します。
            仕上がりは一緒に確認し、気になるところを残しません。
          </p>
        </div>
        <div className="comparison" aria-label="清掃実績写真の掲載イメージ">
          <figure>
            <img
              className="comparison__before"
              src="https://images.pexels.com/photos/3616735/pexels-photo-3616735.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="清掃前の掲載位置イメージ"
              loading="lazy"
            />
            <figcaption>BEFORE</figcaption>
          </figure>
          <figure>
            <img
              src="https://images.pexels.com/photos/3616735/pexels-photo-3616735.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="清掃後の掲載位置イメージ"
              loading="lazy"
            />
            <figcaption>AFTER</figcaption>
          </figure>
          <p className="comparison__note">公開時は、同じ画角で撮影した実際の施工写真へ差し替えます。</p>
        </div>
      </section>

      <section className="area" id="area" aria-labelledby="area-heading">
        <div className="area-wave" aria-hidden="true"><span /><i /></div>
        <div className="area__inner section-shell">
          <div className="area__copy">
            <p className="eyebrow">SERVICE AREA</p>
            <h2 id="area-heading">早良区から、<br />福岡市のすぐそばへ。</h2>
            <p>
              福岡市早良区を中心に、市内各区と近郊エリアへ伺います。
              ご依頼内容や日程によって調整できますので、対象地域か迷ったときも気軽にご相談ください。
            </p>
            <dl className="area__details">
              <div><dt>拠点</dt><dd>福岡市早良区原5-13-4</dd></div>
              <div><dt>主な対応</dt><dd>福岡市内・近郊エリア</dd></div>
            </dl>
          </div>

          <div className="local-map" role="img" aria-label="早良区を中心とした福岡市内の対応エリアイメージ">
            <span className="ward ward--higashi">東区</span>
            <span className="ward ward--hakata">博多区</span>
            <span className="ward ward--chuo">中央区</span>
            <span className="ward ward--minami">南区</span>
            <span className="ward ward--jonan">城南区</span>
            <span className="ward ward--sawara"><b>早良区</b><small>OUR BASE</small></span>
            <span className="ward ward--nishi">西区</span>
            <span className="map-pin" aria-hidden="true"><i /></span>
            <p>FUKUOKA CITY</p>
          </div>
        </div>
      </section>

      <section className="flow section-shell" aria-labelledby="flow-heading">
        <div className="flow__heading">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2 id="flow-heading">ご相談から作業まで。</h2>
        </div>
        <ol className="flow__list">
          {flow.map(([number, title, text]) => (
            <li key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="profile" aria-labelledby="profile-heading">
        <figure className="profile__photo">
          <img
            src="https://images.pexels.com/photos/6200780/pexels-photo-6200780.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="清掃作業について話す二人のスタッフ"
            loading="lazy"
          />
        </figure>
        <div className="profile__copy">
          <p className="eyebrow">ABOUT US</p>
          <h2 id="profile-heading">最初の相談から、<br />最後の確認まで。</h2>
          <p className="profile__lead">伺うのは、私たち二人です。</p>
          <p>
            ご相談を受けた人と、実際に作業する人が違う。そんな行き違いをつくらないことも、夫婦二人で営む私たちの強みです。
            清掃のことも、エアコンのことも、気になったことをそのまま話せる関係を大切にしています。
          </p>
          <p className="profile__note">※現在の人物写真はデザイン確認用です。公開前に実際のお二人の写真へ差し替えます。</p>
          <p className="profile__sign">本田クリーンサービス</p>
        </div>
      </section>

      <section className="faq section-shell" id="faq" aria-labelledby="faq-heading">
        <div className="faq__heading">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-heading">よくあるご質問</h2>
          <p>掲載のないことも、気軽にお問い合わせください。</p>
        </div>
        <div className="faq__list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary><span>Q</span>{question}<i>＋</i></summary>
              <p><b>A</b>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-heading">
        <div className="contact-wave" aria-hidden="true"><span /><i /></div>
        <div className="contact__inner">
          <p className="eyebrow eyebrow--light">CONTACT</p>
          <h2 id="contact-heading">まずは、気になるところを<br />聞かせてください。</h2>
          <p className="contact__lead">個人のお客さまも、管理会社さま・オーナーさまも。見積り前のご相談から承ります。</p>
          <div className="contact__actions">
            <a href="#contact-details"><span>PHONE</span><b>電話で相談する</b><i>→</i></a>
            <a href="#contact-details"><span>CONTACT FORM</span><b>無料見積りフォームへ</b><i>→</i></a>
          </div>
          <p className="contact__notice" id="contact-details">電話番号・お問い合わせフォームは、本番公開時に接続します。</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__brand">
          <a className="brand brand--footer" href="#top">
            <span className="brand__name">本田クリーンサービス</span>
            <span className="brand__sub">HONDA CLEAN SERVICE</span>
          </a>
          <p>〒814-0022 福岡市早良区原5-13-4</p>
        </div>
        <nav aria-label="フッターナビゲーション">
          <a href="#about">私たちについて</a>
          <a href="#service">サービス</a>
          <a href="#area">対応エリア</a>
          <a href="#faq">よくある質問</a>
          <a href="#contact">お問い合わせ</a>
        </nav>
        <p className="footer__copy">© HONDA CLEAN SERVICE</p>
      </footer>

      <nav className="mobile-fixed" aria-label="固定お問い合わせメニュー">
        <a href="#contact-details">電話で相談</a>
        <a href="#contact">無料見積り</a>
      </nav>
    </main>
  );
}
