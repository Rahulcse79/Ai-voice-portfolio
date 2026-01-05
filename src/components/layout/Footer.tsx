import Container from "@/components/layout/Container";
import SocialLinks from "@/components/ui/SocialLinks";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-40 border-t border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80">
      <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <SocialLinks />
      </Container>
    </footer>
  );
};

export default Footer;
