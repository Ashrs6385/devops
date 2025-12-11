# Car Rental Website

A complete car rental platform with React, Node.js, PostgreSQL, Docker, Terraform, and Ansible. Designed for smooth local development and straightforward deployment to AWS.

## Features

- Browse available cars with category filters
- Bookings with date validation and confirmation
- Responsive, polished UI
- RESTful API with data validation
- PostgreSQL schema with seed data
- Infrastructure as code for AWS (VPC, EC2, RDS)
- Automated deployment via Ansible

## Quick Start (Local)

### Using Docker Compose (recommended)

```bash
docker-compose up -d
```

Then open http://localhost:3000

### Manual setup

1. Start PostgreSQL:

```bash
docker run -d -p 5432:5432 \
  -e POSTGRES_DB=carrental \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  postgres:15-alpine
```

2. Backend:

```bash
cd backend
npm install
cp .env.example .env
# Update .env if needed
npm start
```

3. Frontend:

```bash
cd frontend
npm install
cp .env.example .env
# Set VITE_API_URL if backend is remote
npm run dev
```

Visit http://localhost:3000

## AWS Deployment

### 1. Provision infrastructure

```bash
cd infrastructure
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
export TF_VAR_db_password=your-secure-password

terraform init
terraform plan
terraform apply
```

Record the outputs (EC2 IP, DB endpoint).

### 2. Deploy application

```bash
cd deployment
cp inventory.ini.example inventory.ini
# Fill in EC2 IP and RDS connection details

ansible-playbook -i inventory.ini playbook.yml
```

Browse to `http://YOUR_EC2_IP:3000`

## Project Structure

```
.
├── frontend/          # React + Vite SPA
├── backend/           # Express API + PostgreSQL
├── infrastructure/    # Terraform AWS setup
├── deployment/        # Ansible automation
└── docker-compose.yml # Local development
```

## API Overview

- `GET /api/cars` – List cars
- `GET /api/cars/:id` – Car details
- `POST /api/bookings` – Create booking
- `GET /api/bookings/:id` – Booking details
- `GET /health` – Service health

## Environment Variables

### Backend (`backend/.env`)

```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=carrental
DB_USER=postgres
DB_PASSWORD=postgres
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:3001
```

## Scripts

- `frontend`: `npm run dev`, `npm run build`
- `backend`: `npm start`, `npm run dev`
- `infrastructure`: `terraform init/plan/apply/destroy`
- `deployment`: `ansible-playbook playbook.yml`

## Next Steps

- Configure HTTPS (ACM + ALB or reverse proxy)
- Add auth for admin features
- Wire up CI/CD (GitHub Actions)
- Extend monitoring (CloudWatch, custom metrics)

MIT License

