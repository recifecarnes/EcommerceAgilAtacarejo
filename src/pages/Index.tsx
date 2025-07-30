import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Award, Truck, Clock, Users, Star, Shield, Phone } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Produtos de alta qualidade selecionados criteriosamente para garantir a melhor experiência"
    },
    {
      icon: Truck,
      title: "Entrega Rápida", 
      description: "Logística eficiente com frota própria para entregas pontuais em todo o estado"
    },
    {
      icon: Clock,
      title: "Atendimento Especializado",
      description: "Equipe técnica especializada para orientar na escolha dos melhores produtos"
    },
    {
      icon: Shield,
      title: "Certificações",
      description: "Todos os produtos seguem rigorosos padrões de qualidade e certificações sanitárias"
    }
  ];

  const categories = [
    {
      title: "Bovinos",
      description: "Carnes bovinas premium com cortes especiais e tradicionais",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/produtos/bovinos",
      products: "30+ produtos"
    },
    {
      title: "Suínos", 
      description: "Cortes suínos frescos e defumados de origem controlada",
      image: "https://images.unsplash.com/photo-1549741027-df05c532d3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/produtos/suinos",
      products: "25+ produtos"
    },
    {
      title: "Frios & Embutidos",
      description: "Frios artesanais e embutidos de alta qualidade",
      image: "https://images.unsplash.com/photo-1599909533835-8b8a9dbf6e24?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/produtos/frios",
      products: "40+ produtos"
    }
  ];

  const stats = [
    { number: "15+", label: "Anos de Experiência" },
    { number: "500+", label: "Clientes Ativos" },
    { number: "95+", label: "Tipos de Produtos" },
    { number: "24h", label: "Atendimento" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Ágil</span>
              <span className="text-primary block">Distribuidora</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold text-primary">Atacarejo de Frios</span> - Especializada em distribuição de carnes bovinas, suínas e frios de alta qualidade
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto opacity-90">
              Fornecendo produtos premium para restaurantes, açougues e estabelecimentos comerciais em todo o estado de São Paulo
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" variant="premium" className="text-lg px-8 py-4" asChild>
                <a href="/produtos">
                  Ver Produtos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-black backdrop-blur-sm text-lg px-8 py-4" asChild>
                <a href="tel:551129023222">
                  <Phone className="mr-2 h-5 w-5" />
                  (11) 2902-3222
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Por que escolher a Ágil?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Mais de 15 anos de comprometimento com a excelência em cada etapa do processo, 
              desde a seleção dos fornecedores até a entrega final
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group text-center p-8 hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 bg-gradient-card border-none animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500" />
                    <feature.icon className="relative h-16 w-16 text-primary mx-auto group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Nossos Produtos</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Linha completa de produtos selecionados para atender todas as necessidades do seu negócio. 
              Qualidade garantida e procedência certificada
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 border-none bg-gradient-card animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {category.products}
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{category.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300" 
                    asChild
                  >
                    <a href={category.link}>
                      Ver Produtos
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para conhecer nossos produtos?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Entre em contato conosco e descubra como podemos atender às necessidades do seu negócio 
              com produtos de qualidade superior e atendimento especializado
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
                <a href="/produtos">
                  <Star className="mr-2 h-5 w-5" />
                  Ver Catálogo Completo
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm text-lg px-8 py-4" asChild>
                <a href="https://api.whatsapp.com/send?phone=5511988114953">
                  <Phone className="mr-2 h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
