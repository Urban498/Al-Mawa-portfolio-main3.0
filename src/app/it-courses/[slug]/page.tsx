import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/app/api/libs/db';
import CourseModel from '@/app/api/models/course_schema';

type Course = {
  slug: string;
  title: string;
  desc: string;
  details: {
    overview: string;
    whatYouWillLearn: string[];
    whoIsThisFor: string[];
  };
};

export default async function ITCourseDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();
  const doc = (await CourseModel.findOne({ slug }).lean()) as unknown as {
    slug?: unknown;
    title?: unknown;
    desc?: unknown;
    details?: {
      overview?: unknown;
      whatYouWillLearn?: unknown;
      whoIsThisFor?: unknown;
    };
  } | null;
  if (!doc) notFound();

  const course: Course = {
    slug: String(doc.slug || ''),
    title: String(doc.title || ''),
    desc: String(doc.desc || ''),
    details: {
      overview: String(doc.details?.overview || ''),
      whatYouWillLearn: Array.isArray(doc.details?.whatYouWillLearn)
        ? doc.details.whatYouWillLearn.map((v: unknown) => String(v))
        : [],
      whoIsThisFor: Array.isArray(doc.details?.whoIsThisFor)
        ? doc.details.whoIsThisFor.map((v: unknown) => String(v))
        : [],
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .cd-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.5;
          pointer-events: none;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pulseDot {
          0%,100% { opacity:1; transform:scale(1);   }
          50%      { opacity:0.4; transform:scale(1.6); }
        }

        .cd-fade-1 { animation: fadeUp 0.7s ease 0.08s both; }
        .cd-fade-2 { animation: fadeUp 0.7s ease 0.18s both; }
        .cd-fade-3 { animation: fadeUp 0.7s ease 0.28s both; }
        .cd-fade-4 { animation: fadeUp 0.7s ease 0.38s both; }
        .cd-pulse  { animation: pulseDot 2s infinite; }

        .cd-back:hover { gap: 12px !important; color: #0284c7 !important; }

        .cd-list { margin:0; padding:0; list-style:none; }
        .cd-list li {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 9px 0;
          border-bottom: 1px solid #f1f3f5;
          font-size: 0.9rem; color: #0a0a0a; line-height: 1.6;
        }
        .cd-list li:last-child { border-bottom: none; }
        .cd-list li::before {
          content: '';
          flex-shrink: 0;
          width: 18px; height: 18px; margin-top: 2px;
          border-radius: 50%;
          background: #e0f2fe;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='2,5 4.5,7.5 8,3' stroke='%230ea5e9' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-size: 10px 10px;
          background-repeat: no-repeat;
          background-position: center;
        }

        .cd-panel { transition: border-color 0.3s, box-shadow 0.3s; }
        .cd-panel:hover {
          border-color: #0ea5e9 !important;
          box-shadow: 0 8px 28px rgba(14,165,233,0.1) !important;
        }

        .cd-btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: #0a0a0a; color: white;
          padding: 14px 28px; border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700; font-size: 0.92rem;
          text-decoration: none;
          transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
          border: none; cursor: pointer;
          white-space: nowrap;
        }
        .cd-btn-primary:hover {
          background: #0ea5e9;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(14,165,233,0.35);
        }
        .cd-btn-secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: white; color: #0a0a0a;
          padding: 13px 28px; border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 0.92rem;
          text-decoration: none;
          border: 1.5px solid #e9ecef;
          transition: border-color 0.3s, color 0.3s, transform 0.3s;
          white-space: nowrap;
        }
        .cd-btn-secondary:hover {
          border-color: #0ea5e9;
          color: #0ea5e9;
          transform: translateY(-2px);
        }

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .cd-marquee-track { animation: marqueeScroll 22s linear infinite; }
        .cd-marquee-item::after { content: '  ✦  '; opacity: 0.45; }

        /* ── TABLET ≤ 1024px ── */
        @media (max-width: 1024px) {
          .cd-hero-section {
            padding: 90px 24px 60px !important;
          }
          .cd-content-section {
            padding: 56px 24px 72px !important;
          }
          .cd-overview-card {
            padding: 32px !important;
          }
          .cd-panel-grid {
            grid-template-columns: 1fr !important;
          }
          .cd-cta-strip {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 32px !important;
            gap: 20px !important;
          }
        }

        /* ── MOBILE ≤ 640px ── */
        @media (max-width: 640px) {
          .cd-hero-section {
            padding: 80px 20px 50px !important;
          }
          .cd-hero-inner {
            padding: 0 !important;
          }
          .cd-hero h1 {
            font-size: 1.9rem !important;
            line-height: 1.15 !important;
            margin-bottom: 14px !important;
          }
          .cd-hero-desc {
            font-size: 0.92rem !important;
            margin-bottom: 24px !important;
          }
          .cd-hero-badge {
            font-size: 0.65rem !important;
            padding: 6px 14px !important;
            margin-bottom: 16px !important;
          }
          .cd-hero-actions {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }
          .cd-hero-actions .cd-btn-primary,
          .cd-hero-actions .cd-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
          }

          .cd-content-section {
            padding: 44px 20px 60px !important;
          }
          .cd-overview-card {
            padding: 24px 20px !important;
            border-radius: 14px !important;
            margin-bottom: 18px !important;
          }
          .cd-overview-card h2 {
            font-size: 1.35rem !important;
          }
          .cd-overview-card p {
            font-size: 0.9rem !important;
          }

          .cd-panel-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .cd-detail-panel {
            padding: 24px 20px !important;
            border-radius: 14px !important;
          }
          .cd-detail-panel h3 {
            font-size: 1.1rem !important;
          }

          .cd-cta-strip {
            padding: 28px 20px !important;
            border-radius: 14px !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 20px !important;
            margin-top: 18px !important;
          }
          .cd-cta-strip h3 {
            font-size: 1.25rem !important;
          }
          .cd-cta-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
            width: 100% !important;
          }
          .cd-cta-buttons a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
          .cd-cta-btn-outline {
            justify-content: center !important;
          }

          .cd-back {
            font-size: 0.82rem !important;
            margin-bottom: 20px !important;
          }
        }

        /* ── VERY SMALL ≤ 380px ── */
        @media (max-width: 380px) {
          .cd-hero-section {
            padding: 70px 16px 44px !important;
          }
          .cd-hero h1 {
            font-size: 1.65rem !important;
          }
          .cd-content-section {
            padding: 36px 16px 50px !important;
          }
          .cd-overview-card {
            padding: 20px 16px !important;
          }
          .cd-detail-panel {
            padding: 20px 16px !important;
          }
          .cd-cta-strip {
            padding: 22px 16px !important;
          }
        }
      `}</style>

      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        background: '#fff',
        color: '#0a0a0a',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}>

        {/* ── HERO HEADER ── */}
        <section
          className="cd-hero cd-hero-section"
          style={{
            background: '#f8f9fa',
            position: 'relative',
            overflow: 'hidden',
            padding: '110px 24px 70px',
          }}
        >
          {/* Soft blue orbs */}
          <div style={{
            position: 'absolute', borderRadius: '50%', filter: 'blur(100px)',
            width: 420, height: 420,
            background: 'rgba(14,165,233,0.10)',
            top: -100, right: -60,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', borderRadius: '50%', filter: 'blur(100px)',
            width: 300, height: 300,
            background: 'rgba(59,130,246,0.07)',
            bottom: -60, left: -40,
            pointerEvents: 'none',
          }} />

          <div className="cd-hero-inner" style={{ maxWidth: 980, margin: '0 auto', position: 'relative', zIndex: 2 }}>

            {/* Back link */}
            <Link
              href="/it-courses#courses"
              className="cd-back"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                textDecoration: 'none', color: '#0ea5e9',
                fontWeight: 700, fontSize: '0.88rem',
                marginBottom: 28,
                transition: 'gap 0.2s, color 0.2s',
                letterSpacing: '0.01em',
              }}
            >
              ← Back to Courses
            </Link>

            {/* Badge */}
            <div className="cd-fade-1 cd-hero-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'white', border: '1px solid #e9ecef',
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              color: '#0ea5e9', padding: '8px 20px', borderRadius: 100,
              fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.09em',
              textTransform: 'uppercase', marginBottom: 20,
            }}>
              <span className="cd-pulse" style={{
                width: 6, height: 6, background: '#0ea5e9', borderRadius: '50%', display: 'inline-block',
              }} />
              Course Details
            </div>

            {/* Title */}
            <h1 className="cd-fade-2" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.9rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.07,
              margin: '0 0 18px',
              color: '#0a0a0a',
            }}>
              {course.title}
            </h1>

            {/* Description */}
            <p className="cd-fade-3 cd-hero-desc" style={{
              fontSize: '1.05rem', color: '#6c757d',
              lineHeight: 1.75, maxWidth: 620, margin: '0 0 32px',
            }}>
              {course.desc}
            </p>

            {/* CTA buttons */}
            <div className="cd-fade-4 cd-hero-actions" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/contact" className="cd-btn-primary">
                Enquire Now →
              </Link>
              <Link href="/it-courses#courses" className="cd-btn-secondary">
                View All Courses
              </Link>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div style={{ padding: '22px 0', background: '#0ea5e9', overflow: 'hidden' }}>
          <div
            className="cd-marquee-track"
            style={{ display: 'flex', whiteSpace: 'nowrap' }}
          >
            {[
              'Web Development','Mobile Apps','Artificial Intelligence',
              'Cloud Computing','UI/UX Design','Software Internship',
              'Web Development','Mobile Apps','Artificial Intelligence',
              'Cloud Computing','UI/UX Design','Software Internship',
            ].map((item, i) => (
              <span
                key={i}
                className="cd-marquee-item"
                style={{
                  flexShrink: 0, padding: '0 32px',
                  fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'white', opacity: 0.88,
                  display: 'inline-flex', alignItems: 'center', gap: 14,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <section className="cd-content-section" style={{ padding: '72px 24px 96px' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>

            {/* Overview card */}
            <div
              className="cd-panel cd-overview-card"
              style={{
                background: 'white',
                border: '1px solid #e9ecef',
                borderRadius: 18,
                padding: '40px',
                marginBottom: 24,
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <span style={{
                display: 'inline-block',
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.13em',
                textTransform: 'uppercase', color: '#0ea5e9', marginBottom: 10,
              }}>
                Overview
              </span>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.35rem, 2.5vw, 2rem)',
                fontWeight: 800, margin: '0 0 14px', color: '#0a0a0a',
              }}>
                About This Course
              </h2>
              <p style={{
                color: '#6c757d', lineHeight: 1.8, margin: 0,
                fontSize: '0.97rem', maxWidth: 720,
              }}>
                {course.details.overview}
              </p>
            </div>

            {/* Two-column panels */}
            <div
              className="cd-panel-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 22,
              }}
            >
              {/* What you'll learn */}
              <div
                className="cd-panel cd-detail-panel"
                style={{
                  background: 'white',
                  border: '1px solid #e9ecef',
                  borderRadius: 18,
                  padding: '34px 30px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: '#e0f2fe',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#0ea5e9" strokeWidth={2} fill="none">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </div>
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.13em',
                  textTransform: 'uppercase', color: '#0ea5e9', marginBottom: 8,
                }}>
                  Curriculum
                </span>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.25rem', fontWeight: 800,
                  margin: '0 0 18px', color: '#0a0a0a',
                }}>
                  What You&apos;ll Learn
                </h3>
                <ul className="cd-list">
                  {course.details.whatYouWillLearn.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Who is this for */}
              <div
                className="cd-panel cd-detail-panel"
                style={{
                  background: 'white',
                  border: '1px solid #e9ecef',
                  borderRadius: 18,
                  padding: '34px 30px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: '#e0f2fe',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#0ea5e9" strokeWidth={2} fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.13em',
                  textTransform: 'uppercase', color: '#0ea5e9', marginBottom: 8,
                }}>
                  Audience
                </span>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.25rem', fontWeight: 800,
                  margin: '0 0 18px', color: '#0a0a0a',
                }}>
                  Who Is This For?
                </h3>
                <ul className="cd-list">
                  {course.details.whoIsThisFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom CTA strip */}
            <div
              className="cd-cta-strip"
              style={{
                marginTop: 28,
                background: '#0a0a0a',
                borderRadius: 18,
                padding: '40px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 24,
              }}
            >
              {/* Glow */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 10% 80%, rgba(14,165,233,0.25) 0%, transparent 55%)',
                pointerEvents: 'none',
              }} />
              <div style={{ position: 'relative' }}>
                <p style={{
                  fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 6,
                }}>
                  Ready to start?
                </p>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.5rem', fontWeight: 900,
                  color: 'white', margin: 0,
                }}>
                  Enroll in {course.title}
                </h3>
              </div>
              <div className="cd-cta-buttons" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
                <Link
                  href="/contact"
                  className="cd-btn-primary"
                  style={{ background: 'white', color: '#0a0a0a' }}
                >
                  Enquire Now →
                </Link>
                <Link
                  href="/it-courses#courses"
                  className="cd-cta-btn-outline"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: 'transparent', color: 'white',
                    padding: '13px 24px', borderRadius: 8,
                    fontWeight: 600, fontSize: '0.92rem',
                    textDecoration: 'none',
                    border: '1.5px solid rgba(255,255,255,0.28)',
                    transition: 'border-color 0.3s, background 0.3s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  View All Courses
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}