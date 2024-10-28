# Contentstack Implementation guide: Nuxt + Personalize

This is a bare-bones example to connect Nuxt to Contentstack with personalize.
This example covers the following items:

- SDK initialization
- live preview setup
- Personalization setup (middleware)
- personalization examples

## How to get started

Before you can run this code, you will need a Contentstack "Stack" to connect to.
Follow the following steps to seed a Stack that this codebase understands.

### 1. Create a new Stack

Log into Contentstack (remember your region) and create a new Stack.

### 2. Get the seed data for your Stack

Download the Stack seed data from Github. Click download as ZIP and put the files in a folder you can access.
The folder contains all things needed to fill up your new Stack to work with this bare-bones example.

### 3. Install the CLI

```bash
npm install -g @contentstack/cli
```

### 4. Log in via the CLI

```bash
csdx auth:login
```

### 5. Get your organization UID

In your Contentstack Organization dashboard find `Org admin` and copy your Organization ID (Example: `blt481c598b0d8352d9`).

### 6. Create a new stack

Make sure to replace `<YOUR_ORG_ID>` with your actual Organization ID and run the below.

```bash
csdx cm:stacks:seed --repo "timbenniks/contentstack-implementation-guides-p13n-seed" --org "<YOUR_ORG_ID>" -n "Implementation Guide Next p13n"
```

### 7. Create a new delivery token.

Go to Settings > Tokens and create a delivery token. Select the `preview` scope and turn on `Create preview token`

### 8. Fill out your .env file.

Now that you have a delivery token, you can fill out the .env file in your codebase.

```
NUXT_CONTENTSTACK_API_KEY=bltf1a2bb701d537d95
NUXT_CONTENTSTACK_DELIVERY_TOKEN=csa5b6b7935b22e4f08772c1d0
NUXT_CONTENTSTACK_PREVIEW_TOKEN=csd1571d7d8b2386120730db85
NUXT_CONTENTSTACK_ENVIRONMENT=preview
NUXT_CONTENTSTACK_REGION=EU
NUXT_CONTENTSTACK_PREVIEW=true
NUXT_CONTENTSTACK_P13N_PROJECT_UID=671a14b9658bc90e1fa85cf5
```

### 9. Turn on Live Preview

Go to Settings > Live Preview. Click enable and select the `Preview` environment in the drop down. Hit save.

### 10. Install the dependencies

```bash
npm install
```

### 11. Run your app

```bash
npm run dev
```

### 12. See your page in live preview mode with personalized entries

Go to Entries and select the only entry in the list.
In the sidebar, click on the live preview icon.
On the right top select which variant of the entry you wish to see.
