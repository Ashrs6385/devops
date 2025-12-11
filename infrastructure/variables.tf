variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "db_password" {
  description = "Password for RDS PostgreSQL database"
  type        = string
  sensitive   = true
}

