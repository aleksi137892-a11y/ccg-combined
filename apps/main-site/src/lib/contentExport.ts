// Content Export Utility - Generate and download JSON exports of all institutional content
import { masterContent } from '@/data';

/**
 * Downloads a markdown file from the public directory
 * @param filename - The markdown file to download (e.g., 'design-system.md' or 'technical-manifest.md')
 */
export const downloadMarkdownFile = async (filename: string): Promise<void> => {
  try {
    const response = await fetch(`/${filename}`);
    if (!response.ok) throw new Error(`Failed to fetch ${filename}`);
    
    const content = await response.text();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error);
    throw error;
  }
};

/**
 * Downloads a file from the public directory
 * @param filename - The file to download
 * @param mimeType - The MIME type for the blob
 */
export const downloadPublicFile = async (filename: string, mimeType: string): Promise<void> => {
  try {
    const response = await fetch(`/${filename}`);
    if (!response.ok) throw new Error(`Failed to fetch ${filename}`);
    
    const content = await response.text();
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error);
    throw error;
  }
};

/**
 * Downloads the design system documentation (legacy)
 */
export const downloadDesignSystem = () => downloadMarkdownFile('design-system.md');

/**
 * Downloads the technical manifest documentation
 */
export const downloadTechnicalManifest = () => downloadMarkdownFile('technical-manifest.md');

/**
 * Downloads the CCG design system markdown (extracted tokens)
 */
export const downloadCCGDesignSystem = () => downloadMarkdownFile('ccg-design-system.md');

/**
 * Downloads the CCG design tokens as JSON
 */
export const downloadCCGTokensJSON = () => downloadPublicFile('ccg.tokens.json', 'application/json');

/**
 * Downloads the CCG design tokens as CSS
 */
export const downloadCCGTokensCSS = () => downloadPublicFile('ccg.tokens.css', 'text/css');

/**
 * Downloads the sitemap.xml file
 */
export const downloadSitemapXML = () => downloadPublicFile('sitemap.xml', 'application/xml');

/**
 * Downloads the sitemap.md markdown file
 */
export const downloadSitemapMD = () => downloadMarkdownFile('sitemap.md');

/**
 * Generates a JSON string of all website content
 * Includes metadata, version info, and complete bilingual content
 */
export const exportContentAsJSON = (): string => {
  const exportData = {
    metadata: {
      exportedAt: new Date().toISOString(),
      version: masterContent.version,
      institution: masterContent.institution,
      languages: masterContent.languages,
      contentSections: Object.keys(masterContent.content),
      totalSections: Object.keys(masterContent.content).length
    },
    content: masterContent.content
  };
  
  return JSON.stringify(exportData, null, 2);
};

/**
 * Generates a minified JSON string for production use
 */
export const exportContentAsMinifiedJSON = (): string => {
  const exportData = {
    metadata: {
      exportedAt: new Date().toISOString(),
      version: masterContent.version,
      institution: masterContent.institution,
      languages: masterContent.languages
    },
    content: masterContent.content
  };
  
  return JSON.stringify(exportData);
};

/**
 * Downloads the content as a JSON file
 * @param minified - Whether to export minified JSON (default: false)
 */
export const downloadContentJSON = (minified = false): void => {
  const json = minified ? exportContentAsMinifiedJSON() : exportContentAsJSON();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `sabcho-content-${dateStr}${minified ? '.min' : ''}.json`;
  
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  
  URL.revokeObjectURL(url);
};

/**
 * Gets content for a specific section
 * @param section - The content section key
 */
export const getContentSection = <K extends keyof typeof masterContent.content>(
  section: K
): typeof masterContent.content[K] => {
  return masterContent.content[section];
};

/**
 * Gets all content sections as an array for iteration
 */
export const getContentSectionsArray = () => {
  return Object.entries(masterContent.content).map(([key, value]) => ({
    id: key,
    data: value
  }));
};
