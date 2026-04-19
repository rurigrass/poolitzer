<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-supabase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Password-based authentication block installed via the [Supabase UI Library](https://supabase.com/ui/docs/nextjs/password-based-auth)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Supabase setup (this app)

Use this when you create a **new** Supabase project or reconnect after losing access to the old one.

1. **Create a project** — [Supabase dashboard](https://supabase.com/dashboard) → New project (quick link: [database.new](https://database.new)). Wait until the project is ready.
2. **API keys** — **Project Settings → API**. Copy **Project URL** and the **anon** or **publishable** public key (not `service_role`).
3. **`.env.local`** — In the repo root, set (see [`.env.example`](.env.example)):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   Restart `npm run dev` after saving.
4. **Auth redirect URLs** — **Authentication → URL Configuration**:
   - **Site URL:** `http://localhost:3000` for local development (use your real production URL when deployed).
   - **Redirect URLs:** include at least `http://localhost:3000/**`, or add explicitly: `http://localhost:3000/auth/confirm`, `http://localhost:3000/auth/update-password`, `http://localhost:3000/protected`. Add the same paths on your production origin when you ship.
5. **`locations` table** — Either paste [`supabase/migrations/20260419120000_locations.sql`](supabase/migrations/20260419120000_locations.sql) into the **SQL Editor**, or use the CLI after [linking](#supabase-cli-link-this-repo-to-your-cloud-project) below: `npm run db:push`. The map page queries `public.locations`.
6. **Deploy** — In Vercel (or similar), set the same two `NEXT_PUBLIC_*` variables and extend Supabase redirect URLs for your production domain.

### Supabase CLI: link this repo to your cloud project

The [`supabase/`](supabase/) folder holds CLI config ([`config.toml`](supabase/config.toml)) and versioned migrations so this Next app and your hosted database stay in sync.

1. **Install** — `npm install` (adds the [`supabase`](https://www.npmjs.com/package/supabase) CLI as a dev dependency).
2. **Log in** — `npx supabase login` (opens the browser once).
3. **Link** — From the repo root, run `npm run db:link` and follow the prompts, or pass your project ref explicitly (the subdomain in `https://YOUR_REF.supabase.co`):

   ```bash
   npx supabase link --project-ref YOUR_REF
   ```

   You may be asked for the **database password** you set when creating the project (not the anon API key).

4. **Push migrations** — Apply everything under [`supabase/migrations/`](supabase/migrations/) to the linked remote database:

   ```bash
   npm run db:push
   ```

5. **Optional types** — Regenerate TypeScript types from the remote schema:

   ```bash
   npm run db:types
   ```

   That writes [`lib/database.types.ts`](lib/database.types.ts) (create/commit when you start using it).

Link metadata is stored under `supabase/.temp/` (see [`supabase/.gitignore`](supabase/.gitignore)); it is not committed, so each machine runs `db:link` once.

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app --example with-supabase with-supabase-app
   ```

   ```bash
   yarn create next-app --example with-supabase with-supabase-app
   ```

   ```bash
   pnpm create next-app --example with-supabase with-supabase-app
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd with-supabase-app
   ```

4. Rename `.env.example` to `.env.local` and update the following:

  ```env
  NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
  NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE ANON OR PUBLISHABLE PUBLIC KEY]
  ```

  Use the **anon** or **publishable** public key from [API settings](https://supabase.com/dashboard/project/_?showConnect=true) (not `service_role`). See [Supabase key discussion](https://github.com/orgs/supabase/discussions/29260) if your dashboard labels differ.

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

6. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
