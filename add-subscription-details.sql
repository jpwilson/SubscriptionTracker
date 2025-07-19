-- Add new columns to subscriptions table for detailed tracking
ALTER TABLE subscriptions
ADD COLUMN company VARCHAR(255),
ADD COLUMN product VARCHAR(255),
ADD COLUMN tier VARCHAR(255);

-- Create indexes for better search performance
CREATE INDEX idx_subscriptions_company ON subscriptions(company);
CREATE INDEX idx_subscriptions_product ON subscriptions(product);
CREATE INDEX idx_subscriptions_tier ON subscriptions(tier);

-- Update RLS policies (they should already work with the new columns)