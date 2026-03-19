'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ─── Icon Components ───────────────────────────────────────────────────────────

const IconCode = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth={2} fill="none">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth={2} fill="none">
    <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
const IconBrain = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth={2} fill="none">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44L7 20H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44L17 20h3a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.5z" />
  </svg>
);
const IconCloud = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth={2} fill="none">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);
const IconSun = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth={2} fill="none">
    <circle cx="12" cy="12" r="3" />
    <path d="M2 12h3M19 12h3M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
  </svg>
);
const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth={2} fill="none">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const IconZap = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" stroke="currentColor" strokeWidth={2} fill="none">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" stroke="currentColor" strokeWidth={2} fill="none">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconFolder = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" stroke="currentColor" strokeWidth={2} fill="none">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);
const IconAward = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" stroke="currentColor" strokeWidth={2} fill="none">
    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" stroke="currentColor" strokeWidth={2} fill="none">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth={2.5} fill="none">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconDiagArrow = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" stroke="white" strokeWidth={2.5} fill="none">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

const StepArrowSvg = () => (
  <svg viewBox="0 0 52 30" width="52" height="30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
    <path d="M2 15 Q26 15 46 15" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" />
    <polyline points="40,8 50,15 40,22" stroke="#0ea5e9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Course {
  icon: React.ReactNode;
  iconKey: string;
  slug: string;
  title: string;
  desc: string;
  details: {
    overview: string;
    whatYouWillLearn: string[];
    whoIsThisFor: string[];
  };
  delay: string;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: string;
}

interface Step {
  num: string;
  title: string;
  desc: string;
  hasArrow: boolean;
  delay: string;
}

interface Testimonial {
  initials: string;
  avatarBg?: string;
  text: string;
  name: string;
  role: string;
  featured?: boolean;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const iconKeyToIcon: Record<string, React.ReactNode> = {
  code: <IconCode />,
  phone: <IconPhone />,
  brain: <IconBrain />,
  cloud: <IconCloud />,
  sun: <IconSun />,
  briefcase: <IconBriefcase />,
};

function mapDbCourseToCourse(dbCourse: any, index: number): Course {
  const delay = `${Math.min(0.05 * (index + 1), 0.5)}s`;
  return {
    iconKey: String(dbCourse.iconKey || ''),
    icon: iconKeyToIcon[String(dbCourse.iconKey || '')] ?? <IconCode />,
    slug: String(dbCourse.slug || ''),
    title: String(dbCourse.title || ''),
    desc: String(dbCourse.desc || ''),
    details: {
      overview: String(dbCourse.details?.overview || ''),
      whatYouWillLearn: Array.isArray(dbCourse.details?.whatYouWillLearn)
        ? dbCourse.details.whatYouWillLearn.map(String)
        : [],
      whoIsThisFor: Array.isArray(dbCourse.details?.whoIsThisFor)
        ? dbCourse.details.whoIsThisFor.map(String)
        : [],
    },
    delay,
  };
}

const BENEFITS: Benefit[] = [
  { icon: <IconZap />, title: 'Real Industry Projects', desc: 'Work on live projects used by actual clients and learn real-world development practices that matter.', delay: '0.1s' },
  { icon: <IconUsers />, title: 'Developer Mentorship', desc: 'Get guided by experienced professionals who help you overcome challenges and grow your skills.', delay: '0.2s' },
  { icon: <IconFolder />, title: 'Portfolio Development', desc: 'Build impressive projects that showcase your skills to future employers and stand out in interviews.', delay: '0.3s' },
  { icon: <IconAward />, title: 'Internship Certificate', desc: 'Earn recognized certifications that validate your expertise and open doors to new opportunities.', delay: '0.4s' },
  { icon: <IconTarget />, title: 'Job Preparation Guidance', desc: 'Career coaching, interview preparation, and placement assistance from our expert team.', delay: '0.5s' },
];

const STEPS: Step[] = [
  { num: '01', title: 'Enroll', desc: 'Choose your program and complete enrollment. Our team guides you through onboarding.', hasArrow: true, delay: '0.1s' },
  { num: '02', title: 'Learn', desc: 'Attend live sessions, access recorded content and work through structured modules.', hasArrow: true, delay: '0.2s' },
  { num: '03', title: 'Build Projects', desc: 'Work on real client projects under mentorship and build a strong professional portfolio.', hasArrow: true, delay: '0.3s' },
  { num: '04', title: 'Get Certified', desc: 'Complete your internship, receive your certificate and get full job placement support.', hasArrow: false, delay: '0.4s' },
];

const TESTIMONIALS_BASE: Testimonial[] = [
  { initials: 'AK', text: 'The web development training program was exactly what I needed. Projects were real and challenging, and mentors were always available. I landed a job within 2 months.', name: 'Arjun Kumar', role: 'Frontend Developer at TechCorp' },
  { initials: 'PS', avatarBg: '#1a1a2e', text: 'The AI training program opened a completely new world for me. Within 6 months I went from zero coding knowledge to building machine learning models. Truly transformative.', name: 'Priya Sharma', role: 'ML Engineer at DataFlow Inc.', featured: true },
  { initials: 'MR', text: 'Best investment I made in my career. The internship certificate and portfolio I built helped me stand out in every interview. Job placement guidance was invaluable.', name: 'Mohammed Rashid', role: 'Full Stack Developer' },
  { initials: 'SA', avatarBg: '#0284c7', text: 'The Cloud Computing module was incredibly well-structured. I passed my AWS exam first attempt and now manage infrastructure for a fintech startup. Amazing!', name: 'Sara Al-Amin', role: 'Cloud Engineer at FinStack' },
  { initials: 'NK', avatarBg: '#7c3aed', text: 'As a designer, I was hesitant about a tech program. The UI/UX training program was perfect — practical, industry-focused, and mentors really understood the design process.', name: 'Neha Kulkarni', role: 'Product Designer at Zomato' },
  { initials: 'RP', avatarBg: '#059669', text: 'I completed the mobile app internship and my Flutter app is now live on the Play Store. The real-project experience made all the difference in my interviews.', name: 'Rahul Patil', role: 'Flutter Developer at AppVentures' },
];

const TESTIMONIALS = [...TESTIMONIALS_BASE, ...TESTIMONIALS_BASE];

const MARQUEE_ITEMS = ['Web Development', 'Mobile Apps', 'Artificial Intelligence', 'Cloud Computing', 'UI/UX Design', 'Software Internship'];

// ─── Hooks ─────────────────────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function useCounterAnimation(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = target / 55;
    const iv = setInterval(() => {
      current = Math.min(current + step, target);
      setValue(Math.floor(current));
      if (current >= target) clearInterval(iv);
    }, 20);
    return () => clearInterval(iv);
  }, [active, target]);

  return value;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function HeroStats() {
  const { ref, visible } = useScrollReveal(0.4);
  const s1 = useCounterAnimation(500, visible);
  const s2 = useCounterAnimation(6, visible);
  const s3 = useCounterAnimation(95, visible);

  return (
    <div ref={ref} className="hero-stats" style={styles.heroStats}>
      <div className="stat-item" style={styles.statItem}>
        <span style={styles.statNum}>{s1}+</span>
        <span style={styles.statLabel}>Students Enrolled</span>
      </div>
      <div className="stat-item" style={{ ...styles.statItem, ...styles.statItemBorder }}>
        <span style={styles.statNum}>{s2}</span>
        <span style={styles.statLabel}>Programs Available</span>
      </div>
      <div className="stat-item" style={{ ...styles.statItem, ...styles.statItemBorder }}>
        <span style={styles.statNum}>{s3}%</span>
        <span style={styles.statLabel}>Placement Rate</span>
      </div>
    </div>
  );
}

