import { readStore } from '../../../lib/store';
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import PageHero from '../../../components/PageHero';
import MissionVisual from '../../about/MissionVisual';
import VisionVisual from '../../about/VisionVisual';
import Vision2030Visual from '../../about/Vision2030Visual';

export const metadata = {
  title: 'من نحن | زيماء لتقنية الفعاليات',
  description: 'زيماء هي شريك المملكة العربية السعودية المتكامل لتقنية الفعاليات، ومقرها الرئيسي في الرياض مع عمليات في جميع أنحاء المملكة.',
  keywords: ['شركة تقنية فعاليات', 'زيماء', 'تقنية فعاليات السعودية', 'شريك تقني للفعاليات', 'الرياض', 'رؤية 2030'],
  alternates: {
    canonical: 'https://zeemaa.com/ar/about',
    languages: { en: 'https://zeemaa.com/about', ar: 'https://zeemaa.com/ar/about' },
  },
  openGraph: {
    title: 'من نحن | زيماء لتقنية الفعاليات',
    description: 'شريككم المتكامل لتقنية الفعاليات في المملكة العربية السعودية.',
    type: 'website',
    url: 'https://zeemaa.com/ar/about',
    siteName: 'Zeemaa',
    locale: 'ar_SA',
  },
};

export default async function AboutPageAr() {
  const store = await readStore();
  const locations = (store.locations || []).filter(l => l.enabled);

  return (
    <div dir="rtl" lang="ar">
      <Nav store={store} locale="ar" />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: "'Tajawal', 'Geist', sans-serif" }}>

        <PageHero
          eyebrow="من نحن"
          title="شريككم المتكامل لتقنية الفعاليات في المملكة العربية السعودية"
          ghost="نبذة"
          crumbs={[{ label: 'الرئيسية', href: '/ar' }, { label: 'من نحن' }]}
          locale="ar"
        />

        {/* Our Mission */}
        <section className="svcx" id="mission">
          <div className="svcx-in">
            <div className="svcx-row">
              <div className="svcx-copy">
                <p className="sey">ما يحفزنا</p>
                <h2 className="st2">مهمتنا</h2>
                <p className="svcx-sub">تمكين منظمي الفعاليات في جميع أنحاء المملكة العربية السعودية بتقنية تجعل التسجيل والاعتماد وإدارة الحضور سلسة واحترافية.</p>
                <p className="svcx-sub">نحن لا نبيع برمجيات وننسحب. يبقى فريقنا حاضراً من أول محادثة وحتى يوم الفعالية، لإدارة طباعة الشارات وتسجيل الدخول والدعم الميداني، ليتفرغ المنظمون للفعالية نفسها لا للتقنية التي خلفها.</p>
              </div>
              <div className="svcx-media svcx-media-bare"><MissionVisual locale="ar" /></div>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section className="svcx" id="vision">
          <div className="svcx-in">
            <div className="svcx-row flip">
              <div className="svcx-copy">
                <p className="sey">إلى أين نتجه</p>
                <h2 className="st2">رؤيتنا</h2>
                <p className="svcx-sub">أن نكون الشريك التقني الأكثر ثقة للفعاليات في المملكة، ندفع الابتكار والتحول الرقمي في طريقة التخطيط للفعاليات وتنفيذها وتجربتها في جميع أنحاء السعودية.</p>
                <p className="svcx-sub">وهذا يعني أدوات تعمل بنفس الكفاءة في الرياض والدمام، يدعمها فريق محلي يفهم كيف تُدار الفعاليات فعلياً على أرض الواقع، سواء في المؤتمرات أو المعارض أو الفعاليات المؤسسية أو البرامج الحكومية.</p>
              </div>
              <div className="svcx-media svcx-media-bare"><VisionVisual locale="ar" /></div>
            </div>
          </div>
        </section>

        {/* Vision 2030 alignment */}
        <section className="svcx v30band" id="vision2030">
          <div className="svcx-in" style={{ maxWidth: 760, textAlign: 'center' }}>
            <p className="sey" style={{ justifyContent: 'center' }}>التوافق الوطني</p>
            <h2 className="st2" style={{ textAlign: 'center' }}>متوافقون مع رؤية السعودية 2030</h2>
            <p className="svcx-sub" style={{ textAlign: 'center' }}>دعم مسيرة المملكة العربية السعودية نحو مجتمع حيوي واقتصاد متنوع من خلال تمكين فعاليات عالمية المستوى بخبرة محلية وابتكار وريادة إقليمية.</p>
          </div>
          <div style={{ maxWidth: 520, margin: '32px auto 0' }}>
            <Vision2030Visual locale="ar" />
          </div>
          <div className="svcx-in" style={{ maxWidth: 760, textAlign: 'center', margin: '28px auto 0' }}>
            <p className="svcx-sub" style={{ textAlign: 'center', marginBottom: 0 }}>كل مؤتمر ومعرض وحفل ندعمه يضيف إلى قطاع فعاليات متنامٍ في المملكة، وهو أحد الركائز التي تحددها رؤية 2030 كعنصر أساسي لمجتمع أكثر حيوية وتواصلاً واقتصاد أكثر تنوعاً وطموحاً.</p>
          </div>
        </section>

        {/* Story */}
        <section style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <p className="sey">قصتنا</p>
              <h2 className="st2">بُنيت في الرياض. صُممت للمملكة.</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 16, textAlign: 'justify' }}>
                بدأت زيماء بملاحظة واضحة. كان منظمو الفعاليات في المملكة العربية السعودية إما يعتمدون على موردين عالميين مكلفين أو يجمعون بين أدوات محلية متعددة لا تتواصل فيما بينها. لم يكن أي من الخيارين فعالاً.
              </p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 16, textAlign: 'justify' }}>
                بنينا زيماء لتكون النقيض. شركة واحدة. فريق واحد. منصة واحدة تتولى التسجيل وتسجيل الدخول والشارات والاعتماد والتذاكر والشهادات والتواصل والأمن. بإدارة متكاملة، ليتفرغ المنظم للفعالية نفسها.
              </p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, textAlign: 'justify' }}>
                نعتمد على تقنية QR كخيار أول بتصميمنا. تعمل رموز QR على كل جهاز، وتُطبع على كل شارة، ولا تتطلب أساور أو بطاقات خاصة. سريعة واقتصادية وموثوقة للمؤتمرات والمعارض والفعاليات المؤسسية بجميع أحجامها.
              </p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginTop: 16, textAlign: 'justify' }}>
                مقرنا الرئيسي في الرياض، وندير عمليات متكاملة في جميع أنحاء المملكة، مع تواجد ميداني في المنطقة الشرقية.
              </p>
            </div>
            <aside style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32, position: 'sticky', top: 100 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#00D4B4', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 20 }}>نظرة سريعة</div>
              {[
                { label: 'المقر الرئيسي', value: 'الرياض، المملكة العربية السعودية' },
                { label: 'العمليات', value: 'في جميع أنحاء المملكة، مع تواجد في المنطقة الشرقية' },
                { label: 'التركيز', value: 'المؤتمرات والمعارض والفعاليات المؤسسية' },
                { label: 'التقنية', value: 'تقنية QR أولاً، سريعة وموثوقة' },
                { label: 'النموذج', value: 'إدارة ميدانية متكاملة' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '14px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{item.value}</div>
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* Why QR */}
        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '80px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">خيارنا التقني</p>
            <h2 className="st2">لماذا نعتمد على QR</h2>
            <p className="sst">نعتمد QR كخيار افتراضي لأنه سريع ومرن ويعمل في كل مكان. إليكم ما يعنيه ذلك لفعاليتكم.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {[
                { icon: 'fa-bolt', title: 'تسجيل دخول أسرع', text: 'مسح رمز QR فوري بأي كاميرا هاتف ذكي. يتحرك الحضور عبر البوابة بسرعة دون تكوّن طوابير في يوم الفعالية.' },
                { icon: 'fa-dollar-sign', title: 'تكلفة أقل', text: 'تُطبع رموز QR على أي شارة من أي طابعة. دون الحاجة لبطاقات خاصة أو أجهزة إضافية، مما يقلل تكاليف تقنية الفعالية.' },
                { icon: 'fa-shield-halved', title: 'يعمل في كل مكان', text: 'رمز QR على الشارة بسيط وموثوق. يُمسح بالهواتف والأجهزة اللوحية وأجهزة المسح المخصصة، ويعمل طالما الشارة موجودة.' },
              ].map((c, i) => (
                <div key={i} className="pc">
                  <div className="pci"><i className={`fas ${c.icon}`} /></div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locations */}
        {locations.length > 0 && (
          <section style={{ padding: '80px 32px', maxWidth: 1200, margin: '0 auto' }}>
            <p className="sey">تواجدنا</p>
            <h2 className="st2">مقرنا في المملكة العربية السعودية</h2>
            <p className="sst">مقرنا الرئيسي في الرياض ونعمل في جميع أنحاء المملكة، مع تواجد ميداني في المنطقة الشرقية.</p>
            <div className="lgrid">
              {locations.map(l => (
                <div key={l.id} className="lc">
                  <i className="fas fa-map-marker-alt" />
                  <h3>{l.city}</h3>
                  <div className="cy">{l.country}</div>
                  <div className="lt">{l.type}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="zpattern" style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>مستعدون للعمل معنا؟</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>أخبرنا عن فعاليتك القادمة وسنتولى الباقي.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/ar/contact" className="bg"><i className="fas fa-paper-plane" /> تواصل معنا</a>
            <a href="/profile" className="bg-profile"><i className="fas fa-file-lines" /> عرض ملف الشركة</a>
            <a href="/ar/services" className="bgh"><i className="fas fa-arrow-right" /> استعرض خدماتنا</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="fbot" style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 32px' }}>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>2025 زيماء. جميع الحقوق محفوظة.</span>
          <a href="/ar" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>العودة للرئيسية</a>
        </div>
      </footer>
      <Footer locale="ar" />
    </div>
  );
}
