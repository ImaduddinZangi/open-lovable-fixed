# Open Lovable, fixed (Zangineer edition)

Clone any website into a modern React app, then make it yours by chatting: your colors, your logo, your words.

This is **Open Lovable by the [Firecrawl](https://firecrawl.dev) team** (MIT licence, original: [firecrawl/open-lovable](https://github.com/firecrawl/open-lovable)), with the fixes it needed to work out of the box in November 2026. Everything was tested on a real, fresh install.

▶ Video walkthrough: the step-by-step guide on the Zangineer YouTube channel.

## What's fixed

| Problem in the original | Fix |
|---|---|
| The default AI model (Gemini 3 Pro Preview) was shut down by Google on 9 March 2026, so every clone failed | the default is now a **free** model through OpenRouter; the menu lists only models that work today |
| Google's free tier isn't available for every account | free AI via **OpenRouter** (no card), with its own `OPENROUTER_API_KEY` line |
| "Failed to create sandbox: 403": E2B no longer accepts the old E2B package | updated `@e2b/code-interpreter` to the current version |
| Live preview blocked: "MISSING TRAFFIC ACCESS TOKEN" | the sandbox preview is made public (`allowPublicTraffic`) |
| Clones showed up with no design (plain text, blue links) | the app stripped `import './index.css'` from `main.jsx`; it's now always kept |
| "Failed to create ZIP: No active sandbox", plus restyles losing their file list | older routes looked for the sandbox under an old name; a small adapter connects them |
| File list failed on the sandbox (`stat -f` is Mac-only) | uses the Linux form, `stat -c` |
| A style (Glassmorphism) was always forced on the clone | new **Original** style, selected by default |
| The example key file had a leftover merge marker, a duplicate line and a sample value that silently broke every clone | a clean 3-key `.env.example` |

## What you need

- A computer: Windows, Mac or Linux, 8 GB of memory, 2 GB of free space, internet
- **Node.js LTS** (https://nodejs.org) and **Git** (https://git-scm.com)
- Three free keys (no card): **Firecrawl** (https://firecrawl.dev), **E2B** (https://e2b.dev), **OpenRouter** (https://openrouter.ai/settings/keys)

## Setup

```bash
git clone https://github.com/ImaduddinZangi/open-lovable-fixed.git
cd open-lovable-fixed
npm install
```

Make your key file, then paste your three keys into it and **save**:

```bash
cp .env.example .env.local        # Windows: copy .env.example .env.local
```

```env
FIRECRAWL_API_KEY=fc-...
E2B_API_KEY=e2b_...
OPENROUTER_API_KEY=sk-or-...
```

Start it, and open http://localhost:3000:

```bash
npm run dev
```

## Use it

1. Paste a website link, keep **Original** (or pick a style), press **Scrape Site**.
2. Watch the code being written; your clone appears in the preview.
3. Make it yours in the chat: "Make the colors purple and gold. Replace the logo with the word MYBRAND."
4. Press the download button (top right) to get the project as `my-website.zip`. To run it: unzip, then `npm install` and `npm run dev`.

Free models take a few minutes per clone. The free sandbox stays on for about 30 minutes, so download your ZIP before you walk away.

## Common errors

| You see | Do this |
|---|---|
| `node` / `git` is not recognized | install it, then close the terminal and open a new one |
| Windows: "running scripts is disabled on this system" | run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once |
| "Failed to scrape website" / "401: authorization header is missing" | your keys aren't loaded: file must be named `.env.local`, keys right after `=`, no spaces or quotes, **saved**, then restart with Ctrl+C and `npm run dev` |
| "Failed to generate recreation" | the AI key: no credits, free tier not available, or a free model is busy. Pick another model in the menu and try again |
| "Sandbox Not Found" | the free sandbox switched off; start a new clone |
| "36 vulnerabilities" after `npm install` | normal. Don't run `npm audit fix --force`; it can break the app |

## Dos and don'ts

- **Do** keep `.env.local` private. Never share it in screenshots, chats or online. If a key leaks, delete it in that service's dashboard and make a new one.
- **Do** make the result truly yours: your logo, words, images and colors.
- **Don't** clone pages behind a login, and don't pass off someone else's brand as yours. Respect each site's terms.

## Credits and licence

Open Lovable was made by the [Firecrawl](https://firecrawl.dev) team and is MIT licensed (see `LICENSE`). The fixes in this copy are MIT licensed too.

---

## Original README (Firecrawl)

### Open Lovable

Chat with AI to build React apps instantly. An example app made by the [Firecrawl](https://firecrawl.dev/?ref=open-lovable-github) team. For a complete cloud solution, check out [Lovable.dev](https://lovable.dev/) ❤️.

<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZtaHFleGRsMTNlaWNydGdianI4NGQ4dHhyZjB0d2VkcjRyeXBucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZFVLWMa6dVskQX0qu1/giphy.gif" alt="Open Lovable Demo" width="100%"/>

## Setup

1. **Clone & Install**
```bash
git clone https://github.com/firecrawl/open-lovable.git
cd open-lovable
pnpm install  # or npm install / yarn install
```

2. **Add `.env.local`**

```env
# =================================================================
# REQUIRED
# =================================================================
FIRECRAWL_API_KEY=your_firecrawl_api_key    # https://firecrawl.dev

# =================================================================
# AI PROVIDER - Choose your LLM
# =================================================================
GEMINI_API_KEY=your_gemini_api_key        # https://aistudio.google.com/app/apikey
ANTHROPIC_API_KEY=your_anthropic_api_key  # https://console.anthropic.com
OPENAI_API_KEY=your_openai_api_key        # https://platform.openai.com
GROQ_API_KEY=your_groq_api_key            # https://console.groq.com

# =================================================================
# FAST APPLY (Optional - for faster edits)
# =================================================================
MORPH_API_KEY=your_morphllm_api_key    # https://morphllm.com/dashboard

# =================================================================
# SANDBOX PROVIDER - Choose ONE: Vercel (default) or E2B
# =================================================================
SANDBOX_PROVIDER=vercel  # or 'e2b'

# Option 1: Vercel Sandbox (default)
# Choose one authentication method:

# Method A: OIDC Token (recommended for development)
# Run `vercel link` then `vercel env pull` to get VERCEL_OIDC_TOKEN automatically
VERCEL_OIDC_TOKEN=auto_generated_by_vercel_env_pull

# Method B: Personal Access Token (for production or when OIDC unavailable)
# VERCEL_TEAM_ID=team_xxxxxxxxx      # Your Vercel team ID 
# VERCEL_PROJECT_ID=prj_xxxxxxxxx    # Your Vercel project ID
# VERCEL_TOKEN=vercel_xxxxxxxxxxxx   # Personal access token from Vercel dashboard

# Option 2: E2B Sandbox
# E2B_API_KEY=your_e2b_api_key      # https://e2b.dev
```

3. **Run**
```bash
pnpm dev  # or npm run dev / yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## License

MIT