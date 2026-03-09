# ToolForFree - Next.js Migration

This project is a Next.js migration of the ToolForFree PHP website.

## Getting Started

### Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
toolforfree/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout with header/footer
│   │   ├── globals.css        # Global styles
│   │   ├── r/                 # Tools pages
│   │   │   ├── page.tsx       # Tools listing
│   │   │   ├── word-counter/
│   │   │   ├── password-generator/
│   │   │   ├── age-calculator/
│   │   │   ├── json-formatter/
│   │   │   └── .../           # Other tools
│   │   ├── api/               # API routes
│   │   │   └── tools/         # Tools list API
│   │   ├── about/
│   │   ├── contact/
│   │   ├── privacy-policy/
│   │   └── terms/
│   ├── components/            # React components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── lib/                   # Utility functions
└── public/                    # Static assets
    ├── assets/                # CSS, images, JS from PHP site
    ├── robots.txt
    └── ads.txt
```

## Migration Status

### ✅ Completed

- Next.js project setup with TypeScript
- Header and Footer components
- Homepage with tool categories
- Tools listing page
- Static pages (About, Contact, Privacy, Terms)
- Example tools migrated:
  - Word Counter
  - Password Generator
  - Age Calculator
  - JSON Formatter
   - Base64 Encoder/Decoder
   - Case Converter
   - Remove Extra Spaces
- Static assets (CSS, images) copied
- API route for tools list

### 🚧 Pending / Needs Implementation

#### Complex Tools Requiring Server-Side Processing

The following tools need backend implementation (API routes or server actions):

1. **PDF Tools** (require server-side libraries):
   - PDF Merge (use `pdf-lib` npm package)
   - PDF Split (use `pdf-lib`)
   - PDF Compress (use `pdf-lib` + compression)
   - PDF to JPG (use `pdf-to-image` or similar)
   - JPG to PDF (use `pdf-lib`)

2. **Image Tools** (some client-side, some server):
   - Image Compressor (client-side with Canvas API or `browser-image-compression`)
   - Image Resizer (client-side with Canvas API)
   - Image Converter (client-side with Canvas API)
   - Background Remover (needs ML model or third-party API)

3. **Additional Text/Developer Tools**:
   - More text/developer utilities can be added as needed

#### Recommended Approach for PDF Tools

For PDF tools, you'll need to:

1. Install necessary packages:
   ```bash
   npm install pdf-lib
   npm install pdfjs-dist  # For PDF to image conversion
   ```

2. Create API routes in `src/app/api/` for each PDF tool
3. Handle file uploads using FormData
4. Process PDFs server-side or client-side depending on complexity

#### Recommended Approach for Image Tools

Most image tools can run client-side:

1. Install packages:
   ```bash
   npm install browser-image-compression
   ```

2. Use Canvas API or libraries for image manipulation
3. All processing happens in the browser (no server upload needed)

## Environment Variables

Create a `.env.local` file for any environment-specific settings:

```env
NEXT_PUBLIC_SITE_URL=https://toolforfree.in
NEXT_PUBLIC_GA_ID=G-F54ZZ47D8R
```

## Notes

- All original PHP files are in `c:\WEb\public_html`
- FPDF library from PHP is not needed in Next.js (use `pdf-lib` instead)
- Theme toggle (dark/light mode) is implemented in Header component
- Search functionality uses the API route `/api/tools`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Deploy automatically

### Other Platforms

Build the project:
```bash
npm run build
```

The output will be in the `.next` folder for deployment to any Node.js hosting.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
