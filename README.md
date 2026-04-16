# DeIntel 🕵️‍♂️

> Automated due diligence. Uncover the truth. Tier-1 AI-powered crypto research, on-chain scraping, and intelligence reporting.

[![Live Demo](https://img.shields.io/badge/Live-de--intel.vercel.app-blueviolet?style=for-the-badge)](https://de-intel.vercel.app)

DeIntel is a Web3-native intelligence terminal that automates the tedious process of crypto due diligence. By dropping a project link or smart contract, DeIntel scrapes the web, bypasses anti-bot protocols, and utilizes Groq-powered AI to generate institutional-grade research reports in under 60 seconds.

---

## ✨ Core Features

- 🤖 **AI Intelligence Pipeline** — Automated extraction and synthesis of project fundamentals, tokenomics, and team history using Groq and Jina.
- 📊 **Dynamic Trust & Risk Scoring** — Algorithmically generated Trust Scores (/100) and Risk Profiles (Low, Medium, High).
- 🔐 **Solana Native Authentication** — Secure, session-based login using Phantom/Solflare wallets.
- 📁 **Research Archive** — Persistent "My Reports" dashboard to view and revisit previously generated intel.
- 🖥️ **Cyberpunk Terminal UI** — A sleek, dark-mode, heavy glassmorphism aesthetic built with Tailwind CSS.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js (App Router)](https://nextjs.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) & Lucide Icons |
| Web3 / Auth | `@solana/wallet-adapter` & Custom Cookie Sessions |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) |
| ORM | [Prisma](https://www.prisma.io/) (with Connection Pooling) |
| AI / Scraping | Groq Llama 3 & Jina AI |

---

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- An active [Supabase](https://supabase.com/) project

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/deintel.git
cd deintel
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
# Supabase Pooler — for Next.js to handle long AI requests
DATABASE_URL="postgres://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&pool_timeout=60"

# Direct connection — ONLY for Prisma migrations
DIRECT_URL="postgres://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"

# AI & Scraping
GROQ_API_KEY="your_groq_api_key"
JINA_API_KEY="your_jina_api_key"

# Solana RPC
NEXT_PUBLIC_SOLANA_RPC_URL="your_mainnet_or_devnet_rpc"
```

### 4. Set Up the Database

```bash
npx prisma db push
npx prisma generate
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 AI Pipeline Architecture

DeIntel's backend is designed to handle high-latency Web3 scraping without blocking the main thread or dropping DB connections:

```
1. INPUT      → User submits a project URL or Contract Address
2. TARGETING  → Groq filters input and identifies high-value links (Whitepapers, GitHub, Docs)
3. EXTRACTION → Jina deep-dives and scrapes raw text from targets
4. SYNTHESIS  → Groq processes unstructured data into a strict JSON payload
                 (tokenomics, threat vectors, catalysts)
5. STORAGE    → Prisma saves the report to Supabase via a singleton pooler instance
```

> The singleton Prisma instance prevents connection exhaustion in Next.js dev mode.

---

## 📄 License

Distributed under the [MIT License](LICENSE).

---

## 🤝 Contact

Built by **Your Name** — [@thegrandgeiss](https://twitter.com/thegrandgeiss)  
🔗 Live: [https://de-intel.vercel.app](https://de-intel.vercel.app)