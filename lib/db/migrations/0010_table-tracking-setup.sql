-- Custom SQL migration file, put your code below! --

-- Insert initial rows for tracked tables
INSERT INTO "table_updates" ("table_name", "updated_at") VALUES 
  ('launch_platforms', NULL),
  ('directories', NULL),
  ('marketplaces', NULL),
  ('showcases', NULL),
  ('specials', NULL)
ON CONFLICT (table_name) DO NOTHING;

-- Create function to update table_updates
CREATE OR REPLACE FUNCTION track_table_update()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO table_updates (table_name, updated_at)
  VALUES (TG_TABLE_NAME, NOW())
  ON CONFLICT (table_name) 
  DO UPDATE SET updated_at = NOW();
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS trigger_launch_platforms_update ON launch_platforms;
DROP TRIGGER IF EXISTS trigger_directories_update ON directories;
DROP TRIGGER IF EXISTS trigger_marketplaces_update ON marketplaces;
DROP TRIGGER IF EXISTS trigger_showcases_update ON showcases;
DROP TRIGGER IF EXISTS trigger_specials_update ON specials;

-- Create triggers for all tracked tables
CREATE TRIGGER trigger_launch_platforms_update
  AFTER INSERT OR UPDATE OR DELETE ON launch_platforms
  FOR EACH STATEMENT EXECUTE FUNCTION track_table_update();

CREATE TRIGGER trigger_directories_update
  AFTER INSERT OR UPDATE OR DELETE ON directories
  FOR EACH STATEMENT EXECUTE FUNCTION track_table_update();

CREATE TRIGGER trigger_marketplaces_update
  AFTER INSERT OR UPDATE OR DELETE ON marketplaces
  FOR EACH STATEMENT EXECUTE FUNCTION track_table_update();

CREATE TRIGGER trigger_showcases_update
  AFTER INSERT OR UPDATE OR DELETE ON showcases
  FOR EACH STATEMENT EXECUTE FUNCTION track_table_update();

CREATE TRIGGER trigger_specials_update
  AFTER INSERT OR UPDATE OR DELETE ON specials
  FOR EACH STATEMENT EXECUTE FUNCTION track_table_update();
