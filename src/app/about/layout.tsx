import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Al Mawa International Pune - Professional Web Development Team',
  description: 'Learn about Al Mawa International Pune - Digital innovation experts providing web development, software development and IT consulting services in Pune Maharashtra',
  keywords: 'Al Mawa International Pune, about Al Mawa, digital innovation experts, professional web development team, technology consultants Pune',
  openGraph: {
    title: 'About Al Mawa International - Digital Agency Pune',
    description: 'Professional team of digital innovators and web developers in Pune',
    url: 'https://www.al-mawa.international/about',
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
