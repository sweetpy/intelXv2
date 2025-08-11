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

      // Simulate AI analysis (in production, this would call actual AI service)
      setTimeout(async () => {
        try {
          const analysisResults = await this.simulateAIAnalysis(fileId);
          
          // Update file with analysis results
          await supabase
            .from('intelligence_files')
            .update({
              analysis_status: 'completed',
              ai_tags: analysisResults.tags,
              summary: analysisResults.summary,
              key_findings: analysisResults.keyFindings,
              actionable_items: analysisResults.actionableItems,
              confidence_score: analysisResults.confidence,
              relevance_score: analysisResults.relevance
            })
            .eq('id', fileId);

          // Create AI insights
          for (const insight of analysisResults.insights) {
            await supabase
              .from('ai_insights')
              .insert({
                ...insight,
                file_id: fileId
              });
          }
        } catch (error) {
          console.error('AI analysis error:', error);
          await supabase
            .from('intelligence_files')
            .update({ analysis_status: 'failed' })
            .eq('id', fileId);
        }
      }, 2000);
    } catch (error) {
      console.error('Error triggering AI analysis:', error);
    }
  }

  // Simulate AI analysis (replace with actual AI service in production)
  static async simulateAIAnalysis(fileId: string): Promise<{
    tags: string[];
    summary: string;
    keyFindings: string[];
    actionableItems: string[];
    insights: Omit<AIInsightInsert, 'file_id'>[];
    confidence: number;
    relevance: number;
  }> {
    // Get file info
    const { data: file } = await supabase
      .from('intelligence_files')
      .select('*')
      .eq('id', fileId)
      .single();

    if (!file) throw new Error('File not found');

    const fileName = file.name.toLowerCase();
    const category = file.category;

    // Generate AI tags based on file name and category
    const aiTags: string[] = [];
    if (fileName.includes('market')) aiTags.push('market-analysis');
    if (fileName.includes('competitor')) aiTags.push('competitive-intelligence');
    if (fileName.includes('consumer')) aiTags.push('consumer-behavior');
    if (fileName.includes('financial')) aiTags.push('financial-analysis');
    if (category === 'market-research') aiTags.push('research-data', 'market-trends');
    if (category === 'competitor-intel') aiTags.push('competition', 'market-share');

    // Generate insights based on category
    const insights: Omit<AIInsightInsert, 'file_id'>[] = [];

    if (category === 'market-research') {
      insights.push({
        insight_type: 'opportunity',
        title: 'Market Expansion Opportunity Detected',
        description: 'Analysis reveals untapped market segments with high growth potential in rural Tanzania',
        confidence: 85 + Math.random() * 10,
        impact: 'high',
        timeframe: 'Q2-Q3 2024',
        priority: 1,
        action_items: ['Conduct market entry feasibility study', 'Identify key distribution partners'],
        created_by_ai: true
      });
    }

    if (category === 'competitor-intel') {
      insights.push({
        insight_type: 'threat',
        title: 'Competitive Threat Identified',
        description: 'Competitor activity suggests potential market disruption in key regions',
        confidence: 75 + Math.random() * 15,
        impact: 'medium',
        timeframe: 'Next 6 months',
        priority: 2,
        action_items: ['Develop counter-strategy', 'Strengthen market position'],
        created_by_ai: true
      });
    }

    if (category === 'consumer-insights') {
      insights.push({
        insight_type: 'trend',
        title: 'Consumer Behavior Shift Detected',
        description: 'Significant changes in consumer preferences and purchasing patterns identified',
        confidence: 80 + Math.random() * 15,
        impact: 'high',
        timeframe: 'Ongoing',
        priority: 1,
        action_items: ['Adapt product offerings', 'Modify distribution strategy'],
        created_by_ai: true
      });
    }

    return {
      tags: aiTags,
      summary: `AI analysis of ${file.name} reveals valuable insights for strategic decision-making and market optimization.`,
      keyFindings: [
        'Market penetration opportunities identified in underserved regions',
        'Consumer behavior patterns suggest new distribution channels',
        'Competitive landscape analysis reveals strategic positioning opportunities'
      ],
      actionableItems: [
        'Develop targeted market entry strategy',
        'Optimize distribution channel mix',
        'Implement competitive differentiation tactics'
      ],
      insights,
      confidence: 85 + Math.random() * 10,
      relevance: 90 + Math.random() * 8
    };
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