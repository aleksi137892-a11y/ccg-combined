/**
 * AppealsTriage - Admin interface for triaging Forum appeals
 * 
 * Clean administrative UI. No decorative icons.
 */

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// =============================================================================
// TYPES
// =============================================================================

type TriageStatus = 'pending' | 'in_review' | 'routed' | 'closed' | 'referred';
type RemedyType = 'restitution' | 'compensation' | 'rehabilitation' | 'satisfaction' | 'guarantees';

interface Appeal {
  id: string;
  pathway: 'harm' | 'wrongdoing' | 'inside';
  narrative: string;
  location: string;
  remedies_sought: RemedyType[];
  consent_internal: boolean;
  consent_legal_referral: boolean;
  consent_public_record: boolean;
  triage_status: TriageStatus;
  triage_notes?: string;
  created_at: string;
  triaged_at?: string;
  triaged_by?: string;
}

// =============================================================================
// MOCK DATA
// =============================================================================

const mockAppeals: Appeal[] = [
  {
    id: '1a2b3c4d',
    pathway: 'harm',
    narrative: 'I was detained for 48 hours without access to a lawyer after participating in a peaceful demonstration...',
    location: 'Tbilisi',
    remedies_sought: ['restitution', 'satisfaction'],
    consent_internal: true,
    consent_legal_referral: true,
    consent_public_record: false,
    triage_status: 'pending',
    created_at: '2026-01-26T14:30:00Z',
  },
  {
    id: '2b3c4d5e',
    pathway: 'wrongdoing',
    narrative: 'I witnessed officers using excessive force against peaceful protesters near Parliament...',
    location: 'Tbilisi, Parliament',
    remedies_sought: ['satisfaction', 'guarantees'],
    consent_internal: true,
    consent_legal_referral: true,
    consent_public_record: true,
    triage_status: 'in_review',
    created_at: '2026-01-25T09:15:00Z',
    triaged_at: '2026-01-26T10:00:00Z',
    triaged_by: 'staff@example.com',
  },
  {
    id: '3c4d5e6f',
    pathway: 'inside',
    narrative: 'As a former employee, I have documentation of systematic abuse of process...',
    location: 'Ministry of Interior',
    remedies_sought: ['guarantees'],
    consent_internal: true,
    consent_legal_referral: false,
    consent_public_record: false,
    triage_status: 'routed',
    triage_notes: 'Routed to legal team for potential ICC referral.',
    created_at: '2026-01-20T16:45:00Z',
    triaged_at: '2026-01-22T11:30:00Z',
    triaged_by: 'staff@example.com',
  },
];

// =============================================================================
// CONFIG
// =============================================================================

const statusConfig: Record<TriageStatus, { label: string; labelGe: string }> = {
  pending: { label: 'Pending', labelGe: 'მოლოდინში' },
  in_review: { label: 'In Review', labelGe: 'განხილვაში' },
  routed: { label: 'Routed', labelGe: 'გადამისამართებული' },
  closed: { label: 'Closed', labelGe: 'დახურული' },
  referred: { label: 'Referred', labelGe: 'მიმართული' },
};

