import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Development Services Pune - Al Mawa International | Digital Marketing',
  description: 'Al Mawa International offers professional web development services, digital marketing, mobile app development and IT consulting services in Pune Maharashtra',
  keywords: 'web development services Pune, digital marketing agency Pune, mobile app development Pune, IT consulting services Pune, software development Pune',
  openGraph: {
    title: 'Web Development Services - Al Mawa International Pune',
    description: 'Professional web development and digital marketing services in Pune',
    url: 'https://www.al-mawa.international/services',
  }
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