function RevealDiv({ children, style, threshold = 0.1 }: { children: React.ReactNode; style?: React.CSSProperties; threshold?: number }) {
  const { ref, visible } = useScrollReveal(threshold);
  return (
    <div ref={ref} style={{ ...styles.reveal, ...(visible ? styles.revealVisible : {}), ...style }}>
      {children}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const { ref, visible } = useScrollReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.courseCard,
        ...(visible ? styles.courseCardVisible : {}),
        transitionDelay: course.delay,
        ...(hovered ? styles.courseCardHover : {}),
      }}
    >
      <div style={{ ...styles.cardArrow, ...(hovered ? styles.cardArrowVisible : {}) }}>
        <IconDiagArrow />
      </div>
      <div style={{ ...styles.cardIconWrap, ...(hovered ? styles.cardIconWrapHover : {}) }}>
        <span style={{ color: hovered ? 'white' : '#0ea5e9', transition: 'color 0.3s', display: 'flex' }}>
          {course.icon}
        </span>
      </div>
      <h3 style={styles.cardTitle}>{course.title}</h3>
      <p style={styles.cardDesc}>{course.desc}</p>
      <Link href={`/it-courses/${course.slug}`} style={styles.cardLink}>
        Learn More <IconArrow />
      </Link>
    </div>
  );
}

function BenefitItem({ benefit }: { benefit: Benefit }) {
  const { ref, visible } = useScrollReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.benefitItem,
        ...(visible ? styles.benefitItemVisible : {}),
        transitionDelay: benefit.delay,
      }}
    >
      <div style={{ ...styles.benefitIcon, ...(hovered ? styles.benefitIconHover : {}) }}>
        <span style={{ color: hovered ? 'white' : '#0ea5e9', transition: 'color 0.3s', display: 'flex' }}>
          {benefit.icon}
        </span>
      </div>
      <div>
        <h4 style={styles.benefitTitle}>{benefit.title}</h4>
        <p style={styles.benefitDesc}>{benefit.desc}</p>
      </div>
    </div>
  );
}

