# Terraform Configuration

## Overview
Infrastructure-as-code for deploying HealthBridge to AWS.

## Resources Created
- VPC with public subnet
- Internet Gateway and route table
- Security group (ports 80, 443, 5000-5003)
- EC2 instance with Docker and Docker Compose pre-installed

## Usage

### Initialize:
```bash
cd terraform
terraform init
```

### Plan:
```bash
terraform plan -var="db_password=your-password" -var="jwt_secret=your-secret"
```

### Apply:
```bash
terraform apply -var="db_password=your-password" -var="jwt_secret=your-secret"
```

### Destroy:
```bash
terraform destroy -var="db_password=your-password" -var="jwt_secret=your-secret"
```

### Validate:
```bash
terraform validate
```

## Variables
| Variable | Default | Description |
|----------|---------|-------------|
| aws_region | us-east-1 | AWS region |
| instance_type | t3.medium | EC2 instance type |
| db_password | (required) | MongoDB password |
| jwt_secret | (required) | JWT secret key |

## Outputs
- `instance_public_ip` - Public IP of the EC2 instance
- `vpc_id` - VPC ID
- `instance_id` - EC2 instance ID
