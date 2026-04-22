"use client";

import { Card, CardContent } from "@/components/ui/Card";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 min-h-[calc(100vh-4rem)]">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-display text-brand-600">Privacy Policy</h1>
        <p className="text-muted-foreground mt-1 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <Card>
        <CardContent className="p-6 md:p-8 prose dark:prose-invert max-w-none text-muted-foreground">
          <h2 className="text-xl font-bold text-foreground">1. Commitment to Privacy</h2>
          <p>
            VoteSmart AI – Civic Companion is an educational platform designed to simulate the Indian electoral process and provide civic education. We are fundamentally committed to a privacy-first architecture. <strong>We do not collect, process, or store your actual Voter ID, Aadhaar number, or any sensitive personal data.</strong>
          </p>

          <h2 className="text-xl font-bold text-foreground mt-6">2. Data We Collect (If Any)</h2>
          <p>
            To provide a seamless experience, we store minimal state in your local browser (LocalStorage):
          </p>
          <ul>
            <li>Progress data (Quiz scores, Checklist completion)</li>
            <li>Theme preferences (Light/Dark mode)</li>
          </ul>
          <p>
            If you optionally interact with our AI Assistant, your session data is temporarily utilized to generate responses and is completely erased upon ending the session.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-6">3. Third-party Links</h2>
          <p>
            For official verifications (e.g., checking electoral roll), we redirect you to official portals of the Election Commission of India (ECI) like <code>voters.eci.gov.in</code>. We have no control over and assume no responsibility for the content or privacy practices of these external sites.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-6">4. Contact Us</h2>
          <p>
            If you have questions or suggestions about our Privacy Policy, do not hesitate to contact the development team behind VoteSmart AI.
          </p>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-muted-foreground mt-8 pb-4">
        &copy; {new Date().getFullYear()} VoteSmart AI. Designed for Educational Purposes.
      </div>
    </div>
  );
}
