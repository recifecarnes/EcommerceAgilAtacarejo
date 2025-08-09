import { useState } from "react";
import { Menu, X, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <a href="mailto:comercial@agildistribuidora.com.br" className="flex items-center hover:opacity-80 transition-opacity">
                <Mail className="h-4 w-4 mr-1" />
                comercial@agildistribuidora.com.br
              </a>
              <a href="tel:551129023222" className="flex items-center hover:opacity-80 transition-opacity">
                <Phone className="h-4 w-4 mr-1" />
                (11) 2902-3222
              </a>
              <a href="https://api.whatsapp.com/send?phone=5511988114953" className="flex items-center hover:opacity-80 transition-opacity">
                <Phone className="h-4 w-4 mr-1" />
                (11) 98811-4953
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-background border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/bc40eff9-34d9-42df-993d-96acbad82bb4.png" 
                alt="Ágil Distribuidora" 
                className="h-12 md:h-16"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </a>
              <a href="/sobre" className="text-foreground hover:text-primary transition-colors font-medium">
                A Ágil
              </a>
              <a href="/produtos" className="text-foreground hover:text-primary transition-colors font-medium">
                Produtos
              </a>
              <a href="/fale-conosco" className="text-foreground hover:text-primary transition-colors font-medium">
                Fale Conosco
              </a>
              <a href="/atendimento" className="text-foreground hover:text-primary transition-colors font-medium">
                Atendimento
              </a>
              <a href="/trabalhe-conosco" className="text-foreground hover:text-primary transition-colors font-medium">
                Trabalhe Conosco
              </a>
              <a href="/admin" className="text-foreground hover:text-primary transition-colors font-medium">
                Admin
              </a>
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden pb-4 border-t">
              <div className="flex flex-col space-y-2 pt-4">
                <a href="/" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Home
                </a>
                <a href="/sobre" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  A Ágil
                </a>
                <a href="/produtos" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Produtos
                </a>
                <a href="/fale-conosco" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Fale Conosco
                </a>
                <a href="/atendimento" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Atendimento
                </a>
                <a href="/trabalhe-conosco" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Trabalhe Conosco
                </a>
                <a href="/admin" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Admin
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;