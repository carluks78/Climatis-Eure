import { mkdirSync, writeFileSync } from "node:fs";

const origin = "https://climatiseur.vercel.app";
const outputDirectory = new URL("../public/sitemaps/", import.meta.url);
const today = new Date().toISOString().slice(0, 10);

const pages = [
  { path: "/", frequency: "weekly", priority: "1.0" },
  { path: "/climatisation", frequency: "monthly", priority: "0.9" },
  { path: "/pompes-a-chaleur", frequency: "monthly", priority: "0.9" },
  { path: "/entretien-depannage", frequency: "monthly", priority: "0.9" },
  { path: "/zones-intervention", frequency: "weekly", priority: "0.8" },
  { path: "/demande-de-devis", frequency: "monthly", priority: "0.9" },
  { path: "/conseils", frequency: "weekly", priority: "0.8" },
  { path: "/a-propos", frequency: "yearly", priority: "0.6" },
  { path: "/contact", frequency: "yearly", priority: "0.8" },
  { path: "/mentions-legales", frequency: "yearly", priority: "0.2" },
  { path: "/politique-de-confidentialite", frequency: "yearly", priority: "0.2" },
];

const services = [
  "/climatisation/installation-climatisation",
  "/climatisation/climatisation-monosplit",
  "/climatisation/climatisation-multisplit",
  "/climatisation/climatisation-gainable",
  "/pompes-a-chaleur/air-air",
  "/pompes-a-chaleur/air-eau",
  "/entretien/entretien-climatisation",
  "/depannage/depannage-climatisation",
];

const localServicePrefixes = [
  "/climatisation/installation-climatisation",
  "/climatisation/climatisation-monosplit",
  "/climatisation/climatisation-multisplit",
  "/climatisation/climatisation-gainable",
  "/pompe-a-chaleur/installation-pompe-a-chaleur-air-air",
  "/pompe-a-chaleur/installation-pompe-a-chaleur-air-eau",
  "/entretien/entretien-climatisation",
  "/depannage/depannage-climatisation",
];

const publishedCommunes = [
  "evreux",
  "vernon",
  "louviers",
  "val-de-reuil",
  "gisors",
  "bernay",
  "pont-audemer",
  "les-andelys",
  "pacy-sur-eure",
  "gaillon",
  "conches-en-ouche",
  "verneuil-d-avre-et-d-iton",
  "bourg-achard",
  "brionne",
  "etrepagny",
  "beuzeville",
  "saint-marcel",
  "le-val-d-hazey",
  "gravigny",
  "le-neubourg",
];

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const absoluteUrl = (path) => `${origin}${path === "/" ? "/" : path}`;

function urlSet(entries) {
  const urls = entries
    .map(
      ({ path, frequency = "monthly", priority = "0.7" }) => `  <url>
    <loc>${escapeXml(absoluteUrl(path))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${frequency}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

function write(name, content) {
  writeFileSync(new URL(name, outputDirectory), content);
}

mkdirSync(outputDirectory, { recursive: true });

write("pages.xml", urlSet(pages));
write(
  "services.xml",
  urlSet(
    services.map((path) => ({
      path,
      frequency: "monthly",
      priority: "0.9",
    })),
  ),
);
write(
  "local.xml",
  urlSet(
    publishedCommunes.flatMap((commune) =>
      localServicePrefixes.map((prefix) => ({
        path: `${prefix}-${commune}`,
        frequency: "monthly",
        priority: "0.8",
      })),
    ),
  ),
);

const images = [
  {
    page: "/",
    path: "/assets/hero-climatiseure.png",
    title: "Climatisation et confort thermique par CLIMATIS'EURE",
    caption: "Intérieur contemporain équipé d'une solution de climatisation discrète dans l'Eure.",
  },
  {
    page: "/climatisation/climatisation-monosplit",
    path: "/assets/monosplit-interieur.png",
    title: "Climatisation monosplit dans l'Eure",
    caption: "Unité de climatisation murale intégrée dans une pièce de vie contemporaine.",
  },
  {
    page: "/climatisation/climatisation-multisplit",
    path: "/assets/multisplit-exterieur.png",
    title: "Installation multisplit dans l'Eure",
    caption: "Groupe extérieur de climatisation installé proprement contre une maison.",
  },
  {
    page: "/climatisation/climatisation-gainable",
    path: "/assets/gainable-airzone.svg",
    title: "Climatisation gainable avec régulation Airzone dans l'Eure",
    caption: "Schéma technique du réseau gainable et de la régulation multizone.",
  },
  {
    page: "/pompes-a-chaleur/air-air",
    path: "/assets/pac-air-air.svg",
    title: "Pompe à chaleur air air dans l'Eure",
    caption: "Illustration du transfert d'énergie d'une pompe à chaleur air air.",
  },
  {
    page: "/pompes-a-chaleur/air-eau",
    path: "/assets/pac-air-eau.svg",
    title: "Pompe à chaleur air eau dans l'Eure",
    caption: "Illustration d'une pompe à chaleur reliée à un circuit hydraulique.",
  },
  {
    page: "/entretien/entretien-climatisation",
    path: "/assets/entretien-climatisation.svg",
    title: "Entretien de climatisation dans l'Eure",
    caption: "Contrôle des filtres, échangeurs, condensats et paramètres de fonctionnement.",
  },
  {
    page: "/depannage/depannage-climatisation",
    path: "/assets/depannage-climatisation.svg",
    title: "Dépannage de climatisation dans l'Eure",
    caption: "Diagnostic méthodique des symptômes et codes défaut d'une climatisation.",
  },
  {
    page: "/",
    path: "/assets/installateur-climatiseure.svg",
    title: "Installateur CLIMATIS'EURE",
    caption: "Illustration d'un installateur aux couleurs de CLIMATIS'EURE.",
  },
];

write(
  "images.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images
  .map(
    (image) => `  <url>
    <loc>${absoluteUrl(image.page)}</loc>
    <lastmod>${today}</lastmod>
    <image:image>
      <image:loc>${origin}${image.path}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>
  </url>`,
  )
  .join("\n")}
</urlset>
`,
);

const sitemapFiles = ["pages.xml", "services.xml", "local.xml", "images.xml"];
const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles
  .map(
    (file) => `  <sitemap>
    <loc>${origin}/sitemaps/${file}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>
`;

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), index);
console.log(
  `Sitemaps generated: ${pages.length + services.length + publishedCommunes.length * localServicePrefixes.length} canonical pages, ${images.length} images.`,
);
