# GEO AI Brand Visibility System

A comprehensive platform for monitoring, analyzing, and optimizing brand visibility across search engines and AI models.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [API Integrations](#api-integrations)

## Features
- **Project Management**: Brand profiles, keyword management, competitor tracking
- **AI Detection Engine**: Multi-model crawling (ChatGPT/Perplexity/DeepSeek), prompt templates, result parsing, scoring system
- **Reporting & Visualization**: Trend charts, competitive comparison reports, PDF export, scheduled notifications
- **Content Optimization Engine**: FAQ generation, page optimization, structured data generation
- **Scheduled Tasks**: Daily scanning, API call queuing
- **User & Billing**: Login authentication, subscription management

## Technologies
- **Frontend**: React 18+, TypeScript, Vite, Tailwind CSS, React Router, Recharts
- **Backend Integration**: Supabase (PostgreSQL database and authentication)
- **Caching**: Upstash Redis
- **AI Models**: Deepseek API integration

## Installation
1. Clone the repository
2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

## Usage
1. Start the development server:
   ```bash
   pnpm dev
   ```
2. Open your browser and navigate to `http://localhost:3000`

## Deployment
1. Build the project:
   ```bash
   pnpm build
   ```
2. Zip the build files:
   ```bash
   pnpm zip
   ```
3. The resulting `geo-ai-brand-visibility.zip` file contains all necessary files for deployment.

## API Integrations
This project integrates with the following services:
- **Supabase**: For database and authentication
- **Upstash Redis**: For caching
- **Deepseek API**: For AI-powered content analysis and generation

## Configuration
API keys and configuration details are available in the `apidata.txt` file.