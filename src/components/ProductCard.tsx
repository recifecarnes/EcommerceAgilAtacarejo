import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  title: string;
  link: string;
}

const ProductCard = ({ image, title, link }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardContent>
      <CardFooter className="p-6 text-center">
        <div className="w-full">
          <h3 className="font-semibold text-lg mb-3 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <Button variant="outline" className="w-full" asChild>
            <a href={link}>Detalhes</a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;