# Database Schema Summary

## Table: leads
- **id**: bigint (int8) - Primary Key, Identity
- **name**: text
- **email**: text
- **business**: text
- **blueprint_status**: USER-DEFINED (blueprint_status_enum: "Not started", "Sent")
- **email_sent**: boolean (bool)
- **created_at**: timestamp with time zone (timestamptz) - Default: now()
- **phone**: text

## Table: form_submissions
- **id**: bigint (int8) - Primary Key, Identity
- **name**: text
- **phone**: text
- **business_name**: text
- **email**: text
- **website**: text
- **business_type**: USER-DEFINED (business_type_enum: "Other", "Startup", "Ecommerce", "Local Service")
- **primary_goal**: USER-DEFINED (primary_goal_enum: "Lower CPA", "More sales", "More bookings", "More calls")
- **biggest_problem**: text
- **monthly_budget**: USER-DEFINED (monthly_budget_enum: "₹0 – 25k", "₹25 – 75k", "₹75k+")
- **source**: text
- **created_at**: timestamp with time zone (timestamptz) - Default: now()
