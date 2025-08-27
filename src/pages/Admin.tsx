import { useEffect, useMemo, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, Package, Image, TrendingUp, Users, ShoppingCart, Filter, Search, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Types
interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  unit?: string;
  stock?: number;
  image?: string; // data URL for preview while no backend
  active: boolean;
  highlight: boolean;
}

interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  link?: string;
  targetPage?: string;
  order: number;
  active: boolean;
  imageDesktop?: string; // data URL
  imageMobile?: string; // data URL
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

// Helpers
const uid = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const Admin = () => {
  // SEO basic setup
  useEffect(() => {
    document.title = "Admin | Gerenciar Produtos e Banners";
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement("meta");
    metaDesc.setAttribute("name", "description");
    metaDesc.setAttribute("content", "Admin: gerencie produtos e banners da Ágil Distribuidora com segurança e praticidade.");
    document.head.appendChild(metaDesc);

    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", `${window.location.origin}/admin`);
    document.head.appendChild(canonical);
  }, []);

  // In-memory data (mock)
  const [products, setProducts] = useState<Product[]>([
    {
      id: uid(),
      name: "Ração Premium Bovinos 25kg",
      description: "Ração balanceada para bovinos de corte.",
      price: 129.9,
      category: "Bovinos",
      unit: "saco",
      stock: 35,
      active: true,
      highlight: true,
      image: undefined,
    },
  ]);

  const [banners, setBanners] = useState<Banner[]>([
    {
      id: uid(),
      title: "Linha Premium para Bovinos",
      subtitle: "Qualidade Ágil que seu rebanho merece",
      order: 1,
      active: true,
      link: "/produtos/bovinos",
      targetPage: "/",
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: uid(),
      customerName: "João Silva",
      customerEmail: "joao@email.com",
      customerPhone: "(11) 99999-9999",
      items: [
        { productId: "1", productName: "Ração Premium Bovinos 25kg", quantity: 2, price: 129.9 }
      ],
      total: 259.8,
      status: 'processing',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: uid(),
      customerName: "Maria Santos",
      customerEmail: "maria@email.com",
      customerPhone: "(11) 88888-8888",
      items: [
        { productId: "1", productName: "Ração Premium Bovinos 25kg", quantity: 1, price: 129.9 }
      ],
      total: 129.9,
      status: 'delivered',
      createdAt: new Date('2024-01-10'),
    },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: uid(), name: "Bovinos", description: "Produtos para bovinos de corte e leite", active: true },
    { id: uid(), name: "Suínos", description: "Produtos para suinocultura", active: true },
    { id: uid(), name: "Aves", description: "Produtos para avicultura", active: true },
  ]);

  // Dialog state - Products
  const [openProduct, setOpenProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Dialog state - Banners
  const [openBanner, setOpenBanner] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  // Form states - Products
  const [pForm, setPForm] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    unit: "",
    stock: 0,
    active: true,
    highlight: false,
    image: undefined,
  });

  // Form states - Banners
  const [bForm, setBForm] = useState<Banner>({
    id: "",
    title: "",
    subtitle: "",
    link: "",
    targetPage: "/",
    order: 1,
    active: true,
    imageDesktop: undefined,
    imageMobile: undefined,
  });

  const resetProductForm = () => setPForm({ id: "", name: "", description: "", price: 0, category: "", unit: "", stock: 0, active: true, highlight: false, image: undefined });
  const resetBannerForm = () => setBForm({ id: "", title: "", subtitle: "", link: "", targetPage: "/", order: 1, active: true, imageDesktop: undefined, imageMobile: undefined });

  // Handlers - Products
  const onNewProduct = () => {
    setEditingProduct(null);
    resetProductForm();
    setOpenProduct(true);
  };

  const onEditProduct = (p: Product) => {
    setEditingProduct(p);
    setPForm({ ...p });
    setOpenProduct(true);
  };

  const onDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Produto removido");
  };

  const onSubmitProduct = () => {
    if (!pForm.name || pForm.price < 0) {
      toast.error("Preencha ao menos o nome e um preço válido.");
      return;
    }
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...editingProduct, ...pForm, id: editingProduct.id } : p)));
      toast.success("Produto atualizado");
    } else {
      const newProduct: Product = { ...pForm, id: uid() };
      setProducts((prev) => [newProduct, ...prev]);
      toast.success("Produto criado");
    }
    setOpenProduct(false);
    setEditingProduct(null);
  };

  const productCount = useMemo(() => products.length, [products]);

  // Handlers - Banners
  const onNewBanner = () => {
    setEditingBanner(null);
    resetBannerForm();
    setOpenBanner(true);
  };

  const onEditBanner = (b: Banner) => {
    setEditingBanner(b);
    setBForm({ ...b });
    setOpenBanner(true);
  };

  const onDeleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    toast.success("Banner removido");
  };

  const onSubmitBanner = () => {
    if (!bForm.title) {
      toast.error("Informe ao menos o título do banner.");
      return;
    }
    if (editingBanner) {
      setBanners((prev) => prev.map((b) => (b.id === editingBanner.id ? { ...editingBanner, ...bForm, id: editingBanner.id } : b)));
      toast.success("Banner atualizado");
    } else {
      const newBanner: Banner = { ...bForm, id: uid() };
      setBanners((prev) => [newBanner, ...prev]);
      toast.success("Banner criado");
    }
    setOpenBanner(false);
    setEditingBanner(null);
  };

  return (
    <>
      <Header />
      <section className="relative bg-gradient-hero border-b">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Dashboard Administrativo
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Gerencie produtos, banners e acompanhe estatísticas da sua loja
            </p>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="shadow-card hover:shadow-elegant transition-shadow">
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{products.length}</div>
                <div className="text-sm text-muted-foreground">Produtos Ativos</div>
              </CardContent>
            </Card>
            <Card className="shadow-card hover:shadow-elegant transition-shadow">
              <CardContent className="p-6 text-center">
                <Image className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{banners.length}</div>
                <div className="text-sm text-muted-foreground">Banners Criados</div>
              </CardContent>
            </Card>
            <Card className="shadow-card hover:shadow-elegant transition-shadow">
              <CardContent className="p-6 text-center">
                <ShoppingCart className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{orders.length}</div>
                <div className="text-sm text-muted-foreground">Pedidos Totais</div>
              </CardContent>
            </Card>
            <Card className="shadow-card hover:shadow-elegant transition-shadow">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">R$ {orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0).toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Total Vendido</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Categorias
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Banners
            </TabsTrigger>
          </TabsList>

        {/* Dashboard */}
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Vendas Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.filter(o => o.status === 'delivered').slice(0, 3).map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">{order.createdAt.toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">R$ {order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Produtos em Destaque
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.filter(p => p.highlight).slice(0, 3).map((product) => (
                    <div key={product.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Est: {product.stock}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pedidos */}
        <TabsContent value="orders">
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">Pedidos</CardTitle>
                <p className="text-muted-foreground mt-1">{orders.length} pedido{orders.length !== 1 ? 's' : ''} no total</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="order-search">Buscar</Label>
                  <Input id="order-search" placeholder="Cliente, email..." aria-label="Buscar pedidos" />
                </div>
                <div>
                  <Label htmlFor="order-status">Status</Label>
                  <select id="order-status" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Todos os status</option>
                    <option value="pending">Pendente</option>
                    <option value="processing">Processando</option>
                    <option value="shipped">Enviado</option>
                    <option value="delivered">Entregue</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.customerName}</TableCell>
                        <TableCell>{order.customerEmail}</TableCell>
                        <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status === 'pending' ? 'Pendente' :
                             order.status === 'processing' ? 'Processando' :
                             order.status === 'shipped' ? 'Enviado' :
                             order.status === 'delivered' ? 'Entregue' : 'Cancelado'}
                          </span>
                        </TableCell>
                        <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Produtos */}
        <TabsContent value="products">
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">Produtos</CardTitle>
                <p className="text-muted-foreground mt-1">{productCount} produto{productCount !== 1 ? 's' : ''} cadastrado{productCount !== 1 ? 's' : ''}</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 shadow-sm" onClick={onNewProduct}>
                <Plus className="h-4 w-4 mr-2" /> 
                Novo Produto
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="search">Buscar</Label>
                  <Input id="search" placeholder="Nome, categoria..." onChange={() => {}} aria-label="Buscar produtos" />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableCaption>Produtos cadastrado(s) nesta sessão.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Unidade</TableHead>
                      <TableHead>Estoque</TableHead>
                      <TableHead>Ativo</TableHead>
                      <TableHead>Destaque</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>{p.category || "-"}</TableCell>
                        <TableCell>R$ {p.price.toFixed(2)}</TableCell>
                        <TableCell>{p.unit || "-"}</TableCell>
                        <TableCell>{typeof p.stock === "number" ? p.stock : "-"}</TableCell>
                        <TableCell>{p.active ? "Sim" : "Não"}</TableCell>
                        <TableCell>{p.highlight ? "Sim" : "Não"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => onEditProduct(p)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => onDeleteProduct(p.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {products.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-muted-foreground">
                          Nenhum produto cadastrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Dialog Produto */}
          <Dialog open={openProduct} onOpenChange={setOpenProduct}>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Editar produto" : "Novo produto"}</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <Label htmlFor="p-name">Nome*</Label>
                  <Input id="p-name" value={pForm.name} onChange={(e) => setPForm((s) => ({ ...s, name: e.target.value }))} placeholder="Ex.: Ração Premium Bovinos 25kg" />
                </div>
                <div>
                  <Label htmlFor="p-price">Preço*</Label>
                  <Input id="p-price" type="number" step="0.01" value={pForm.price} onChange={(e) => setPForm((s) => ({ ...s, price: parseFloat(e.target.value) || 0 }))} />
                </div>
                <div>
                  <Label htmlFor="p-category">Categoria</Label>
                  <Input id="p-category" value={pForm.category} onChange={(e) => setPForm((s) => ({ ...s, category: e.target.value }))} placeholder="Ex.: Bovinos" />
                </div>
                <div>
                  <Label htmlFor="p-unit">Unidade</Label>
                  <Input id="p-unit" value={pForm.unit} onChange={(e) => setPForm((s) => ({ ...s, unit: e.target.value }))} placeholder="Ex.: saco, cx, un" />
                </div>
                <div>
                  <Label htmlFor="p-stock">Estoque</Label>
                  <Input id="p-stock" type="number" value={pForm.stock ?? 0} onChange={(e) => setPForm((s) => ({ ...s, stock: parseInt(e.target.value) || 0 }))} />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <Label htmlFor="p-desc">Descrição</Label>
                  <Textarea id="p-desc" value={pForm.description} onChange={(e) => setPForm((s) => ({ ...s, description: e.target.value }))} placeholder="Detalhes do produto..." />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <Label htmlFor="p-image">Imagem</Label>
                  <div className="flex items-center gap-3">
                    <Input id="p-image" type="file" accept="image/*" onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        const data = await readFileAsDataURL(f);
                        setPForm((s) => ({ ...s, image: data }));
                      }
                    }} />
                    <Button type="button" variant="outline" onClick={() => setPForm((s) => ({ ...s, image: undefined }))}>
                      Remover
                    </Button>
                  </div>
                  {pForm.image && (
                    <div className="mt-3">
                      <img src={pForm.image} alt={`${pForm.name || "produto"} - pré-visualização`} className="h-28 w-28 object-cover rounded-md border" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Switch id="p-active" checked={pForm.active} onCheckedChange={(v) => setPForm((s) => ({ ...s, active: v }))} />
                  <Label htmlFor="p-active">Ativo</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="p-highlight" checked={pForm.highlight} onCheckedChange={(v) => setPForm((s) => ({ ...s, highlight: v }))} />
                  <Label htmlFor="p-highlight">Destaque</Label>
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setOpenProduct(false)}>Cancelar</Button>
                <Button onClick={onSubmitProduct}>{editingProduct ? "Salvar alterações" : "Criar produto"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Categorias */}
        <TabsContent value="categories">
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">Categorias</CardTitle>
                <p className="text-muted-foreground mt-1">{categories.length} categoria{categories.length !== 1 ? 's' : ''} cadastrada{categories.length !== 1 ? 's' : ''}</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 shadow-sm">
                <Plus className="h-4 w-4 mr-2" /> 
                Nova Categoria
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Produtos</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>{products.filter(p => p.category === category.name).length} produtos</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            category.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {category.active ? 'Ativa' : 'Inativa'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Banners */}
        <TabsContent value="banners">
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">Banners</CardTitle>
                <p className="text-muted-foreground mt-1">{banners.length} banner{banners.length !== 1 ? 's' : ''} cadastrado{banners.length !== 1 ? 's' : ''}</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 shadow-sm" onClick={onNewBanner}>
                <Plus className="h-4 w-4 mr-2" /> 
                Novo Banner
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableCaption>Banners desta sessão.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead>Página</TableHead>
                      <TableHead>Ordem</TableHead>
                      <TableHead>Ativo</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {banners.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.title}</TableCell>
                        <TableCell className="truncate max-w-[220px]">{b.link || "-"}</TableCell>
                        <TableCell>{b.targetPage || "-"}</TableCell>
                        <TableCell>{b.order}</TableCell>
                        <TableCell>{b.active ? "Sim" : "Não"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => onEditBanner(b)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => onDeleteBanner(b.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {banners.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                          Nenhum banner cadastrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Dialog Banner */}
          <Dialog open={openBanner} onOpenChange={setOpenBanner}>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingBanner ? "Editar banner" : "Novo banner"}</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <Label htmlFor="b-title">Título*</Label>
                  <Input id="b-title" value={bForm.title} onChange={(e) => setBForm((s) => ({ ...s, title: e.target.value }))} placeholder="Ex.: Linha Premium para Bovinos" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <Label htmlFor="b-sub">Subtítulo</Label>
                  <Input id="b-sub" value={bForm.subtitle} onChange={(e) => setBForm((s) => ({ ...s, subtitle: e.target.value }))} placeholder="Mensagem secundária" />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="b-link">Link</Label>
                    <Input id="b-link" value={bForm.link} onChange={(e) => setBForm((s) => ({ ...s, link: e.target.value }))} placeholder="Ex.: /produtos/bovinos ou https://..." />
                  </div>
                  <div>
                    <Label htmlFor="b-page">Página de destino</Label>
                    <Input id="b-page" value={bForm.targetPage} onChange={(e) => setBForm((s) => ({ ...s, targetPage: e.target.value }))} placeholder="Ex.: /" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="b-order">Ordem</Label>
                  <Input id="b-order" type="number" value={bForm.order} onChange={(e) => setBForm((s) => ({ ...s, order: parseInt(e.target.value) || 1 }))} />
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="b-active" checked={bForm.active} onCheckedChange={(v) => setBForm((s) => ({ ...s, active: v }))} />
                  <Label htmlFor="b-active">Ativo</Label>
                </div>

                <div className="md:col-span-2">
                  <Label>Imagem Desktop</Label>
                  <div className="flex items-center gap-3">
                    <Input type="file" accept="image/*" onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        const data = await readFileAsDataURL(f);
                        setBForm((s) => ({ ...s, imageDesktop: data }));
                      }
                    }} />
                    <Button type="button" variant="outline" onClick={() => setBForm((s) => ({ ...s, imageDesktop: undefined }))}>Remover</Button>
                  </div>
                  {bForm.imageDesktop && (
                    <div className="mt-3">
                      <img src={bForm.imageDesktop} alt={`Banner desktop - pré-visualização`} className="h-28 w-full object-cover rounded-md border" />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label>Imagem Mobile</Label>
                  <div className="flex items-center gap-3">
                    <Input type="file" accept="image/*" onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        const data = await readFileAsDataURL(f);
                        setBForm((s) => ({ ...s, imageMobile: data }));
                      }
                    }} />
                    <Button type="button" variant="outline" onClick={() => setBForm((s) => ({ ...s, imageMobile: undefined }))}>Remover</Button>
                  </div>
                  {bForm.imageMobile && (
                    <div className="mt-3">
                      <img src={bForm.imageMobile} alt={`Banner mobile - pré-visualização`} className="h-28 w-40 object-cover rounded-md border" />
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setOpenBanner(false)}>Cancelar</Button>
                <Button onClick={onSubmitBanner}>{editingBanner ? "Salvar alterações" : "Criar banner"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </main>
    <Footer />
  </>
  );
};

export default Admin;
