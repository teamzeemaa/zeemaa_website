import { LogoIcon, LogoText } from './Logo';

export default function Footer() {
  return (
    <footer>
      <div className="fgrid">
        <div>
          <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:16}}>
            <LogoIcon height={28}/>
            <span style={{fontWeight:700,fontSize:16}}>Zeemaa</span>
          </div>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.35)',lineHeight:1.75,marginBottom:20,maxWidth:280}}>
            Event technology solutions for Saudi Arabia. Registration, accreditation, badges, certificates, ticketing, and on-site support.
          </p>
          <div style={{display:'flex',gap:8}}>
            <a href="https://www.linkedin.com/company/zeemaa" target="_blank" rel="noopener noreferrer" className="sic"><i className="fab fa-linkedin-in"/></a>
            <a href="https://www.instagram.com/zeemaa.ksa" target="_blank" rel="noopener noreferrer" className="sic"><i className="fab fa-instagram"/></a>
          </div>
        </div>
        <div>
          <div className="ftitle">Platform</div>
          <a className="flink" href="/services">Registration System</a>
          <a className="flink" href="/services">Badge Printing</a>
          <a className="flink" href="/services">Certificate Generator</a>
          <a className="flink" href="/services">QR Check-in</a>
          <a className="flink" href="/services">Payment Integration</a>
        </div>
        <div>
          <div className="ftitle">Company</div>
          <a className="flink" href="/">Home</a>
          <a className="flink" href="/about">About</a>
          <a className="flink" href="/services">Services</a>
          <a className="flink" href="/industries">Industries</a>
          <a className="flink" href="/profile">Company Profile</a>
          <a className="flink" href="/contact">Contact</a>
        </div>
        <div>
          <div className="ftitle">Contact</div>
          <div className="flink"><i className="fas fa-phone" style={{color:'#D4AF37',marginRight:8,fontSize:11}}/> +966 55 299 5295</div>
          <div className="flink"><i className="fas fa-envelope" style={{color:'#D4AF37',marginRight:8,fontSize:11}}/> hello@zeemaa.com</div>
          <div style={{marginTop:16}}>
            <div className="ftitle">Offices</div>
            <div className="flink">Riyadh, KSA (HQ)</div>
            <div className="flink">Dammam, KSA</div>
          </div>
        </div>
      </div>
      <div className="fbot">
        <span>2025 Zeemaa. All rights reserved.</span>
        <div style={{display:'flex',gap:16}}>
          <a className="flink" href="/privacy-policy" style={{margin:0}}>Privacy Policy</a>
          <a className="flink" href="/terms-of-service" style={{margin:0}}>Terms</a>
        </div>
      </div>
    </footer>
  );
}
