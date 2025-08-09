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
import { Pencil, Plus, Trash2 } from "lucide-react";

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
    <main className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Admin - Gerenciar Produtos e Banners</h1>
        <p className="text-muted-foreground">Interface administrativa (sem persistência) pronta para integrar ao ERP/Supabase futuramente.</p>
      </header>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="banners">Banners</TabsTrigger>
        </TabsList>

        {/* Produtos */}
        <TabsContent value="products">
          <Card className="mt-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Produtos ({productCount})</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={onNewProduct}>
                  <Plus className="h-4 w-4 mr-2" /> Novo produto
                </Button>
              </div>
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

        {/* Banners */}
        <TabsContent value="banners">
          <Card className="mt-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Banners ({banners.length})</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={onNewBanner}>
                  <Plus className="h-4 w-4 mr-2" /> Novo banner
                </Button>
              </div>
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
  );
};

export default Admin;
