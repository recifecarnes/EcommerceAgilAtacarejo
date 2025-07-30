import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Award, Truck, Clock, Users } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Produtos de alta qualidade selecionados criteriosamente"
    },
    {
      icon: Truck,
      title: "Entrega Rápida", 
      description: "Logística eficiente para entregas pontuais"
    },
    {
      icon: Clock,
      title: "Atendimento 24h",
      description: "Suporte completo quando você precisar"
    },
    {
      icon: Users,
      title: "Experiência",
      description: "Anos de tradição no mercado de distribuição"
    }
  ];

  const categories = [
    {
      title: "Bovinos",
      description: "Carnes bovinas de primeira qualidade",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/produtos/bovinos"
    },
    {
      title: "Suínos", 
      description: "Cortes suínos frescos e saborosos",
      image: "https://images.unsplash.com/photo-1549741027-df05c532d3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/produtos/suinos"
    },
    {
      title: "Frios",
      description: "Frios e embutidos artesanais",
      image: "https://images.unsplash.com/photo-1599909533835-8b8a9dbf6e24?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      link: "/produtos/frios"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center py-32"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ágil Distribuidora
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Especializada em distribuição de carnes bovinas, suínas e frios de alta qualidade para todo o país
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <a href="/produtos">
                Ver Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-black hover:bg-white/90" asChild>
              <a href="/fale-conosco">Entre em Contato</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher a Ágil?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprometimento com a excelência em cada etapa do processo
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Produtos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Linha completa de produtos para atender todas as suas necessidades
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={category.link}>
                      Ver Produtos
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
