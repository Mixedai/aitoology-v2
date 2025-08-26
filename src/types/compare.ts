export type FeatureType = 'bool'|'number'|'string'|'enum';
export type FeatureKey =
  | 'api_available'
  | 'embeddings'
  | 'rag_support'
  | 'image_generation'
  | 'category'
  | 'pricing_tier'
  | 'rating'
  | 'writing_support'
  | 'assistant_support'
  | 'code_support'
  | 'video_support'
  | 'chat_support'
  | 'design_support'
  | 'voice_support'
  | 'realtime_support';

export interface FeatureDef {
  key: FeatureKey;
  label: string;
  type: FeatureType;
  unit?: string;
  enumOptions?: string[];
  group: 'General'|'Capabilities'|'Meta';
  sort: number;
}

export interface ToolLite {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  rating?: number;
  category?: string;
  pricing?: string;
  features?: string[];
}

export interface ValueCell {
  key: FeatureKey;
  value_text?: string;
  value_number?: number;
  value_bool?: boolean;
}