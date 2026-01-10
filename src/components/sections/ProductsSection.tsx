import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { products } from "@/data/products";
import ProductCard from "@/components/cards/ProductsCard";

const ProductsSection = () => {
  return (
    <section id="products" className="py-20">
      <Container>
        <SectionTitle
          title="Popular Products"
          subtitle="Top-selling home appliances trusted by customers"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProductsSection;
