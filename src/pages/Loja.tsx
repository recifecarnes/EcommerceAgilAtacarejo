import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart, Trash2, MessageCircle } from "lucide-react";

// Atualize este número para o WhatsApp oficial da Ágil Distribuidora (formato: 55DDDNÚMERO)
const WHATSAPP_NUMBER = "5599999999999";

type Category = "Bovinos" | "Suínos" | "Aves" | "Frios";

type Product = {
  id: string;
  name: string;
  price: number; // preço por unidade
  unit: "kg" | "unid";
  category: Category;
  image: string;
};

const PRODUCTS: Product[] = [
  { id: "picanha", name: "Picanha Bovina", price: 89.9, unit: "kg", category: "Bovinos", image: "https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?auto=format&fit=crop&w=800&q=80" },
  { id: "alcatra", name: "Alcatra Bovina", price: 59.9, unit: "kg", category: "Bovinos", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80" },
  { id: "costela", name: "Costela Bovina", price: 39.9, unit: "kg", category: "Bovinos", image: "https://images.unsplash.com/photo-1560785496-3c9fc1b7d3c8?auto=format&fit=crop&w=800&q=80" },
  { id: "lombo", name: "Lombo Suíno", price: 29.9, unit: "kg", category: "Suínos", image: "https://images.unsplash.com/photo-1549741027-df05c532d3c5?auto=format&fit=crop&w=800&q=80" },
  { id: "pernil", name: "Pernil Suíno", price: 24.9, unit: "kg", category: "Suínos", image: "https://images.unsplash.com/photo-1604908812831-51b2f2bd6d7f?auto=format&fit=crop&w=800&q=80" },
  { id: "frango-inteiro", name: "Frango Inteiro", price: 12.9, unit: "kg", category: "Aves", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80" },
  { id: "file-peito", name: "Filé de Peito", price: 18.9, unit: "kg", category: "Aves", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" },
  { id: "linguica", name: "Linguiça Toscana", price: 22.9, unit: "kg", category: "Frios", image: "https://images.unsplash.com/photo-1599909533835-8b8a9dbf6e24?auto=format&fit=crop&w=800&q=80" },
  { id: "mortadela", name: "Mortadela", price: 19.9, unit: "kg", category: "Frios", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80" },
];

type Cart = Record<string, number>; // productId -> quantidade

const Loja = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"todas" | Category>("todas");
  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    document.title = "Produtos | Ágil Distribuidora";
    const desc = "Selecione produtos e finalize seu pedido pelo WhatsApp na Ágil Distribuidora.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/produtos/loja");
  }, []);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) =>
      (category === "todas" || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, category]);

  const total = useMemo(() => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) return sum;
      return sum + product.price * qty;
    }, 0);
  }, [cart]);

  const addToCart = (id: string, inc = 1) => {
    setCart((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + inc };
      return next;
    });
    const product = PRODUCTS.find((p) => p.id === id);
    if (product) {
      toast({ title: "Adicionado ao carrinho", description: product.name });
    }
  };

  const updateQty = (id: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0 || Number.isNaN(qty)) delete next[id];
      else next[id] = qty;
      return next;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const finishOnWhatsApp = () => {
    if (!Object.keys(cart).length) return;
    const lines: string[] = [];
    lines.push("Olá, gostaria de fazer um pedido pela Ágil Distribuidora:%0A");
    Object.entries(cart).forEach(([id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === id)!;
      const subtotal = (p.price * qty).toFixed(2).replace(".", ",");
      lines.push(`- ${p.name} x ${qty} ${p.unit} — R$ ${subtotal}`);
    });
    lines.push("");
    lines.push(`Total: R$ ${total.toFixed(2).replace(".", ",")}`);
    lines.push("\nPor favor, confirme disponibilidade e prazo de entrega.");

    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section
        className="relative bg-cover bg-center py-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url('https://images.unsplash.com/photo-1588347818134-8cf0c2c72a87?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Selecione seus produtos</h1>
          <p className="text-lg opacity-90">Monte o carrinho e conclua seu pedido pelo WhatsApp</p>
        </div>
      </section>

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filtros e lista de produtos */}
          <section className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
              <div className="flex-1 max-w-md">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar produto..."
                  aria-label="Buscar produto"
                />
              </div>
              <div className="w-full sm:w-56">
                <Select value={category} onValueChange={(v) => setCategory(v as any)}>
                  <SelectTrigger aria-label="Filtrar por categoria">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas categorias</SelectItem>
                    <SelectItem value="Bovinos">Bovinos</SelectItem>
                    <SelectItem value="Suínos">Suínos</SelectItem>
                    <SelectItem value="Aves">Aves</SelectItem>
                    <SelectItem value="Frios">Frios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <Card key={p.id} className="overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={p.image}
                        alt={`${p.name} - ${p.category}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">{p.name}</h3>
                          <p className="text-sm text-muted-foreground">{p.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-foreground">R$ {p.price.toFixed(2).replace(".", ",")}</div>
                          <div className="text-xs text-muted-foreground">por {p.unit}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <Button className="w-full" onClick={() => addToCart(p.id)}>
                      <ShoppingCart /> Adicionar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Carrinho */}
          <aside className="lg:col-span-4">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-foreground">Seu carrinho</h2>
                {Object.keys(cart).length === 0 ? (
                  <p className="text-muted-foreground">Nenhum item no carrinho.</p>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(cart).map(([id, qty]) => {
                      const p = PRODUCTS.find((x) => x.id === id)!;
                      const subtotal = p.price * qty;
                      return (
                        <div key={id} className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate">{p.name}</p>
                            <p className="text-sm text-muted-foreground">R$ {p.price.toFixed(2).replace(".", ",")} / {p.unit}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button variant="outline" size="icon" aria-label="Diminuir" onClick={() => updateQty(id, Math.max(0, qty - 1))}>
                                <Minus />
                              </Button>
                              <Input
                                type="number"
                                value={qty}
                                min={0}
                                step={1}
                                onChange={(e) => updateQty(id, Number(e.target.value))}
                                className="w-20 text-center"
                                aria-label={`Quantidade de ${p.name}`}
                              />
                              <Button variant="outline" size="icon" aria-label="Aumentar" onClick={() => updateQty(id, qty + 1)}>
                                <Plus />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-foreground">R$ {subtotal.toFixed(2).replace(".", ",")}</div>
                            <Button variant="ghost" size="icon" aria-label="Remover" onClick={() => removeFromCart(id)}>
                              <Trash2 />
                            </Button>
                          </div>
                        </div>
                      );
                    })}

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total</span>
                      <span className="text-2xl font-bold text-foreground">R$ {total.toFixed(2).replace(".", ",")}</span>
                    </div>

                    <Button
                      variant="premium"
                      className="w-full"
                      onClick={finishOnWhatsApp}
                      disabled={!Object.keys(cart).length}
                    >
                      <MessageCircle /> Concluir no WhatsApp
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Loja;
