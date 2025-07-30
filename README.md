# Crypto Payroll Solution

A user-friendly platform for businesses and freelancers to manage payroll, invoicing, and payments in cryptocurrency, simplifying global financial operations.

---

## Motivation

Managing payroll and payments across borders is complex, especially with traditional banking. This app aims to streamline these processes using cryptocurrency, making it easier for businesses and freelancers to handle invoicing, payments, and conversions between fiat and crypto.

---

## Key Features

- **Customizable Invoice Generation:** Create invoices in both fiat and cryptocurrencies.
- **Crypto Payment Requests:** Request and accept payments in various cryptocurrencies.
- **On-Ramping & Off-Ramping:** Easily convert between fiat and crypto.
- **Direct Payment Processing:** Send and receive payments directly in crypto or fiat.
- **Dashboard:** Get a comprehensive overview of invoices and payments.

---

## Possible Solution

Crypto Payroll Solution simplifies payroll and invoicing for businesses and freelancers, enabling fast, borderless payments. Monetization options include transaction fees and premium subscriptions for advanced features.

---

## Tech Stack

- **Monorepo:** Managed with Turborepo
- **Backend:** Node.js, Express, Prisma, PostgreSQL
- **Frontend:**  React
- **Shared Packages:** TypeScript types, UI components, ESLint config

---

## Getting Started

Before you begin, ensure you have a PostgreSQL database running and accessible.  
You can easily spin up a local PostgreSQL instance using Docker Compose.  
A sample `docker-compose.yml` file is provided in the project root.

Start PostgreSQL with:

```sh
docker compose up -d
```

Set your `DATABASE_URL` environment variable (see `.env.example` for reference).

Clone the repo and install dependencies:

```sh
git clone https://github.com/GeekyProgrammer07/Crypto-Payroll-Solution.git
cd Crypto-Payroll-Solution
pnpm install
```

### Develop

```sh
turbo run dev
```
---
