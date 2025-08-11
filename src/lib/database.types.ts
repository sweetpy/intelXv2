export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: string
          company: string | null
          region: string | null
          phone: string | null
          avatar_url: string | null
          permissions: string[]
          mfa_enabled: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: string
          company?: string | null
          region?: string | null
          phone?: string | null
          avatar_url?: string | null
          permissions?: string[]
          mfa_enabled?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string
          company?: string | null
          region?: string | null
          phone?: string | null
          avatar_url?: string | null
          permissions?: string[]
          mfa_enabled?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          name: string
          company: string
          email: string | null
          phone: string | null
          address: string | null
          region: string
          district: string | null
          ward: string | null
          latitude: number | null
          longitude: number | null
          customer_type: 'distributor' | 'retailer' | 'wholesaler' | 'pharmacy' | 'supermarket' | 'kiosk'
          status: 'active' | 'inactive' | 'pending' | 'suspended'
          tier: 'platinum' | 'gold' | 'silver' | 'bronze'
          credit_limit: number | null
          payment_terms: string | null
          account_manager_id: string | null
          registration_date: string
          last_order_date: string | null
          total_orders: number
          total_revenue: number
          average_order_value: number
          satisfaction_score: number | null
          notes: string | null
          tags: string[]
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          company: string
          email?: string | null
          phone?: string | null
          address?: string | null
          region: string
          district?: string | null
          ward?: string | null
          latitude?: number | null
          longitude?: number | null
          customer_type: 'distributor' | 'retailer' | 'wholesaler' | 'pharmacy' | 'supermarket' | 'kiosk'
          status?: 'active' | 'inactive' | 'pending' | 'suspended'
          tier?: 'platinum' | 'gold' | 'silver' | 'bronze'
          credit_limit?: number | null
          payment_terms?: string | null
          account_manager_id?: string | null
          registration_date?: string
          last_order_date?: string | null
          total_orders?: number
          total_revenue?: number
          average_order_value?: number
          satisfaction_score?: number | null
          notes?: string | null
          tags?: string[]
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          company?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          region?: string
          district?: string | null
          ward?: string | null
          latitude?: number | null
          longitude?: number | null
          customer_type?: 'distributor' | 'retailer' | 'wholesaler' | 'pharmacy' | 'supermarket' | 'kiosk'
          status?: 'active' | 'inactive' | 'pending' | 'suspended'
          tier?: 'platinum' | 'gold' | 'silver' | 'bronze'
          credit_limit?: number | null
          payment_terms?: string | null
          account_manager_id?: string | null
          registration_date?: string
          last_order_date?: string | null
          total_orders?: number
          total_revenue?: number
          average_order_value?: number
          satisfaction_score?: number | null
          notes?: string | null
          tags?: string[]
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      distributors: {
        Row: {
          id: string
          customer_id: string
          distributor_code: string
          territory: string[]
          coverage_area: number
          warehouse_capacity: number
          fleet_size: number
          staff_count: number
          license_number: string | null
          license_expiry: string | null
          performance_score: number
          kpi_metrics: Json
          contract_start: string
          contract_end: string
          commission_rate: number
          incentive_structure: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          distributor_code: string
          territory?: string[]
          coverage_area?: number
          warehouse_capacity?: number
          fleet_size?: number
          staff_count?: number
          license_number?: string | null
          license_expiry?: string | null
          performance_score?: number
          kpi_metrics?: Json
          contract_start: string
          contract_end: string
          commission_rate?: number
          incentive_structure?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          distributor_code?: string
          territory?: string[]
          coverage_area?: number
          warehouse_capacity?: number
          fleet_size?: number
          staff_count?: number
          license_number?: string | null
          license_expiry?: string | null
          performance_score?: number
          kpi_metrics?: Json
          contract_start?: string
          contract_end?: string
          commission_rate?: number
          incentive_structure?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          sku: string
          category: string
          subcategory: string | null
          brand: string
          description: string | null
          unit_price: number
          cost_price: number
          margin: number
          weight: number | null
          dimensions: Json | null
          barcode: string | null
          manufacturer: string | null
          supplier_id: string | null
          min_order_quantity: number
          max_order_quantity: number | null
          lead_time_days: number
          shelf_life_days: number | null
          storage_requirements: string | null
          regulatory_info: Json | null
          tags: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          sku: string
          category: string
          subcategory?: string | null
          brand: string
          description?: string | null
          unit_price: number
          cost_price: number
          margin?: number
          weight?: number | null
          dimensions?: Json | null
          barcode?: string | null
          manufacturer?: string | null
          supplier_id?: string | null
          min_order_quantity?: number
          max_order_quantity?: number | null
          lead_time_days?: number
          shelf_life_days?: number | null
          storage_requirements?: string | null
          regulatory_info?: Json | null
          tags?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          sku?: string
          category?: string
          subcategory?: string | null
          brand?: string
          description?: string | null
          unit_price?: number
          cost_price?: number
          margin?: number
          weight?: number | null
          dimensions?: Json | null
          barcode?: string | null
          manufacturer?: string | null
          supplier_id?: string | null
          min_order_quantity?: number
          max_order_quantity?: number | null
          lead_time_days?: number
          shelf_life_days?: number | null
          storage_requirements?: string | null
          regulatory_info?: Json | null
          tags?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_id: string
          distributor_id: string | null
          status: 'draft' | 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          order_date: string
          delivery_date: string | null
          total_amount: number
          discount_amount: number
          tax_amount: number
          shipping_cost: number
          payment_status: 'pending' | 'partial' | 'paid' | 'overdue'
          payment_method: string | null
          delivery_address: string
          delivery_coordinates: Json | null
          special_instructions: string | null
          created_by: string
          approved_by: string | null
          shipped_by: string | null
          delivered_by: string | null
          tracking_number: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          customer_id: string
          distributor_id?: string | null
          status?: 'draft' | 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          order_date?: string
          delivery_date?: string | null
          total_amount: number
          discount_amount?: number
          tax_amount?: number
          shipping_cost?: number
          payment_status?: 'pending' | 'partial' | 'paid' | 'overdue'
          payment_method?: string | null
          delivery_address: string
          delivery_coordinates?: Json | null
          special_instructions?: string | null
          created_by: string
          approved_by?: string | null
          shipped_by?: string | null
          delivered_by?: string | null
          tracking_number?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          customer_id?: string
          distributor_id?: string | null
          status?: 'draft' | 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          order_date?: string
          delivery_date?: string | null
          total_amount?: number
          discount_amount?: number
          tax_amount?: number
          shipping_cost?: number
          payment_status?: 'pending' | 'partial' | 'paid' | 'overdue'
          payment_method?: string | null
          delivery_address?: string
          delivery_coordinates?: Json | null
          special_instructions?: string | null
          created_by?: string
          approved_by?: string | null
          shipped_by?: string | null
          delivered_by?: string | null
          tracking_number?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          discount_percentage: number
          line_total: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          discount_percentage?: number
          line_total: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          discount_percentage?: number
          line_total?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      inventory: {
        Row: {
          id: string
          product_id: string
          location_id: string
          current_stock: number
          reserved_stock: number
          available_stock: number
          min_stock_level: number
          max_stock_level: number
          reorder_point: number
          reorder_quantity: number
          last_stock_count: string | null
          last_movement_date: string | null
          cost_per_unit: number
          total_value: number
          expiry_date: string | null
          batch_number: string | null
          supplier_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          location_id: string
          current_stock?: number
          reserved_stock?: number
          available_stock?: number
          min_stock_level: number
          max_stock_level: number
          reorder_point: number
          reorder_quantity: number
          last_stock_count?: string | null
          last_movement_date?: string | null
          cost_per_unit: number
          total_value?: number
          expiry_date?: string | null
          batch_number?: string | null
          supplier_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          location_id?: string
          current_stock?: number
          reserved_stock?: number
          available_stock?: number
          min_stock_level?: number
          max_stock_level?: number
          reorder_point?: number
          reorder_quantity?: number
          last_stock_count?: string | null
          last_movement_date?: string | null
          cost_per_unit?: number
          total_value?: number
          expiry_date?: string | null
          batch_number?: string | null
          supplier_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      routes: {
        Row: {
          id: string
          name: string
          route_code: string
          region: string
          start_location: string
          end_location: string
          waypoints: Json[]
          total_distance: number
          estimated_duration: number
          vehicle_type: string
          driver_id: string | null
          status: 'active' | 'inactive' | 'maintenance' | 'planned'
          optimization_score: number
          cost_per_km: number
          total_cost: number
          frequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly'
          schedule: Json
          performance_metrics: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          route_code: string
          region: string
          start_location: string
          end_location: string
          waypoints?: Json[]
          total_distance: number
          estimated_duration: number
          vehicle_type: string
          driver_id?: string | null
          status?: 'active' | 'inactive' | 'maintenance' | 'planned'
          optimization_score?: number
          cost_per_km?: number
          total_cost?: number
          frequency?: 'daily' | 'weekly' | 'bi-weekly' | 'monthly'
          schedule?: Json
          performance_metrics?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          route_code?: string
          region?: string
          start_location?: string
          end_location?: string
          waypoints?: Json[]
          total_distance?: number
          estimated_duration?: number
          vehicle_type?: string
          driver_id?: string | null
          status?: 'active' | 'inactive' | 'maintenance' | 'planned'
          optimization_score?: number
          cost_per_km?: number
          total_cost?: number
          frequency?: 'daily' | 'weekly' | 'bi-weekly' | 'monthly'
          schedule?: Json
          performance_metrics?: Json
          created_at?: string
          updated_at?: string
        }
      }
      analytics_data: {
        Row: {
          id: string
          metric_name: string
          metric_value: number
          metric_unit: string
          dimension_1: string | null
          dimension_2: string | null
          dimension_3: string | null
          region: string | null
          date_recorded: string
          data_source: string
          confidence_score: number | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          metric_name: string
          metric_value: number
          metric_unit: string
          dimension_1?: string | null
          dimension_2?: string | null
          dimension_3?: string | null
          region?: string | null
          date_recorded: string
          data_source: string
          confidence_score?: number | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          metric_name?: string
          metric_value?: number
          metric_unit?: string
          dimension_1?: string | null
          dimension_2?: string | null
          dimension_3?: string | null
          region?: string | null
          date_recorded?: string
          data_source?: string
          confidence_score?: number | null
          metadata?: Json | null
          created_at?: string
        }
      }
      intelligence_files: {
        Row: {
          id: string
          name: string
          file_type: string
          file_size: number
          file_url: string | null
          category: string
          subcategory: string | null
          upload_date: string
          uploaded_by: string
          analysis_status: 'pending' | 'processing' | 'completed' | 'failed'
          ai_tags: string[]
          user_tags: string[]
          confidence_score: number | null
          relevance_score: number | null
          summary: string | null
          key_findings: string[]
          actionable_items: string[]
          connections: string[]
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          file_type: string
          file_size: number
          file_url?: string | null
          category: string
          subcategory?: string | null
          upload_date?: string
          uploaded_by: string
          analysis_status?: 'pending' | 'processing' | 'completed' | 'failed'
          ai_tags?: string[]
          user_tags?: string[]
          confidence_score?: number | null
          relevance_score?: number | null
          summary?: string | null
          key_findings?: string[]
          actionable_items?: string[]
          connections?: string[]
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          file_type?: string
          file_size?: number
          file_url?: string | null
          category?: string
          subcategory?: string | null
          upload_date?: string
          uploaded_by?: string
          analysis_status?: 'pending' | 'processing' | 'completed' | 'failed'
          ai_tags?: string[]
          user_tags?: string[]
          confidence_score?: number | null
          relevance_score?: number | null
          summary?: string | null
          key_findings?: string[]
          actionable_items?: string[]
          connections?: string[]
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      ai_insights: {
        Row: {
          id: string
          file_id: string | null
          insight_type: 'opportunity' | 'threat' | 'trend' | 'recommendation' | 'prediction' | 'correlation'
          title: string
          description: string
          confidence: number
          impact: 'high' | 'medium' | 'low'
          timeframe: string
          priority: number
          status: 'new' | 'reviewed' | 'implemented' | 'dismissed'
          action_items: string[]
          related_files: string[]
          created_by_ai: boolean
          reviewed_by: string | null
          review_date: string | null
          implementation_date: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          file_id?: string | null
          insight_type: 'opportunity' | 'threat' | 'trend' | 'recommendation' | 'prediction' | 'correlation'
          title: string
          description: string
          confidence: number
          impact: 'high' | 'medium' | 'low'
          timeframe: string
          priority?: number
          status?: 'new' | 'reviewed' | 'implemented' | 'dismissed'
          action_items?: string[]
          related_files?: string[]
          created_by_ai?: boolean
          reviewed_by?: string | null
          review_date?: string | null
          implementation_date?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          file_id?: string | null
          insight_type?: 'opportunity' | 'threat' | 'trend' | 'recommendation' | 'prediction' | 'correlation'
          title?: string
          description?: string
          confidence?: number
          impact?: 'high' | 'medium' | 'low'
          timeframe?: string
          priority?: number
          status?: 'new' | 'reviewed' | 'implemented' | 'dismissed'
          action_items?: string[]
          related_files?: string[]
          created_by_ai?: boolean
          reviewed_by?: string | null
          review_date?: string | null
          implementation_date?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          name: string
          company: string
          email: string
          phone: string | null
          region: string
          industry: string
          source: string
          status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
          score: number
          estimated_value: number
          probability: number
          assigned_to: string
          created_date: string
          last_contact_date: string | null
          next_action: string | null
          notes: string | null
          tags: string[]
          conversion_date: string | null
          lost_reason: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          company: string
          email: string
          phone?: string | null
          region: string
          industry: string
          source: string
          status?: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
          score?: number
          estimated_value?: number
          probability?: number
          assigned_to: string
          created_date?: string
          last_contact_date?: string | null
          next_action?: string | null
          notes?: string | null
          tags?: string[]
          conversion_date?: string | null
          lost_reason?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          company?: string
          email?: string
          phone?: string | null
          region?: string
          industry?: string
          source?: string
          status?: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
          score?: number
          estimated_value?: number
          probability?: number
          assigned_to?: string
          created_date?: string
          last_contact_date?: string | null
          next_action?: string | null
          notes?: string | null
          tags?: string[]
          conversion_date?: string | null
          lost_reason?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      sales_activities: {
        Row: {
          id: string
          lead_id: string | null
          customer_id: string | null
          activity_type: 'call' | 'email' | 'meeting' | 'demo' | 'proposal' | 'follow-up' | 'contract'
          subject: string
          description: string | null
          assigned_to: string
          status: 'completed' | 'scheduled' | 'overdue' | 'cancelled'
          scheduled_date: string
          completed_date: string | null
          duration_minutes: number | null
          outcome: string | null
          next_action: string | null
          priority: 'high' | 'medium' | 'low'
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lead_id?: string | null
          customer_id?: string | null
          activity_type: 'call' | 'email' | 'meeting' | 'demo' | 'proposal' | 'follow-up' | 'contract'
          subject: string
          description?: string | null
          assigned_to: string
          status?: 'completed' | 'scheduled' | 'overdue' | 'cancelled'
          scheduled_date: string
          completed_date?: string | null
          duration_minutes?: number | null
          outcome?: string | null
          next_action?: string | null
          priority?: 'high' | 'medium' | 'low'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lead_id?: string | null
          customer_id?: string | null
          activity_type?: 'call' | 'email' | 'meeting' | 'demo' | 'proposal' | 'follow-up' | 'contract'
          subject?: string
          description?: string | null
          assigned_to?: string
          status?: 'completed' | 'scheduled' | 'overdue' | 'cancelled'
          scheduled_date?: string
          completed_date?: string | null
          duration_minutes?: number | null
          outcome?: string | null
          next_action?: string | null
          priority?: 'high' | 'medium' | 'low'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          type: 'warehouse' | 'distribution_center' | 'retail_outlet' | 'office'
          address: string
          region: string
          district: string | null
          ward: string | null
          latitude: number
          longitude: number
          capacity: number | null
          manager_id: string | null
          contact_phone: string | null
          contact_email: string | null
          operating_hours: Json | null
          facilities: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'warehouse' | 'distribution_center' | 'retail_outlet' | 'office'
          address: string
          region: string
          district?: string | null
          ward?: string | null
          latitude: number
          longitude: number
          capacity?: number | null
          manager_id?: string | null
          contact_phone?: string | null
          contact_email?: string | null
          operating_hours?: Json | null
          facilities?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'warehouse' | 'distribution_center' | 'retail_outlet' | 'office'
          address?: string
          region?: string
          district?: string | null
          ward?: string | null
          latitude?: number
          longitude?: number
          capacity?: number | null
          manager_id?: string | null
          contact_phone?: string | null
          contact_email?: string | null
          operating_hours?: Json | null
          facilities?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      vehicles: {
        Row: {
          id: string
          vehicle_number: string
          vehicle_type: string
          make: string
          model: string
          year: number
          capacity_kg: number
          capacity_m3: number
          fuel_type: string
          fuel_efficiency: number
          driver_id: string | null
          current_location: Json | null
          status: 'available' | 'in_transit' | 'maintenance' | 'out_of_service'
          last_service_date: string | null
          next_service_date: string | null
          insurance_expiry: string | null
          license_expiry: string | null
          gps_device_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          vehicle_number: string
          vehicle_type: string
          make: string
          model: string
          year: number
          capacity_kg: number
          capacity_m3: number
          fuel_type: string
          fuel_efficiency: number
          driver_id?: string | null
          current_location?: Json | null
          status?: 'available' | 'in_transit' | 'maintenance' | 'out_of_service'
          last_service_date?: string | null
          next_service_date?: string | null
          insurance_expiry?: string | null
          license_expiry?: string | null
          gps_device_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          vehicle_number?: string
          vehicle_type?: string
          make?: string
          model?: string
          year?: number
          capacity_kg?: number
          capacity_m3?: number
          fuel_type?: string
          fuel_efficiency?: number
          driver_id?: string | null
          current_location?: Json | null
          status?: 'available' | 'in_transit' | 'maintenance' | 'out_of_service'
          last_service_date?: string | null
          next_service_date?: string | null
          insurance_expiry?: string | null
          license_expiry?: string | null
          gps_device_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      deliveries: {
        Row: {
          id: string
          order_id: string
          route_id: string | null
          vehicle_id: string | null
          driver_id: string | null
          delivery_date: string
          delivery_time_window: Json
          actual_delivery_time: string | null
          status: 'scheduled' | 'in_transit' | 'delivered' | 'failed' | 'cancelled'
          delivery_address: string
          delivery_coordinates: Json
          recipient_name: string | null
          recipient_phone: string | null
          signature_url: string | null
          photo_url: string | null
          delivery_notes: string | null
          failed_reason: string | null
          attempts: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          route_id?: string | null
          vehicle_id?: string | null
          driver_id?: string | null
          delivery_date: string
          delivery_time_window: Json
          actual_delivery_time?: string | null
          status?: 'scheduled' | 'in_transit' | 'delivered' | 'failed' | 'cancelled'
          delivery_address: string
          delivery_coordinates: Json
          recipient_name?: string | null
          recipient_phone?: string | null
          signature_url?: string | null
          photo_url?: string | null
          delivery_notes?: string | null
          failed_reason?: string | null
          attempts?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          route_id?: string | null
          vehicle_id?: string | null
          driver_id?: string | null
          delivery_date?: string
          delivery_time_window?: Json
          actual_delivery_time?: string | null
          status?: 'scheduled' | 'in_transit' | 'delivered' | 'failed' | 'cancelled'
          delivery_address?: string
          delivery_coordinates?: Json
          recipient_name?: string | null
          recipient_phone?: string | null
          signature_url?: string | null
          photo_url?: string | null
          delivery_notes?: string | null
          failed_reason?: string | null
          attempts?: number
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          resource: string
          resource_id: string | null
          old_values: Json | null
          new_values: Json | null
          ip_address: string | null
          user_agent: string | null
          success: boolean
          error_message: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          resource: string
          resource_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          success?: boolean
          error_message?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          resource?: string
          resource_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          success?: boolean
          error_message?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}