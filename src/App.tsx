import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { sendContactEmail } from "@/services/contactService";
import toast, { Toaster } from 'react-hot-toast';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  LogIn, 
  User, 
  Briefcase, 
  GraduationCap,
  Trophy,
  Calendar,
  ExternalLink,
  Sun,
  Moon,
  Menu,
  X,
  Users,
  TrendingUp,
  Award,
  Target,
  Zap,
  Send,
  Globe,
  Languages,
  BookOpen,
  Star
} from "lucide-react";

export default function ErikPortfolio() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [contactData, setContactData] = useState({ name: "", email: "", phone: "", message: "" });

  // Calculate age automatically
  const calculateAge = () => {
    const birthDate = new Date(1984, 8, 15); // September 15, 1984 (month is 0-indexed)
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const currentAge = calculateAge();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true);
      setIsLoginOpen(false);
      setLoginData({ email: "", password: "" });
    }
  };

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactLoading(true);
    
    // Toast de carregamento
    const loadingToast = toast.loading('Enviando mensagem...');
    
    try {
      // Envia apenas para email
      const emailSent = await sendContactEmail(contactData);
      
      // Remove o toast de loading
      toast.dismiss(loadingToast);
      
      if (emailSent) {
        toast.success('✅ Mensagem enviada com sucesso!');
        toast('� Você receberá uma resposta em breve!', {
          icon: '👋',
          duration: 4000,
        });
        
        setIsContactOpen(false);
        setContactData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error('❌ Erro ao enviar mensagem. Tente novamente!');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      // Remove o toast de loading
      toast.dismiss(loadingToast);
      
      toast.error('❌ Erro ao enviar mensagem. Tente novamente!');
    } finally {
      setIsContactLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container-premium flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-serif font-semibold text-gradient-premium">Erik Proença</span>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-accent transition-colors duration-200 cursor-pointer">Início</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-accent transition-colors duration-200 cursor-pointer">Sobre</button>
            <button onClick={() => scrollToSection('experience')} className="text-sm font-medium hover:text-accent transition-colors duration-200 cursor-pointer">Experiência</button>
            <button onClick={() => scrollToSection('skills')} className="text-sm font-medium hover:text-accent transition-colors duration-200 cursor-pointer">Habilidades</button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-accent transition-colors duration-200 cursor-pointer">Contato</button>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2 hover:bg-accent/10 transition-colors duration-200 min-h-[40px] min-w-[40px]">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex items-center space-x-2 px-2 sm:px-3 py-1 bg-accent/10 rounded-full">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Bem-vindo!</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs sm:text-sm min-h-[36px]">Sair</Button>
              </div>
            ) : (
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm min-h-[36px] px-2 sm:px-4">
                    <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md max-w-[90vw] mx-auto">
                  <DialogHeader>
                    <DialogTitle className="text-center text-lg lg:text-xl">Acesso Premium</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="seu@email.com" 
                        value={loginData.email} 
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})} 
                        required 
                        className="min-h-[44px] text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={loginData.password} 
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                        required 
                        className="min-h-[44px] text-base"
                      />
                    </div>
                    <Button type="submit" className="w-full premium-btn text-base min-h-[44px]">Acessar Área Premium</Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}

            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden p-2 min-h-[40px] min-w-[40px]" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50">
            <nav className="flex flex-col space-y-3 p-4 sm:p-6">
              <button onClick={() => scrollToSection('home')} className="text-left text-sm font-medium hover:text-accent transition-colors cursor-pointer py-2 min-h-[44px] flex items-center">Início</button>
              <button onClick={() => scrollToSection('about')} className="text-left text-sm font-medium hover:text-accent transition-colors cursor-pointer py-2 min-h-[44px] flex items-center">Sobre</button>
              <button onClick={() => scrollToSection('experience')} className="text-left text-sm font-medium hover:text-accent transition-colors cursor-pointer py-2 min-h-[44px] flex items-center">Experiência</button>
              <button onClick={() => scrollToSection('skills')} className="text-left text-sm font-medium hover:text-accent transition-colors cursor-pointer py-2 min-h-[44px] flex items-center">Habilidades</button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-sm font-medium hover:text-accent transition-colors cursor-pointer py-2 min-h-[44px] flex items-center">Contato</button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="section-padding pt-20 sm:pt-24 elegant-gradient section-elegant">
        <div className="container-premium">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-accent">
                  <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">Professor de Matemática e Física</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-light leading-tight">
                  Erik
                  <span className="block text-gradient-premium font-medium">Proença</span>
                  <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-1 lg:mt-2 text-muted-foreground">{currentAge} anos</span>
                </h1>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Professor dedicado com paixão pela educação e desenvolvimento acadêmico. 
                  Transformando vidas através do conhecimento e inovação pedagógica.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="premium-btn group text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 min-h-[44px]" onClick={() => scrollToSection('experience')}>
                  <span>Conheça Minha Experiência</span>
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" className="border-primary/20 hover:bg-primary/5 transition-all duration-200 text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 min-h-[44px]" onClick={() => scrollToSection('contact')}>
                  Vamos Conversar
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end order-first lg:order-last">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl"></div>
                <div className="relative hero-container sm:w-72 sm:h-96 lg:w-96 lg:h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden border border-border/50 bg-card shadow-2xl">
                  <img 
                    src="/erik-profile.jpg" 
                    alt="Erik Proença - Professor de Matemática e Física" 
                    className="w-full h-full hero-image object-cover object-top sm:object-center" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-background py-12 lg:py-20">
        <div className="container-premium">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
            <div className="space-y-2 lg:space-y-3">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">7+</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide font-medium">Anos de<br />Ensino</div>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">4</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide font-medium">Instituições<br />de Ensino</div>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">3</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide font-medium">Idiomas<br />Domínio</div>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">100%</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide font-medium">Dedicação<br />à Educação</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-muted/30 section-elegant">
        <div className="container-premium">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="flex justify-center lg:justify-start order-first lg:order-first">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl lg:rounded-2xl blur-lg lg:blur-xl"></div>
                <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-96 rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                  <img src="/about-image.jpg" alt="Professor Erik em sala de aula" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6 lg:space-y-8 order-last lg:order-last">
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary">
                  <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Sobre Mim</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light">
                  Combinando Tradição com
                  <span className="block text-gradient-premium font-medium">Inovação Pedagógica</span>
                </h2>
                <div className="space-y-3 lg:space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-sm sm:text-base lg:text-lg">
                    Com formação em Licenciatura em Matemática com Habilitação em Física, dedico-me ao desenvolvimento e implementação de currículos desafiadores e envolventes para preparação acadêmica dos alunos.
                  </p>
                  <p className="text-sm sm:text-base">
                    Minha abordagem integra metodologias ativas, neuroeducação e etnomatemática, garantindo que cada aluno desenvolva não apenas conhecimento técnico, mas também amor duradouro pela matemática e física.
                  </p>
                  <p className="text-sm sm:text-base">
                    Especializo-me em transformar conceitos complexos em aprendizagem significativa, sempre priorizando protagonismo estudantil, inclusão e equidade educacional.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 lg:space-y-4">
                <h3 className="text-base lg:text-lg font-medium mb-2 lg:mb-3">Idiomas</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 text-xs sm:text-sm px-2 py-1">Português - Nativo</Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 text-xs sm:text-sm px-2 py-1">Inglês - Avançado</Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 text-xs sm:text-sm px-2 py-1">Francês - Intermediário</Badge>
                </div>
              </div>

              <Card className="card-premium">
                <CardHeader className="pb-3 lg:pb-4">
                  <CardTitle className="flex items-center gap-2 lg:gap-3 text-base lg:text-lg">
                    <Trophy className="h-4 w-4 lg:h-5 lg:w-5 text-accent" />
                    Formação Acadêmica
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 lg:space-y-3">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Licenciatura em Matemática com Habilitação em Física</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Faculdade de Taboão da Serra (2007-2009)</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Estágios supervisionados em escolas públicas e privadas</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Participação em projetos de pesquisa e extensão</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding bg-background section-elegant">
        <div className="container-premium">
          <div className="text-center space-y-4 lg:space-y-6 mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-accent">
              <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Experiência Profissional</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light">
              Jornada
              <span className="block text-gradient-premium font-medium">Educacional</span>
            </h2>
          </div>
          
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
            {/* Maple Bear Santana */}
            <Card className="card-premium">
              <CardHeader className="pb-3 lg:pb-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-primary-foreground" />
                  </div>
                  <Badge className="bg-accent/10 text-accent text-xs sm:text-sm">2025 - Atual</Badge>
                </div>
                <CardTitle className="text-lg lg:text-xl">Maple Bear Santana</CardTitle>
                <p className="text-muted-foreground text-sm lg:text-base">Professor de Matemática Aplicada</p>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                <p className="text-muted-foreground text-sm lg:text-base">Turmas: Year 6 a Year 9</p>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <span>Planejamento e condução de aulas investigativas com foco em protagonismo estudantil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <span>Desenvolvimento de atividades práticas interdisciplinares</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <span>Criação de projetos com conceito de "terceiro professor"</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Colégio 14 de Julho */}
            <Card className="card-premium">
              <CardHeader className="pb-3 lg:pb-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-5 w-5 lg:h-6 lg:w-6 text-primary-foreground" />
                  </div>
                  <Badge className="bg-accent/10 text-accent text-xs sm:text-sm">2024 - Atual</Badge>
                </div>
                <CardTitle className="text-lg lg:text-xl">Colégio 14 de Julho</CardTitle>
                <p className="text-muted-foreground text-sm lg:text-base">Professor de Matemática e Física</p>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <span>Planejamento e execução de aulas de Física com experimentação</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <span>Sequências didáticas investigativas em Matemática</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <span>Projetos interdisciplinares com foco em empreendedorismo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Maple Bear Jardins */}
            <Card className="card-premium">
              <CardHeader className="pb-3 lg:pb-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                    <Globe className="h-5 w-5 lg:h-6 lg:w-6 text-primary-foreground" />
                  </div>
                  <Badge className="bg-muted/50 text-muted-foreground text-xs sm:text-sm">2023 - 2024</Badge>
                </div>
                <CardTitle className="text-lg lg:text-xl">Maple Bear Jardins</CardTitle>
                <p className="text-muted-foreground text-sm lg:text-base">Professor de Programação</p>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <span>Ensino de programação com foco em lógica e Python</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <span>Desenvolvimento de projetos práticos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <span>Organização de workshops e competições</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Colégio Dom Bosco */}
            <Card className="card-premium">
              <CardHeader className="pb-3 lg:pb-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                    <Target className="h-5 w-5 lg:h-6 lg:w-6 text-primary-foreground" />
                  </div>
                  <Badge className="bg-muted/50 text-muted-foreground text-xs sm:text-sm">2018 - 2021</Badge>
                </div>
                <CardTitle className="text-lg lg:text-xl">Colégio Dom Bosco - Objetivo</CardTitle>
                <p className="text-muted-foreground text-sm lg:text-base">Professor de Matemática</p>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <span>Ensino fundamental e médio com metodologias ativas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <span>Coordenação de curso preparatório para Olimpíadas de Matemática</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <span>Treinamento de professores durante a pandemia</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-muted/30 section-elegant">
        <div className="container-premium">
          <div className="text-center space-y-4 lg:space-y-6 mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary">
              <Star className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Habilidades</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light">
              Competências
              <span className="block text-gradient-premium font-medium">Educacionais</span>
            </h2>
          </div>
          
          <div className="grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="card-premium">
              <CardHeader className="pb-3 lg:pb-4">
                <CardTitle className="flex items-center gap-2 lg:gap-3 text-base lg:text-lg">
                  <BookOpen className="h-4 w-4 lg:h-5 lg:w-5 text-accent flex-shrink-0" />
                  <span>Domínio de Conteúdo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Profundo conhecimento em Matemática e Física, com aplicação prática para Ensino Fundamental II e Médio.
                </p>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="pb-3 lg:pb-4">
                <CardTitle className="flex items-center gap-2 lg:gap-3 text-base lg:text-lg">
                  <Languages className="h-4 w-4 lg:h-5 lg:w-5 text-accent flex-shrink-0" />
                  <span>Professor Bilíngue</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Experiência consolidada no ensino bilíngue português-inglês, com fluência natural em ambos os idiomas.
                </p>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="pb-3 lg:pb-4">
                <CardTitle className="flex items-center gap-2 lg:gap-3 text-base lg:text-lg">
                  <Target className="h-4 w-4 lg:h-5 lg:w-5 text-accent flex-shrink-0" />
                  <span>Metodologias Ativas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Domínio de ABP, gamificação, ensino híbrido e investigativo para protagonismo estudantil.
                </p>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="pb-3 lg:pb-4">
                <CardTitle className="flex items-center gap-2 lg:gap-3 text-base lg:text-lg">
                  <Users className="h-4 w-4 lg:h-5 lg:w-5 text-accent flex-shrink-0" />
                  <span>Inclusão Educacional</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Experiência com TDAH, TEA e dificuldades de aprendizagem, garantindo equidade no ensino.
                </p>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="pb-3 lg:pb-4">
                <CardTitle className="flex items-center gap-2 lg:gap-3 text-base lg:text-lg">
                  <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-accent flex-shrink-0" />
                  <span>Avaliação Formativa</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Criação de rubricas, diários de bordo e autoavaliações promovendo metacognição e autonomia.
                </p>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="pb-3 lg:pb-4">
                <CardTitle className="flex items-center gap-2 lg:gap-3 text-base lg:text-lg">
                  <Zap className="h-4 w-4 lg:h-5 lg:w-5 text-accent flex-shrink-0" />
                  <span>Inovação Tecnológica</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Uso criativo de recursos digitais e de baixo custo para aprendizagem significativa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-background section-elegant">
        <div className="container-premium">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-start">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-accent">
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Contato</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light">
                  Vamos Conversar sobre
                  <span className="block text-gradient-premium font-medium">Educação</span>
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  Estou sempre aberto para discutir projetos educacionais, metodologias inovadoras e oportunidades de colaboração.
                </p>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm lg:text-base">Email</p>
                    <p className="text-muted-foreground text-xs sm:text-sm lg:text-base break-all">erik.proenca2011@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm lg:text-base">Telefone</p>
                    <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">+55 11 986165932</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm lg:text-base">Localização</p>
                    <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">Rua Raul José Braconaro, 41</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="card-premium">
              <CardHeader className="pb-3 lg:pb-4">
                <CardTitle className="text-lg lg:text-xl">Envie uma Mensagem</CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full premium-btn text-sm sm:text-base px-6 py-3 min-h-[44px]">
                      <Send className="h-4 w-4 mr-2" />
                      Abrir Formulário
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md max-w-[90vw] mx-auto">
                    <DialogHeader>
                      <DialogTitle className="text-lg lg:text-xl">Entre em Contato</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleContact} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Nome</Label>
                        <Input 
                          id="name" 
                          placeholder="Seu nome" 
                          value={contactData.name} 
                          onChange={(e) => setContactData({...contactData, name: e.target.value})} 
                          required 
                          className="min-h-[44px] text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="seu@email.com" 
                          value={contactData.email} 
                          onChange={(e) => setContactData({...contactData, email: e.target.value})} 
                          required 
                          className="min-h-[44px] text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">Telefone</Label>
                        <Input 
                          id="phone" 
                          placeholder="(11) 99999-9999" 
                          value={contactData.phone} 
                          onChange={(e) => setContactData({...contactData, phone: e.target.value})} 
                          className="min-h-[44px] text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium">Mensagem</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Sua mensagem..." 
                          value={contactData.message} 
                          onChange={(e) => setContactData({...contactData, message: e.target.value})} 
                          required 
                          className="min-h-[100px] text-base resize-none"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full premium-btn text-base min-h-[44px]" 
                        disabled={isContactLoading}
                      >
                        {isContactLoading ? "Enviando..." : "Enviar Mensagem"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container-premium px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-serif font-medium">Erik Proença</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Erik Proença. Transformando vidas através da educação.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Botão WhatsApp flutuante */}
      <WhatsAppButton 
        phoneNumber="5511986165932"
        message="Olá Erik! Vim através do seu portfólio e gostaria de conversar sobre oportunidades profissionais."
      />
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
          },
        }}
      />
    </div>
  );
}