const pathwayLabels = {
  harm: { en: 'Direct Harm', ge: 'პირდაპირი ზიანი' },
  wrongdoing: { en: 'Witness', ge: 'მოწმე' },
  inside: { en: 'Insider', ge: 'ინსაიდერი' },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function AppealsTriage() {
  const { isGeorgian } = useLanguage();
  const [appeals, setAppeals] = useState<Appeal[]>(mockAppeals);
  const [statusFilter, setStatusFilter] = useState<TriageStatus | 'all'>('all');
  const [pathwayFilter, setPathwayFilter] = useState<string>('all');
  const [selectedAppeal, setSelectedAppeal] = useState<Appeal | null>(null);
  const [triageNotes, setTriageNotes] = useState('');
  const [newStatus, setNewStatus] = useState<TriageStatus>('pending');
  const [isLoading, setIsLoading] = useState(false);

  const filteredAppeals = appeals.filter((appeal) => {
    if (statusFilter !== 'all' && appeal.triage_status !== statusFilter) return false;
    if (pathwayFilter !== 'all' && appeal.pathway !== pathwayFilter) return false;
    return true;
  });

  const openAppealDetail = (appeal: Appeal) => {
    setSelectedAppeal(appeal);
    setTriageNotes(appeal.triage_notes || '');
    setNewStatus(appeal.triage_status);
  };

  const handleTriageUpdate = () => {
    if (!selectedAppeal) return;
    
    setAppeals((prev) =>
      prev.map((a) =>
        a.id === selectedAppeal.id
          ? {
              ...a,
              triage_status: newStatus,
              triage_notes: triageNotes,
              triaged_at: new Date().toISOString(),
              triaged_by: 'current-user@example.com',
            }
          : a
      )
    );
    
    setSelectedAppeal(null);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  return (
    <Layout>
      <article className="min-h-screen bg-white">
        <div className="h-[2px] bg-navy" />
        
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h1 className={cn(
                "font-serif text-2xl md:text-3xl text-navy tracking-[-0.02em]",
                isGeorgian && "font-georgian"
              )}>
                {isGeorgian ? 'მიმართვების ტრიაჟი' : 'Appeals Triage'}
              </h1>
              <p className={cn(
                "text-navy/50 mt-2",
                isGeorgian && "font-georgian"
              )}>
                {isGeorgian 
                  ? 'გადახედეთ და მიმართეთ მიმართვები შესაბამის გზებზე'
                  : 'Review and route appeals to remedy pathways'}
              </p>
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="text-sm text-navy/50 hover:text-navy underline disabled:opacity-50"
            >
              {isLoading 
                ? (isGeorgian ? 'იტვირთება...' : 'Loading...') 
                : (isGeorgian ? 'განახლება' : 'Refresh')}
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-navy/10">
            <div>
              <span className="text-xs text-navy/40 uppercase tracking-wider block mb-2">
                {isGeorgian ? 'სტატუსი' : 'Status'}
              </span>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as TriageStatus | 'all')}>
                <SelectTrigger className="w-40 border-navy/10 rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isGeorgian ? 'ყველა' : 'All'}</SelectItem>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {isGeorgian ? config.labelGe : config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <span className="text-xs text-navy/40 uppercase tracking-wider block mb-2">
                {isGeorgian ? 'გზა' : 'Pathway'}
              </span>
              <Select value={pathwayFilter} onValueChange={setPathwayFilter}>
                <SelectTrigger className="w-40 border-navy/10 rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isGeorgian ? 'ყველა' : 'All'}</SelectItem>
                  {Object.entries(pathwayLabels).map(([key, labels]) => (
                    <SelectItem key={key} value={key}>
                      {isGeorgian ? labels.ge : labels.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats row - minimal */}
          <div className="flex gap-8 mb-8 text-sm">
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = appeals.filter((a) => a.triage_status === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status as TriageStatus)}
                  className={cn(
                    "transition-colors",
                    statusFilter === status ? "text-navy" : "text-navy/40 hover:text-navy/60"
                  )}
                >
                  <span className="font-mono">{count}</span>{' '}
                  <span className="text-xs">{isGeorgian ? config.labelGe : config.label}</span>
                </button>
              );
            })}
          </div>

          {/* Table */}
          <div className="border border-navy/10">
            <Table>
              <TableHeader>
                <TableRow className="border-navy/10">
                  <TableHead className="w-[100px] text-xs uppercase tracking-wider text-navy/50">ID</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-navy/50">{isGeorgian ? 'გზა' : 'Pathway'}</TableHead>
                  <TableHead className="max-w-[300px] text-xs uppercase tracking-wider text-navy/50">{isGeorgian ? 'შეჯამება' : 'Summary'}</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-navy/50">{isGeorgian ? 'რემედია' : 'Remedy'}</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-navy/50">{isGeorgian ? 'სტატუსი' : 'Status'}</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-navy/50">{isGeorgian ? 'თარიღი' : 'Date'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppeals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-navy/40">
                      {isGeorgian ? 'მიმართვები არ მოიძებნა' : 'No appeals found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppeals.map((appeal) => (
                    <TableRow 
                      key={appeal.id} 
                      className="border-navy/10 cursor-pointer hover:bg-navy/[0.02]"
                      onClick={() => openAppealDetail(appeal)}
                    >
                      <TableCell className="font-mono text-xs text-navy/50">{appeal.id}</TableCell>
                      <TableCell className="text-sm">
                        {isGeorgian ? pathwayLabels[appeal.pathway].ge : pathwayLabels[appeal.pathway].en}
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <p className="line-clamp-2 text-sm text-navy/70">
                          {appeal.narrative}
                        </p>
                      </TableCell>
                      <TableCell className="text-sm text-navy/60">
                        {appeal.remedies_sought.join(', ')}
                      </TableCell>
                      <TableCell className="text-sm">
                        {isGeorgian ? statusConfig[appeal.triage_status].labelGe : statusConfig[appeal.triage_status].label}
                      </TableCell>
                      <TableCell className="text-sm text-navy/50">
                        {new Date(appeal.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </article>

      {/* Detail Dialog */}
      <Dialog open={!!selectedAppeal} onOpenChange={() => setSelectedAppeal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-none border-navy/20">
          {selectedAppeal && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl text-navy">
                  <span className="font-mono text-sm text-navy/40 mr-3">#{selectedAppeal.id}</span>
                  {isGeorgian ? pathwayLabels[selectedAppeal.pathway].ge : pathwayLabels[selectedAppeal.pathway].en}
                </DialogTitle>
                <DialogDescription className="text-navy/50">
                  {isGeorgian ? 'მიმართვის დეტალები და ტრიაჟი' : 'Appeal details and triage'}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-8 py-6">
                {/* Narrative */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-navy/40 mb-3">
                    {isGeorgian ? 'თხრობა' : 'Narrative'}
                  </h4>
                  <p className="text-sm text-navy/80 leading-relaxed">
                    {selectedAppeal.narrative}
                  </p>
                </div>

                {/* Location */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-navy/40 mb-2">
                    {isGeorgian ? 'ადგილმდებარეობა' : 'Location'}
                  </h4>
                  <p className="text-sm text-navy/70">{selectedAppeal.location}</p>
                </div>

                {/* Remedies */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-navy/40 mb-2">
                    {isGeorgian ? 'მოთხოვნილი რემედია' : 'Remedies Sought'}
                  </h4>
                  <p className="text-sm text-navy/70">
                    {selectedAppeal.remedies_sought.join(', ')}
                  </p>
                </div>

                {/* Consent */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-navy/40 mb-3">
                    {isGeorgian ? 'თანხმობა' : 'Consent'}
                  </h4>
                  <div className="text-sm text-navy/70 space-y-1">
                    <p>Internal: {selectedAppeal.consent_internal ? 'Yes' : 'No'}</p>
                    <p>Legal referral: {selectedAppeal.consent_legal_referral ? 'Yes' : 'No'}</p>
                    <p>Public record: {selectedAppeal.consent_public_record ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                {/* Triage */}
                <div className="border-t border-navy/10 pt-8">
                  <h4 className="text-xs uppercase tracking-wider text-navy/40 mb-6">
                    {isGeorgian ? 'ტრიაჟის განახლება' : 'Triage Update'}
                  </h4>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm text-navy/60 mb-2 block">
                        {isGeorgian ? 'სტატუსი' : 'Status'}
                      </label>
                      <Select value={newStatus} onValueChange={(v) => setNewStatus(v as TriageStatus)}>
                        <SelectTrigger className="border-navy/10 rounded-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusConfig).map(([key, config]) => (
                            <SelectItem key={key} value={key}>
                              {isGeorgian ? config.labelGe : config.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm text-navy/60 mb-2 block">
                        {isGeorgian ? 'შენიშვნები' : 'Notes'}
                      </label>
                      <Textarea
                        value={triageNotes}
                        onChange={(e) => setTriageNotes(e.target.value)}
                        placeholder={isGeorgian 
                          ? 'ტრიაჟის შენიშვნები...'
                          : 'Triage notes...'}
                        className="min-h-[100px] border-navy/10 rounded-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-3">
                <button 
                  onClick={() => setSelectedAppeal(null)}
                  className="text-sm text-navy/50 hover:text-navy"
                >
                  {isGeorgian ? 'გაუქმება' : 'Cancel'}
                </button>
                <button 
                  onClick={handleTriageUpdate}
                  className="px-6 py-2 bg-navy text-white text-sm"
                >
                  {isGeorgian ? 'განახლება' : 'Update'}
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
