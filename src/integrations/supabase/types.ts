export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      currency_performance: {
        Row: {
          created_at: string
          currency_code: string
          currency_name: string
          daily_change_percent: number
          flag_emoji: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency_code: string
          currency_name: string
          daily_change_percent: number
          flag_emoji?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency_code?: string
          currency_name?: string
          daily_change_percent?: number
          flag_emoji?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      entry_checks: {
        Row: {
          atr_daily_move_percent: number | null
          atr_status: string | null
          candle_formation: string | null
          candle_status: string | null
          created_at: string
          id: string
          overall_recommendation: string | null
          pair: string
          price_vs_ema: string | null
          price_vs_ema_status: string | null
          rsi_stoch_status: string | null
          rsi_stoch_value: number | null
          updated_at: string
          volatility_spike: string | null
          volatility_status: string | null
        }
        Insert: {
          atr_daily_move_percent?: number | null
          atr_status?: string | null
          candle_formation?: string | null
          candle_status?: string | null
          created_at?: string
          id?: string
          overall_recommendation?: string | null
          pair: string
          price_vs_ema?: string | null
          price_vs_ema_status?: string | null
          rsi_stoch_status?: string | null
          rsi_stoch_value?: number | null
          updated_at?: string
          volatility_spike?: string | null
          volatility_status?: string | null
        }
        Update: {
          atr_daily_move_percent?: number | null
          atr_status?: string | null
          candle_formation?: string | null
          candle_status?: string | null
          created_at?: string
          id?: string
          overall_recommendation?: string | null
          pair?: string
          price_vs_ema?: string | null
          price_vs_ema_status?: string | null
          rsi_stoch_status?: string | null
          rsi_stoch_value?: number | null
          updated_at?: string
          volatility_spike?: string | null
          volatility_status?: string | null
        }
        Relationships: []
      }
      trade_recommendations: {
        Row: {
          confidence_score: number | null
          created_at: string
          id: string
          recommendation_text: string | null
          strongest_currency: string
          suggested_pair: string
          weakest_currency: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          recommendation_text?: string | null
          strongest_currency: string
          suggested_pair: string
          weakest_currency: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          recommendation_text?: string | null
          strongest_currency?: string
          suggested_pair?: string
          weakest_currency?: string
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
