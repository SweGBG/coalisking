import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfoBar from "@/components/InfoBar";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function Home() {
  return (
    <>
      <ScrollFadeIn />
      <Navbar />
      <main>
        <Hero />
        <InfoBar />
        <Menu />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
