import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const JINA_API_KEY = process.env.JINA_AI_API_KEY;

export async function POST(request: Request) {
  try {
    // 🛑 1. THE BOUNCER: Check for the VIP Wristband first
    const sessionCookie = (await cookies()).get('deintel_session');
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { error: 'Unauthorized. Please connect wallet and sign in.' },
        { status: 401 },
      );
    }
    const userId = sessionCookie.value;

    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL required' }, { status: 400 });
    }

    // ==========================================
    // 🧠 2. YOUR EXISTING AI PIPELINE
    // ==========================================
    const jinaResponse = await fetch(`https://r.jina.ai/${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JINA_API_KEY}`,
        'X-with-links-summary': 'all',
        'X-return-format': 'markdown',
        'X-Retain-Images': 'none',
        Accept: 'application/json',
      },
    });

    if (!jinaResponse.ok) {
      const errorText = await jinaResponse.text();
      console.error(
        `🚨 JINA API REJECTED REQUEST! Status: ${jinaResponse.status}`,
      );
      console.error(`🚨 JINA REASON: ${errorText}`);
      return NextResponse.json(
        { error: `Jina blocked the request. Status: ${jinaResponse.status}` },
        { status: jinaResponse.status },
      );
    }

    const jinaData = await jinaResponse.json();
    const homepageMarkdown = jinaData.data.content || '';
    const jinaLink = jinaData.data.links || [];

    const linksText = JSON.stringify(jinaLink).substring(0, 10000);

    const routerPrompt = `
      You are a routing agent for a crypto research tool.
      Look at the following JSON array of links extracted from a crypto website.
      Find the 3 most important links that point to the Tokenomics, the Team, the Docs, or the Whitepaper.
      Return ONLY a JSON array of the 3 complete URLs. No markdown formatting, no other text. Just the array.

      Website Links:
      ${linksText}
    `;

    console.log('🧠 Sending links to Groq for filtering...');
    const groqRouterResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: routerPrompt }],
          temperature: 0.1,
        }),
      },
    );

    if (!groqRouterResponse.ok) {
      const err = await groqRouterResponse.text();
      console.error('🚨 Groq Router Failed:', err);
      throw new Error('Groq failed to route links.');
    }

    const routerData = await groqRouterResponse.json();
    const targetLinks = JSON.parse(routerData.choices[0].message.content);
    console.log('🎯 AI Selected Targets:', targetLinks);

    console.log(
      `🤿 Deep diving into target links sequentially to avoid rate limits...`,
    );

    let scrapedPages: string[] = [];

    for (const targetUrl of targetLinks) {
      try {
        console.log(`Scraping: ${targetUrl}`);
        const res = await fetch(`https://r.jina.ai/${targetUrl}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${JINA_API_KEY}`,
            'X-return-format': 'markdown',
            'X-Retain-Images': 'none',
          },
        });

        if (res.ok) {
          const text = await res.text();
          scrapedPages.push(text);
        } else {
          console.log(`⚠️ Jina skipped ${targetUrl} (Status: ${res.status})`);
        }
      } catch (err) {
        console.error(`❌ Failed to scrape ${targetUrl}`, err);
      }
    }

    const deepDiveMarkdown = scrapedPages.join('\n\n--- NEXT PAGE ---\n\n');

    console.log(`🧠 Generating final DYOR Report...`);

    const masterPrompt = `
      You are an elite, highly cynical Crypto Research Analyst for a Tier-1 Venture Capital firm. 
      Your job is to read the provided documentation for a crypto project and generate a comprehensive, institutional-grade Due Diligence report.
      
      Analyze the project based on its Homepage and Deep Dive Docs. Look past the marketing fluff.
      Identify token utility, vesting schedules, team transparency, and potential rug-pull mechanics.

      If exact numbers or data points (like specific tokenomics percentages) are missing from the text, use your best analytical deduction based on the text, OR put "Data not available in docs" if completely hidden. 
      
      CRITICAL: You MUST return ONLY a JSON object using the EXACT structure below. Do not add markdown blocks like \`\`\`json. 

      {
        "project_name": "String (Name of the project)",
        "ticker": "String (Token ticker, e.g., SOL, ETH. Use 'UNKNOWN' if not found)",
        "trust_score": Number (1-100. Be ruthless. 100 is impossible. >85 is elite. <50 is a scam.),
        "risk_level": "String (Low | Medium | High | Extreme)",
        "executive_summary": "String (A 2-3 sentence brutal, objective summary of what this actually is)",
        "category": "String (e.g., Layer 1, DeFi, GameFi, AI, Meme, Oracle)",
        "tokenomics": {
          "total_supply": "String (e.g., '1,000,000,000' or 'Infinite')",
          "utility": ["Array of Strings (What is the actual use case for the token? Staking, Gas, Governance, etc.)"],
          "allocations": [
            { "category": "Team & Advisors", "percentage": Number (e.g., 20) },
            { "category": "Investors/VCs", "percentage": Number },
            { "category": "Community/Treasury", "percentage": Number },
            { "category": "Liquidity/Public", "percentage": Number }
          ]
        },
        "team_and_backers": {
          "is_doxxed": Boolean (True if real names/LinkedIn are found, False if anonymous or just avatars),
          "details": "String (Summary of team experience and notable VC backers if any)"
        },
        "security": {
          "audited": Boolean (True if CertiK, Hacken, Consensys, etc., are mentioned),
          "details": "String (Summary of security measures, audits, or bug bounties)"
        },
        "catalysts": ["Array of Strings (Upcoming mainnets, token generation events, or major roadmap milestones)"],
        "red_flags": ["Array of Strings (Centralization risks, high team allocation, anonymous founders, buzzword soup)"],
        "green_flags": ["Array of Strings (Strong tech, doxxed team, clear utility)"]
      }

      Homepage Data: ${homepageMarkdown.substring(0, 8000)}
      Deep Dive Data: ${deepDiveMarkdown.substring(0, 12000)}
    `;

    const groqFinalResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: masterPrompt }],
          temperature: 0.2,
          response_format: { type: 'json_object' },
        }),
      },
    );

    if (!groqFinalResponse.ok) {
      const groqErr = await groqFinalResponse.text();
      console.error(
        `🚨 GROQ FINAL API CRASHED! Status: ${groqFinalResponse.status}`,
      );
      console.error(`🚨 GROQ REASON: ${groqErr}`);
      throw new Error(`Groq Final Step Failed: ${groqFinalResponse.status}`);
    }

    const finalData = await groqFinalResponse.json();

    if (!finalData.choices || !finalData.choices) {
      throw new Error('Groq returned an empty or malformed choice array.');
    }

    const finalReport = JSON.parse(finalData.choices[0].message.content);

    console.log(`💾 Saving generated report to Prisma...`);

    const savedReport = await prisma.report.create({
      data: {
        authorId: userId, // Tied perfectly to the logged-in user
        projectName: finalReport.project_name,
        ticker: finalReport.ticker,
        category: finalReport.category,
        executiveSummary: finalReport.executive_summary,
        trustScore: finalReport.trust_score,
        riskLevel: finalReport.risk_level,
        catalysts: finalReport.catalysts,
        greenFlags: finalReport.green_flags,
        redFlags: finalReport.red_flags,
        security: finalReport.security,
        teamAndBackers: finalReport.team_and_backers,
        tokenomics: finalReport.tokenomics,
      },
    });

    return NextResponse.json({
      success: true,
      reportId: savedReport.id,
      report: finalReport,
    });
  } catch (error) {
    console.error('🔥 CRITICAL PIPELINE ERROR:', error);
    return NextResponse.json(
      { error: 'Backend API processing failed. Check server logs.' },
      { status: 500 },
    );
  }
}
