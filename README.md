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

### Install the CLI

```bash
npm install -g @contentstack/cli
```

### Log in via the CLI

```bash
csdx auth:login
```

### Get your organization UID

In your Contentstack Organization dashboard find `Org admin` and copy your Organization ID (Example: `blt481c598b0d8352d9`).

### Create a new stack

Make sure to replace `<YOUR_ORG_ID>` with your actual Organization ID and run the below.

```bash
csdx cm:stacks:seed --repo "timbenniks/contentstack-implementation-guides-p13n-seed" --org "<YOUR_ORG_ID>" -n "Implementation Guide"
```

### Create a new delivery token.

Go to Settings > Tokens and create a delivery token. Select the `preview` scope and turn on `Create preview token`

### Fill out your .env file.

Now that you have a delivery token, you can fill out the .env file in your codebase.

```
NUXT_CONTENTSTACK_API_KEY=bltf1a2bb701d537d95
NUXT_CONTENTSTACK_DELIVERY_TOKEN=csa5b6b7935b22e4f08772c1d0
NUXT_CONTENTSTACK_PREVIEW_TOKEN=csd1571d7d8b2386120730db85
NUXT_CONTENTSTACK_ENVIRONMENT=preview
NUXT_CONTENTSTACK_REGION=EU
NUXT_CONTENTSTACK_PREVIEW=true
NUXT_CONTENTSTACK_P13N_PROJECT_ID=671a14b9658bc90e1fa85cf5
```

### Turn on Live Preview

Go to Settings > Live Preview. Click enable and select the `Preview` environment in the drop down. Hit save.

### Install the dependencies

```bash
npm install
```

### Run your app

```bash
npm run dev
```

### See your page in live preview mode with personalized entries

Go to Entries and select the only entry in the list.
In the sidebar, click on the live preview icon.
On the right top select which variant of the entry you wish to see.

Or, click on visual experience in the sidebar
