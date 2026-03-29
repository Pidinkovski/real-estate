'use client';

import { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ContactModal from '@/components/shared/ContactModal';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import Services from '@/components/sections/Services';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Process from '@/components/sections/Process';
import WhyUs from '@/components/sections/WhyUs';
import BlogPreview from '@/components/sections/BlogPreview';
import FinalCTA from '@/components/sections/FinalCTA';
import type { Project, BlogPost } from '@/lib/supabase';

interface LandingClientProps {
  projects: Project[];
  posts: BlogPost[];
}

export default function LandingClient({ projects, posts }: LandingClientProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="bg-obsidian">
      <Navbar />
      <Hero onRequestQuote={() => setModalOpen(true)} />
      <TrustBar />
      <FeaturedProjects projects={projects} />
      <Services />
      <BeforeAfter />
      <Process />
      <WhyUs />
      <BlogPreview posts={posts} />
      <FinalCTA onRequestConsultation={() => setModalOpen(true)} />
      <Footer />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
