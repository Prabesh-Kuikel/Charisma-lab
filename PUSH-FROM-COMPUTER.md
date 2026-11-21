# Push Charisma Lab to your own GitHub account — from a computer

Complete walkthrough for a desktop or laptop. Nothing here depends on anyone
else's account, and everything runs on your own machine.

---

## Step 0 — Check git is installed

```bash
git --version
```

You want something like `git version 2.4x`. If you get "command not found":

| System | Command |
|---|---|
| macOS | `xcode-select --install` (accept the prompt), then re-check |
| Debian / Ubuntu | `sudo apt update && sudo apt install -y git unzip` |
| Fedora | `sudo dnf install -y git unzip` |
| Windows | install **Git for Windows** from git-scm.com, then use **Git Bash** for every command below |
| Arch | `sudo pacman -S git unzip` |

`unzip` is used once. If you're on Windows, Git Bash includes `unzip`.

---

## Step 1 — Set your git identity

Commits carry a name and email. Do this once per computer:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use the email on your GitHub account if you want the commits attributed to you.

---

## Step 2 — Create the empty repo on GitHub

In the browser, signed in as **you**:

1. Top-right **+** → **New repository**
2. **Repository name:** `charisma-lab`
3. **Public** (needed later for free GitHub Pages)
4. **Do not** tick "Add a README", "Add .gitignore" or "Choose a license" — it
   must be completely empty or the first push will be rejected
5. **Create repository**

You'll land on a page showing `https://github.com/YOUR-USERNAME/charisma-lab.git`.
Copy that line; you need it in step 5.

Order matters here: **create the GitHub repo before pushing.** Pasting the files
first and creating `main` locally means an unrelated history to reconcile later.

---

## Step 3 — Unzip the archive into a working folder

Pick a real folder — **not** your Downloads folder, and not a folder that already
has another git repo above it.

```bash
mkdir -p ~/projects/charisma-lab
```

```bash
unzip -o ~/Downloads/charisma-lab-source.zip -d ~/projects/charisma-lab
```

Windows PowerShell instead of the two lines above:

```powershell
New-Item -ItemType Directory -Force "$HOME\projects\charisma-lab" | Out-Null
Expand-Archive -Path "$HOME\Downloads\charisma-lab-source.zip" -DestinationPath "$HOME\projects\charisma-lab" -Force
```

---

## Step 4 — Verify the files are in the right place

```bash
cd ~/projects/charisma-lab && ls
```

You must see `package.json`, `server/`, `src/`, `index.html`, `vite.config.js`
at the top level. **Not** a single nested `charisma-lab/` folder. If you see the
nesting, the unzip target was one level too high — move the contents up one
level, or re-run step 3 with the path ending exactly at `charisma-lab`.

Confirm the new code is present:

```bash
ls server/ai.js server/content/academy.js src/local/ai-client.js src/views/Academy.jsx
```

All four must print. If any is missing, stop here.

---

## Step 5 — Turn the folder into a repo and push

Run these five lines one at a time.

```bash
cd ~/projects/charisma-lab && git init -b main
```

```bash
git add -A
```

Inspect what's about to be committed:

```bash
git status --short | head -30
```

Expect roughly **8 new files and ~30 modified**. You should **not** see
`node_modules/`, `dist/` or `data/` — `.gitignore` excludes them. If they appear,
your `.gitignore` didn't survive the unzip.

```bash
git commit -m "Academy modules + conversational AI"
```

```bash
git remote add origin https://github.com/YOUR-USERNAME/charisma-lab.git
```

Replace `YOUR-USERNAME` with your actual GitHub username — the one from step 2.

```bash
git push -u origin main
```

### The password prompt

GitHub stopped accepting your account password over HTTPS in 2021. When git asks
for a password, paste a **personal access token**:

1. GitHub → your avatar → **Settings** → **Developer settings** →
   **Personal access tokens** → **Tokens (classic)**
2. **Generate new token (classic)**
3. Note: "charisma-lab push", Expiration: 30 days, scope: tick **`repo`**
4. Generate, copy the `ghp_…` string **once** (it's never shown again)
5. At the git prompts: username = your GitHub username, **password = the token**

macOS keeps it in the Keychain and Windows in Credential Manager, so you type it
once. On Linux it may prompt every push — that's normal.

Alternative if you'd rather not make a token: install the GitHub CLI
(`brew install gh` / `winget install GitHub.cli`), run `gh auth login`, then
`gh auth setup-git`. Everything then authenticates automatically.

---

## Step 6 — Confirm it worked

```bash
git log --oneline -1
```

```bash
git remote -v
```

`git remote -v` must show **your** username. Reload the GitHub repo page: commits
are there, files are in folders, tree intact.

---

## Step 7 — Make the site live

1. Repo → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**: choose **GitHub Actions**
3. Repo → **Actions** tab → the `Deploy UI to GitHub Pages` workflow runs
   automatically on the push. If it doesn't, open it and click **Run workflow**
4. Wait 1–2 minutes for a green tick

Your site is then at:

```text
https://YOUR-USERNAME.github.io/charisma-lab/
```

The workflow builds with `VITE_LOCAL=1`, so the public site needs no backend —
everything, including the AI coach, runs in the browser. The Pages URL is derived
from your account name automatically; nothing in the repo hard-codes it.

> If the live page is blank, wait another minute — Pages occasionally serves the
> previous build for a moment. Hard-refresh once green.

---

## Optional, worth 60 seconds — run the checks locally first

```bash
cd ~/projects/charisma-lab && npm install --ignore-scripts
```

```bash
cd ~/projects/charisma-lab && npm run build
```

A ✓ "built in Xs" means the tree is complete and the site will deploy. If the
build fails, don't push — the archive unzipped wrong.

---

## Troubleshooting, in the order it actually happens

| Message | Cause | Fix |
|---|---|---|
| `failed to push some refs (fetch first)` | the GitHub repo wasn't empty | `git pull --rebase origin main` then push again, or delete and recreate the empty repo |
| `remote origin already exists` | pushed before from this folder | `git remote set-url origin https://github.com/YOUR-USERNAME/charisma-lab.git` |
| `Authentication failed` | account password used | use a personal access token from step 5 |
| `src refspec main does not match any` | nothing committed | `git add -A && git commit -m "init"` first |
| Hundreds of `node_modules` files staged | `.gitignore` missing | `git rm -r --cached node_modules dist data` then commit |
| `package.json` not found by the build | unzipped into a nested folder | flatten one level and re-push |
| Actions fails at `npm ci` | `package-lock.json` missing | it's in the archive; check it's at the repo root |
