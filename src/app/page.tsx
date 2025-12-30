// import HeroSection from "@/components/hero-section";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   return (
//     <div className="min-h-screen">
//       <HeroSection inter={inter.className}/>

//     </div>
//   );
// }
import AutoModal from "@/components/AutoModal";
import HeroSection from "@/components/hero-section";
import { Metadata } from 'next';

// Page-specific SEO metadata
export const metadata: Metadata = {
  title: 'Al Mawa International - Best Digital Agency Pune | Web Development Company',
  description: 'Al Mawa International Pune - Leading web development company offering custom website development, digital marketing, and IT consulting services in Pune Maharashtra',
  keywords: 'Al Mawa International, digital agency Pune, web development company Pune, website design services Pune, best web development company Pune',
  openGraph: {
    title: 'Al Mawa International - Best Digital Agency Pune',
    description: 'Leading web development company in Pune offering custom solutions',
    url: 'https://www.al-mawa.international',
  }
};

export default function Home() {
  
  return (
    <div className="min-h-screen">
      <AutoModal />
      {/* SEO optimized homepage */}
      <main>
        <h1 className="sr-only">Al Mawa International - Digital Agency Pune | Web Development Company</h1>
        <HeroSection />
      </main>
    </div>
  );
}
