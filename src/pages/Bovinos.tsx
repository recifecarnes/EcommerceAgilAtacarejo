import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Bovinos = () => {
  const products = [
    {
      id: "acem",
      title: "Acém Bovino",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/acem"
    },
    {
      id: "alcatra",
      title: "Alcatra com Maminha", 
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/alcatra"
    },
    {
      id: "bucho-fatiado",
      title: "Bucho Bovino Fatiado",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      link: "/produtos/bovinos/bucho-fatiado"
    },
    {
      id: "bucho-inteiro",
      title: "Bucho Bovino Inteiro",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/bucho-inteiro"
    },
    {
      id: "carne-moida-a", 
      title: "Carne Moída A",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/carne-moida-a"
    },
    {
      id: "carne-moida-acem",
      title: "Carne Moída Acém", 
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/carne-moida-acem"
    },
    {
      id: "carne-moida-patinho",
      title: "Carne Moída Patinho",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/carne-moida-patinho"
    },
    {
      id: "contra-file",
      title: "Contra Filé Bovino Sem Osso",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/contra-file"
    },
    {
      id: "costela-grill", 
      title: "Costela Bovina Grill",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/costela-grill"
    },
    {
      id: "costela",
      title: "Costela Bovina",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      link: "/produtos/bovinos/costela"
    },
    {
      id: "coxao-duro",
      title: "Coxão Duro Bovino",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/coxao-duro"
    },
    {
      id: "coxao-mole", 
      title: "Coxão Mole Bovino",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/coxao-mole"
    },
    {
      id: "cupim-a",
      title: "Cupim Bovino A", 
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/cupim-a"
    },
    {
      id: "cupim-b",
      title: "Cupim Bovino B",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/cupim-b"
    },
    {
      id: "figado",
      title: "Fígado Bovino", 
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/figado"
    },
    {
      id: "file-mignon",
      title: "Filé Mignon Sem Cordão",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/file-mignon"
    },
    {
      id: "fraldao",
      title: "Fraldão Bovino",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/fraldao"
    },
    {
      id: "fraldinha", 
      title: "Fraldinha Bovina",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/fraldinha"
    },
    {
      id: "lagarto",
      title: "Lagarto Bovino",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/lagarto"
    },
    {
      id: "lombinho",
      title: "Lombinho Bovino",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/lombinho"
    },
    {
      id: "maminha",
      title: "Maminha Bovina",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/maminha"
    },
    {
      id: "miolo-alcatra",
      title: "Miolo de Alcatra Bovina",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/miolo-alcatra"
    },
    {
      id: "musculo",
      title: "Músculo Bovino",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/musculo"
    },
    {
      id: "pacu",
      title: "Pacu Bovino",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/pacu"
    },
    {
      id: "paleta",
      title: "Paleta Bovina com Músculo",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/paleta"
    },
    {
      id: "patinho",
      title: "Patinho Bovino",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/patinho"
    },
    {
      id: "peito",
      title: "Peito Bovino Sem Músculo",
      image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/peito"
    },
    {
      id: "picanha-a",
      title: "Picanha Bovina A",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/picanha-a"
    },
    {
      id: "picanha-importada",
      title: "Picanha Bovina Importada",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/picanha-importada"
    },
    {
      id: "rabo-cortado",
      title: "Rabo Bovino Cortado",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/rabo-cortado"
    },
    {
      id: "rabo-inteiro",
      title: "Rabo Bovino Inteiro",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/produtos/bovinos/rabo-inteiro"
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
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Bovinos</h1>
          <p className="text-xl mb-8">Carnes bovinas premium de alta qualidade</p>
          <Button variant="outline" className="bg-white text-black hover:bg-white/90" asChild>
            <a href="/produtos">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Categorias
            </a>
          </Button>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                link={product.link}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bovinos;