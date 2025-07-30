import { Phone, Mail, Facebook, Instagram, Linkedin, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground">
      {/* Download section */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Baixe nosso Catálogo completo!
          </h2>
          <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
            Download
          </Button>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div className="text-center md:text-left">
            <img 
              src="/lovable-uploads/bc40eff9-34d9-42df-993d-96acbad82bb4.png" 
              alt="Ágil Distribuidora" 
              className="h-16 mx-auto md:mx-0 mb-4"
            />
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Rua Exemplo, 1949</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <span>Vila Exemplo – São Paulo – SP</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <span>CEP 02052-020</span>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="text-center">
            <h3 className="font-semibold mb-4">Contato</h3>
            <div className="space-y-2">
              <a href="mailto:comercial@agildistribuidora.com.br" className="flex items-center justify-center hover:text-primary transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                comercial@agildistribuidora.com.br
              </a>
              <a href="tel:551129023222" className="flex items-center justify-center hover:text-primary transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                (11) 2902-3222
              </a>
              <a href="https://api.whatsapp.com/send?phone=5511988114953" className="flex items-center justify-center hover:text-primary transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                (11) 98811-4953
              </a>
            </div>
          </div>

          {/* Social media */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold mb-4">Redes Sociais</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="p-2 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-sm">
            <p>
              Ágil Distribuidora Comercio, Importação e Exportação LTDA.
            </p>
            <p className="mt-1">
              CNPJ: 44.077.378/0001-69
            </p>
            <p className="mt-2">
              Copyright© 2024 – Ágil Distribuidora | Todos os Direitos Reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;