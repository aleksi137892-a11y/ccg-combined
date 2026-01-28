import { useEffect, useCallback } from "react";
import { getEnglishContentExport } from "@/lib/english-content";

const ProtocolsExport = () => {
  const content = getEnglishContentExport();
  const protocols = content.dataIntakeProtocols;
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const generateMarkdown = useCallback(() => {
    const md: string[] = [];
    
    md.push("# Civic Council of Georgia");
    md.push("## Forum for Justice");
    md.push("### Independent Investigative Mechanism for Georgia");
    md.push("");
    md.push("# Technical Guidance Document");
    md.push(`## ${protocols.overview.title}`);
    md.push(`**Prepared:** ${today}`);
    md.push("");
    md.push("---");
    md.push("");
    
    // Table of Contents
    md.push("## Table of Contents");
    md.push("");
    md.push("1. Overview");
    md.push("2. Onboarding Flow (Mental Health & Safety)");
    md.push("3. Evidence Type Selection");
    md.push("4. Tier 1: Testimony Flow");
    md.push("5. Tier 2: Documents Flow");
    md.push("6. Tier 3: Berkeley Protocol via Save App");
    md.push("7. Tier 4: Physical Evidence Protocol");
    md.push("8. Tier 5: Direct Contact");
    md.push("9. Secure Communication Channels");
    md.push("10. Technical Reference");
    md.push("");
    md.push("---");
    md.push("");
    
    // I. Overview
    md.push("## I. Overview");
    md.push("");
    md.push(protocols.overview.description);
    md.push("");
    md.push(`**Portal URL:** ${protocols.overview.portalUrl}`);
    md.push("");
    md.push("### Submission Tiers");
    md.push("");
    md.push("| Tier | Name | Description |");
    md.push("|------|------|-------------|");
    protocols.overview.tiers.forEach((tier) => {
      md.push(`| ${tier.tier} | ${tier.name} | ${tier.description} |`);
    });
    md.push("");
    
    // II. Onboarding Flow
    md.push("## II. Onboarding Flow (Mental Health & Safety)");
    md.push("");
    md.push(protocols.onboardingFlow.description);
    md.push("");
    md.push("### Steps");
    md.push("");
    protocols.onboardingFlow.steps.forEach((step) => {
      md.push(`**${step.step}. ${step.title}**`);
      if ('content' in step && step.content) md.push(`\n${step.content}`);
      if ('headline' in step && step.headline) md.push(`\n*${step.headline}*`);
      if ('question' in step && step.question) md.push(`\n> Question: ${step.question}`);
      if ('messages' in step && step.messages) {
        step.messages.forEach((msg) => md.push(`- ${msg}`));
      }
      if ('securityTips' in step && step.securityTips) {
        step.securityTips.forEach((tip) => md.push(`- ${tip}`));
      }
      md.push("");
    });
    
    // III. Evidence Type Selection
    md.push("## III. Evidence Type Selection");
    md.push("");
    md.push(`**Prompt:** ${protocols.evidenceSelection.prompt}`);
    md.push("");
    md.push(protocols.evidenceSelection.subtitle);
    md.push("");
    md.push("| Option | Title | Description |");
    md.push("|--------|-------|-------------|");
    protocols.evidenceSelection.options.forEach((opt) => {
      md.push(`| ${opt.id} | ${opt.title} | ${opt.description} |`);
    });
    md.push("");
    
    // IV. Tier 1: Testimony
    md.push("## IV. Tier 1: Testimony Flow");
    md.push("");
    md.push(protocols.tier1Testimony.description);
    md.push("");
    md.push("### Steps");
    md.push("");
    protocols.tier1Testimony.steps.forEach((step) => {
      md.push(`**${step.step}. ${step.title}**`);
      md.push(`\n${step.subtitle}`);
      if ('placeholder' in step && step.placeholder) {
        md.push(`\n\`Placeholder: ${step.placeholder}\``);
      }
      if ('fields' in step && step.fields) {
        step.fields.forEach((f) => md.push(`- **${f.label}:** ${f.placeholder}`));
      }
      md.push("");
    });
    md.push("### Submission Process");
    md.push("");
    protocols.tier1Testimony.submission.process.forEach((p) => md.push(`- ${p}`));
    md.push("");
    md.push("### Sample Receipt");
    md.push("");
    md.push("```");
    md.push(protocols.tier1Testimony.sampleReceipt);
    md.push("```");
    md.push("");
    
    // V. Tier 2: Documents
    md.push("## V. Tier 2: Documents Flow");
    md.push("");
    md.push(protocols.tier2Documents.description);
    md.push("");
    md.push("### Document Types");
    md.push("");
    md.push("| Type | Label | Code |");
    md.push("|------|-------|------|");
    protocols.tier2Documents.steps[0].documentTypes?.forEach((dt) => {
      md.push(`| ${dt.id} | ${dt.label} | ${dt.shortCode} |`);
    });
    md.push("");
    md.push("### Chain of Custody Filename Format");
    md.push("");
    md.push(`**Format:** \`${protocols.tier2Documents.steps[3].filenameFormat}\``);
    md.push("");
    md.push("**Examples:**");
    protocols.tier2Documents.steps[3].examples?.forEach((ex) => md.push(`- \`${ex}\``));
    md.push("");
    md.push("### Why Tresorit?");
    md.push("");
    md.push(protocols.tier2Documents.tresoritInfo.whyTresorit);
    md.push("");
    protocols.tier2Documents.tresoritInfo.features.forEach((f) => md.push(`- ${f}`));
    md.push("");
    
    // VI. Berkeley Protocol
    md.push("## VI. Tier 3: Berkeley Protocol via Save App");
    md.push("");
    md.push(protocols.berkeleyProtocol.description);
    md.push("");
    md.push("### A. Requirements");
    md.push("");
    protocols.berkeleyProtocol.requirements.forEach((req) => md.push(`- ${req}`));
    md.push("");
    md.push("### B. App Download");
    md.push("");
    md.push(`- **iOS:** ${protocols.berkeleyProtocol.appDownload.ios}`);
    md.push(`- **Android:** ${protocols.berkeleyProtocol.appDownload.android}`);
    md.push("");
    md.push("### C. Step-by-Step Instructions");
    md.push("");
    protocols.berkeleyProtocol.steps.forEach((step) => {
      md.push(`**${step.step}. ${step.title}**`);
      md.push(`\n${step.instructions}`);
      if ('field' in step && step.field) {
        md.push(`\n> **${step.field.label}:** ${step.field.value}`);
      }
      if (step.autoFeatures) {
        step.autoFeatures.forEach((feat) => md.push(`- ${feat}`));
      }
      md.push("");
    });
    md.push("### D. Server Credentials");
    md.push("");
    md.push("| Field | Value |");
    md.push("|-------|-------|");
    md.push(`| Server | \`${protocols.berkeleyProtocol.credentials.server}\` |`);
    md.push(`| Path | \`${protocols.berkeleyProtocol.credentials.path}\` |`);
    md.push(`| Username | \`${protocols.berkeleyProtocol.credentials.username}\` |`);
    md.push(`| Password | *${protocols.berkeleyProtocol.credentials.passwordNote}* |`);
    md.push("");
    md.push("### E. Benefits");
    md.push("");
    protocols.berkeleyProtocol.benefits.forEach((b) => md.push(`- ${b}`));
    md.push("");
    md.push("### F. Troubleshooting");
    md.push("");
    md.push("| Issue | Solution |");
    md.push("|-------|----------|");
    protocols.berkeleyProtocol.troubleshooting.forEach((t) => {
      md.push(`| ${t.issue} | ${t.solution} |`);
    });
    md.push("");
    
    // VII. Physical Evidence
    md.push("## VII. Tier 4: Physical Evidence Protocol");
    md.push("");
    md.push(protocols.physicalEvidence.description);
    md.push("");
    md.push(`> **CRITICAL WARNING:** ${protocols.physicalEvidence.criticalWarning}`);
    md.push("");
    md.push("### A. Immediate Steps");
    md.push("");
    protocols.physicalEvidence.steps.forEach((step) => {
      const critical = step.priority === "critical" ? " **[CRITICAL]**" : "";
      md.push(`**${step.step}. ${step.title}**${critical}`);
      md.push(`\n${step.instructions}`);
      md.push("");
    });
    md.push("### B. Preservation Guidelines by Material Type");
    md.push("");
    Object.entries(protocols.physicalEvidence.preservationGuidelines).forEach(([key, guide]) => {
      md.push(`#### ${guide.title}`);
      guide.instructions.forEach((inst) => md.push(`- ${inst}`));
      md.push("");
    });
    md.push("### C. Chain of Custody");
    md.push("");
    md.push(protocols.physicalEvidence.chainOfCustody.definition);
    md.push("");
    md.push("**Requirements:**");
    protocols.physicalEvidence.chainOfCustody.requirements.forEach((req) => md.push(`- ${req}`));
    md.push("");
    
    // VIII. Tier 5: Direct Contact
    md.push("## VIII. Tier 5: Direct Contact");
    md.push("");
    md.push(`**${protocols.tier5DirectContact.headline}**`);
    md.push("");
    md.push(`*${protocols.tier5DirectContact.subtitle}*`);
    md.push("");
    md.push(protocols.tier5DirectContact.content);
    md.push("");
    
    // IX. Secure Contacts
    md.push("## IX. Secure Communication Channels");
    md.push("");
    md.push(protocols.secureContacts.description);
    md.push("");
    md.push("| Channel | Contact | Description |");
    md.push("|---------|---------|-------------|");
    Object.entries(protocols.secureContacts.channels).forEach(([key, channel]) => {
      md.push(`| ${channel.name} | \`${channel.value}\` | ${channel.description} |`);
    });
    md.push("");
    md.push("### Security Recommendations");
    md.push("");
    protocols.secureContacts.securityRecommendations.forEach((rec) => md.push(`- ${rec}`));
    md.push("");
    
    // X. Technical Reference
    md.push("## X. Technical Reference");
    md.push("");
    md.push("### A. SHA-256 Hash Verification");
    md.push("");
    md.push(protocols.technicalReference.sha256.purpose);
    md.push("");
    md.push("**Use Cases:**");
    protocols.technicalReference.sha256.useCases.forEach((uc) => md.push(`- ${uc}`));
    md.push("");
    md.push("### B. Database Schema");
    md.push("");
    md.push("| Table | Description | Key Fields |");
    md.push("|-------|-------------|------------|");
    protocols.technicalReference.databaseSchema.tables.forEach((t) => {
      const fields = t.fields.slice(0, 4).join(", ") + (t.fields.length > 4 ? "..." : "");
      md.push(`| \`${t.name}\` | ${t.description} | \`${fields}\` |`);
    });
    md.push("");
    md.push("### C. Attribution");
    md.push("");
    md.push(`**Operated by:** ${protocols.technicalReference.attribution.operatedBy}`);
    md.push(`**Advised by:** ${protocols.technicalReference.attribution.advisedBy}`);
    md.push("");
    md.push("---");
    md.push("");
    md.push(`*Document generated: ${new Date().toISOString()}*`);
    
    return md.join("\n");
  }, [protocols, today]);

  const handleDownloadMarkdown = useCallback(() => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `IIMG-Data-Intake-Protocols-${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [generateMarkdown]);

  useEffect(() => {
    // Auto-print after short delay to allow rendering
    const timer = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="protocols-document bg-white text-black min-h-screen">
      {/* Header */}
      <header className="protocols-header border-b-2 border-[#1e3a5f] pb-4 mb-6">
        <h1 className="text-2xl font-bold text-[#1e3a5f] uppercase tracking-wide">
          Civic Council of Georgia
        </h1>
        <p className="text-lg italic text-[#1e3a5f]">Forum for Justice</p>
        <p className="text-base text-gray-700">Independent Investigative Mechanism for Georgia</p>
        <div className="border-t border-gray-300 mt-4 pt-4">
          <p className="text-xl font-semibold text-[#1e3a5f]">Technical Guidance Document</p>
          <p className="text-lg">{protocols.overview.title}</p>
          <p className="text-sm text-gray-600">Prepared: {today}</p>
        </div>
      </header>

      {/* Table of Contents */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-[#1e3a5f] pb-1 mb-3">
          Table of Contents
        </h2>
        <ol className="list-upper-roman pl-6 space-y-1 text-sm">
          <li>Overview</li>
          <li>Onboarding Flow (Mental Health & Safety)</li>
          <li>Evidence Type Selection</li>
          <li>Tier 1: Testimony Flow</li>
          <li>Tier 2: Documents Flow</li>
          <li>Tier 3: Berkeley Protocol via Save App</li>
          <li>Tier 4: Physical Evidence Protocol</li>
          <li>Tier 5: Direct Contact</li>
          <li>Secure Communication Channels</li>
          <li>Technical Reference</li>
        </ol>
      </section>

      {/* I. Overview */}
      <section className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-[#1e3a5f] pb-1 mb-3">
          I. Overview
        </h2>
        <p className="mb-3 text-sm leading-relaxed">
          {protocols.overview.description}
        </p>
        <p className="mb-4 text-sm">
          <strong>Portal URL:</strong> {protocols.overview.portalUrl}
        </p>
        
        <h3 className="font-semibold text-[#1e3a5f] mb-2">Submission Tiers</h3>
        <table className="w-full border-collapse text-sm mb-4">
          <thead>
            <tr className="bg-[#1e3a5f] text-white">
              <th className="border border-[#1e3a5f] p-2 text-left">Tier</th>
              <th className="border border-[#1e3a5f] p-2 text-left">Name</th>
              <th className="border border-[#1e3a5f] p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {protocols.overview.tiers.map((tier) => (
              <tr key={tier.tier}>
                <td className="border border-gray-300 p-2">{tier.tier}</td>
                <td className="border border-gray-300 p-2 font-medium">{tier.name}</td>
                <td className="border border-gray-300 p-2">{tier.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* II. Onboarding Flow */}
      <section className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-[#1e3a5f] pb-1 mb-3">
          II. Onboarding Flow (Mental Health & Safety)
        </h2>
        <p className="mb-3 text-sm leading-relaxed">
          {protocols.onboardingFlow.description}
        </p>
        
        <h3 className="font-semibold text-[#1e3a5f] mb-2">Steps</h3>
        <ol className="list-decimal pl-6 mb-4 text-sm space-y-3">
          {protocols.onboardingFlow.steps.map((step) => (
            <li key={step.step}>
              <strong>{step.title}</strong>
              {'content' in step && step.content && <p className="mt-1">{step.content}</p>}
              {'headline' in step && step.headline && <p className="mt-1 font-medium">{step.headline}</p>}
              {'question' in step && step.question && <p className="mt-1 italic">Question: {step.question}</p>}
              {'messages' in step && step.messages && (
                <ul className="mt-2 list-disc pl-6">
                  {step.messages.map((msg, i) => <li key={i}>{msg}</li>)}
                </ul>
              )}
              {'securityTips' in step && step.securityTips && (
                <ul className="mt-2 list-disc pl-6">
                  {step.securityTips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* III. Evidence Type Selection */}
      <section className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-[#1e3a5f] pb-1 mb-3">
          III. Evidence Type Selection
        </h2>
        <p className="mb-2 text-sm"><strong>Prompt:</strong> {protocols.evidenceSelection.prompt}</p>
        <p className="mb-3 text-sm">{protocols.evidenceSelection.subtitle}</p>
        
        <table className="w-full border-collapse text-sm mb-4">
          <thead>
            <tr className="bg-[#1e3a5f] text-white">
              <th className="border border-[#1e3a5f] p-2 text-left">Option</th>
              <th className="border border-[#1e3a5f] p-2 text-left">Title</th>
              <th className="border border-[#1e3a5f] p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {protocols.evidenceSelection.options.map((opt) => (
              <tr key={opt.id}>
                <td className="border border-gray-300 p-2 font-mono text-xs">{opt.id}</td>
                <td className="border border-gray-300 p-2 font-medium">{opt.title}</td>
                <td className="border border-gray-300 p-2">{opt.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* IV. Tier 1: Testimony */}
      <section className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-[#1e3a5f] pb-1 mb-3">
          IV. Tier 1: Testimony Flow
        </h2>
        <p className="mb-3 text-sm leading-relaxed">
          {protocols.tier1Testimony.description}
        </p>
        
        <h3 className="font-semibold text-[#1e3a5f] mb-2">Steps</h3>
        <ol className="list-decimal pl-6 mb-4 text-sm space-y-3">
          {protocols.tier1Testimony.steps.map((step) => (
            <li key={step.step}>
              <strong>{step.title}</strong>
              <p className="mt-1 text-gray-600">{step.subtitle}</p>
              {'placeholder' in step && step.placeholder && (
                <p className="mt-1 font-mono text-xs bg-gray-50 p-2">Placeholder: {step.placeholder}</p>
              )}
              {'fields' in step && step.fields && (
                <ul className="mt-2 pl-4">
                  {step.fields.map((f, i) => (
                    <li key={i}><strong>{f.label}:</strong> {f.placeholder}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">Submission Process</h3>
        <ul className="list-disc pl-6 text-sm space-y-1 mb-4">
          {protocols.tier1Testimony.submission.process.map((p, i) => <li key={i}>{p}</li>)}
        </ul>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">Sample Receipt</h3>
        <pre className="bg-gray-100 p-3 text-xs font-mono whitespace-pre-wrap border">
          {protocols.tier1Testimony.sampleReceipt}
        </pre>
      </section>

      {/* V. Tier 2: Documents */}
      <section className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-[#1e3a5f] pb-1 mb-3">
          V. Tier 2: Documents Flow
        </h2>
        <p className="mb-3 text-sm leading-relaxed">
          {protocols.tier2Documents.description}
        </p>
        
        <h3 className="font-semibold text-[#1e3a5f] mb-2">Document Types</h3>
        <table className="w-full border-collapse text-sm mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Type</th>
              <th className="border border-gray-300 p-2 text-left">Label</th>
              <th className="border border-gray-300 p-2 text-left">Code</th>
            </tr>
          </thead>
          <tbody>
            {protocols.tier2Documents.steps[0].documentTypes?.map((dt) => (
              <tr key={dt.id}>
                <td className="border border-gray-300 p-2 font-mono text-xs">{dt.id}</td>
                <td className="border border-gray-300 p-2">{dt.label}</td>
                <td className="border border-gray-300 p-2 font-mono">{dt.shortCode}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">Chain of Custody Filename Format</h3>
        <p className="text-sm mb-2"><strong>Format:</strong> <code className="bg-gray-100 px-1">{protocols.tier2Documents.steps[3].filenameFormat}</code></p>
        <p className="text-sm mb-1"><strong>Examples:</strong></p>
        <ul className="list-disc pl-6 text-sm space-y-1 font-mono text-xs mb-4">
          {protocols.tier2Documents.steps[3].examples?.map((ex, i) => <li key={i}>{ex}</li>)}
        </ul>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">Why Tresorit?</h3>
        <p className="text-sm mb-2">{protocols.tier2Documents.tresoritInfo.whyTresorit}</p>
        <ul className="list-disc pl-6 text-sm space-y-1">
          {protocols.tier2Documents.tresoritInfo.features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      </section>

      {/* VI. Berkeley Protocol */}
      <section className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-[#1e3a5f] pb-1 mb-3">
          VI. Tier 3: Berkeley Protocol via Save App
        </h2>
        <p className="mb-3 text-sm leading-relaxed">
          {protocols.berkeleyProtocol.description}
        </p>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">A. Requirements</h3>
        <ul className="list-disc pl-6 mb-4 text-sm space-y-1">
          {protocols.berkeleyProtocol.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">B. App Download</h3>
        <p className="text-sm mb-1"><strong>iOS:</strong> {protocols.berkeleyProtocol.appDownload.ios}</p>
        <p className="text-sm mb-4"><strong>Android:</strong> {protocols.berkeleyProtocol.appDownload.android}</p>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">C. Step-by-Step Instructions</h3>
        <ol className="list-decimal pl-6 mb-4 text-sm space-y-3">
          {protocols.berkeleyProtocol.steps.map((step) => (
            <li key={step.step}>
              <strong>{step.title}</strong>
              <p className="mt-1">{step.instructions}</p>
              {'field' in step && step.field && (
                <div className="mt-2 pl-4 border-l-2 border-gray-300">
                  <p><strong>{step.field.label}:</strong> {step.field.value}</p>
                </div>
              )}
              {step.autoFeatures && (
                <ul className="mt-2 list-disc pl-6">
                  {step.autoFeatures.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">D. Server Credentials</h3>
        <table className="w-full border-collapse text-sm mb-4">
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-medium bg-gray-50 w-32">Server</td>
              <td className="border border-gray-300 p-2 font-mono text-xs">{protocols.berkeleyProtocol.credentials.server}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium bg-gray-50">Path</td>
              <td className="border border-gray-300 p-2 font-mono text-xs">{protocols.berkeleyProtocol.credentials.path}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium bg-gray-50">Username</td>
              <td className="border border-gray-300 p-2 font-mono text-xs">{protocols.berkeleyProtocol.credentials.username}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium bg-gray-50">Password</td>
              <td className="border border-gray-300 p-2 text-xs italic">{protocols.berkeleyProtocol.credentials.passwordNote}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">E. Benefits</h3>
        <ul className="list-disc pl-6 mb-4 text-sm space-y-1">
          {protocols.berkeleyProtocol.benefits.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">F. Troubleshooting</h3>
        <table className="w-full border-collapse text-sm mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Issue</th>
              <th className="border border-gray-300 p-2 text-left">Solution</th>
            </tr>
          </thead>
          <tbody>
            {protocols.berkeleyProtocol.troubleshooting.map((t, i) => (
              <tr key={i}>
                <td className="border border-gray-300 p-2">{t.issue}</td>
                <td className="border border-gray-300 p-2">{t.solution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* VII. Physical Evidence */}
      <section className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-[#1e3a5f] pb-1 mb-3">
          VII. Tier 4: Physical Evidence Protocol
        </h2>
        <p className="mb-3 text-sm leading-relaxed">
          {protocols.physicalEvidence.description}
        </p>

        <div className="border-2 border-black p-3 mb-4 bg-gray-50">
          <p className="font-bold text-sm">
            CRITICAL WARNING: {protocols.physicalEvidence.criticalWarning}
          </p>
        </div>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">A. Immediate Steps</h3>
        <ol className="list-decimal pl-6 mb-4 text-sm space-y-2">
          {protocols.physicalEvidence.steps.map((step) => (
            <li key={step.step}>
              <strong>{step.title}</strong>
              {step.priority === "critical" && <span className="text-red-700 font-bold ml-2">[CRITICAL]</span>}
              <p className="mt-1">{step.instructions}</p>
            </li>
          ))}
        </ol>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">B. Preservation Guidelines by Material Type</h3>
        
        {Object.entries(protocols.physicalEvidence.preservationGuidelines).map(([key, guide]) => (
          <div key={key} className="mb-4">
            <h4 className="font-medium text-[#1e3a5f] mb-1">{guide.title}</h4>
            <ul className="list-disc pl-6 text-sm space-y-1">
              {guide.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>
        ))}

        <h3 className="font-semibold text-[#1e3a5f] mb-2">C. Chain of Custody</h3>
        <p className="text-sm mb-2">{protocols.physicalEvidence.chainOfCustody.definition}</p>
        <p className="text-sm font-medium mb-1">Requirements:</p>
        <ul className="list-disc pl-6 text-sm space-y-1">
          {protocols.physicalEvidence.chainOfCustody.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </section>

      {/* VIII. Tier 5: Direct Contact */}
      <section className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-[#1e3a5f] pb-1 mb-3">
          VIII. Tier 5: Direct Contact
        </h2>
        <p className="mb-2 text-sm"><strong>{protocols.tier5DirectContact.headline}</strong></p>
        <p className="mb-3 text-sm text-gray-600">{protocols.tier5DirectContact.subtitle}</p>
        <p className="mb-4 text-sm">{protocols.tier5DirectContact.content}</p>
        <p className="text-sm text-gray-600 italic">Available actions: Return to tell my story, or proceed to thank you screen.</p>
      </section>

      {/* IX. Secure Contacts */}
      <section className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-[#1e3a5f] pb-1 mb-3">
          IX. Secure Communication Channels
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          {protocols.secureContacts.description}
        </p>

        <table className="w-full border-collapse text-sm mb-4">
          <thead>
            <tr className="bg-[#1e3a5f] text-white">
              <th className="border border-[#1e3a5f] p-2 text-left">Channel</th>
              <th className="border border-[#1e3a5f] p-2 text-left">Contact</th>
              <th className="border border-[#1e3a5f] p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(protocols.secureContacts.channels).map(([key, channel]) => (
              <tr key={key}>
                <td className="border border-gray-300 p-2 font-medium">{channel.name}</td>
                <td className="border border-gray-300 p-2 font-mono text-xs">{channel.value}</td>
                <td className="border border-gray-300 p-2">{channel.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">Security Recommendations</h3>
        <ul className="list-disc pl-6 text-sm space-y-1">
          {protocols.secureContacts.securityRecommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </section>

      {/* X. Technical Reference */}
      <section className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-[#1e3a5f] pb-1 mb-3">
          X. Technical Reference
        </h2>
        
        <h3 className="font-semibold text-[#1e3a5f] mb-2">A. SHA-256 Hash Verification</h3>
        <p className="text-sm mb-2">{protocols.technicalReference.sha256.purpose}</p>
        <p className="text-sm font-medium mb-1">Use Cases:</p>
        <ul className="list-disc pl-6 text-sm space-y-1 mb-4">
          {protocols.technicalReference.sha256.useCases.map((uc, i) => (
            <li key={i}>{uc}</li>
          ))}
        </ul>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">B. Database Schema</h3>
        <table className="w-full border-collapse text-sm mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Table</th>
              <th className="border border-gray-300 p-2 text-left">Description</th>
              <th className="border border-gray-300 p-2 text-left">Key Fields</th>
            </tr>
          </thead>
          <tbody>
            {protocols.technicalReference.databaseSchema.tables.map((t) => (
              <tr key={t.name}>
                <td className="border border-gray-300 p-2 font-mono text-xs">{t.name}</td>
                <td className="border border-gray-300 p-2">{t.description}</td>
                <td className="border border-gray-300 p-2 font-mono text-xs">{t.fields.slice(0, 4).join(", ")}{t.fields.length > 4 ? "..." : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="font-semibold text-[#1e3a5f] mb-2">C. Attribution</h3>
        <p className="text-sm"><strong>Operated by:</strong> {protocols.technicalReference.attribution.operatedBy}</p>
        <p className="text-sm"><strong>Advised by:</strong> {protocols.technicalReference.attribution.advisedBy}</p>
      </section>

      {/* Footer */}
      <footer className="protocols-footer border-t-2 border-[#1e3a5f] pt-4 mt-8 text-sm text-gray-600">
        <p className="font-semibold text-[#1e3a5f]">{protocols.technicalReference.attribution.operatedBy}</p>
        <p className="italic">Prepared for offline distribution</p>
        <p>Document generated: {new Date().toISOString()}</p>
      </footer>

      {/* Print Button - hidden in print */}
      <div className="print-hide fixed bottom-4 right-4 flex gap-2">
        <button
          onClick={handleDownloadMarkdown}
          className="bg-gray-700 text-white px-6 py-3 font-medium hover:bg-gray-600 transition-colors"
        >
          Save as Markdown
        </button>
        <button
          onClick={() => window.print()}
          className="bg-[#1e3a5f] text-white px-6 py-3 font-medium hover:bg-[#2a4a6f] transition-colors"
        >
          Print / Save as PDF
        </button>
        <button
          onClick={() => window.close()}
          className="bg-gray-200 text-gray-700 px-6 py-3 font-medium hover:bg-gray-300 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProtocolsExport;
