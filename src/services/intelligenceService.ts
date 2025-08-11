import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type IntelligenceFile = Database['public']['Tables']['intelligence_files']['Row'];
type IntelligenceFileInsert = Database['public']['Tables']['intelligence_files']['Insert'];
type AIInsight = Database['public']['Tables']['ai_insights']['Row'];
type AIInsightInsert = Database['public']['Tables']['ai_insights']['Insert'];

export class IntelligenceService {
  // Upload and process intelligence file
  static async uploadFile(
    file: File, 
    category: string, 
    userTags: string[] = []
  ): Promise<IntelligenceFile> {
    try {
      // Upload file to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('intelligence-files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create file record
      const fileData: IntelligenceFileInsert = {
        name: file.name,
        file_type: file.type,
        file_size: file.size,
        file_url: uploadData.path,
        category,
        user_tags: userTags,
        uploaded_by: (await supabase.auth.getUser()).data.user?.id || '',
        analysis_status: 'pending'
      };

      const { data, error } = await supabase
        .from('intelligence_files')
        .insert(fileData)
        .select()
        .single();

      if (error) throw error;

      // Trigger AI analysis
      this.triggerAIAnalysis(data.id);

      return data;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  }

  // Trigger AI analysis for uploaded file
  static async triggerAIAnalysis(fileId: string): Promise<void> {
    try {
      // Update status to processing
      await supabase
        .from('intelligence_files')
        .update({ analysis_status: 'processing' })
        .eq('id', fileId);

      const response = await fetch(`${import.meta.env.VITE_AI_SERVICE_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId })
      });

      if (!response.ok) {
        throw new Error(`AI service responded with ${response.status}`);
      }

      const { jobId } = await response.json();

      await supabase
        .from('intelligence_files')
        .update({ ai_job_id: jobId })
        .eq('id', fileId);
    } catch (error) {
      console.error('Error triggering AI analysis:', error);
      await supabase
        .from('intelligence_files')
        .update({ analysis_status: 'failed' })
        .eq('id', fileId);
      throw error;
    }
  }

  // Get all intelligence files
  static async getFiles(filters?: {
    category?: string;
    status?: string;
    search?: string;
  }): Promise<IntelligenceFile[]> {
    let query = supabase
      .from('intelligence_files')
      .select(`
        *,
        uploader:users!intelligence_files_uploaded_by_fkey(name, email),
        insights:ai_insights(*)
      `);

    if (filters?.category && filters.category !== 'all') {
      query = query.eq('category', filters.category);
    }

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('analysis_status', filters.status);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,summary.ilike.%${filters.search}%`);
    }

    const { data, error } = await query.order('upload_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  // Get AI insights
  static async getInsights(filters?: {
    type?: string;
    impact?: string;
    status?: string;
  }): Promise<AIInsight[]> {
    let query = supabase
      .from('ai_insights')
      .select(`
        *,
        file:intelligence_files(name, category)
      `);

    if (filters?.type && filters.type !== 'all') {
      query = query.eq('insight_type', filters.type);
    }

    if (filters?.impact && filters.impact !== 'all') {
      query = query.eq('impact', filters.impact);
    }

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query.order('priority').order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  // Update insight status
  static async updateInsightStatus(
    insightId: string, 
    status: 'reviewed' | 'implemented' | 'dismissed',
    notes?: string
  ): Promise<AIInsight> {
    const { data, error } = await supabase
      .from('ai_insights')
      .update({
        status,
        reviewed_by: (await supabase.auth.getUser()).data.user?.id,
        review_date: new Date().toISOString(),
        metadata: notes ? { review_notes: notes } : undefined
      })
      .eq('id', insightId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Search across intelligence data
  static async searchIntelligence(searchTerm: string): Promise<{
    files: IntelligenceFile[];
    insights: AIInsight[];
  }> {
    const [filesResult, insightsResult] = await Promise.all([
      supabase
        .from('intelligence_files')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,summary.ilike.%${searchTerm}%,ai_tags.cs.{${searchTerm}}`)
        .limit(20),
      supabase
        .from('ai_insights')
        .select('*')
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .limit(20)
    ]);

    return {
      files: filesResult.data || [],
      insights: insightsResult.data || []
    };
  }

  // Get knowledge graph data
  static async getKnowledgeGraph(): Promise<{
    nodes: Array<{
      id: string;
      label: string;
      type: string;
      weight: number;
      connections: number;
    }>;
    edges: Array<{
      source: string;
      target: string;
      strength: number;
      type: string;
    }>;
  }> {
    // This would typically come from a graph database or specialized service
    // For now, we'll generate based on file connections and tags
    
    const { data: files } = await supabase
      .from('intelligence_files')
      .select('id, name, ai_tags, connections, category');

    const { data: insights } = await supabase
      .from('ai_insights')
      .select('id, title, insight_type, related_files');

    // Build nodes from files and insights
    const nodes = [
      ...(files || []).map(file => ({
        id: file.id,
        label: file.name,
        type: 'file',
        weight: file.ai_tags?.length || 1,
        connections: file.connections?.length || 0
      })),
      ...(insights || []).map(insight => ({
        id: insight.id,
        label: insight.title,
        type: insight.insight_type,
        weight: 1,
        connections: insight.related_files?.length || 0
      }))
    ];

    // Build edges from connections
    const edges: any[] = [];
    files?.forEach(file => {
      file.connections?.forEach(connectionId => {
        edges.push({
          source: file.id,
          target: connectionId,
          strength: 0.8,
          type: 'related'
        });
      });
    });

    return { nodes, edges };
  }
}