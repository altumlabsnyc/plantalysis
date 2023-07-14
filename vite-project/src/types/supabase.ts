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
      analysis: {
        Row: {
          finished_at: string
          id: string
          run_id: string
          started_at: string | null
        }
        Insert: {
          finished_at?: string
          id?: string
          run_id: string
          started_at?: string | null
        }
        Update: {
          finished_at?: string
          id?: string
          run_id?: string
          started_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analysis_run_id_fkey"
            columns: ["run_id"]
            referencedRelation: "run"
            referencedColumns: ["id"]
          }
        ]
      }
      batch: {
        Row: {
          brand_id: string
          facility_id: string
          id: string
          weight: number | null
        }
        Insert: {
          brand_id: string
          facility_id: string
          id?: string
          weight?: number | null
        }
        Update: {
          brand_id?: string
          facility_id?: string
          id?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "batch_brand_id_fkey"
            columns: ["brand_id"]
            referencedRelation: "brand"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batch_facility_id_fkey"
            columns: ["facility_id"]
            referencedRelation: "facility"
            referencedColumns: ["id"]
          }
        ]
      }
      brand: {
        Row: {
          facility_id: string | null
          id: string
          name: string
          producer_id: string
        }
        Insert: {
          facility_id?: string | null
          id?: string
          name: string
          producer_id: string
        }
        Update: {
          facility_id?: string | null
          id?: string
          name?: string
          producer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "brand_facility_id_fkey"
            columns: ["facility_id"]
            referencedRelation: "facility"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brand_producer_id_fkey"
            columns: ["producer_id"]
            referencedRelation: "producer_user"
            referencedColumns: ["id"]
          }
        ]
      }
      co_molecule: {
        Row: {
          co_molecule_id: string
          molecule_id: string
        }
        Insert: {
          co_molecule_id: string
          molecule_id: string
        }
        Update: {
          co_molecule_id?: string
          molecule_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "co_molecule_co_molecule_id_fkey"
            columns: ["co_molecule_id"]
            referencedRelation: "molecule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "co_molecule_molecule_id_fkey"
            columns: ["molecule_id"]
            referencedRelation: "molecule"
            referencedColumns: ["id"]
          }
        ]
      }
      consumer_user: {
        Row: {
          id: string
          personality: string | null
        }
        Insert: {
          id: string
          personality?: string | null
        }
        Update: {
          id?: string
          personality?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consumer_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      effect: {
        Row: {
          description: string | null
          id: string
          is_mental: boolean | null
        }
        Insert: {
          description?: string | null
          id?: string
          is_mental?: boolean | null
        }
        Update: {
          description?: string | null
          id?: string
          is_mental?: boolean | null
        }
        Relationships: []
      }
      facility: {
        Row: {
          description: string | null
          id: string
          location: string | null
          name: string
          producer_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          location?: string | null
          name: string
          producer_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          location?: string | null
          name?: string
          producer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "facility_producer_id_fkey"
            columns: ["producer_id"]
            referencedRelation: "producer_user"
            referencedColumns: ["id"]
          }
        ]
      }
      fragment: {
        Row: {
          id: string
          intensity: number | null
          mz_ratio: number | null
        }
        Insert: {
          id?: string
          intensity?: number | null
          mz_ratio?: number | null
        }
        Update: {
          id?: string
          intensity?: number | null
          mz_ratio?: number | null
        }
        Relationships: []
      }
      lab_user: {
        Row: {
          contact_phone: string | null
          id: string
          lab_address: string | null
          lab_name: string | null
          license_number: number | null
          owner_name: string | null
        }
        Insert: {
          contact_phone?: string | null
          id: string
          lab_address?: string | null
          lab_name?: string | null
          license_number?: number | null
          owner_name?: string | null
        }
        Update: {
          contact_phone?: string | null
          id?: string
          lab_address?: string | null
          lab_name?: string | null
          license_number?: number | null
          owner_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      lot: {
        Row: {
          batch_id: string
          id: string
          lot_weight: number
        }
        Insert: {
          batch_id: string
          id?: string
          lot_weight: number
        }
        Update: {
          batch_id?: string
          id?: string
          lot_weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "lot_batch_id_fkey"
            columns: ["batch_id"]
            referencedRelation: "batch"
            referencedColumns: ["id"]
          }
        ]
      }
      molecule: {
        Row: {
          external_id: string | null
          id: string
          name: string | null
          smiles: string | null
          spectrum: string | null
        }
        Insert: {
          external_id?: string | null
          id?: string
          name?: string | null
          smiles?: string | null
          spectrum?: string | null
        }
        Update: {
          external_id?: string | null
          id?: string
          name?: string | null
          smiles?: string | null
          spectrum?: string | null
        }
        Relationships: []
      }
      molecule_on_effect: {
        Row: {
          effect_id: string
          moleclue_id: string
        }
        Insert: {
          effect_id: string
          moleclue_id: string
        }
        Update: {
          effect_id?: string
          moleclue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "molecule_on_effect_effect_id_fkey"
            columns: ["effect_id"]
            referencedRelation: "effect"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "molecule_on_effect_moleclue_id_fkey"
            columns: ["moleclue_id"]
            referencedRelation: "molecule"
            referencedColumns: ["id"]
          }
        ]
      }
      molecule_prediction: {
        Row: {
          analysis_id: string | null
          concentration: number | null
          id: string
          molecule_id: string
          temperature: number | null
        }
        Insert: {
          analysis_id?: string | null
          concentration?: number | null
          id?: string
          molecule_id: string
          temperature?: number | null
        }
        Update: {
          analysis_id?: string | null
          concentration?: number | null
          id?: string
          molecule_id?: string
          temperature?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "molecule_prediction_analysis_id_fkey"
            columns: ["analysis_id"]
            referencedRelation: "analysis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "molecule_prediction_molecule_id_fkey"
            columns: ["molecule_id"]
            referencedRelation: "molecule"
            referencedColumns: ["id"]
          }
        ]
      }
      plant: {
        Row: {
          genetics: string | null
          id: string
          plant_variety_id: string
        }
        Insert: {
          genetics?: string | null
          id?: string
          plant_variety_id: string
        }
        Update: {
          genetics?: string | null
          id?: string
          plant_variety_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plant_plant_variety_id_fkey"
            columns: ["plant_variety_id"]
            referencedRelation: "plant_variety"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_grow_info: {
        Row: {
          fertilization_regiment: string | null
          id: string
          is_natural: boolean | null
          lighting: string | null
          PAR: number | null
          soil_composition: string | null
          "water/hr": number | null
        }
        Insert: {
          fertilization_regiment?: string | null
          id?: string
          is_natural?: boolean | null
          lighting?: string | null
          PAR?: number | null
          soil_composition?: string | null
          "water/hr"?: number | null
        }
        Update: {
          fertilization_regiment?: string | null
          id?: string
          is_natural?: boolean | null
          lighting?: string | null
          PAR?: number | null
          soil_composition?: string | null
          "water/hr"?: number | null
        }
        Relationships: []
      }
      plant_season: {
        Row: {
          end: string | null
          id: string
          plant_grow_info_id: string | null
          plant_id: string
          start: string | null
        }
        Insert: {
          end?: string | null
          id?: string
          plant_grow_info_id?: string | null
          plant_id: string
          start?: string | null
        }
        Update: {
          end?: string | null
          id?: string
          plant_grow_info_id?: string | null
          plant_id?: string
          start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plant_season_plant_grow_info_id_fkey"
            columns: ["plant_grow_info_id"]
            referencedRelation: "plant_grow_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_season_plant_id_fkey"
            columns: ["plant_id"]
            referencedRelation: "plant"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_season_on_batch: {
        Row: {
          batch_id: string
          plant_season_id: string
        }
        Insert: {
          batch_id: string
          plant_season_id: string
        }
        Update: {
          batch_id?: string
          plant_season_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plant_season_on_batch_batch_id_fkey"
            columns: ["batch_id"]
            referencedRelation: "batch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_season_on_batch_plant_season_id_fkey"
            columns: ["plant_season_id"]
            referencedRelation: "plant_season"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_variety: {
        Row: {
          genus: string | null
          id: string
          species: string | null
          strain: string | null
        }
        Insert: {
          genus?: string | null
          id?: string
          species?: string | null
          strain?: string | null
        }
        Update: {
          genus?: string | null
          id?: string
          species?: string | null
          strain?: string | null
        }
        Relationships: []
      }
      predmol_on_fragment: {
        Row: {
          fragment_id: string | null
          id: string
          predmol_id: string | null
        }
        Insert: {
          fragment_id?: string | null
          id?: string
          predmol_id?: string | null
        }
        Update: {
          fragment_id?: string | null
          id?: string
          predmol_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "predmol_on_fragment_fragment_id_fkey"
            columns: ["fragment_id"]
            referencedRelation: "fragment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "predmol_on_fragment_predmol_id_fkey"
            columns: ["predmol_id"]
            referencedRelation: "molecule_prediction"
            referencedColumns: ["id"]
          }
        ]
      }
      producer_prefill: {
        Row: {
          business_name: string | null
          city: string | null
          contact_phone: string | null
          county: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          license_number: string | null
          license_type: Database["public"]["Enums"]["license_type_enum"] | null
          website: string | null
        }
        Insert: {
          business_name?: string | null
          city?: string | null
          contact_phone?: string | null
          county?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          license_number?: string | null
          license_type?: Database["public"]["Enums"]["license_type_enum"] | null
          website?: string | null
        }
        Update: {
          business_name?: string | null
          city?: string | null
          contact_phone?: string | null
          county?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          license_number?: string | null
          license_type?: Database["public"]["Enums"]["license_type_enum"] | null
          website?: string | null
        }
        Relationships: []
      }
      producer_user: {
        Row: {
          billing_address: string | null
          common_name: string | null
          contact_phone: string | null
          id: string
          legal_name: string | null
          license_number: string | null
          license_type: Database["public"]["Enums"]["license_type_enum"] | null
          primary_facility_address: string | null
        }
        Insert: {
          billing_address?: string | null
          common_name?: string | null
          contact_phone?: string | null
          id: string
          legal_name?: string | null
          license_number?: string | null
          license_type?: Database["public"]["Enums"]["license_type_enum"] | null
          primary_facility_address?: string | null
        }
        Update: {
          billing_address?: string | null
          common_name?: string | null
          contact_phone?: string | null
          id?: string
          legal_name?: string | null
          license_number?: string | null
          license_type?: Database["public"]["Enums"]["license_type_enum"] | null
          primary_facility_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "producer_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      regulator_user: {
        Row: {
          contact_phone: string | null
          id: string
          mailing_address: string | null
          regulator_name: string | null
        }
        Insert: {
          contact_phone?: string | null
          id: string
          mailing_address?: string | null
          regulator_name?: string | null
        }
        Update: {
          contact_phone?: string | null
          id?: string
          mailing_address?: string | null
          regulator_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regulator_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      run: {
        Row: {
          bio_id: string | null
          gcfid_id: string | null
          gcms_id: string | null
          hplc_id: string | null
          icpms_id: string | null
          id: string
          lcms_id: string | null
          notes: string | null
          sample_id: string | null
        }
        Insert: {
          bio_id?: string | null
          gcfid_id?: string | null
          gcms_id?: string | null
          hplc_id?: string | null
          icpms_id?: string | null
          id?: string
          lcms_id?: string | null
          notes?: string | null
          sample_id?: string | null
        }
        Update: {
          bio_id?: string | null
          gcfid_id?: string | null
          gcms_id?: string | null
          hplc_id?: string | null
          icpms_id?: string | null
          id?: string
          lcms_id?: string | null
          notes?: string | null
          sample_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "run_sample_id_fkey"
            columns: ["sample_id"]
            referencedRelation: "sample"
            referencedColumns: ["id"]
          }
        ]
      }
      sample: {
        Row: {
          bio_id: string | null
          gcfid_id: string | null
          gcms_id: string | null
          hplc_id: string | null
          icmps_id: string | null
          id: string
          lcms_id: string | null
          lot_id: string
          weight: number
        }
        Insert: {
          bio_id?: string | null
          gcfid_id?: string | null
          gcms_id?: string | null
          hplc_id?: string | null
          icmps_id?: string | null
          id?: string
          lcms_id?: string | null
          lot_id: string
          weight: number
        }
        Update: {
          bio_id?: string | null
          gcfid_id?: string | null
          gcms_id?: string | null
          hplc_id?: string | null
          icmps_id?: string | null
          id?: string
          lcms_id?: string | null
          lot_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "sample_lot_id_fkey"
            columns: ["lot_id"]
            referencedRelation: "lot"
            referencedColumns: ["id"]
          }
        ]
      }
      university_user: {
        Row: {
          id: string
          lab_address: string | null
          primary_investigator: string | null
          university_department: string | null
          university_name: string | null
        }
        Insert: {
          id: string
          lab_address?: string | null
          primary_investigator?: string | null
          university_department?: string | null
          university_name?: string | null
        }
        Update: {
          id?: string
          lab_address?: string | null
          primary_investigator?: string | null
          university_department?: string | null
          university_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "university_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          mfa_phone: string | null
          user_type: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          mfa_phone?: string | null
          user_type?: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          mfa_phone?: string | null
          user_type?: Database["public"]["Enums"]["user_type_enum"] | null
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
      license_type_enum: "AUCC" | "AUCP" | "AUHC"
      user_type_enum:
        | "consumer"
        | "regulator"
        | "lab"
        | "producer"
        | "university"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
