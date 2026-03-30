# "URL Metadata Fetcher"

> Fetch Open Graph tags, title, description, favicon, and canonical URL from any webpage. Use when agents need to generate link previews, crawl content metadata, or extract SEO information from URLs.

[![License: MIT-0](https://img.shields.io/badge/License-MIT--0-blue.svg)](LICENSE)
[![Claw0x](https://img.shields.io/badge/Powered%20by-Claw0x-orange)](https://claw0x.com)
[![OpenClaw Compatible](https://img.shields.io/badge/OpenClaw-Compatible-green)](https://openclaw.org)

## What is This?

This is a native skill for **OpenClaw** and other AI agents. Skills are modular capabilities that agents can install and use instantly - no complex API setup, no managing multiple provider keys.

Built for OpenClaw, compatible with Claude, GPT-4, and other agent frameworks.

## Installation

### For OpenClaw Users

Simply tell your agent:

```
Install the ""URL Metadata Fetcher"" skill from Claw0x
```

Or use this connection prompt:

```
Add skill: url-metadata
Platform: Claw0x
Get your API key at: https://claw0x.com
```

### For Other Agents (Claude, GPT-4, etc.)

1. Get your free API key at [claw0x.com](https://claw0x.com) (no credit card required)
2. Add to your agent's configuration:
   - Skill name: `url-metadata`
   - Endpoint: `https://claw0x.com/v1/call`
   - Auth: Bearer token with your Claw0x API key

### Via CLI

```bash
npx @claw0x/cli add url-metadata
```

---


# URL Metadata Fetcher

Get Open Graph tags, title, description, favicon, Twitter Card data, and canonical URL from any webpage. Perfect for link preview generation and SEO analysis.

## Prerequisites

1. **Sign up at [claw0x.com](https://claw0x.com)**
2. **Create API key** in Dashboard
3. **Set environment variable**: `export CLAW0X_API_KEY="ck_live_..."`

## Quick Reference

| When This Happens | Do This | What You Get |
|-------------------|---------|--------------|
| Generate link preview | Send URL | Title + image + description |
| SEO audit | Send page URL | OG tags + canonical + language |
| Content crawling | Send article URL | Full metadata extraction |

## Example Usage

```bash
curl -X POST https://api.claw0x.com/v1/call \
  -H "Authorization: Bearer $CLAW0X_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"skill": "url-metadata", "input": {"url": "https://github.com"}}'
```

## Extracted Fields

title, description, og_title, og_description, og_image, og_type, og_site_name, twitter_card, twitter_title, twitter_description, twitter_image, favicon, canonical, language, author.

## Pricing

**FREE.** No charge per call.

- Requires Claw0x API key for authentication
- No usage charges (price_per_call = 0)
- Unlimited calls


---

## About Claw0x

Claw0x is the native skills layer for AI agents - not just another API marketplace.

**Why Claw0x?**
- **One key, all skills** - Single API key for 50+ production-ready skills
- **Pay only for success** - Failed calls (4xx/5xx) are never charged
- **Built for OpenClaw** - Native integration with the OpenClaw agent framework
- **Zero config** - No upstream API keys to manage, we handle all third-party auth

**For Developers:**
- [Browse all skills](https://claw0x.com/skills)
- [Sell your own skills](https://claw0x.com/docs/sell)
- [API Documentation](https://claw0x.com/docs/api-reference)
- [OpenClaw Integration Guide](https://claw0x.com/docs/openclaw)

## Links

- [Claw0x Platform](https://claw0x.com)
- [OpenClaw Framework](https://openclaw.org)
- [Skill Documentation](https://claw0x.com/skills/url-metadata)
