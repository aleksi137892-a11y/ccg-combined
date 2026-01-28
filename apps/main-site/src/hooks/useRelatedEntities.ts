import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RelatedEntity {
  id: string;
  name: string;
  name_ge?: string;
  sector?: string;
  beneficial_owner_english?: string;
}

interface UseRelatedEntitiesOptions {
  entityId: string;
  beneficialOwnerEnglish?: string | null;
  sector?: string | null;
  limit?: number;
}

export function useRelatedEntities({
  entityId,
  beneficialOwnerEnglish,
  sector,
  limit = 5,
}: UseRelatedEntitiesOptions) {
  const [relatedEntities, setRelatedEntities] = useState<RelatedEntity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only fetch if we have something to match on
    if (!beneficialOwnerEnglish && !sector) {
      setRelatedEntities([]);
      return;
    }

    const fetchRelated = async () => {
      setLoading(true);

      // Build OR query for owner match or sector match
      const filters: string[] = [];
      if (beneficialOwnerEnglish) {
        filters.push(`beneficial_owner_english.eq.${beneficialOwnerEnglish}`);
      }
      if (sector) {
        filters.push(`sector.eq.${sector}`);
      }

      const { data, error } = await supabase
        .from('complicity_entities')
        .select('id, name, name_ge, sector, beneficial_owner_english')
        .neq('id', entityId)
        .or(filters.join(','))
        .limit(limit);

      if (!error && data) {
        setRelatedEntities(data);
      }
      setLoading(false);
    };

    fetchRelated();
  }, [entityId, beneficialOwnerEnglish, sector, limit]);

  return { relatedEntities, loading };
}