function StepItem({ step }: { step: Step }) {
  const { ref, visible } = useScrollReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.stepItem,
        ...(visible ? styles.stepItemVisible : {}),
        transitionDelay: step.delay,
      }}
    >
      {step.hasArrow && (
        <div style={styles.stepArrowWrap} className="step-arrow-wrap">
          <StepArrowSvg />
        </div>
      )}
      <div style={{
        ...styles.stepCircle,
        ...(hovered ? styles.stepCircleHover : {}),
      }}>
        <span style={{ ...styles.stepNum, ...(hovered ? styles.stepNumHover : {}) }}>
          {step.num}
        </span>
      </div>
      <h4 style={styles.stepTitle}>{step.title}</h4>
      <p style={styles.stepDesc}>{step.desc}</p>
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="testimonial-card"
      style={{
        ...styles.testimonialCard,
        ...(t.featured ? styles.testimonialCardFeatured : {}),
        ...(hovered ? styles.testimonialCardHover : {}),
      }}
    >
      <div style={styles.quoteMark}>&ldquo;</div>
      <p style={styles.testimonialText}>{t.text}</p>
      <div style={styles.testimonialAuthor}>
        <div style={{ ...styles.authorAvatar, background: t.avatarBg || '#0ea5e9' }}>
          {t.initials}
        </div>
        <div>
          <div style={styles.authorName}>{t.name}</div>
          <div style={styles.authorRole}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────────

function EnquiryModal({ open, onClose, courses }: { open: boolean; onClose: () => void; courses: Course[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [courseOfInterest, setCourseOfInterest] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  async function handleSubmit() {
    if (isSubmitting) return;
    setError(null);

    if (!fullName || !emailAddress || !phoneNumber || !courseOfInterest) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch('/api/internship-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, emailAddress, phoneNumber, courseOfInterest, message })
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || 'Failed to submit application');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFullName(''); setEmailAddress(''); setPhoneNumber('');
        setCourseOfInterest(''); setMessage('');
        onClose();
      }, 1800);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div style={styles.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={styles.modal} className="modal-card">
        <button style={styles.modalClose} onClick={onClose}>✕</button>
        <h2 style={styles.modalTitle} className="modal-title">Apply Now</h2>
        <p style={styles.modalSub}>IT Industrial Training &amp; Internship Program — Fill in your details and we&apos;ll get back to you within 24 hours.</p>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Full Name</label>
          <input style={styles.formControl} type="text" placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Email Address</label>
          <input style={styles.formControl} type="email" placeholder="your@email.com" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Phone Number</label>
          <input style={styles.formControl} type="tel" placeholder="+91 00000 00000" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Program of Interest</label>
          <select style={styles.formControl} value={courseOfInterest} onChange={(e) => setCourseOfInterest(e.target.value)}>
            <option value="">Select a program...</option>
            {courses.map(c => <option key={c.slug}>{c.title}</option>)}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Message (Optional)</label>
          <textarea style={{ ...styles.formControl, resize: 'vertical' }} rows={3} placeholder="Tell us about your goals..." value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        {error && (
          <div style={{ marginTop: 8, color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', padding: '10px 12px', borderRadius: 8, fontSize: '0.85rem', lineHeight: 1.4 }}>
            {error}
          </div>
        )}
        <button
          style={{ ...styles.formSubmit, ...(submitted ? { background: '#22c55e' } : {}) }}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {submitted ? '✓ Application Submitted!' : isSubmitting ? 'Submitting...' : 'Submit Application →'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ITCoursesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json().catch(() => null);
        const list = Array.isArray(data?.data) ? data.data : [];
        const mapped = list.map((c: any, idx: number) => mapDbCourseToCourse(c, idx));
        if (mounted) setCourses(mapped);
      } catch {
        if (mounted) setCourses([]);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#fff', color: '#0a0a0a', overflowX: 'hidden' }}>
      <style>{globalStyles}</style>

      {/* ── HERO ── */}
      <section style={{ ...styles.hero, minHeight: '80vh', display: 'flex', alignItems: 'center' }} className="hero-section">
        <div style={styles.heroOrb1} />
        <div style={styles.heroOrb2} />
        <div style={{ ...styles.container, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 2 }} className="container-pad">
          {/* Left Content */}
          <div style={styles.heroContent}>
            <div style={styles.heroBadge} className="hero-badge">
              <span style={styles.heroBadgeDot} className="pulse-dot" />
              Enroll &amp; Get Certified
            </div>
            <h1 style={styles.heroH1} className="hero-h1 fade-up-1">
              IT Industrial Training &amp;<br /><em style={{ color: '#0ea5e9', fontStyle: 'normal' }}>Internship</em> Program
            </h1>
            <p style={styles.heroSub} className="hero-sub fade-up-2">
              Learn Web Development, Mobile Apps, Artificial Intelligence and Cloud Computing with real industry projects and expert mentorship.
            </p>
            <div style={styles.heroActions} className="hero-actions fade-up-3">
              <PrimaryButton onClick={() => setModalOpen(true)}>
                Apply for Internship <span>→</span>
              </PrimaryButton>
              <a href="#courses" style={styles.btnSecondary} className="btn-secondary">Explore Programs ↓</a>
            </div>
            <HeroStats />
          </div>
          
          {/* Right Image */}
          <div style={{
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(14,165,233,0.15)',
            width: '100%',
            aspectRatio: '4/3'
          }}>
            <img
              src="/intern2.png"
              alt="IT Internship Program Hero"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
      </section>


      {/* ── MARQUEE ── */}
      <div style={styles.marqueeSection}>
        <div style={styles.marqueeTrack} className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={styles.marqueeItem} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* ── COURSES ── */}
      <section style={styles.coursesSection} id="courses" className="section-padded">
        <div style={styles.container} className="container-pad">
          <RevealDiv style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={styles.sectionLabel}>What We Offer</span>
            <h2 style={styles.sectionTitle} className="section-title">Explore Our Training Programs</h2>
            <p style={{ ...styles.sectionSub, margin: '0 auto' }}>
              Choose from our comprehensive range of training and internship programs and start your learning journey with real mentorship today.
            </p>
          </RevealDiv>
          {courses.length > 0 ? (
            <div style={styles.coursesGrid} className="courses-grid">
              {courses.map((c) => <CourseCard key={c.slug} course={c} />)}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#6c757d' }}>No programs found.</p>
          )}
        </div>
      </section>

      {/* ── INTERNSHIP & TRAINING ── */}
      <section style={styles.programsSection} className="section-padded">
        <div style={styles.container} className="container-pad">
          <RevealDiv style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={styles.sectionLabel}>Our Programs</span>
            <h2 style={styles.sectionTitle} className="section-title">Internship &amp;<br />Training Experience</h2>
            <p style={{ ...styles.sectionSub, margin: '0 auto' }}>
              Structured pathways to build real skills through mentored projects and hands-on experience.
            </p>
          </RevealDiv>
          <div style={styles.programsGrid}>
            <div style={{ ...styles.programCard, borderRadius: 16, background: 'white', border: '1px solid #e9ecef', overflow: 'hidden', transition: 'all 0.4s ease', opacity: 1, transform: 'translateY(0)' }}>
              <div style={styles.programImageWrap}>
                <img
                  src="/internship.png"
                  alt="IT Internship Program"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <h3 style={styles.programCardTitle}>Internship Program</h3>
              <p style={styles.programCardDesc}>
                Get hands-on experience with real client projects. Work under expert mentorship, build your portfolio, and earn a recognized internship certificate while preparing for your first job.
              </p>
            </div>
            <div style={{ ...styles.programCard, borderRadius: 16, background: 'white', border: '1px solid #e9ecef', overflow: 'hidden', transition: 'all 0.4s ease', opacity: 1, transform: 'translateY(0)' }}>
              <div style={styles.programImageWrap}>
                <img
                  src="/training.png"
                  alt="IT Training Program"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <h3 style={styles.programCardTitle}>Training Program</h3>
              <p style={styles.programCardDesc}>
                Master the latest technologies through structured training modules. Our comprehensive curriculum covers everything from fundamentals to advanced topics with live sessions and practical labs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={styles.benefitsSection} className="section-padded">
        <div style={styles.container} className="container-pad">
          <div style={styles.benefitsLayout} className="benefits-layout">
            <div style={styles.benefitsLeft} className="benefits-sticky">
              <RevealDiv>
                <span style={styles.sectionLabel}>Why Choose Us</span>
                <h2 style={styles.sectionTitle} className="section-title">Our Internship<br />Program Benefits</h2>
                <p style={styles.sectionSub}>
                  Transform your theoretical knowledge into practical experience with our comprehensive program.
                </p>
              </RevealDiv>
              <div style={styles.benefitsVisual} className="benefits-visual">
                <div style={styles.benefitsVisualBg} />
                <div style={styles.benefitsVisualCounter}>
                  5+<small style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 400, opacity: 0.8, marginTop: 3 }}>Key Benefits</small>
                </div>
                <div style={{ position: 'relative', color: 'white' }}>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Trusted by students across
                  </p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.7rem', fontWeight: 800 }}>
                    India
                  </h3>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {BENEFITS.map((b) => <BenefitItem key={b.title} benefit={b} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section style={styles.stepsSection} className="section-padded">
        <div style={styles.container} className="container-pad">
          <RevealDiv style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={styles.sectionLabel}>How It Works</span>
            <h2 style={styles.sectionTitle} className="section-title">Follow Our Proven Process</h2>
            <p style={{ ...styles.sectionSub, margin: '0 auto' }}>
              Four simple steps to become a skilled, job-ready developer in the technology industry.
            </p>
          </RevealDiv>
          <div style={styles.stepsGrid} className="steps-grid">
            {STEPS.map((s) => <StepItem key={s.num} step={s} />)}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={styles.testimonialsSection} className="testimonials-section">
        <div style={styles.container} className="container-pad">
          <RevealDiv style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={styles.sectionLabel}>Student Stories</span>
            <h2 style={styles.sectionTitle} className="section-title">Voices From Our Students</h2>
            <p style={{ ...styles.sectionSub, margin: '0 auto' }}>
              Hear from students who transformed their careers through our program. Hover to pause.
            </p>
          </RevealDiv>
        </div>
        <div style={styles.testimonialsTrackWrap}>
          <div style={styles.testimonialsTrack} className="testimonials-track">
            {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={styles.ctaSection} className="cta-section">
        <div style={styles.ctaBg} />
        <div style={{ ...styles.container, textAlign: 'center', position: 'relative' }} className="container-pad">
          <span style={{ ...styles.sectionLabel, color: 'rgba(255,255,255,0.4)' }}>Start Today</span>
          <h2 style={{ ...styles.sectionTitle, color: 'white', maxWidth: 560, margin: '0 auto 14px' }} className="section-title">
            Launch Your IT Career<br />With AL-MAWA
          </h2>
          <p style={{ ...styles.sectionSub, color: 'rgba(255,255,255,0.55)', maxWidth: 440, margin: '0 auto 36px' }}>
            Join hundreds of students who have successfully transformed their careers through our courses and internship program.
          </p>
          <div style={styles.ctaActions} className="cta-actions">
            <PrimaryButton onClick={() => setModalOpen(true)} light>Apply Now →</PrimaryButton>
            <a href="#courses" style={styles.ctaOutline} className="cta-outline">View All Courses</a>
          </div>
        </div>
      </section>

      <EnquiryModal open={modalOpen} onClose={() => setModalOpen(false)} courses={courses} />
    </div>
  );
}

// ─── Button Helper ─────────────────────────────────────────────────────────────

function PrimaryButton({ children, onClick, light }: { children: React.ReactNode; onClick?: () => void; light?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: light ? (hovered ? '#0ea5e9' : 'white') : (hovered ? '#0ea5e9' : '#0a0a0a'),
        color: light ? '#0a0a0a' : 'white',
        padding: '14px 30px', borderRadius: 8,
        fontWeight: 700, fontSize: '0.92rem',
        border: 'none', cursor: 'pointer',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 10px 28px rgba(14,165,233,0.35)' : 'none',
        transition: 'all 0.3s',
        fontFamily: "'DM Sans', sans-serif",
        width: '100%',
        maxWidth: 260,
      }}
    >
      {children}
    </button>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  hero: {
    minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#f8f9fa', position: 'relative', overflow: 'hidden', padding: '100px 24px 80px',
  },
  heroOrb1: {
    position: 'absolute', borderRadius: '50%', filter: 'blur(100px)',
    width: 480, height: 480, background: 'rgba(14,165,233,0.12)', top: -120, right: -80,
    pointerEvents: 'none',
  },
  heroOrb2: {
    position: 'absolute', borderRadius: '50%', filter: 'blur(100px)',
    width: 360, height: 360, background: 'rgba(59,130,246,0.09)', bottom: -60, left: -60,
    pointerEvents: 'none',
  },
  heroContent: { position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 860, width: '100%' },
  heroBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'white', border: '1px solid #e9ecef',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    color: '#0ea5e9', padding: '8px 20px', borderRadius: 100,
    fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.09em',
    textTransform: 'uppercase', marginBottom: 28,
  },
  heroBadgeDot: {
    width: 6, height: 6, background: '#0ea5e9', borderRadius: '50%', display: 'inline-block',
  },
  heroH1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.4rem, 6vw, 5rem)',
    fontWeight: 900, color: '#0a0a0a', lineHeight: 1.07, marginBottom: 22,
  },
  heroSub: {
    fontSize: '1.05rem', color: '#6c757d',
    maxWidth: 580, margin: '0 auto 38px', lineHeight: 1.75,
  },
  heroActions: { display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' },
  btnSecondary: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    background: 'white', color: '#0a0a0a',
    padding: '13px 30px', borderRadius: 8,
    fontWeight: 600, fontSize: '0.92rem',
    border: '1.5px solid #e9ecef', cursor: 'pointer',
    transition: 'all 0.3s', textDecoration: 'none',
  },
  heroStats: {
    display: 'flex', justifyContent: 'center',
    marginTop: 60, paddingTop: 40,
    borderTop: '1px solid #e9ecef',
  },
  statItem: { textAlign: 'center', padding: '0 40px' },
  statItemBorder: { borderLeft: '1px solid #e9ecef' },
  statNum: {
    fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 900,
    color: '#0a0a0a', display: 'block',
  },
  statLabel: {
    fontSize: '0.78rem', color: '#6c757d', textTransform: 'uppercase',
    letterSpacing: '0.06em', marginTop: 4, display: 'block',
  },

  marqueeSection: { padding: '24px 0', background: '#0ea5e9', overflow: 'hidden' },
  marqueeTrack: { display: 'flex', whiteSpace: 'nowrap' },
  marqueeItem: {
    flexShrink: 0, padding: '0 36px',
    fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'white', opacity: 0.88,
    display: 'inline-flex', alignItems: 'center', gap: 16,
  },

  container: { maxWidth: 1100, margin: '0 auto' },
  sectionLabel: {
    display: 'inline-block', fontSize: '0.72rem', fontWeight: 700,
    letterSpacing: '0.13em', textTransform: 'uppercase', color: '#0ea5e9', marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.7rem, 3.5vw, 2.8rem)',
    fontWeight: 800, color: '#0a0a0a', lineHeight: 1.18, marginBottom: 14,
  },
  sectionSub: { fontSize: '0.97rem', color: '#6c757d', maxWidth: 500, lineHeight: 1.75 },

  reveal: { opacity: 0, transform: 'translateY(28px)', transition: 'all 0.6s ease' },
  revealVisible: { opacity: 1, transform: 'translateY(0)' },

  coursesSection: { background: '#f8f9fa', padding: '96px 24px' },
  coursesGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 22,
  },
  courseCard: {
    background: 'white', borderRadius: 16, border: '1px solid #e9ecef',
    padding: '34px 30px', position: 'relative', overflow: 'hidden', cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
    opacity: 0, transform: 'translateY(36px)',
  },
  courseCardVisible: { opacity: 1, transform: 'translateY(0)' },
  courseCardHover: {
    borderColor: '#0ea5e9', transform: 'translateY(-7px)',
    boxShadow: '0 18px 44px rgba(14,165,233,0.13)',
  },
  cardArrow: {
    position: 'absolute', top: 22, right: 22, width: 30, height: 30, borderRadius: '50%',
    background: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center',
    opacity: 0, transform: 'translate(6px,-6px)', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
  },
  cardArrowVisible: { opacity: 1, transform: 'translate(0,0)' },
  cardIconWrap: {
    width: 52, height: 52, borderRadius: 12, background: '#e0f2fe',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 22, transition: 'all 0.3s',
  },
  cardIconWrapHover: { background: '#0ea5e9' },
  cardTitle: {
    fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700,
    marginBottom: 10, color: '#0a0a0a',
  },
  cardDesc: { fontSize: '0.86rem', color: '#6c757d', lineHeight: 1.7, marginBottom: 22 },
  cardLink: {
    display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0ea5e9',
    fontSize: '0.83rem', fontWeight: 600, textDecoration: 'none',
  },

  programsSection: { background: 'white', padding: '96px 24px' },
  programsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 48,
  },
  programCard: {
    background: 'white', borderRadius: 16, overflow: 'hidden',
    border: '1px solid #e9ecef', transition: 'all 0.4s ease',
    opacity: 0, transform: 'translateY(28px)',
  },
  programCardVisible: { opacity: 1, transform: 'translateY(0)' },
  programImageWrap: { minHeight: 280, overflow: 'hidden', background: '#f0f3f7', position: 'relative', width: '100%' },
  programCardTitle: {
    fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 700,
    color: '#0a0a0a', padding: '28px 28px 12px', marginBottom: 0,
  },
  programCardDesc: {
    fontSize: '0.88rem', color: '#6c757d', lineHeight: 1.75,
    padding: '0 28px 28px', margin: 0,
  },

  benefitsSection: { background: '#f8f9fa', padding: '96px 24px' },
  benefitsLayout: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start',
  },
  benefitsLeft: { position: 'sticky', top: 40 },
  benefitsVisual: {
    background: '#0a0a0a', borderRadius: 18, padding: 44,
    position: 'relative', overflow: 'hidden', minHeight: 300,
    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginTop: 28,
  },
  benefitsVisualBg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 20% 80%, rgba(14,165,233,0.28) 0%, transparent 60%)',
  },
  benefitsVisualCounter: {
    position: 'absolute', top: 28, right: 28, background: '#0ea5e9', color: 'white',
    fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 900,
    padding: '14px 20px', borderRadius: 10, lineHeight: 1,
  },
  benefitItem: {
    display: 'flex', gap: 18, padding: '26px 0',
    borderBottom: '1px solid #e9ecef',
    opacity: 0, transform: 'translateX(28px)', transition: 'all 0.5s ease',
  },
  benefitItemVisible: { opacity: 1, transform: 'translateX(0)' },
  benefitIcon: {
    width: 42, height: 42, flexShrink: 0, borderRadius: 10,
    background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.3s',
  },
  benefitIconHover: { background: '#0ea5e9' },
  benefitTitle: { fontSize: '0.93rem', fontWeight: 600, color: '#0a0a0a', marginBottom: 4 },
  benefitDesc: { fontSize: '0.84rem', color: '#6c757d', lineHeight: 1.65 },

  stepsSection: { background: '#f8f9fa', padding: '96px 24px' },
  stepsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, alignItems: 'start',
  },
  stepItem: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', padding: '0 10px',
    opacity: 0, transform: 'translateY(28px)', transition: 'all 0.5s ease',
    position: 'relative', zIndex: 1,
  },
  stepItemVisible: { opacity: 1, transform: 'translateY(0)' },
  stepArrowWrap: {
    position: 'absolute', top: 33, right: -26, zIndex: 2,
    width: 52, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  stepCircle: {
    width: 90, height: 90, borderRadius: '50%',
    background: 'white', border: '2.5px solid #0ea5e9',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 20, transition: 'all 0.4s',
  },
  stepCircleHover: {
    background: '#0ea5e9', borderColor: '#0ea5e9',
    boxShadow: '0 0 0 10px rgba(14,165,233,0.1)', transform: 'scale(1.07)',
  },
  stepNum: {
    fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 900,
    color: '#0ea5e9', transition: 'color 0.3s',
  },
  stepNumHover: { color: 'white' },
  stepTitle: { fontSize: '0.93rem', fontWeight: 600, color: '#0a0a0a', marginBottom: 8 },
  stepDesc: { fontSize: '0.79rem', color: '#6c757d', lineHeight: 1.65 },

  testimonialsSection: { background: 'white', padding: '96px 0 0' },
  testimonialsTrackWrap: {
    overflow: 'hidden', padding: '8px 0 52px',
    WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
    maskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
  },
  testimonialsTrack: { display: 'flex', gap: 24, width: 'max-content' },
  testimonialCard: {
    background: '#f8f9fa', borderRadius: 16, border: '1px solid #e9ecef',
    padding: '30px 28px', width: 340, flexShrink: 0,
    transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
  },
  testimonialCardFeatured: { borderColor: '#0ea5e9', background: 'white' },
  testimonialCardHover: {
    borderColor: '#0ea5e9', boxShadow: '0 10px 30px rgba(14,165,233,0.1)',
    transform: 'translateY(-4px)',
  },
  quoteMark: {
    fontFamily: "'Playfair Display', serif", fontSize: '4rem', color: '#0ea5e9',
    opacity: 0.14, lineHeight: 0.7, marginBottom: 14,
  },
  testimonialText: {
    fontSize: '0.875rem', color: '#6c757d', lineHeight: 1.78,
    marginBottom: 22, fontStyle: 'italic',
  },
  testimonialAuthor: { display: 'flex', alignItems: 'center', gap: 12 },
  authorAvatar: {
    width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
    background: '#0ea5e9', color: 'white',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: '0.8rem',
  },
  authorName: { fontWeight: 600, fontSize: '0.85rem', color: '#0a0a0a' },
  authorRole: { fontSize: '0.73rem', color: '#6c757d' },

  ctaSection: {
    background: '#0a0a0a', color: 'white', textAlign: 'center',
    position: 'relative', overflow: 'hidden', padding: '96px 24px',
  },
  ctaBg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 50% 110%, rgba(14,165,233,0.22), transparent 60%)',
    pointerEvents: 'none',
  },
  ctaActions: { display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' },
  ctaOutline: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    background: 'transparent', color: 'white',
    padding: '13px 30px', borderRadius: 8,
    fontWeight: 600, fontSize: '0.92rem',
    border: '1.5px solid rgba(255,255,255,0.28)', cursor: 'pointer',
    transition: 'all 0.3s', textDecoration: 'none',
  },

  modalOverlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
    backdropFilter: 'blur(6px)', zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 24,
  },
  modal: {
    background: 'white', borderRadius: 20, padding: 44,
    maxWidth: 500, width: '100%', position: 'relative',
    maxHeight: '90vh', overflowY: 'auto',
  },
  modalClose: {
    position: 'absolute', top: 18, right: 18, width: 34, height: 34,
    borderRadius: '50%', border: '1px solid #e9ecef',
    background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.1rem', color: '#6c757d',
  },
  modalTitle: {
    fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 800, marginBottom: 6,
  },
  modalSub: { fontSize: '0.85rem', color: '#6c757d', marginBottom: 28, lineHeight: 1.6 },
  formGroup: { marginBottom: 18 },
  formLabel: { display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#0a0a0a', marginBottom: 6 },
  formControl: {
    width: '100%', padding: '11px 14px', borderRadius: 8,
    border: '1px solid #e9ecef', fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem',
    color: '#0a0a0a', background: 'white', outline: 'none', boxSizing: 'border-box' as const,
  },
  formSubmit: {
    width: '100%', padding: 13, borderRadius: 8,
    background: '#0a0a0a', color: 'white', border: 'none',
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.93rem', fontWeight: 700,
    cursor: 'pointer', transition: 'all 0.3s', marginTop: 6,
  },
};

