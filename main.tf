# ==================
# FLASK SERVER SETUP
# ==================

provider "aws" {
  region = "us-east-1"  # You can change this to your preferred AWS region
}

resource "aws_instance" "flask_server" {
  ami           = "ami-0866a3c8686eaeeba"  # Replace this with an appropriate AMI ID for your region
  instance_type = "t2.micro"                # Free-tier eligible instance type
  key_name      = "new-key-pair"           # Your AWS key pair name for SSH access
  security_groups = [aws_security_group.flask_sg.name]  # Link to security group defined below

  tags = {
    Name = "Flask Server"
  }

  # When the instance starts up, install Python 3, Pip, Virtualenv, and Flask
  user_data = file("${path.module}/install_script.sh")
}


resource "aws_security_group" "flask_sg" {
  name_prefix = "flask_sg"
  description = "Allow HTTP and SSH access to Flask server"

  # Only allow SSH connections from the UR_Connected network (SSH key is still needed)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["128.151.150.9/32"]
  }

  # Allow HTTP access (port 80) from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow HTTP access from any IP
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ================
# > DATABASE SETUP
# ================

# Get the default VPC
data "aws_vpc" "default" {
  default = true
}

# Get all subnets in the default VPC
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# Create a subnet group for RDS using the fetched subnets
resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "flask-rds-subnet-group"
  subnet_ids = data.aws_subnets.default.ids

  tags = {
    Name = "Flask RDS subnet group"
  }
}

# Create a security group for RDS
resource "aws_security_group" "rds_sg" {
  name_prefix = "rds_sg"
  description = "Security group for RDS instance"
  vpc_id      = data.aws_vpc.default.id  # Explicitly set VPC

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.flask_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Flask RDS Security Group"
  }
}

# Create the RDS instance
resource "aws_db_instance" "flask_db" {
  identifier        = "flask-database"
  engine            = "mysql"
  engine_version    = "8.0.40"
  instance_class    = "db.t3.micro"
  allocated_storage = 20

  db_name  = "flaskdb"
  username = "flaskadmin"
  password = "your-secure-password"

  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  publicly_accessible    = false

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "Mon:04:00-Mon:05:00"

  multi_az               = false
  skip_final_snapshot    = true
  delete_automated_backups = true

  tags = {
    Name = "Flask Database"
  }
}

# Output the subnet IDs being used (useful for verification)
output "subnet_ids" {
  value = data.aws_subnets.default.ids
}

# Output the database endpoint
output "database_endpoint" {
  value = aws_db_instance.flask_db.endpoint
}

# Output the database port
output "database_port" {
  value = aws_db_instance.flask_db.port
}
