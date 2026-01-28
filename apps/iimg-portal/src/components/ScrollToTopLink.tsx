import { Link, LinkProps } from "react-router-dom";
import { forwardRef } from "react";

/**
 * A Link component that scrolls to top when clicked
 */
export const ScrollToTopLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Immediate scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      onClick?.(e);
    };

    return <Link ref={ref} onClick={handleClick} {...props} />;
  }
);

ScrollToTopLink.displayName = "ScrollToTopLink";