// ─── Global CSS ────────────────────────────────────────────────────────────────

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .hero-dot-grid::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
    background-size: 28px 28px;
    opacity: 0.5;
    pointer-events: none;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(1.6); }
  }
  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes scrollCards {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .fade-up-1 { animation: fadeUp 0.7s ease 0.12s both; }
  .fade-up-2 { animation: fadeUp 0.7s ease 0.24s both; }
  .fade-up-3 { animation: fadeUp 0.7s ease 0.36s both; }
  .pulse-dot { animation: pulseDot 2s infinite; }

  .marquee-track { animation: marqueeScroll 20s linear infinite; }
  .marquee-item::after { content: '  ✦  '; opacity: 0.45; }

  .testimonials-track { animation: scrollCards 32s linear infinite; }
  .testimonials-track:hover { animation-play-state: paused; }

  /* ── TABLET ≤ 1024px ── */
  @media (max-width: 1024px) {
    .hero-section {
      grid-template-columns: 1fr !important;
      gap: 40px !important;
    }
    .benefits-layout {
      grid-template-columns: 1fr !important;
      gap: 40px !important;
    }
    .benefits-sticky {
      position: static !important;
      top: auto !important;
    }
    .benefits-visual {
      min-height: 220px !important;
    }
    .courses-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .programs-grid {
      grid-template-columns: 1fr !important;
      gap: 32px !important;
    }
    .steps-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 48px 24px !important;
    }
    .step-arrow-wrap {
      display: none !important;
    }
  }

  /* ── MOBILE ≤ 640px ── */
  @media (max-width: 640px) {
    .hero-section > div {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
    }

    /* Hero */
    .hero-section {
      min-height: auto !important;
      padding: 90px 20px 60px !important;
    }
    .hero-h1 {
      font-size: 2rem !important;
      line-height: 1.14 !important;
    }
    .hero-sub {
      font-size: 0.9rem !important;
      margin-bottom: 26px !important;
    }
    .hero-badge {
      font-size: 0.65rem !important;
      padding: 6px 14px !important;
      margin-bottom: 20px !important;
    }
    .hero-actions {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 10px !important;
    }
    .hero-actions button,
    .hero-actions a,
    .btn-secondary {
      width: 100% !important;
      max-width: 100% !important;
      justify-content: center !important;
      text-align: center !important;
    }

    /* Stats */
    .hero-stats {
      flex-direction: column !important;
      margin-top: 36px !important;
      padding-top: 28px !important;
      gap: 0 !important;
    }
    .stat-item {
      padding: 14px 0 !important;
      border-left: none !important;
      border-top: 1px solid #e9ecef !important;
      width: 100% !important;
    }
    .stat-item:first-child {
      border-top: none !important;
    }

    /* Sections */
    .section-padded {
      padding: 60px 20px !important;
    }
    .container-pad {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    .section-title {
      font-size: 1.65rem !important;
    }

    /* Courses */
    .courses-grid {
      grid-template-columns: 1fr !important;
    }

    /* Programs */
    .programs-grid {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
    }

    /* Benefits */
    .benefits-layout {
      grid-template-columns: 1fr !important;
      gap: 28px !important;
    }
    .benefits-visual {
      min-height: 180px !important;
      padding: 28px !important;
      margin-top: 16px !important;
    }

    /* Steps */
    .steps-grid {
      grid-template-columns: 1fr !important;
      gap: 36px !important;
    }
    .step-arrow-wrap {
      display: none !important;
    }

    /* Testimonials */
    .testimonials-section {
      padding: 60px 0 0 !important;
    }
    .testimonial-card {
      width: 280px !important;
      padding: 22px 18px !important;
    }

    /* CTA */
    .cta-section {
      padding: 64px 20px !important;
    }
    .cta-actions {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 10px !important;
    }
    .cta-actions button,
    .cta-actions a,
    .cta-outline {
      width: 100% !important;
      max-width: 100% !important;
      justify-content: center !important;
    }

    /* Modal */
    .modal-card {
      padding: 28px 18px !important;
      border-radius: 14px !important;
    }
    .modal-title {
      font-size: 1.3rem !important;
    }
  }

  /* ── VERY SMALL ≤ 380px ── */
  @media (max-width: 380px) {
    .hero-h1 {
      font-size: 1.75rem !important;
    }
    .hero-section {
      padding: 80px 16px 50px !important;
    }
    .section-padded {
      padding: 50px 16px !important;
    }
    .cta-section {
      padding: 50px 16px !important;
    }
  }
`;