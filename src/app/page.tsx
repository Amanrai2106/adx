"use client";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const SelectedProjects = dynamic(() => import("@/components/SelectedProjects"), {
  ssr: false,
});
const ProjectStack = dynamic(() => import("@/components/ProjectStack"), {
  ssr: false,
});
const AboutGrid = dynamic(() => import("@/components/AboutGrid"), {
  ssr: false,
});
const CoreValues = dynamic(() => import("@/components/CoreValues"), {
  ssr: false,
});
const BrandShowcase = dynamic(() => import("@/components/BrandShowcase"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Nav />
      <Loader />
      <Hero />
      <AboutGrid />
      <SelectedProjects />
      <ProjectStack />
      <CoreValues />
      <BrandShowcase />
      <Footer />
    </main>
  );
}
