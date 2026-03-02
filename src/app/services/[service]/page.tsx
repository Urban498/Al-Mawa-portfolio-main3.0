"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import DigitalMarketingPage from "../email-whatsapp-sms-marketing/page";

const toTitle = (value: string) =>
  decodeURIComponent(value)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const digitalMarketingSlugs = new Set([
  "email-marketing-services",
  "whatsapp-marketing-services",
  "sms-marketing-services",
  "omnichannel-integration",
  "rcs-messaging-services",
  "push-notification-services",
  "marketing-automation",
  "customer-journey-drip-campaigns",
  "chatbot-marketing-services",
  "benefits-of-email-whatsapp-sms-marketing",
]);

export default function ServiceDetailPage() {
  const params = useParams<{ service?: string }>();
  const service = params?.service ?? "";

  if (digitalMarketingSlugs.has(service)) {
    return <DigitalMarketingPage />;
  }

  const title = toTitle(service);

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-b from-background via-muted to-card">
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-black tracking-tight">
            {title}
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Explore our {title} offering. Reach out to get a tailored plan for your
            business.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white">
              <Link href="/contact">Send Enquiry</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services">Back to Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
