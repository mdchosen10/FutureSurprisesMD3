"use client";

import ForTheGiftGiver from "@/components/ForTheGiftGiver";
import ForTheRecipient from "@/components/ForTheRecipient";
import HeroBanner from "@/components/HeroBanner";
import OurServices from "@/components/OurServices";
import FAQs from "@/components/FAQs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignUpFooter from "@/components/SignUpFooter";
import { useEffect, useState } from "react";

export default function Home() {
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render,
    // so the client and server match
    return null;
  }

  return (
    <div className="m-auto flex min-h-screen flex-col">
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
      </div>

      <main className="mt-[70px] flex w-full flex-grow flex-col justify-start gap-11 md:mt-[96px]">
        <HeroBanner />
        <OurServices />
        <ForTheGiftGiver />
        <ForTheRecipient />
        <FAQs />
        <SignUpFooter />
      </main>
      <Footer />
    </div>
  );
}
