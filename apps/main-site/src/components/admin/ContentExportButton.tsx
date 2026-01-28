import { useState } from 'react';
import { Download, FileJson, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadContentJSON } from '@/lib/contentExport';
import { toast } from '@/hooks/use-toast';

interface ContentExportButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showIcon?: boolean;
  minified?: boolean;
  className?: string;
}

export const ContentExportButton = ({
  variant = 'outline',
  size = 'default',
  showIcon = true,
  minified = false,
  className
}: ContentExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 300));
      downloadContentJSON(minified);
      
      toast({
        title: "Content exported",
        description: `Downloaded sabcho-content${minified ? '.min' : ''}.json successfully.`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Unable to generate content export. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleExport}
      disabled={isExporting}
      className={className || "gap-2"}
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : showIcon ? (
        <FileJson className="h-4 w-4" />
      ) : null}
      {size !== 'icon' && (
        <span>{isExporting ? 'Exporting...' : 'Export Content JSON'}</span>
      )}
    </Button>
  );
};

export default ContentExportButton;
