import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { AnimatedStats } from '@/components/ui/animated-stats';
import { SkillBar } from '@/components/ui/skill-bar';
import { ParticleBackground } from '@/components/ui/particle-background';
import { AnimatedChart } from '@/components/ui/animated-chart';
import { LiveCounter } from '@/components/ui/live-counter';
import { LineChartAnimated } from '@/components/ui/line-chart-animated';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  scaleIn,
  glowIn,
  staggerContainer,
  staggerItem,
} from '@/lib/animations';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Download,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Menu,
  X,
  TrendingUp,
  Users,
  Target,
  Zap,
} from 'lucide-react';

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [educationRef, educationInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [contactRef, contactInView] = useInView({ threshold: 0.1, triggerOnce: false });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const stats = [
    { label: 'Years Experience', value: 2, suffix: '+', icon: '💼' },
    { label: 'Projects Completed', value: 15, suffix: '+', icon: '🎯' },
    { label: 'Certifications', value: 5, suffix: '', icon: '🏆' },
    { label: 'Client Satisfaction', value: 98, suffix: '%', icon: '⭐' },
  ];

  const technicalSkills = [
    { skill: 'Data Analysis', percentage: 95 },
    { skill: 'Advanced Excel', percentage: 98 },
    { skill: 'Power BI', percentage: 90 },
    { skill: 'SQL & Databases', percentage: 85 },
    { skill: 'Python', percentage: 80 },
    { skill: 'Financial Modeling', percentage: 92 },
  ];

  const performanceData = [
    { label: 'Excel', value: 98, color: '#10b981' },
    { label: 'Power BI', value: 90, color: '#8b5cf6' },
    { label: 'SQL', value: 85, color: '#06b6d4' },
    { label: 'Python', value: 80, color: '#f59e0b' },
    { label: 'Analytics', value: 95, color: '#ec4899' },
  ];

  const portfolioGrowth = [45, 52, 58, 65, 72, 78, 85, 92, 88, 95, 98, 100];
  const growthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const experiences = [
    {
      title: 'Portfolio Monitoring Officer',
      company: 'Bank of Kigali',
      period: '2024 - Present',
      description: 'Leading portfolio analysis and risk assessment for banking operations, managing multi-million dollar portfolios with advanced analytics.',
      achievements: ['Reduced portfolio risk by 25%', 'Implemented automated reporting systems', 'Led team of 3 analysts'],
    },
    {
      title: 'Teacher',
      company: 'E.S. Bumbogo',
      period: '2022 - 2023',
      description: 'Delivered quality education and mentored students in academic excellence, developing innovative teaching methodologies.',
      achievements: ['Improved student performance by 30%', 'Developed digital learning materials', 'Mentored 50+ students'],
    },
    {
      title: 'Business Owner',
      company: 'Self-employed',
      period: '2017 - 2018',
      description: 'Managed independent business operations with focus on customer satisfaction and operational efficiency.',
      achievements: ['Achieved 40% profit margin', 'Built customer base of 200+', 'Managed all business operations'],
    },
  ];

  const projects = [
    {
      title: 'Portfolio Risk Analytics Dashboard',
      description: 'Developed comprehensive Power BI dashboard for real-time portfolio monitoring and risk assessment at Bank of Kigali, processing data from 1000+ accounts.',
      image: '/assets/project-portfolio-monitoring.jpg',
      tags: ['Power BI', 'Data Analysis', 'Risk Management'],
      metrics: ['30% faster reporting', '99.9% accuracy', '$5M+ portfolio tracked'],
    },
    {
      title: 'Agribusiness Insights Platform',
      description: 'Created data-driven insights platform for agricultural business intelligence and market analysis, serving 50+ agribusiness clients.',
      image: '/assets/project-agribusiness-insights.jpg',
      tags: ['Excel', 'Business Intelligence', 'Agriculture'],
      metrics: ['50+ clients served', '20% cost reduction', 'Real-time analytics'],
    },
    {
      title: 'Banking Operations Analytics',
      description: 'Implemented advanced Excel models for banking operations optimization and performance tracking across multiple departments.',
      image: '/assets/project-data-analysis.jpg',
      tags: ['Advanced Excel', 'Banking', 'Analytics'],
      metrics: ['15% efficiency gain', 'Automated 80% reports', '5 departments served'],
    },
  ];

  const education = [
    {
      degree: 'Master of Business Administration (MBA)',
      institution: 'University of Rwanda, College of Business and Economics',
      period: '2024 - Present',
      status: 'In Progress',
      focus: 'Finance & Data Analytics',
    },
    {
      degree: "Bachelor's Degree in Education",
      institution: 'University of Rwanda, College of Education - Rukara Campus',
      period: '2018 - 2022',
      status: 'Completed',
      focus: 'Educational Leadership',
    },
  ];

  const certifications = [
    { name: 'Banking Operations', provider: 'BK Academy', year: '2024' },
    { name: 'Sales Academy Certification', provider: 'Bank of Kigali', year: '2024' },
    { name: 'Advanced Excel Training', provider: 'Microsoft', year: '2023' },
    { name: 'Anti-Money Laundering (AML) Compliance', provider: 'ACAMS', year: '2024' },
    { name: 'Power BI for Business Analytics', provider: 'Microsoft', year: '2023' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 dark:from-slate-900 dark:via-purple-950 dark:to-cyan-950 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-border shadow-lg transition-transform duration-300 hover:scale-105">
                <img
                    src="/assets/profile-main-portrait.jpg"
                    alt="Akimana etienne"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
              </div>

            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all text-sm lg:text-base ${
                    activeSection === section 
                      ? 'text-purple-400 font-semibold' 
                      : 'text-gray-300 hover:text-purple-400'
                  }`}
                >
                  {section}
                </button>
              ))}
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button className="p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden glass-dark border-t border-white/10">
            <div className="px-4 py-4 space-y-2">
              {['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left capitalize py-2 px-4 rounded-lg transition-colors ${
                    activeSection === section 
                      ? 'bg-purple-600/30 text-purple-300 font-semibold' 
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      >
        <ParticleBackground />
        
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/hero-particles-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-left"
            >
              <motion.div variants={staggerItem} className="mb-4">
                <Badge className="bg-purple-600/30 text-purple-300 border-purple-500 mb-4">
                  Available for Opportunities
                </Badge>
              </motion.div>

              <motion.h1 
                variants={glowIn}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
              >
                AKIMANA <span className="gradient-text">Etienne</span>
              </motion.h1>

              <motion.div
                variants={fadeInUp}
                className="mb-6"
              >
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-cyan-300 font-semibold min-h-[3rem] flex items-center">
                  <TypingAnimation
                    texts={['Data Analyst', 'Portfolio Monitoring Officer', 'Agribusiness Insights Specialist', 'Business Intelligence Expert']}
                    className="text-cyan-300"
                    typingSpeed={70}
                    deletingSpeed={35}
                    delayBetweenTexts={2000}
                  />
                </div>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-sm md:text-base lg:text-lg text-gray-300 mb-8 leading-relaxed"
              >
                Transforming complex data into actionable insights for banking excellence and business growth. 
                Specializing in portfolio risk management, business intelligence, and data-driven decision making.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-3 md:gap-4"
              >
                <Button
                  size="lg"
                  className="gradient-purple-cyan text-white animate-glow hover:scale-105 transition-transform"
                  onClick={() => scrollToSection('contact')}
                >
                  <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Get In Touch
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="glass text-white border-white/30 hover:bg-white/20"
                  onClick={() => scrollToSection('projects')}
                >
                  <Briefcase className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  View Projects
                </Button>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-8 md:mt-12 flex gap-4 md:gap-6"
              >
                <div className="text-center">
                  <LiveCounter end={2} suffix="+" className="text-2xl md:text-3xl font-bold text-purple-400" />
                  <div className="text-xs md:text-sm text-gray-400">Years Exp.</div>
                </div>
                <div className="text-center">
                  <LiveCounter end={15} suffix="+" className="text-2xl md:text-3xl font-bold text-cyan-400" />
                  <div className="text-xs md:text-sm text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <LiveCounter end={98} suffix="%" className="text-2xl md:text-3xl font-bold text-purple-400" />
                  <div className="text-xs md:text-sm text-gray-400">Satisfaction</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={heroInView ? { opacity: 1, scale: 0.9 } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.8 }}
              className="relative hidden md:block"
            >
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <img
                  src="/assets/profile-main-portrait.jpg"
                  alt="Etienne Akimana"
                  className="relative rounded-2xl shadow-2xl border-4 border-purple-500/30 animate-float w-full"
                />
                <div className="absolute -bottom-4 -right-4 glass-dark p-4 md:p-6 rounded-xl border border-purple-500/30">
                  <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-cyan-400 mb-2" />
                  <div className="text-xl md:text-2xl font-bold text-white">Top 5%</div>
                  <div className="text-xs md:text-sm text-gray-400">Data Analysts</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-cyan-100/50 dark:from-purple-900/20 dark:to-cyan-900/20"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedStats stats={stats} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-16 md:py-20 bg-gradient-to-br from-white to-purple-50 dark:from-slate-900 dark:to-purple-950/30">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={aboutInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">About Me</h2>
            <div className="text-base md:text-xl text-gray-600 dark:text-gray-400 min-h-[3rem] flex items-center justify-center px-4">
              <TypingAnimation
                texts={['Passionate about data-driven decision making', 'Committed to excellence in banking analytics', 'Transforming insights into business value']}
                typingSpeed={60}
                deletingSpeed={30}
                delayBetweenTexts={2500}
              />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
            <motion.div
              initial="hidden"
              animate={aboutInView ? 'visible' : 'hidden'}
              variants={slideInLeft}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-2xl opacity-20"></div>
                <img
                  src="/assets/about-working-analytics.jpg"
                  alt="Working on Analytics"
                  className="relative rounded-2xl shadow-2xl border-4 border-purple-200 dark:border-purple-800 hover-lift w-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={aboutInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.p variants={staggerItem} className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I am a dedicated Portfolio Monitoring Officer at Bank of Kigali with a strong background in data
                analysis, business intelligence, and financial services. Currently pursuing an MBA at the University
                of Rwanda, I combine academic excellence with practical expertise.
              </motion.p>

              <motion.p variants={staggerItem} className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                My expertise spans advanced Excel modeling, Power BI dashboard development, and comprehensive
                portfolio risk assessment. I'm passionate about leveraging data analytics to drive strategic
                decision-making in banking and agribusiness sectors.
              </motion.p>

              <motion.div variants={staggerItem} className="grid grid-cols-2 gap-4 pt-4">
                <Card className="border-2 border-purple-200 dark:border-purple-800 hover-lift dark:bg-slate-800">
                  <CardContent className="pt-6 text-center">
                    <Users className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">Team Player</div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Collaborative</div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-cyan-200 dark:border-cyan-800 hover-lift dark:bg-slate-800">
                  <CardContent className="pt-6 text-center">
                    <Target className="h-8 w-8 text-cyan-600 dark:text-cyan-400 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">Goal-Oriented</div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Results-Driven</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={staggerItem} className="flex gap-4 pt-4">
                <Button variant="outline" size="icon" className="hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-400 transition-all">
                  <Linkedin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-400 transition-all">
                  <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Performance Chart */}
          <motion.div
            initial="hidden"
            animate={aboutInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="mt-12"
          >
            <Card className="border-2 border-purple-200 dark:border-purple-800 dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-center text-2xl gradient-text">Skills Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedChart data={performanceData} title="Technical Proficiency Levels" />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Skills Section with Animated Bars */}
      <section id="skills" ref={skillsRef} className="py-16 md:py-20 bg-gradient-to-br from-purple-900 to-slate-900 text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={skillsInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Skills & Expertise</h2>
            <div className="text-base md:text-xl text-cyan-300 min-h-[3rem] flex items-center justify-center px-4">
              <TypingAnimation
                texts={['Technical proficiency meets business acumen', 'Driving results through data excellence', 'Mastering the art of analytics']}
                typingSpeed={60}
                deletingSpeed={30}
                delayBetweenTexts={2500}
              />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
            <motion.div
              initial="hidden"
              animate={skillsInView ? 'visible' : 'hidden'}
              variants={slideInLeft}
              className="glass p-6 md:p-8 rounded-2xl"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-cyan-400" />
                Technical Skills
              </h3>
              {technicalSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  skill={skill.skill}
                  percentage={skill.percentage}
                  delay={index * 100}
                />
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              animate={skillsInView ? 'visible' : 'hidden'}
              variants={slideInRight}
              className="glass p-6 md:p-8 rounded-2xl"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                Professional Skills
              </h3>
              <div className="space-y-6">
                {['Problem Solving', 'Communication', 'Leadership', 'Adaptability', 'Innovation', 'Teamwork'].map((skill, index) => (
                  <SkillBar
                    key={index}
                    skill={skill}
                    percentage={90 + Math.floor(Math.random() * 10)}
                    delay={index * 100}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Portfolio Growth Chart */}
          <motion.div
            initial="hidden"
            animate={skillsInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="glass p-6 md:p-8 rounded-2xl"
          >
            <LineChartAnimated 
              data={portfolioGrowth} 
              labels={growthLabels}
              color="#06b6d4"
              title="Portfolio Performance Growth (2024)"
            />
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={experienceRef} className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={experienceInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">Professional Experience</h2>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-400">My journey in banking and education</p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={experienceInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="space-y-6 md:space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="hover-lift border-l-4 border-l-purple-600 dark:bg-slate-800 dark:border-l-purple-500">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl md:text-2xl mb-2 dark:text-gray-100">{exp.title}</CardTitle>
                        <CardDescription className="text-base md:text-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-purple-600 dark:text-purple-400" />
                            <span className="font-semibold text-gray-700 dark:text-gray-300">{exp.company}</span>
                          </div>
                          <Badge variant="outline" className="mb-4 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300">
                            {exp.period}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      <div className="font-semibold text-purple-700 dark:text-purple-400 text-sm">Key Achievements:</div>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-16 md:py-20 bg-gradient-to-br from-purple-50 to-cyan-50 dark:from-purple-950/30 dark:to-cyan-950/30">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={projectsInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">Featured Projects</h2>
            <div className="text-base md:text-xl text-gray-600 dark:text-gray-400 min-h-[3rem] flex items-center justify-center px-4">
              <TypingAnimation
                texts={['Innovative solutions for complex challenges', 'Data-driven projects that make an impact', 'Transforming businesses through analytics']}
                typingSpeed={60}
                deletingSpeed={30}
                delayBetweenTexts={2500}
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={projectsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full hover-lift overflow-hidden group border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-700 dark:bg-slate-800">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl dark:text-gray-100">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="border-t dark:border-slate-700 pt-3">
                        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Impact Metrics:</div>
                        <div className="flex flex-wrap gap-2">
                          {project.metrics.map((metric, i) => (
                            <Badge key={i} variant="outline" className="text-xs border-cyan-300 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" ref={educationRef} className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={educationInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">Education & Certifications</h2>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-400">Continuous learning and professional development</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial="hidden"
              animate={educationInView ? 'visible' : 'hidden'}
              variants={slideInLeft}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2 dark:text-gray-100">
                <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-purple-600 dark:text-purple-400" />
                Academic Degrees
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-600 dark:border-l-purple-500 hover-lift dark:bg-slate-800">
                    <CardHeader>
                      <CardTitle className="text-lg md:text-xl dark:text-gray-100">{edu.degree}</CardTitle>
                      <CardDescription>
                        <div className="space-y-2">
                          <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm md:text-base">{edu.institution}</p>
                          <p className="text-sm text-purple-600 dark:text-purple-400">{edu.focus}</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="text-xs border-purple-300 dark:border-purple-700">{edu.period}</Badge>
                            <Badge variant={edu.status === 'Completed' ? 'default' : 'secondary'} className="text-xs bg-purple-600 dark:bg-purple-700">
                              {edu.status}
                            </Badge>
                          </div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={educationInView ? 'visible' : 'hidden'}
              variants={slideInRight}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2 dark:text-gray-100">
                <Award className="h-6 w-6 md:h-8 md:w-8 text-cyan-600 dark:text-cyan-400" />
                Professional Certifications
              </h3>
              <motion.div variants={staggerContainer} className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div key={index} variants={staggerItem}>
                    <Card className="hover-lift border-2 border-transparent hover:border-cyan-300 dark:hover:border-cyan-700 dark:bg-slate-800">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900/50 dark:to-cyan-900/50 flex items-center justify-center flex-shrink-0">
                            <Code className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium mb-1 break-words">{cert.name}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                              <span className="break-words">{cert.provider}</span>
                              <span>•</span>
                              <span>{cert.year}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-16 md:py-20 bg-gradient-to-br from-purple-900 via-slate-900 to-cyan-900 text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={contactInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Get In Touch</h2>
            <div className="text-base md:text-xl text-cyan-300 min-h-[3rem] flex items-center justify-center px-4">
              <TypingAnimation
                texts={["Let's collaborate on your next project", "Ready to transform data into insights", "Available for consulting and opportunities"]}
                typingSpeed={60}
                deletingSpeed={30}
                delayBetweenTexts={2500}
              />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial="hidden"
              animate={contactInView ? 'visible' : 'hidden'}
              variants={slideInLeft}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 glass p-4 rounded-lg hover-lift">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-cyan-300">Email</div>
                      <div className="font-semibold text-sm md:text-base break-all">aketiennes@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 glass p-4 rounded-lg hover-lift">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm text-cyan-300">Phone</div>
                      <div className="font-semibold text-sm md:text-base">+250 780 047 409</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 glass p-4 rounded-lg hover-lift">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm text-cyan-300">Location</div>
                      <div className="font-semibold text-sm md:text-base">Kigali, Rwanda</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">Connect With Me</h3>
                <div className="flex gap-4">
                  <Button size="lg" className="glass border-white/90 hover:bg-white/50 transition-all hover:scale-110">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button size="lg" className="glass border-white/90 hover:bg-white/50 transition-all hover:scale-110">
                    <Download className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={contactInView ? 'visible' : 'hidden'}
              variants={slideInRight}
            >
              <Card className="glass border-white/20 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="text-white text-lg md:text-xl">Send a Message</CardTitle>
                  <CardDescription className="text-cyan-200 text-sm md:text-base">
                    I'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      className="glass border-white/30 text-white placeholder:text-cyan-200/70"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="glass border-white/30 text-white placeholder:text-cyan-200/70"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={5}
                      className="glass border-white/30 text-white placeholder:text-cyan-200/70"
                    />
                  </div>
                  <Button className="w-full gradient-purple-cyan text-white hover:scale-105 transition-transform" size="lg">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-8 border-t border-purple-900/30">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm md:text-base">
            © 2024 AKIMANA Etienne. All rights reserved. Built with passion and precision.
          </p>
        </div>
      </footer>
    </div>
  );
}