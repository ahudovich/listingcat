-- Custom SQL migration file, put your code below! --

-- Insert initial rows for tracked tables
INSERT INTO "table_updates" ("table_name", "updated_at") VALUES 
  ('services', NULL)
ON CONFLICT (table_name) DO NOTHING;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS trigger_services_update ON launch_platforms;

-- Create triggers for all tracked tables
CREATE TRIGGER trigger_services_update
  AFTER INSERT OR UPDATE OR DELETE ON services
  FOR EACH STATEMENT EXECUTE FUNCTION track_table_update();
