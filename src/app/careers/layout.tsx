import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers at Al Mawa International Pune - Web Developer Jobs | IT Jobs',
  description: 'Join Al Mawa International Pune - Explore web developer jobs, software development careers and IT opportunities in Pune Maharashtra. Apply now!',
  keywords: 'careers Al Mawa International, web developer jobs Pune, IT careers Pune, software development jobs, digital marketing jobs Pune',
  openGraph: {
    title: 'Careers - Al Mawa International Pune',
    description: 'Join our team of digital innovators in Pune. Explore exciting career opportunities.',
    url: 'https://www.al-mawa.international/careers',
  }
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
