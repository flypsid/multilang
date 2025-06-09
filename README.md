# Next.js Multilang Starter

A starter template for building multilingual applications with Next.js. This project integrates internationalization (i18n), Zod error translation, and BetterAuth for authentication.

## Features

- **Multiple Languages (i18n):** Easily add and manage translations for your app.
- **Zod Error Translation:** Automatically translate validation errors from Zod schemas.
- **BetterAuth Integration:** Secure authentication with a simple API.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/flypsid/multilang.git
   cd nextjs-multilang-starter
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure languages:**

   - Edit the `i18n` configuration to add your supported languages and translations.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Usage

- Add new translations in the `/locales` directory.
- Use Zod for schema validation and get translated error messages automatically.
- Set up authentication flows using BetterAuth.

## License

MIT
