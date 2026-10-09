"use client";

import { useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PrototypeRibbon from "@/components/layout/PrototypeRibbon";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import StatementSection from "@/components/home/StatementSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import RegistrationSection from "@/components/home/RegistrationSection";
import InvitationSection from "@/components/home/InvitationSection";
import FaqSection from "@/components/home/FaqSection";
import MobileJoinBar from "@/components/home/MobileJoinBar";
import PrivacyDialog from "@/components/ui/PrivacyDialog";
import EmailDialog from "@/components/ui/EmailDialog";
import Toast from "@/components/ui/Toast";

function HomeClientContent() {
  const searchParams = useSearchParams();
  const incomingRef = (searchParams.get("ref") || "").toUpperCase().trim();

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [registeredName, setRegisteredName] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleToast = useCallback((msg: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  const openPrivacy = useCallback(() => {
    setIsPrivacyOpen(true);
  }, []);

  const closePrivacy = useCallback(() => {
    setIsPrivacyOpen(false);
  }, []);

  const openEmail = useCallback(() => {
    setIsEmailOpen(true);
  }, []);

  const closeEmail = useCallback(() => {
    setIsEmailOpen(false);
  }, []);

  return (
    <>
      <PrototypeRibbon />
      <Header variant="home" />
      <main id="main">
        <Hero />
        <StatementSection />
        <BenefitsSection />
        <RegistrationSection
          initialRef={incomingRef}
          onOpenPrivacy={openPrivacy}
          onOpenEmail={openEmail}
          onToast={handleToast}
          onSuccess={setRegisteredName}
        />
        <InvitationSection />
        <FaqSection />
      </main>
      <Footer onOpenPrivacy={openPrivacy} />
      <MobileJoinBar />

      {/* Modals & Notifications */}
      <PrivacyDialog isOpen={isPrivacyOpen} onClose={closePrivacy} />
      <EmailDialog
        isOpen={isEmailOpen}
        firstName={registeredName}
        onClose={closeEmail}
      />
      <Toast message={toastMessage} />
    </>
  );
}

export default function HomeClient() {
  return (
    <Suspense fallback={null}>
      <HomeClientContent />
    </Suspense>
  );
}
