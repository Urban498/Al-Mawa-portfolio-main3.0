"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted to-card pt-20 pb-16 lg:pt-24 lg:pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="bg-card/95 border border-border/50 shadow-xl shadow-slate-200/20 backdrop-blur-sm">
          <CardHeader className="px-6 pt-6 md:px-8 md:pt-8">
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
              Terms &amp; Conditions 
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 px-6 pb-8 md:px-8 md:pb-10 text-sm md:text-base leading-relaxed text-muted-foreground">
            <section className="space-y-3">
              <p>
                By using this website, you agree to comply with our Terms &amp; Conditions. All content,
                software, designs, and materials on this site are owned by us and may not be copied or
                reused without permission. You agree not to misuse the website, attempt unauthorized
                access, or engage in harmful activities.
              </p>
              <p>
                Our services, pricing, and features may be updated or changed at any time. We are not
                responsible for damages arising from website use, downtime, data loss, or third-party
                links.
              </p>
              <p>
                We may modify these Terms at any time, and continued use means acceptance.
              </p>
              <p>
                For queries, contact: <span className="font-medium text-foreground">
                  <a
                    href="mailto:business@al-mawa.international"
                    className="underline-offset-4 hover:underline"
                  >
                    business@al-mawa.international
                  </a>
                </span>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">Privacy Policy</h2>
              <p>
                We collect personal information such as name, contact details, emails, and usage data to
                provide and improve our IT services. We also use cookies to enhance website performance.
              </p>
              <p>
                Your information is kept secure and shared only with trusted service partners or legal
                authorities when required. We do not sell or misuse your data. You may request access,
                correction, or deletion of your data at any time.
              </p>
              <p>
                By using this website, you consent to this Privacy Policy.
              </p>
              <p>
                For privacy concerns, contact: <span className="font-medium text-foreground">
                  <a
                    href="mailto:legal@al-mawa.international"
                    className="underline-offset-4 hover:underline"
                  >
                    legal@al-mawa.international
                  </a>
                </span>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

