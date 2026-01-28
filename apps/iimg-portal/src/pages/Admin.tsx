import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, CheckCircle, AlertCircle, FileText, Printer, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { downloadEnglishContent, downloadSiteMarkdown } from "@/lib/english-content";

const Admin = () => {
  const [loading, setLoading] = useState(false);
const [loadingEnglish, setLoadingEnglish] = useState(false);
  const [loadingMarkdown, setLoadingMarkdown] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [englishStatus, setEnglishStatus] = useState<"idle" | "success" | "error">("idle");
  const [markdownStatus, setMarkdownStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setLoading(true);
    setStatus("idle");
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("admin-export");

      if (fnError) throw fnError;

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `export-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Export failed");
    } finally {
      setLoading(false);
    }
  };

const handleEnglishExport = () => {
    setLoadingEnglish(true);
    setEnglishStatus("idle");

    try {
      downloadEnglishContent();
      setEnglishStatus("success");
    } catch (err: any) {
      setEnglishStatus("error");
    } finally {
      setLoadingEnglish(false);
    }
  };

  const handleMarkdownExport = () => {
    setLoadingMarkdown(true);
    setMarkdownStatus("idle");

    try {
      downloadSiteMarkdown();
      setMarkdownStatus("success");
    } catch (err: any) {
      setMarkdownStatus("error");
    } finally {
      setLoadingMarkdown(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto pt-20"
      >
        <h1 className="font-display text-2xl mb-2 text-foreground">Admin</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Export database content and language files
        </p>

        <div className="space-y-4">
          {/* Database Export */}
          <div className="space-y-2">
            <Button
              onClick={handleExport}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export All Database Data
                </>
              )}
            </Button>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-green-600 dark:text-green-400"
              >
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Export downloaded successfully</span>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-destructive"
              >
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}
          </div>

          {/* English Content & Protocols Export */}
          <div className="space-y-2 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Content & intake protocols export
            </p>
            <Button
              onClick={handleEnglishExport}
              disabled={loadingEnglish}
              variant="outline"
              className="w-full"
              size="lg"
            >
              {loadingEnglish ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Export English Content & Protocols
                </>
              )}
            </Button>

            {englishStatus === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-green-600 dark:text-green-400"
              >
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">English content & protocols exported</span>
              </motion.div>
            )}

            {englishStatus === "error" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-destructive"
              >
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Export failed</span>
              </motion.div>
            )}
          </div>

{/* Markdown Export */}
          <div className="space-y-2 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Full site content as Markdown
            </p>
            <Button
              onClick={handleMarkdownExport}
              disabled={loadingMarkdown}
              variant="outline"
              className="w-full"
              size="lg"
            >
              {loadingMarkdown ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <FileDown className="mr-2 h-4 w-4" />
                  Export Site Content (Markdown)
                </>
              )}
            </Button>

            {markdownStatus === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-green-600 dark:text-green-400"
              >
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Markdown file downloaded</span>
              </motion.div>
            )}

            {markdownStatus === "error" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-destructive"
              >
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Export failed</span>
              </motion.div>
            )}
          </div>

          {/* Print Protocol Document */}
          <div className="space-y-2 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Printable protocol document (PDF)
            </p>
            <Button
              onClick={() => window.open('/protocols-export', '_blank')}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print Protocol Document (PDF)
            </Button>
            <p className="text-xs text-muted-foreground italic">
              Opens in new window with CCG branding. Use browser print to save as PDF.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;
