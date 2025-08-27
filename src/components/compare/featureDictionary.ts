import type { FeatureDef, FeatureKey, ToolLite, ValueCell } from '../../types/compare';

export const FEATURE_DICTIONARY: FeatureDef[] = [
  { key:'category',         label:'Category',          type:'string', group:'General',     sort: 10 },
  { key:'pricing_tier',     label:'Pricing',           type:'enum',   group:'General',     sort: 20, enumOptions:['Free','Freemium','Paid'] },
  { key:'rating',           label:'Rating',            type:'number', group:'General',     sort: 30, unit:'/5' },
  { key:'api_available',    label:'API Available',     type:'bool',   group:'Capabilities',sort: 40 },
  { key:'embeddings',       label:'Embeddings',        type:'bool',   group:'Capabilities',sort: 50 },
  { key:'rag_support',      label:'RAG Support',       type:'bool',   group:'Capabilities',sort: 60 },
  { key:'image_generation', label:'Image Generation',  type:'bool',   group:'Capabilities',sort: 70 },
  { key:'writing_support',  label:'Writing Support',   type:'bool',   group:'Capabilities',sort: 80 },
  { key:'assistant_support',label:'Assistant Support', type:'bool',   group:'Capabilities',sort: 90 },
  { key:'code_support',     label:'Code Support',      type:'bool',   group:'Capabilities',sort: 100 },
  { key:'video_support',    label:'Video Support',     type:'bool',   group:'Capabilities',sort: 110 },
  { key:'chat_support',     label:'Chat Support',      type:'bool',   group:'Capabilities',sort: 120 },
  { key:'design_support',   label:'Design Support',    type:'bool',   group:'Capabilities',sort: 130 },
  { key:'voice_support',    label:'Voice Support',     type:'bool',   group:'Capabilities',sort: 140 },
  { key:'realtime_support', label:'Real-time Support', type:'bool',   group:'Capabilities',sort: 150 },
];

export function deriveValues(tool: ToolLite): Record<FeatureKey, ValueCell> {
  const fset = new Set((tool.features||[]).map(s => s.toLowerCase()));
  const descLower = (tool.description || '').toLowerCase();
  
  // Helper to check features and description
  const has = (needle: string) => {
    const needleLower = needle.toLowerCase();
    return [...fset].some(s => s.includes(needleLower)) || descLower.includes(needleLower);
  };

  const vals: Record<FeatureKey, ValueCell> = {
    category:          { key:'category',         value_text: tool.category || '—' },
    pricing_tier:      { key:'pricing_tier',     value_text: tool.pricing || '—' },
    rating:            { key:'rating',           value_number: typeof tool.rating === 'number' ? tool.rating : undefined },
    api_available:     { key:'api_available',    value_bool: has('api') || has('sdk') },
    embeddings:        { key:'embeddings',       value_bool: has('embedding') },
    rag_support:       { key:'rag_support',      value_bool: has('rag') || has('retrieval') },
    image_generation:  { key:'image_generation', value_bool: has('image') || has('vision') || has('diffusion') },
    writing_support:   { key:'writing_support',  value_bool: has('writing') || has('write') || has('rewrite') || has('grammar') },
    assistant_support: { key:'assistant_support',value_bool: has('assistant') || has('help') || has('copilot') },
    code_support:      { key:'code_support',     value_bool: has('code') || has('programming') || has('ide') || has('developer') },
    video_support:     { key:'video_support',    value_bool: has('video') || has('motion') || has('animation') },
    chat_support:      { key:'chat_support',     value_bool: has('chat') || has('conversational') || has('messaging') },
    design_support:    { key:'design_support',   value_bool: has('design') || has('figma') || has('creative') || has('visual') },
    voice_support:     { key:'voice_support',    value_bool: has('voice') || has('audio') || has('speech') || has('transcription') },
    realtime_support:  { key:'realtime_support', value_bool: has('real-time') || has('realtime') || has('live') || has('streaming') },
  };
  return vals;
}