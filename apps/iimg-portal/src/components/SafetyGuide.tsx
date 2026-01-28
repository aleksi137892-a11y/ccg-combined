import { useState } from "react";
import { Shield, X, Chrome, Globe, Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SafetyGuide = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-muted-foreground hover:text-foreground underline transition-colors">
          How to safely clear your browser history
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-5 w-5 text-security" />
            Browser Safety Guide
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="chrome" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chrome" className="gap-2">
              <Chrome className="h-4 w-4" />
              Chrome
            </TabsTrigger>
            <TabsTrigger value="firefox" className="gap-2">
              <Globe className="h-4 w-4" />
              Firefox
            </TabsTrigger>
            <TabsTrigger value="mobile" className="gap-2">
              <Smartphone className="h-4 w-4" />
              Mobile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chrome" className="mt-4 space-y-3">
            <h3 className="font-semibold">Google Chrome (Desktop)</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+Shift+Delete</kbd> (Windows) or <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Cmd+Shift+Delete</kbd> (Mac)</li>
              <li>Select "All time" from the time range dropdown</li>
              <li>Check "Browsing history" and "Cookies and other site data"</li>
              <li>Click "Clear data"</li>
            </ol>
            <div className="p-3 bg-muted/50 rounded-lg text-sm">
              <strong>Tip:</strong> Use Incognito mode (Ctrl+Shift+N) for future visits to avoid leaving traces.
            </div>
          </TabsContent>

          <TabsContent value="firefox" className="mt-4 space-y-3">
            <h3 className="font-semibold">Mozilla Firefox (Desktop)</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+Shift+Delete</kbd> (Windows) or <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Cmd+Shift+Delete</kbd> (Mac)</li>
              <li>Select "Everything" from the time range</li>
              <li>Check all boxes under "History"</li>
              <li>Click "Clear Now"</li>
            </ol>
            <div className="p-3 bg-muted/50 rounded-lg text-sm">
              <strong>Tip:</strong> Use Private Browsing (Ctrl+Shift+P) for future visits.
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">iPhone Safari</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Go to Settings → Safari</li>
                <li>Tap "Clear History and Website Data"</li>
                <li>Confirm by tapping "Clear History and Data"</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Android Chrome</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Open Chrome and tap the three dots menu</li>
                <li>Tap "History" → "Clear browsing data"</li>
                <li>Select "All time" and check all boxes</li>
                <li>Tap "Clear data"</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <h4 className="font-semibold text-destructive mb-2">Important Security Notes</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• If using a shared computer, always clear your history</li>
            <li>• Consider using a VPN for additional privacy</li>
            <li>• Use encrypted messaging apps like Signal for follow-up</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
