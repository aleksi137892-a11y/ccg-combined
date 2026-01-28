import { Link, LinkProps } from "react-router-dom";
import { useLocalizedNavigation } from "@/hooks/use-localized-navigation";

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
}

/**
 * A Link component that automatically handles language context.
 * Use this for all internal navigation to ensure language is preserved.
 */
export const LocalizedLink = ({ to, children, ...props }: LocalizedLinkProps) => {
  const { getLocalizedPath } = useLocalizedNavigation();
  
  return (
    <Link to={getLocalizedPath(to)} {...props}>
      {children}
    </Link>
  );
};
