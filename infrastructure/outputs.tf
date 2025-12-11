output "app_server_ip" {
  description = "Public IP of the application server"
  value       = aws_eip.app.public_ip
}

output "app_server_dns" {
  description = "Public DNS of the application server"
  value       = aws_instance.app.public_dns
}

output "db_endpoint" {
  description = "RDS database endpoint"
  value       = aws_db_instance.postgres.endpoint
}

output "db_port" {
  description = "RDS database port"
  value       = aws_db_instance.postgres.port
}

