import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, ArrowRight } from 'lucide-react';
import type { ContentLink } from '@/types/institutional';

interface ContactCalloutProps {
  title?: string;
  titleGe?: string;
  body?: string[];
  bodyGe?: string[];
  links?: ContentLink[];
}

const defaultContent = {
  title: 'Contact',
  titleGe: 'კონტაქტი',
  body: [
    'For questions or inquiries, please contact us:',
    'Email: contact@sabcho.org'
  ],
  bodyGe: [
    'კითხვების ან მოთხოვნებისთვის, გთხოვთ დაგვიკავშირდეთ:',
    'ელფოსტა: contact@sabcho.org'
  ]
};

const ContactCallout: React.FC<ContactCalloutProps> = ({
  title = defaultContent.title,
  titleGe = defaultContent.titleGe,
  body = defaultContent.body,
  bodyGe = defaultContent.bodyGe,
  links = []
}) => {
  const { language } = useLanguage();
  const isGeorgian = language === 'ge';

  const displayTitle = isGeorgian ? titleGe : title;
  const displayBody = isGeorgian ? bodyGe : body;

  return (
    <div className="bg-muted/30 border border-border p-6 mt-12">
      <div className="flex items-start gap-3">
        <Mail className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <h3 className={`text-sm font-semibold text-foreground mb-3 ${isGeorgian ? 'font-georgian' : ''}`}>
            {displayTitle}
          </h3>
          <div className={`text-sm text-muted-foreground space-y-1 ${isGeorgian ? 'font-georgian' : ''}`}>
            {displayBody.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          {links.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 text-sm font-medium text-navy dark:text-primary hover:underline underline-offset-2 ${isGeorgian ? 'font-georgian' : ''}`}
                >
                  {isGeorgian && link.labelGe ? link.labelGe : link.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCallout;