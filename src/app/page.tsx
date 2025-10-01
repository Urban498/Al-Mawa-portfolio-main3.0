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

import HeroSection from "@/components/hero-section";


export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Pass the inter className to HeroSection */}
      <HeroSection />
    </div>
  );
}
