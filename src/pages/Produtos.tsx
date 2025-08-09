import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";

const Produtos = () => {
  const categories = [
    {
      id: "bovinos",
      title: "Bovinos", 
      description: "Carnes bovinas de alta qualidade",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      href: "/produtos/bovinos"
    },
    {
      id: "suinos", 
      title: "Suínos",
      description: "Cortes suínos frescos e saborosos", 
      image: "https://images.unsplash.com/photo-1549741027-df05c532d3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      href: "/produtos/suinos"
    },
    {
      id: "frios",
      title: "Frios",
      description: "Frios e embutidos artesanais",
      image: "https://images.unsplash.com/photo-1599909533835-8b8a9dbf6e24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      href: "/produtos/frios"
    },
    {
      id: "aves",
      title: "Aves",
      description: "Aves frescas e congeladas",
      image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      href: "/produtos/aves"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero section */}
      <section 
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Produtos</h1>
          <p className="text-xl mb-8">Conheça nossa linha completa de produtos</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button variant="outline" className="bg-white text-black hover:bg-white/90" asChild>
              <a href="/">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Início
              </a>
            </Button>
            <Button variant="premium" asChild>
              <a href="/produtos/loja" aria-label="Selecionar produtos e concluir pedido pelo WhatsApp">
                <MessageCircle className="h-4 w-4" />
                Fazer pedido (WhatsApp)
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories grid */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div key={category.id} className="group cursor-pointer">
                <a href={category.href} className="block">
                  <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Produtos;