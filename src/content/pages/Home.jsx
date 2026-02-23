import { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PracticeAreas from '../components/PracticeAreas';
import ContactSection from '../components/ContactSection';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import { loadContent } from "/src/utils/contentLoader";
import '../styles/animations.css';

export default function Home() {
  const [content, setContent] = useState({
    siteName: "Dr. Carlos Silva",
    oab: "OAB/SP 123.456",
    phone: "(11) 1234-5678",
    whatsapp: "5511999999999",
    email: "contato@drcarlos.adv.br",
    address: "Av. Paulista, 1000 - São Paulo/SP",
    instagram: "#",
    linkedin: "#",
    facebook: "#",
    heroTitle: "Excelência e Compromisso em Direito",
    heroSubtitle: "Há mais de 15 anos defendendo seus direitos com ética e dedicação.",
    heroImage: "",
    lawyerName: "Dr. Carlos Silva",
    lawyerBio: "Especialista em Direito Civil, Empresarial e Trabalhista, com mestrado pela USP e vasta experiência em casos complexos.",
    lawyerPhoto: "",
    experience: 15,
    cases: 500
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const settingsData = await loadContent('/src/content/settings/general.md');
        const homeData = await loadContent('/src/content/pages/home.md');
        
        setContent(prev => ({
          ...prev,
          ...settingsData?.data,
          ...homeData?.data
        }));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans overflow-x-hidden">
      <Header 
        siteName={content.siteName}
        oab={content.oab}
        whatsapp={content.whatsapp}
      />
      
      <HeroSection
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        whatsapp={content.whatsapp}
        heroImage={content.heroImage}
      />
      
      <AboutSection
        lawyerName={content.lawyerName}
        lawyerBio={content.lawyerBio}
        lawyerPhoto={content.lawyerPhoto}
        experience={content.experience}
        cases={content.cases}
      />
      
      <PracticeAreas />
      
      <ContactSection
        phone={content.phone}
        email={content.email}
        address={content.address}
        whatsapp={content.whatsapp}
        instagram={content.instagram}
        linkedin={content.linkedin}
        facebook={content.facebook}
      />
      
      <WhatsAppButton whatsapp={content.whatsapp} />
      
      <Footer
        siteName={content.siteName}
        oab={content.oab}
        phone={content.phone}
        email={content.email}
        address={content.address}
        whatsapp={content.whatsapp}
      />
    </div>
  );
}