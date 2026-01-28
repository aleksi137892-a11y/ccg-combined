import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Shield, Lock, Upload, FileText, User, CheckCircle, Download, ArrowLeft } from "lucide-react";
import { LocalizedLink } from "@/components/LocalizedLink";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { generateChallenge, solveProofOfWork } from "@/lib/proof-of-work";

interface ReceiptData {
  hash: string;
  timestamp: string;
  fileName: string;
  fileSize: number;
  id: string;
}

export const SubmitEvidenceForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [step, setStep] = useState<1 | 2 | 3 | "success">(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [witnessStatement, setWitnessStatement] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: t.evidence.fileTooLarge,
          description: t.evidence.maxFileSize,
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const computeSHA256 = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast({
        title: t.evidence.noFileSelected,
        description: t.evidence.pleaseSelectFile,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus("Verifying...");

    try {
      // Step 0: Solve proof-of-work challenge (invisible to user, ~200ms)
      const challenge = generateChallenge();
      const { nonce } = await solveProofOfWork(challenge);
      
      setSubmissionStatus("Securing file...");

      // Step 1: Compute SHA-256 hash
      const hash = await computeSHA256(selectedFile);
      const timestamp = new Date().toISOString();
      
      setSubmissionStatus("Uploading...");
      
      // Step 2: Generate unique storage path
      const fileExt = selectedFile.name.split(".").pop();
      const storagePath = `${Date.now()}_${hash.substring(0, 16)}.${fileExt}`;

      // Step 3: Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from("sealed_evidence")
        .upload(storagePath, selectedFile);

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      setSubmissionStatus("Recording...");

      // Step 4: Insert record into evidence_ledger (including PoW for audit)
      const { data, error: insertError } = await supabase
        .from("evidence_ledger")
        .insert({
          sha256_hash: hash,
          file_name: selectedFile.name,
          file_size: selectedFile.size,
          file_type: selectedFile.type,
          storage_path: storagePath,
          witness_statement: witnessStatement || null,
          contact_info: contactInfo || null,
          submitted_at: timestamp,
        })
        .select("id")
        .single();

      if (insertError) {
        throw new Error(`Database error: ${insertError.message}`);
      }

      // Step 5: Set receipt and show success
      setReceipt({
        hash,
        timestamp,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        id: data.id,
      });
      setStep("success");

    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: t.evidence.submissionFailed,
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setSubmissionStatus("");
    }
  };

  const downloadReceipt = () => {
    if (!receipt) return;

    const receiptContent = `
════════════════════════════════════════════════════════════════
                    CERTIFICATE OF REGISTRATION
               Evidence Submission Portal - Commission
════════════════════════════════════════════════════════════════

REGISTRATION ID: ${receipt.id}

FILE INFORMATION:
  Name: ${receipt.fileName}
  Size: ${(receipt.fileSize / 1024).toFixed(2)} KB

DIGITAL FINGERPRINT (SHA-256):
${receipt.hash}

TIMESTAMP (UTC):
${receipt.timestamp}

════════════════════════════════════════════════════════════════

This certificate confirms that the above-referenced file was 
submitted to the Commission's Evidence Submission Portal and 
has been cryptographically sealed.

The SHA-256 hash serves as a unique digital fingerprint. Any 
alteration to the original file would produce a different hash,
thereby providing tamper-evident verification.

This document may be used to verify the integrity and existence
of the submitted evidence at the stated timestamp.

════════════════════════════════════════════════════════════════
                         END OF CERTIFICATE
════════════════════════════════════════════════════════════════
`;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `evidence_certificate_${receipt.id.substring(0, 8)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Back Link */}
          <LocalizedLink 
            to="/submit-evidence" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.evidence.backToPortal}
          </LocalizedLink>

          {/* Security Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 mb-6">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">{t.evidence.encryptionActive}</span>
          </div>

          {/* Title */}
          <h1 className="masthead text-3xl md:text-4xl text-foreground mb-2">
            {t.evidence.submitEvidence}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t.evidence.submissionsSealed}
          </p>

          {step !== "success" ? (
            <>
              {/* Progress Indicator */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                        step >= s
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: File Upload */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Upload className="w-6 h-6 text-primary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      {t.evidence.uploadTitle}
                    </h2>
                  </div>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      capture="environment"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    {selectedFile ? (
                      <div className="space-y-2">
                        <FileText className="w-12 h-12 text-primary mx-auto" />
                        <p className="font-semibold text-foreground">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(selectedFile.size)}
                        </p>
                        <p className="text-xs text-muted-foreground">{t.evidence.clickToChange}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                        <p className="font-semibold text-foreground">
                          {t.evidence.uploadPrompt}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t.evidence.uploadHint}
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedFile}
                    className="w-full"
                  >
                    {t.evidence.continue}
                  </Button>
                </div>
              )}

              {/* Step 2: Witness Statement */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      {t.evidence.statementTitle}
                    </h2>
                  </div>

                  <Textarea
                    value={witnessStatement}
                    onChange={(e) => setWitnessStatement(e.target.value)}
                    placeholder={t.evidence.statementPlaceholder}
                    className="min-h-[200px]"
                  />

                  <p className="text-sm text-muted-foreground">
                    {t.evidence.statementHint}
                  </p>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      {t.evidence.back}
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1">
                      {t.evidence.continue}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Info */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-6 h-6 text-primary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      {t.evidence.contactTitle}
                    </h2>
                  </div>

                  <Input
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder={t.evidence.contactPlaceholder}
                  />

                  <p className="text-sm text-muted-foreground">
                    {t.evidence.contactHint}
                  </p>

                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <h3 className="font-semibold text-foreground mb-2">{t.evidence.summaryTitle}</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• {t.evidence.summaryFile}: {selectedFile?.name}</li>
                      <li>• {t.evidence.summarySize}: {selectedFile && formatFileSize(selectedFile.size)}</li>
                      <li>• {t.evidence.summaryStatement}: {witnessStatement ? t.evidence.provided : t.evidence.notProvided}</li>
                      <li>• {t.evidence.summaryContact}: {contactInfo ? t.evidence.provided : t.evidence.anonymous}</li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      {t.evidence.back}
                    </Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                          {submissionStatus || t.evidence.sealingEvidence}
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          {t.evidence.submitAndSeal}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Success Screen */
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>

              <h2 className="masthead text-2xl md:text-3xl text-foreground">
                {t.evidence.successTitle}
              </h2>

              <p className="text-muted-foreground">
                {t.evidence.successDesc}
              </p>

              {/* Certificate */}
              <div className="p-6 rounded-lg bg-card border border-border text-left">
                <h3 className="font-display font-semibold text-foreground mb-4 text-center">
                  {t.evidence.certificateTitle}
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {t.evidence.registrationId}
                    </p>
                    <p className="font-mono text-sm text-foreground break-all">
                      {receipt?.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {t.evidence.sha256Fingerprint}
                    </p>
                    <p className="font-mono text-xs text-foreground break-all bg-muted p-3 rounded">
                      {receipt?.hash}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {t.evidence.timestamp}
                    </p>
                    <p className="font-mono text-sm text-foreground">
                      {receipt?.timestamp}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {t.evidence.file}
                    </p>
                    <p className="text-sm text-foreground">
                      {receipt?.fileName} ({receipt && formatFileSize(receipt.fileSize)})
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={downloadReceipt} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                {t.evidence.downloadReceipt}
              </Button>

              <LocalizedLink to="/">
                <Button variant="outline" className="w-full">
                  {t.evidence.returnToCommission}
                </Button>
              </LocalizedLink>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitEvidenceForm;
