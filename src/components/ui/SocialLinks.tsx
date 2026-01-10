import { companyProfile } from "@/data/companyProfile";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const iconMap: Record<string, React.ReactNode> = {
  LinkedIn: <FaLinkedin size={18} />,
  GitHub: <FaGithub size={18} />,
  LeetCode: <SiLeetcode size={18} />,
  WhatsApp: <FaWhatsapp size={18} />,
  Instagram: <FaInstagram size={18} />,
  Facebook: <FaFacebook size={18} />,
  GoogleMaps: <FaMapMarkerAlt size={18} />,
};

const SocialLinks = () => {
  return (
    <nav aria-label="Social links">
      <ul className="flex items-center gap-4">
        {companyProfile.socialLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2
                text-sm font-medium
                text-gray-600 hover:text-blue-600
                transition-colors
                dark:text-gray-400 dark:hover:text-blue-400
              "
            >
              <span className="text-lg">
                {iconMap[link.label] ?? <span aria-hidden>•</span>}
              </span>
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SocialLinks;
