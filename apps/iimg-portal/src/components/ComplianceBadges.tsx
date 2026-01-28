interface ComplianceBadgesProps {
  className?: string;
}

export const ComplianceBadges = ({ className = "" }: ComplianceBadgesProps) => {
  return (
    <p className={`text-xs text-muted-foreground ${className}`}>
      Berkeley Protocol compliant · End-to-end encrypted
    </p>
  );
};
