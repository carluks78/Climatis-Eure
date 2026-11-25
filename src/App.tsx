import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { communes, type Commune } from "./data/communes";

const PHONE_1 = "0659841301";
const PHONE_2 = "0743462101";
const DISPLAY_PHONE_1 = "06 59 84 13 01";
const DISPLAY_PHONE_2 = "07 43 46 21 01";

type IconName =
  | "arrow"
  | "building"
  | "check"
  | "chevron"
  | "clock"
  | "duct"
  | "home"
  | "menu"
  | "message"
  | "phone"
  | "shield"
  | "snow"
  | "tools"
  | "water"
  | "x";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    building: (
      <>
        <path d="M4 21V3h12v18" />
        <path d="M16 8h4v13" />
        <path d="M8 7h4M8 11h4M8 15h4M2 21h20" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    duct: (
      <>
        <path d="M3 8h18v8H3z" />
        <path d="M7 8V5M12 8V5M17 8V5M7 19v-3M12 19v-3M17 19v-3" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    message: (
      <>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    snow: (
      <>
        <path d="M12 2v20M4.2 6.5l15.6 11M4.2 17.5l15.6-11" />
        <path d="m9 4 3 3 3-3M9 20l3-3 3 3M4 10l4 1-1-4M20 14l-4-1 1 4M7 17l1-4-4 1M17 7l-1 4 4-1" />
      </>
    ),
    tools: (
      <>
        <path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L21 17.4a2.1 2.1 0 0 1-3 3l-8.7-8.7" />
        <path d="m5 13-3 3 6 6 3-3" />
      </>
    ),
    water: (
      <>
        <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z" />
        <path d="M9 16a3 3 0 0 0 3 3" />
      </>
    ),
    x: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <a
      href="/"
      className={`logo ${light ? "logo-light" : ""}`}
      aria-label="CLIMATIS'EURE — Accueil"
      onClick={navigate}
    >
      <span className="logo-mark">
        <Icon name="snow" size={compact ? 24 : 29} />
      </span>
      {!compact && (
        <span>
          <strong>
            CLIMATIS<span>’EURE</span>
          </strong>
          <small>CONFORT · ÉNERGIE · MAÎTRISE</small>
        </span>
      )}
    </a>
  );
}

const services = [
  {
    slug: "/climatisation/installation-climatisation",
    short: "Installation",
    title: "Installation de climatisation",
    icon: "snow" as IconName,
    text: "Une étude claire pour dimensionner une solution adaptée à votre logement et à vos usages.",
  },
  {
    slug: "/climatisation/climatisation-monosplit",
    short: "Monosplit",
    title: "Climatisation monosplit",
    icon: "home" as IconName,
    text: "Une unité intérieure pour assurer le confort thermique d’une pièce ciblée.",
  },
  {
    slug: "/climatisation/climatisation-multisplit",
    short: "Multisplit",
    title: "Climatisation multisplit",
    icon: "building" as IconName,
    text: "Plusieurs pièces équipées avec une seule unité extérieure, selon la configuration.",
  },
  {
    slug: "/climatisation/climatisation-gainable",
    short: "Gainable",
    title: "Climatisation gainable",
    icon: "duct" as IconName,
    text: "Une solution discrète intégrée dans les volumes techniques de l’habitation.",
  },
  {
    slug: "/pompes-a-chaleur/air-air",
    short: "PAC air/air",
    title: "Pompe à chaleur air/air",
    icon: "snow" as IconName,
    text: "Chauffer et rafraîchir avec un système réversible pensé pour votre confort.",
  },
  {
    slug: "/pompes-a-chaleur/air-eau",
    short: "PAC air/eau",
    title: "Pompe à chaleur air/eau",
    icon: "water" as IconName,
    text: "Une étude de faisabilité pour alimenter un circuit de chauffage hydraulique.",
  },
  {
    slug: "/entretien/entretien-climatisation",
    short: "Entretien",
    title: "Entretien de climatisation",
    icon: "shield" as IconName,
    text: "Préserver l’hygiène, le fonctionnement et les performances de vos équipements.",
  },
  {
    slug: "/depannage/depannage-climatisation",
    short: "Dépannage",
    title: "Dépannage de climatisation",
    icon: "tools" as IconName,
    text: "Décrire précisément votre panne pour organiser une prise en charge adaptée.",
  },
];

const publishedSlugs = new Set([
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
]);
const communesByLongestSlug = [...communes].sort((a, b) => b.slug.length - a.slug.length);

type Service = (typeof services)[number];

const localPrefixes: Record<string, string> = {
  "/climatisation/installation-climatisation": "/climatisation/installation-climatisation",
  "/climatisation/climatisation-monosplit": "/climatisation/climatisation-monosplit",
  "/climatisation/climatisation-multisplit": "/climatisation/climatisation-multisplit",
  "/climatisation/climatisation-gainable": "/climatisation/climatisation-gainable",
  "/pompes-a-chaleur/air-air": "/pompe-a-chaleur/installation-pompe-a-chaleur-air-air",
  "/pompes-a-chaleur/air-eau": "/pompe-a-chaleur/installation-pompe-a-chaleur-air-eau",
  "/entretien/entretien-climatisation": "/entretien/entretien-climatisation",
  "/depannage/depannage-climatisation": "/depannage/depannage-climatisation",
};

const serviceDetails: Record<
  string,
  {
    image?: string;
    imageAlt?: string;
    principle: string;
    benefits: string[];
    limits: string[];
    energy: string;
    faqs: [string, string][];
  }
> = {
  "/climatisation/installation-climatisation": {
    image: "/assets/monosplit-interieur.png",
    imageAlt: "Climatiseur mural intégré dans un séjour contemporain",
    principle:
      "Une climatisation réversible transfère les calories entre l’intérieur et l’extérieur. L’étude détermine les puissances, les emplacements, l’évacuation des condensats et les cheminements.",
    benefits: [
      "Confort été comme hiver",
      "Montée en température rapide",
      "Régulation pièce par pièce selon la configuration",
    ],
    limits: [
      "Unités visibles en version murale",
      "Implantation extérieure à étudier",
      "Dimensionnement indispensable pour limiter cycles courts et surconsommation",
    ],
    energy:
      "La consommation dépend du besoin réel, de l’isolation, de la consigne, du climat et du rendement saisonnier. Une température stable, des filtres propres et une puissance correctement dimensionnée favorisent la sobriété.",
    faqs: [
      [
        "Où placer l’unité intérieure ?",
        "Dans une zone permettant une diffusion homogène, sans soufflage direct permanent sur les occupants et avec un cheminement technique réalisable.",
      ],
      [
        "Une climatisation réversible remplace-t-elle le chauffage ?",
        "Elle peut couvrir une partie importante des besoins selon le logement et les conditions extérieures. L’étude doit vérifier le dimensionnement et le système existant.",
      ],
    ],
  },
  "/climatisation/climatisation-monosplit": {
    image: "/assets/monosplit-interieur.png",
    imageAlt: "Installation monosplit discrète dans une pièce de vie",
    principle:
      "Le monosplit associe une unité extérieure à une seule unité intérieure. Il cible une pièce principale, un bureau, une chambre ou un espace ouvert.",
    benefits: [
      "Architecture simple",
      "Réglage indépendant de la pièce",
      "Investissement généralement plus contenu qu’un système multi-zone",
    ],
    limits: [
      "Une seule zone traitée",
      "Une unité extérieure nécessaire",
      "Extension future à anticiper",
    ],
    energy:
      "Le monosplit évite de traiter des pièces inutilisées. Son efficacité dépend du coefficient saisonnier, de la température de consigne et des déperditions de la pièce.",
    faqs: [
      [
        "Quelle surface peut traiter un monosplit ?",
        "La surface seule ne suffit pas : hauteur, isolation, vitrages, orientation, usage et apports internes doivent être analysés.",
      ],
      [
        "Peut-on climatiser plusieurs chambres ?",
        "Un monosplit n’assure pas une régulation précise de plusieurs pièces fermées. Un multisplit ou un gainable peut être plus cohérent.",
      ],
    ],
  },
  "/climatisation/climatisation-multisplit": {
    image: "/assets/multisplit-exterieur.png",
    imageAlt: "Groupe extérieur multisplit installé proprement contre une maison",
    principle:
      "Le multisplit raccorde plusieurs unités intérieures à un groupe extérieur commun. Chaque zone possède sa commande, dans les limites de fonctionnement du système.",
    benefits: [
      "Plusieurs pièces régulées",
      "Un seul groupe extérieur",
      "Choix de formats intérieurs selon les pièces",
    ],
    limits: [
      "Réseau frigorifique plus développé",
      "Puissance extérieure partagée",
      "Étude des simultanéités et longueurs de liaison nécessaire",
    ],
    energy:
      "La régulation indépendante permet de ne solliciter que les zones utiles. Fermer les pièces, modérer les consignes et entretenir les filtres limite les besoins.",
    faqs: [
      [
        "Toutes les unités peuvent-elles fonctionner ensemble ?",
        "Oui selon les capacités du groupe et la combinaison retenue. Le dimensionnement tient compte de la puissance appelée simultanément.",
      ],
      [
        "Peut-on mélanger unités murales et consoles ?",
        "De nombreux systèmes acceptent plusieurs formats compatibles. La compatibilité exacte dépend de la gamme étudiée.",
      ],
    ],
  },
  "/climatisation/climatisation-gainable": {
    image: "/assets/gainable-airzone.svg",
    imageAlt: "Schéma d’une climatisation gainable avec régulation multizone",
    principle:
      "Le gainable place une unité intérieure dans un comble, un faux plafond ou un volume technique. Un réseau isolé distribue l’air par des bouches ou diffuseurs.",
    benefits: [
      "Équipement très discret",
      "Diffusion homogène",
      "Traitement de plusieurs pièces",
      "Centralisation possible des commandes",
    ],
    limits: [
      "Volume technique indispensable",
      "Étude aéraulique plus exigeante",
      "Accès d’entretien à prévoir",
      "Travaux de plafonds ou coffrages possibles",
    ],
    energy:
      "La performance repose sur des gaines isolées, un réseau équilibré, des débits adaptés et une régulation cohérente. Le zonage évite de maintenir inutilement toutes les pièces à la même consigne.",
    faqs: [
      [
        "Qu’est-ce qu’Airzone ?",
        "Airzone est une solution de régulation par zones. Des registres motorisés modulent le débit vers chaque pièce, pilotés par des thermostats et une passerelle compatible avec l’unité.",
      ],
      [
        "Combien de zones peut-on créer ?",
        "Le nombre dépend du contrôleur, du réseau, de la machine et de la configuration. Une zone peut correspondre à une pièce ou à un groupe de pièces aux usages proches.",
      ],
      [
        "Airzone est-il compatible avec toutes les machines ?",
        "Non. La compatibilité de la passerelle, les débits minimaux et la stratégie de régulation doivent être vérifiés avant conception.",
      ],
      [
        "Faut-il une grille de reprise ?",
        "Oui, le système doit reprendre l’air vers l’unité. Son emplacement et son dimensionnement influencent bruit, filtration et équilibre des débits.",
      ],
    ],
  },
  "/pompes-a-chaleur/air-air": {
    image: "/assets/pac-air-air.svg",
    imageAlt: "Illustration du fonctionnement d’une pompe à chaleur air air",
    principle:
      "La PAC air/air prélève des calories dans l’air extérieur et les restitue sous forme d’air chaud. Réversible, elle peut également rafraîchir.",
    benefits: ["Chauffage réactif", "Rafraîchissement intégré", "Régulation par zones possible"],
    limits: [
      "Soufflage d’air",
      "Performance variable avec les conditions extérieures",
      "Ne produit pas l’eau chaude sanitaire",
    ],
    energy:
      "Une PAC déplace davantage d’énergie thermique qu’elle ne consomme d’électricité, mais aucun pourcentage d’économie ne peut être garanti sans étude du bâtiment et des usages.",
    faqs: [
      [
        "Quelle différence avec une climatisation réversible ?",
        "Dans l’usage résidentiel, les deux expressions désignent souvent le même principe thermodynamique air/air réversible.",
      ],
    ],
  },
  "/pompes-a-chaleur/air-eau": {
    image: "/assets/pac-air-eau.svg",
    imageAlt: "Illustration d’une pompe à chaleur air eau raccordée au circuit hydraulique",
    principle:
      "La PAC air/eau transfère les calories de l’air extérieur vers l’eau du circuit de chauffage. Elle peut alimenter radiateurs compatibles ou plancher chauffant.",
    benefits: [
      "Conserve un réseau hydraulique",
      "Chaleur diffusée sans soufflage",
      "Production d’eau chaude possible selon configuration",
    ],
    limits: [
      "Température d’eau et émetteurs à vérifier",
      "Implantation hydraulique plus complexe",
      "Appoint parfois nécessaire",
    ],
    energy:
      "Une basse température d’eau et des émetteurs adaptés favorisent le rendement. Le bilan de déperditions et la loi d’eau sont déterminants.",
    faqs: [
      [
        "Mes radiateurs sont-ils compatibles ?",
        "Cela dépend de leur puissance à la température d’eau visée. Un calcul permet de vérifier leur capacité pièce par pièce.",
      ],
    ],
  },
  "/entretien/entretien-climatisation": {
    image: "/assets/entretien-climatisation.svg",
    imageAlt: "Illustration du contrôle et de l’entretien d’une climatisation",
    principle:
      "L’entretien porte notamment sur la propreté des filtres et échangeurs, l’écoulement des condensats, l’état général et les paramètres accessibles de fonctionnement.",
    benefits: [
      "Qualité d’air préservée",
      "Échanges thermiques facilités",
      "Détection plus précoce d’anomalies",
    ],
    limits: [
      "Ne répare pas une pièce défectueuse",
      "Certaines opérations réglementées exigent un intervenant habilité",
      "La fréquence dépend de l’usage et de l’environnement",
    ],
    energy:
      "Des filtres encrassés réduisent le débit et peuvent augmenter la sollicitation. Un entretien régulier aide le système à fonctionner dans de meilleures conditions.",
    faqs: [
      [
        "Puis-je nettoyer les filtres moi-même ?",
        "Les filtres utilisateurs sont souvent accessibles selon la notice. Les opérations internes, contrôles et manipulations de fluide relèvent d’une intervention adaptée.",
      ],
    ],
  },
  "/depannage/depannage-climatisation": {
    image: "/assets/depannage-climatisation.svg",
    imageAlt: "Illustration d’un diagnostic de panne de climatisation",
    principle:
      "Le dépannage commence par le relevé des symptômes, codes défaut, conditions d’apparition et historique. Le diagnostic précède toute proposition de réparation.",
    benefits: [
      "Recherche méthodique de la cause",
      "Décision fondée sur un diagnostic",
      "Conseils pour sécuriser l’usage en attendant",
    ],
    limits: [
      "Un diagnostic à distance reste indicatif",
      "La disponibilité des pièces dépend du matériel",
      "Aucun délai ne peut être garanti avant qualification",
    ],
    energy:
      "Une baisse de débit, une consigne extrême ou un fonctionnement continu peuvent signaler un défaut ou un besoin d’entretien. Évitez les redémarrages répétés en présence d’un code erreur.",
    faqs: [
      [
        "Que relever avant d’appeler ?",
        "La marque, la référence, le code affiché, les bruits, les voyants et les circonstances du défaut facilitent la qualification.",
      ],
    ],
  },
};

function localPath(service: Service, city: Commune) {
  return `${localPrefixes[service.slug]}-${city.slug}`;
}

function navigate(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href");
  if (!href || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:"))
    return;
  e.preventDefault();
  history.pushState({}, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function track(event: string, data: Record<string, unknown> = {}) {
  const layer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  layer?.push({ event, ...data });
}

function Link({
  href,
  className = "",
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        navigate(e);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="utility">
        <div className="container utility-inner">
          <span>Climatisation & pompes à chaleur · Eure (27)</span>
          <div>
            <a href={`tel:${PHONE_1}`} onClick={() => track("phone_click", { phone: PHONE_1 })}>
              <Icon name="phone" size={14} /> {DISPLAY_PHONE_1}
            </a>
            <i />{" "}
            <a href={`tel:${PHONE_2}`} onClick={() => track("phone_click", { phone: PHONE_2 })}>
              {DISPLAY_PHONE_2}
            </a>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <nav className={open ? "nav open" : "nav"} aria-label="Navigation principale">
            <Link href="/climatisation" onClick={() => setOpen(false)}>
              Climatisation
            </Link>
            <Link href="/pompes-a-chaleur" onClick={() => setOpen(false)}>
              Pompes à chaleur
            </Link>
            <Link href="/entretien-depannage" onClick={() => setOpen(false)}>
              Entretien & dépannage
            </Link>
            <Link href="/zones-intervention" onClick={() => setOpen(false)}>
              Zones d’intervention
            </Link>
            <Link href="/conseils" onClick={() => setOpen(false)}>
              Conseils
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <Link
              href="/demande-de-devis"
              className="button button-small"
              onClick={() => setOpen(false)}
            >
              Demander un devis
            </Link>
          </nav>
          <button
            className="menu-button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </header>
    </>
  );
}

function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link href={href} className={`button ${secondary ? "button-secondary" : ""}`}>
      {children}
      <Icon name="arrow" size={18} />
    </Link>
  );
}

function ServiceCommuneFinder({ compact = false }: { compact?: boolean }) {
  const [serviceSlug, setServiceSlug] = useState(services[0].slug);
  const [citySlug, setCitySlug] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const service = services.find((item) => item.slug === serviceSlug);
    const city = communes.find((item) => item.slug === citySlug);
    if (!service || !city) return;
    history.pushState({}, "", localPath(service, city));
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
    track("local_service_search", { service: service.short, commune: city.name });
  }

  return (
    <form className={`service-finder ${compact ? "compact" : ""}`} onSubmit={submit}>
      {!compact && (
        <div className="finder-heading">
          <div className="eyebrow">
            <span /> TROUVER VOTRE SOLUTION LOCALE
          </div>
          <h2>Une prestation. Une commune. Une réponse claire.</h2>
        </div>
      )}
      <label>
        <span>1. Prestation souhaitée</span>
        <select value={serviceSlug} onChange={(e) => setServiceSlug(e.target.value)}>
          {services.map((service) => (
            <option value={service.slug} key={service.slug}>
              {service.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>2. Commune de l’Eure</span>
        <input
          list="all-eure-communes"
          value={communes.find((city) => city.slug === citySlug)?.name || citySlug}
          onChange={(e) => {
            const value = e.target.value;
            const exact = communes.find(
              (city) => city.name.toLocaleLowerCase("fr") === value.toLocaleLowerCase("fr"),
            );
            setCitySlug(exact?.slug || value);
          }}
          placeholder="Saisissez votre commune"
          required
        />
        <datalist id="all-eure-communes">
          {communes.map((city) => (
            <option value={city.name} key={city.insee} />
          ))}
        </datalist>
      </label>
      <button type="submit" className="button">
        Voir la page locale <Icon name="arrow" />
      </button>
    </form>
  );
}

function Home() {
  const leadingCities = communes.filter((city) => publishedSlugs.has(city.slug)).slice(0, 8);
  return (
    <>
      <section className="hero">
        <div
          className="hero-media"
          data-parallax="0.12"
          role="img"
          aria-label="Intérieur contemporain avec système de climatisation discret"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="eyebrow light">
            <span /> CLIMATISATION & POMPES À CHALEUR · EURE
          </div>
          <h1>
            Le confort juste.
            <br />
            <em>À chaque saison.</em>
          </h1>
          <p>
            Étude, installation, entretien et dépannage de solutions de confort thermique dans tout
            le département de l’Eure.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/demande-de-devis">Étudier mon projet</ButtonLink>
            <a
              className="phone-link"
              href={`tel:${PHONE_1}`}
              onClick={() => track("phone_click", { placement: "hero" })}
            >
              <span>
                <Icon name="phone" />
              </span>
              <small>
                Parler à un conseiller<strong>{DISPLAY_PHONE_1}</strong>
              </small>
            </a>
          </div>
          <div className="hero-notes">
            <span>
              <Icon name="check" /> Projet étudié selon votre besoin
            </span>
            <span>
              <Icon name="check" /> Intervention dans l’Eure (27)
            </span>
          </div>
        </div>
        <div className="hero-index">
          27<span>NORMANDIE</span>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div>
            <Icon name="snow" />
            <span>
              <strong>Climatisation réversible</strong>Gainable · Monosplit · Multisplit
            </span>
          </div>
          <div>
            <Icon name="water" />
            <span>
              <strong>Pompes à chaleur</strong>Solutions air/air et air/eau
            </span>
          </div>
          <div>
            <Icon name="tools" />
            <span>
              <strong>Suivi de vos équipements</strong>Entretien et dépannage
            </span>
          </div>
          <div>
            <Icon name="phone" />
            <span>
              <strong>Deux lignes directes</strong>
              {DISPLAY_PHONE_1} · {DISPLAY_PHONE_2}
            </span>
          </div>
        </div>
      </section>

      <section className="finder-section">
        <div className="container">
          <ServiceCommuneFinder />
        </div>
      </section>

      <section className="section intro">
        <div className="container split-heading">
          <div>
            <div className="eyebrow">
              <span /> NOTRE APPROCHE
            </div>
            <h2>
              Un projet thermique commence par les <em>bonnes questions.</em>
            </h2>
          </div>
          <div>
            <p className="lead">
              Votre logement, vos habitudes et vos priorités déterminent la bonne solution — pas
              l’inverse.
            </p>
            <p>
              CLIMATIS’EURE vous accompagne pour clarifier votre besoin et préparer un projet
              cohérent, de l’étude initiale au suivi de l’équipement.
            </p>
            <Link href="/a-propos" className="text-link">
              Découvrir notre approche <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow light">
                <span /> NOS SOLUTIONS
              </div>
              <h2>Le confort, sans compromis.</h2>
            </div>
            <p>
              Des solutions lisibles et une mise en œuvre pensée pour s’intégrer durablement à votre
              habitat.
            </p>
          </div>
          <div className="services-grid">
            {services.slice(0, 6).map((service, i) => (
              <Link
                href={service.slug}
                className={`service-card ${i === 3 ? "accent" : ""}`}
                key={service.slug}
              >
                <div className="service-number">0{i + 1}</div>
                <span className="service-icon">
                  <Icon name={service.icon} size={27} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="card-link">
                  Découvrir <Icon name="arrow" size={17} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section process">
        <div className="container">
          <div className="eyebrow">
            <span /> VOTRE PROJET
          </div>
          <div className="process-layout">
            <div>
              <h2>
                Une démarche claire,
                <br />
                <em>de l’idée au confort.</em>
              </h2>
              <p>Chaque étape sert à préciser la solution et à éviter les choix approximatifs.</p>
              <ButtonLink href="/demande-de-devis">Démarrer mon projet</ButtonLink>
            </div>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <h3>Qualification du besoin</h3>
                  <p>Type de logement, pièces concernées, confort recherché et délai souhaité.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Étude de la configuration</h3>
                  <p>Analyse des contraintes d’implantation et choix d’une solution cohérente.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Proposition détaillée</h3>
                  <p>Un projet expliqué pour vous permettre de décider en connaissance de cause.</p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <h3>Installation & suivi</h3>
                  <p>Mise en œuvre soignée, prise en main et continuité de service.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section local-section">
        <div className="container local-layout">
          <div>
            <div className="eyebrow">
              <span /> ANCRAGE LOCAL
            </div>
            <h2>
              À vos côtés,
              <br />
              partout dans <em>l’Eure.</em>
            </h2>
            <p>
              Notre architecture couvre les 585 communes du département. Seules les pages enrichies
              et relues sont publiées ; les autres restent en préparation afin d’éviter tout contenu
              local artificiel.
            </p>
            <ButtonLink href="/zones-intervention" secondary>
              Voir toutes les communes
            </ButtonLink>
          </div>
          <div className="territory-card">
            <div className="territory-top">
              <span>27</span>
              <small>
                UN DÉPARTEMENT
                <br />
                AU CŒUR DE NOTRE ACTIVITÉ
              </small>
            </div>
            <div className="city-links">
              {leadingCities.map((city) => (
                <Link
                  key={city.insee}
                  href={`/climatisation/installation-climatisation-${city.slug}`}
                >
                  {city.name}
                  <Icon name="chevron" size={15} />
                </Link>
              ))}
            </div>
            <p>
              <strong>585 communes référencées</strong>
              <span>Données géographiques publiques</span>
            </p>
          </div>
        </div>
      </section>

      <section className="section craft-section">
        <div className="container craft-layout">
          <figure data-parallax="0.05">
            <img
              src="/assets/installateur-climatiseure.svg"
              alt="Illustration d’un installateur portant la tenue CLIMATIS’EURE"
              loading="lazy"
            />
          </figure>
          <div>
            <div className="eyebrow">
              <span /> QUALITÉ D’EXÉCUTION
            </div>
            <h2>
              La technique jusque dans <em>les détails.</em>
            </h2>
            <p>
              Implantation, cheminements, évacuation des condensats, accès de maintenance et
              réglages forment un ensemble. Une installation cohérente doit rester compréhensible,
              accessible et adaptée au bâtiment.
            </p>
            <ul className="check-list">
              <li><Icon name="check" /> Étude des contraintes avant proposition</li>
              <li><Icon name="check" /> Intégration visuelle et acoustique</li>
              <li><Icon name="check" /> Explication du fonctionnement et des réglages</li>
            </ul>
            <ButtonLink href="/demande-de-devis">Préparer mon projet</ButtonLink>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <div>
            <div className="eyebrow light">
              <span /> PARLONS DE VOTRE PROJET
            </div>
            <h2>
              Un projet de confort
              <br />
              dans l’Eure ?
            </h2>
            <p>
              Décrivez votre besoin en quelques minutes. Nous disposons alors des informations
              utiles pour reprendre contact.
            </p>
          </div>
          <div className="cta-actions">
            <ButtonLink href="/demande-de-devis">Demander une étude</ButtonLink>
            <a href={`tel:${PHONE_1}`}>
              <Icon name="phone" /> {DISPLAY_PHONE_1}
            </a>
            <a href={`tel:${PHONE_2}`}>
              <Icon name="phone" /> {DISPLAY_PHONE_2}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="Fil d’Ariane">
      <Link href="/">Accueil</Link>
      {items.map((item) => (
        <span key={item.label}>
          <Icon name="chevron" size={13} />
          {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
        </span>
      ))}
    </nav>
  );
}

function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-orbit" data-parallax="0.18" />
      <div className="container">
        <div className="eyebrow light">
          <span /> {eyebrow}
        </div>
        <h1>{title}</h1>
        <p>{text}</p>
        {children}
      </div>
    </section>
  );
}

function ServicePage({ service }: { service: (typeof services)[number] }) {
  const details = serviceDetails[service.slug];
  const isDucted = service.slug === "/climatisation/climatisation-gainable";
  return (
    <>
      <PageHero eyebrow="SOLUTION CLIMATIS’EURE" title={service.title} text={service.text}>
        <div className="hero-actions">
          <ButtonLink href="/demande-de-devis">Demander une étude</ButtonLink>
          <a className="phone-simple" href={`tel:${PHONE_1}`}>
            <Icon name="phone" /> {DISPLAY_PHONE_1}
          </a>
        </div>
      </PageHero>
      <main className="section content-page container">
        <Breadcrumb items={[{ label: service.title }]} />
        <div className="content-grid">
          <article>
            {details.image && (
              <figure className="service-visual" data-parallax="0.06">
                <img src={details.image} alt={details.imageAlt} loading="eager" />
                <figcaption>
                  Illustration de la solution — configuration à adapter au bâtiment.
                </figcaption>
              </figure>
            )}
            <h2>Une solution définie pour votre configuration</h2>
            <p>
              {details.principle} Le choix ne se limite jamais à une puissance catalogue : surface,
              isolation, exposition, nombre de pièces, acoustique, emplacement des unités et usages
              doivent être examinés ensemble.
            </p>
            <div className="info-panel">
              <Icon name={service.icon} size={30} />
              <div>
                <h3>Ce que nous étudions</h3>
                <p>
                  Les volumes à traiter, les contraintes d’implantation, le confort acoustique,
                  l’usage attendu et l’intégration visuelle.
                </p>
              </div>
            </div>
            <div className="pros-cons">
              <section>
                <h3>
                  <Icon name="check" /> Avantages
                </h3>
                <ul>
                  {details.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>
                  <Icon name="clock" /> Points de vigilance
                </h3>
                <ul>
                  {details.limits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
            <h2>Consommation et économies d’énergie</h2>
            <p>{details.energy}</p>
            <div className="energy-guide">
              <strong>Les leviers utiles</strong>
              <span>Dimensionnement</span>
              <span>Isolation du bâti</span>
              <span>Consigne modérée</span>
              <span>Entretien</span>
              <span>Programmation par usage</span>
            </div>
            {isDucted && <DuctedAirzoneGuide />}
            <h2>Comment se déroule votre projet ?</h2>
            <ol className="steps">
              <li>
                <span>1</span>
                <div>
                  <strong>Qualification</strong>
                  <p>Vous nous transmettez les éléments essentiels de votre projet.</p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Étude</strong>
                  <p>La configuration et les contraintes techniques sont analysées.</p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>Proposition</strong>
                  <p>La solution envisagée vous est présentée de manière compréhensible.</p>
                </div>
              </li>
            </ol>
            <h2>Questions fréquentes</h2>
            {details.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
            <details>
              <summary>Cette solution convient-elle à tous les logements ?</summary>
              <p>
                La faisabilité dépend du bâti, des volumes disponibles et de vos objectifs. Une
                étude préalable permet de confirmer la solution appropriée.
              </p>
            </details>
            <details>
              <summary>Comment préparer ma demande ?</summary>
              <p>
                Indiquez la commune, le type de logement, les pièces concernées, votre besoin et, si
                possible, ajoutez quelques photos.
              </p>
            </details>
            <details>
              <summary>Quel niveau sonore attendre ?</summary>
              <p>
                Le niveau perçu dépend du modèle, de la vitesse, de l’implantation et de
                l’acoustique de la pièce. Les valeurs documentaires doivent être comparées dans des
                conditions équivalentes.
              </p>
            </details>
            <details>
              <summary>Comment éviter une consommation excessive ?</summary>
              <p>
                Évitez les écarts de consigne importants, maintenez portes et fenêtres fermées
                pendant le fonctionnement, nettoyez les filtres accessibles et utilisez une
                programmation adaptée à l’occupation.
              </p>
            </details>
          </article>
          <aside className="project-aside">
            <div>
              <span className="aside-icon">
                <Icon name="message" />
              </span>
              <h3>Votre projet mérite une réponse précise.</h3>
              <p>Quelques informations suffisent pour préparer un premier échange utile.</p>
              <ButtonLink href="/demande-de-devis">Décrire mon projet</ButtonLink>
              <hr />
              <small>OU APPELEZ-NOUS</small>
              <a href={`tel:${PHONE_1}`}>{DISPLAY_PHONE_1}</a>
              <a href={`tel:${PHONE_2}`}>{DISPLAY_PHONE_2}</a>
            </div>
          </aside>
        </div>
        <RelatedServices current={service.slug} />
      </main>
    </>
  );
}

function DuctedAirzoneGuide() {
  return (
    <section className="airzone-guide">
      <div className="eyebrow">
        <span /> DOSSIER GAINABLE & AIRZONE
      </div>
      <h2>Gainable classique ou gainable Airzone ?</h2>
      <p>
        Un gainable classique diffuse généralement selon une consigne centrale et un réseau
        équilibré. Une régulation Airzone ajoute des thermostats de zone, un contrôleur et des
        registres motorisés. Les volets modulent le débit selon la demande de chaque zone tout en
        respectant les limites de fonctionnement de l’unité.
      </p>
      <div
        className="comparison-table"
        role="table"
        aria-label="Comparaison gainable classique et Airzone"
      >
        <div className="comparison-head" role="row">
          <strong>Critère</strong>
          <strong>Gainable classique</strong>
          <strong>Gainable Airzone</strong>
        </div>
        {[
          ["Régulation", "Consigne centrale ou limitée", "Thermostat et consigne par zone"],
          ["Débits", "Équilibrage fixe du réseau", "Registres motorisés modulants"],
          ["Confort", "Température homogène globale", "Adaptation aux usages de chaque pièce"],
          ["Sobriété", "Programmation générale", "Zones inutilisées moins sollicitées"],
          ["Complexité", "Conception plus simple", "Compatibilité et débits minimaux à vérifier"],
          [
            "Maintenance",
            "Filtres, réseau, condensats",
            "Même suivi + organes de zonage et commandes",
          ],
        ].map((row) => (
          <div className="comparison-row" role="row" key={row[0]}>
            {row.map((cell, index) => (
              <span role="cell" key={cell} className={index === 0 ? "criterion" : ""}>
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
      <h3>Les configurations de zonage</h3>
      <div className="zone-cards">
        <div>
          <strong>Zone jour / zone nuit</strong>
          <p>Deux grands ensembles pour différencier les rythmes d’occupation.</p>
        </div>
        <div>
          <strong>Pièce par pièce</strong>
          <p>Une commande par chambre ou espace, sous réserve d’une étude des débits.</p>
        </div>
        <div>
          <strong>Zones regroupées</strong>
          <p>Plusieurs pièces proches partageant les mêmes usages et horaires.</p>
        </div>
      </div>
      <div className="info-panel">
        <Icon name="shield" size={28} />
        <div>
          <h3>Airzone n’est pas un simple ajout de thermostats</h3>
          <p>
            La passerelle de communication, la pression disponible, le débit de fuite ou by-pass, la
            taille des gaines et la compatibilité constructeur forment un système qui doit être
            conçu ensemble.
          </p>
        </div>
      </div>
    </section>
  );
}

function RelatedServices({ current }: { current?: string }) {
  return (
    <section className="related">
      <div className="eyebrow">
        <span /> À EXPLORER
      </div>
      <h2>Des solutions complémentaires</h2>
      <div className="related-grid">
        {services
          .filter((s) => s.slug !== current)
          .slice(0, 3)
          .map((s) => (
            <Link href={s.slug} key={s.slug}>
              <Icon name={s.icon} />
              <span>
                <strong>{s.title}</strong>
                <small>{s.text}</small>
              </span>
              <Icon name="chevron" />
            </Link>
          ))}
      </div>
    </section>
  );
}

function LocalPage({ city, service }: { city: Commune; service: Service }) {
  const details = serviceDetails[service.slug];
  const published = publishedSlugs.has(city.slug);
  return (
    <>
      <PageHero
        eyebrow={`${service.short.toUpperCase()} · ${city.name.toUpperCase()} (${city.postal.slice(0, 2) || "27"})`}
        title={
          <>
            {service.title}
            <br />
            <em>à {city.name}</em>
          </>
        }
        text={`CLIMATIS’EURE vous aide à préparer votre projet de ${service.title.toLocaleLowerCase("fr")} à ${city.name}, dans le département de l’Eure.`}
      >
        <div className="hero-actions">
          <ButtonLink href="/demande-de-devis">Demander un devis à {city.name}</ButtonLink>
          <a className="phone-simple" href={`tel:${PHONE_1}`}>
            <Icon name="phone" /> {DISPLAY_PHONE_1}
          </a>
        </div>
      </PageHero>
      <main className="section content-page container">
        <Breadcrumb
          items={[
            { label: service.title, href: service.slug },
            { label: `${service.short} à ${city.name}` },
          ]}
        />
        <ServiceCommuneFinder compact />
        <div className="content-grid">
          <article>
            <h2>
              Votre projet de {service.title.toLocaleLowerCase("fr")} à {city.name}
            </h2>
            <p>
              {city.name} est une commune de l’Eure identifiée par le code INSEE {city.insee}
              {city.postal ? ` et le code postal ${city.postal}` : ""}. Nous accompagnons les
              particuliers et professionnels qui souhaitent étudier une solution de confort
              thermique adaptée à leur bâtiment.
            </p>
            <p>
              Cette page ne présente ni chantier ni délai inventé. Elle rassemble les informations
              utiles pour préparer une demande locale. {details.principle}
            </p>
            <div className="info-panel">
              <Icon name="building" size={30} />
              <div>
                <h3>Une étude au cas par cas</h3>
                <p>
                  L’isolation, l’exposition, le volume des pièces, les possibilités de passage et
                  les contraintes extérieures orientent la solution.
                </p>
              </div>
            </div>
            <h2>Avantages et points de vigilance à {city.name}</h2>
            <div className="pros-cons">
              <section>
                <h3>Avantages</h3>
                <ul>
                  {details.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>À vérifier</h3>
                <ul>
                  {details.limits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
            <h2>Énergie et usage</h2>
            <p>{details.energy}</p>
            <h2>Préparer votre demande locale</h2>
            <ul className="check-list">
              <li>
                <Icon name="check" /> Précisez votre type de logement et sa surface.
              </li>
              <li>
                <Icon name="check" /> Indiquez les pièces concernées et leur usage.
              </li>
              <li>
                <Icon name="check" /> Joignez des photos si elles facilitent la compréhension.
              </li>
              <li>
                <Icon name="check" /> Mentionnez votre délai souhaité sans supposer une
                disponibilité.
              </li>
            </ul>
          </article>
          <aside className="project-aside">
            <div>
              <small>SECTEUR</small>
              <h3>
                {city.name}
                <br />
                Eure · Normandie
              </h3>
              <p>
                {published
                  ? "Page locale enrichie et publiée dans le sitemap."
                  : "Page fonctionnelle disponible pour préparer votre projet. Elle reste exclue du sitemap jusqu’à validation éditoriale locale."}
              </p>
              <ButtonLink href="/demande-de-devis">Mon projet à {city.name}</ButtonLink>
            </div>
          </aside>
        </div>
        <section className="local-faq">
          <h2>
            FAQ {service.short} à {city.name}
          </h2>
          {details.faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
          <details>
            <summary>CLIMATIS’EURE intervient-il dans la commune de {city.name} ?</summary>
            <p>
              La commune figure dans la zone de qualification départementale. La faisabilité et
              l’organisation d’une intervention doivent être confirmées lors de la prise de contact.
            </p>
          </details>
          <details>
            <summary>Comment obtenir une étude pour mon logement à {city.name} ?</summary>
            <p>
              Sélectionnez votre prestation, décrivez le bâtiment, les pièces concernées et votre
              délai souhaité, puis contactez l’une des deux lignes commerciales.
            </p>
          </details>
        </section>
        <RelatedServices />
      </main>
    </>
  );
}

function Directory() {
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState(services[0].slug);
  const results = useMemo(
    () => communes.filter((city) => city.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );
  const activeService = services.find((service) => service.slug === selectedService) || services[0];
  return (
    <>
      <PageHero
        eyebrow="COUVERTURE DÉPARTEMENTALE"
        title={
          <>
            Nos zones d’intervention
            <br />
            <em>dans l’Eure</em>
          </>
        }
        text="Les 585 communes sont référencées. La publication locale est progressive, éditorialisée et contrôlée."
      />
      <main className="section container directory">
        <Breadcrumb items={[{ label: "Zones d’intervention" }]} />
        <div className="directory-head">
          <div>
            <h2>Rechercher une commune</h2>
            <p>
              Choisissez d’abord la prestation, puis recherchez librement parmi les 585 communes.
              Toutes les combinaisons sont accessibles ; seules les pages éditorialement validées
              sont proposées à l’indexation.
            </p>
          </div>
          <div className="directory-controls">
            <label>
              <span>Prestation</span>
              <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                {services.map((service) => (
                  <option value={service.slug} key={service.slug}>
                    {service.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Commune</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ex. Évreux, Vernon…"
              />
            </label>
          </div>
        </div>
        <p className="result-count">
          <strong>{results.length}</strong> commune{results.length > 1 ? "s" : ""} disponible
          {results.length > 1 ? "s" : ""} pour « {activeService.title} »
        </p>
        <div className="city-directory">
          {results.map((city) => (
            <Link href={localPath(activeService, city)} key={city.insee}>
              <span>
                {city.name}
                <small>
                  {city.postal} · INSEE {city.insee}
                </small>
              </span>
              <em>{publishedSlugs.has(city.slug) ? "Indexable" : "Accessible"}</em>
              <Icon name="chevron" size={15} />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

const formFields = [
  "Installation de climatisation",
  "Climatisation gainable",
  "Climatisation monosplit",
  "Climatisation multisplit",
  "Pompe à chaleur air/air",
  "Pompe à chaleur air/eau",
  "Entretien",
  "Dépannage",
];

function QuotePage() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const previous = JSON.parse(localStorage.getItem("climatiseure_leads") || "[]");
    localStorage.setItem(
      "climatiseure_leads",
      JSON.stringify([
        ...previous,
        { ...data, createdAt: new Date().toISOString(), status: "à transmettre" },
      ]),
    );
    track("quote_submit", { service: data.service });
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (sent)
    return (
      <>
        <PageHero
          eyebrow="DEMANDE ENREGISTRÉE"
          title={
            <>
              Merci pour votre
              <br />
              <em>demande.</em>
            </>
          }
          text="Vos informations sont enregistrées dans ce navigateur. Le connecteur serveur devra être activé pour les transmettre automatiquement. Pour une prise en charge immédiate, appelez-nous."
        />
        <section className="section container success-panel">
          <Icon name="check" size={36} />
          <h2>Votre projet a bien été préparé</h2>
          <p>
            Appelez le {DISPLAY_PHONE_1} ou le {DISPLAY_PHONE_2} pour transmettre votre demande dès
            maintenant.
          </p>
          <a className="button" href={`tel:${PHONE_1}`}>
            <Icon name="phone" /> Appeler {DISPLAY_PHONE_1}
          </a>
        </section>
      </>
    );
  return (
    <>
      <PageHero
        eyebrow="VOTRE PROJET"
        title={
          <>
            Parlez-nous de votre
            <br />
            <em>besoin.</em>
          </>
        }
        text="Un formulaire clair pour réunir les informations utiles avant le premier échange."
      />
      <main className="section container quote-layout">
        <div className="quote-intro">
          <Breadcrumb items={[{ label: "Demande de devis" }]} />
          <h2>Commençons par l’essentiel.</h2>
          <p>Les champs marqués d’un astérisque sont nécessaires pour qualifier votre demande.</p>
          <div className="privacy-note">
            <Icon name="shield" />
            <span>
              <strong>Vos données restent sous votre contrôle</strong>Sans backend connecté, cette
              version les conserve uniquement sur votre appareil et ne les transmet pas.
            </span>
          </div>
        </div>
        <form className="quote-form" onSubmit={submit}>
          <div className="form-section">
            <span>01</span>
            <h3>Vos coordonnées</h3>
          </div>
          <div className="field-row">
            <label>
              Prénom *<input name="firstName" required autoComplete="given-name" />
            </label>
            <label>
              Nom *<input name="lastName" required autoComplete="family-name" />
            </label>
          </div>
          <div className="field-row">
            <label>
              Téléphone *<input name="phone" required type="tel" autoComplete="tel" />
            </label>
            <label>
              Adresse e-mail *<input name="email" required type="email" autoComplete="email" />
            </label>
          </div>
          <label>
            Commune *<input name="city" required list="communes-list" />
            <datalist id="communes-list">
              {communes.map((c) => (
                <option value={c.name} key={c.insee} />
              ))}
            </datalist>
          </label>
          <div className="form-section">
            <span>02</span>
            <h3>Votre besoin</h3>
          </div>
          <div className="field-row">
            <label>
              Prestation *
              <select name="service" required defaultValue="">
                <option value="" disabled>
                  Choisir une prestation
                </option>
                {formFields.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </label>
            <label>
              Type de logement *
              <select name="housing" required defaultValue="">
                <option value="" disabled>
                  Sélectionner
                </option>
                <option>Maison</option>
                <option>Appartement</option>
                <option>Local professionnel</option>
                <option>Autre</option>
              </select>
            </label>
          </div>
          <label>
            Décrivez votre projet *
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Pièces concernées, surface approximative, besoin principal…"
            />
          </label>
          <label>
            Délai souhaité
            <select name="timeline" defaultValue="À définir">
              <option>À définir</option>
              <option>Dès que possible</option>
              <option>Dans les 3 mois</option>
              <option>Dans les 6 mois</option>
              <option>Projet à plus long terme</option>
            </select>
          </label>
          <label className="consent">
            <input type="checkbox" name="consent" required />{" "}
            <span>
              J’accepte que mes informations soient utilisées pour répondre à ma demande. *
            </span>
          </label>
          <button className="button submit-button" type="submit">
            Enregistrer ma demande <Icon name="arrow" />
          </button>
        </form>
      </main>
    </>
  );
}

function Advice() {
  const articles = [
    [
      "Quel prix pour installer une climatisation dans l’Eure ?",
      "Budget & projet",
      "Les éléments qui influencent réellement une proposition, sans annoncer de prix artificiel.",
    ],
    [
      "Monosplit ou multisplit : que choisir ?",
      "Climatisation",
      "Comparer les usages, l’intégration et le nombre de pièces à équiper.",
    ],
    [
      "Climatisation gainable : fonctionnement et avantages",
      "Guide technique",
      "Comprendre l’intégration, la diffusion et les contraintes du gainable.",
    ],
    [
      "Pompe à chaleur air/air ou air/eau ?",
      "Pompe à chaleur",
      "Deux principes différents à choisir selon votre système et votre besoin.",
    ],
    [
      "Quand entretenir sa climatisation ?",
      "Entretien",
      "Les signes à surveiller et les bonnes pratiques de suivi.",
    ],
    [
      "Quelle puissance pour une maison ?",
      "Dimensionnement",
      "Pourquoi une puissance ne se choisit pas sur la seule surface.",
    ],
  ];
  return (
    <>
      <PageHero
        eyebrow="CONSEILS & EXPERTISE"
        title={
          <>
            Comprendre avant
            <br />
            <em>de choisir.</em>
          </>
        }
        text="Des contenus précis pour préparer votre projet de confort thermique."
      />
      <main className="section container">
        <Breadcrumb items={[{ label: "Conseils" }]} />
        <div className="article-grid">
          {articles.map((a, i) => (
            <article key={a[0]}>
              <span>0{i + 1}</span>
              <small>{a[1]}</small>
              <h2>{a[0]}</h2>
              <p>{a[2]}</p>
              <Link href="/contact" className="text-link">
                Poser une question <Icon name="arrow" size={17} />
              </Link>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title={
          <>
            Échangeons sur
            <br />
            <em>votre projet.</em>
          </>
        }
        text="Deux lignes directes pour joindre CLIMATIS’EURE dans le département de l’Eure."
      />
      <main className="section container contact-grid">
        <div>
          <Breadcrumb items={[{ label: "Contact" }]} />
          <h2>Comment pouvons-nous vous aider ?</h2>
          <p>
            Pour une installation, un entretien ou un dépannage, précisez votre commune, votre
            équipement et votre besoin.
          </p>
          <ButtonLink href="/demande-de-devis">Décrire mon projet</ButtonLink>
        </div>
        <div className="contact-cards">
          <a href={`tel:${PHONE_1}`}>
            <Icon name="phone" />
            <span>
              <small>LIGNE COMMERCIALE</small>
              <strong>{DISPLAY_PHONE_1}</strong>
              <em>Appeler maintenant</em>
            </span>
          </a>
          <a href={`tel:${PHONE_2}`}>
            <Icon name="phone" />
            <span>
              <small>SECONDE LIGNE</small>
              <strong>{DISPLAY_PHONE_2}</strong>
              <em>Appeler maintenant</em>
            </span>
          </a>
          <div>
            <Icon name="building" />
            <span>
              <small>ZONE D’INTERVENTION</small>
              <strong>Eure (27)</strong>
              <em>Normandie</em>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

function GenericPage({ type }: { type: string }) {
  const isPac = type === "pac";
  return (
    <>
      <PageHero
        eyebrow={
          isPac
            ? "POMPES À CHALEUR"
            : type === "maintenance"
              ? "SUIVI DES ÉQUIPEMENTS"
              : "CLIMATISATION"
        }
        title={
          isPac ? (
            <>
              Des solutions pour
              <br />
              <em>votre confort thermique.</em>
            </>
          ) : type === "maintenance" ? (
            <>
              Entretenir, diagnostiquer,
              <br />
              <em>retrouver le confort.</em>
            </>
          ) : (
            <>
              Une climatisation pensée
              <br />
              <em>pour votre habitat.</em>
            </>
          )
        }
        text={
          isPac
            ? "Découvrez les principes des pompes à chaleur air/air et air/eau."
            : type === "maintenance"
              ? "Entretien et dépannage de vos systèmes de climatisation et pompes à chaleur."
              : "Monosplit, multisplit ou gainable : chaque configuration répond à des usages différents."
        }
      />
      <main className="section container">
        <Breadcrumb
          items={[
            {
              label: isPac
                ? "Pompes à chaleur"
                : type === "maintenance"
                  ? "Entretien & dépannage"
                  : "Climatisation",
            },
          ]}
        />
        <div className="listing-grid">
          {services
            .filter((s) =>
              isPac
                ? s.slug.includes("pompes")
                : type === "maintenance"
                  ? s.slug.includes("entretien") || s.slug.includes("depannage")
                  : s.slug.includes("climatisation/"),
            )
            .map((s) => (
              <Link href={s.slug} className="listing-card" key={s.slug}>
                <Icon name={s.icon} size={28} />
                <h2>{s.title}</h2>
                <p>{s.text}</p>
                <span>
                  Découvrir <Icon name="arrow" size={16} />
                </span>
              </Link>
            ))}
        </div>
      </main>
    </>
  );
}

type ChatData = {
  need?: string;
  city?: string;
  housing?: string;
  timeline?: string;
  contact?: string;
  consent?: boolean;
};

function Assistant() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ChatData>({});
  const questions = [
    {
      key: "need",
      title: "Quel est votre besoin ?",
      options: ["Installation", "Entretien", "Dépannage", "Je souhaite être conseillé"],
    },
    {
      key: "housing",
      title: "Quel bâtiment est concerné ?",
      options: ["Maison", "Appartement", "Local professionnel", "Autre"],
    },
    {
      key: "timeline",
      title: "Quel est votre horizon ?",
      options: ["Dès que possible", "Dans les 3 mois", "Dans les 6 mois", "À définir"],
    },
  ] as const;
  function choose(key: keyof ChatData, value: string) {
    setData({ ...data, [key]: value });
    setStep(step + 1);
  }
  function finish(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lead = {
      ...data,
      city: fd.get("city"),
      contact: fd.get("contact"),
      consent: true,
      createdAt: new Date().toISOString(),
      status: "à transmettre",
    };
    localStorage.setItem("climatiseure_assistant_lead", JSON.stringify(lead));
    track("assistant_qualified");
    setStep(5);
  }
  return (
    <>
      <button
        className="assistant-launcher"
        onClick={() => {
          setOpen(true);
          track("assistant_start");
        }}
        aria-label="Ouvrir l’assistant projet"
      >
        <span>
          <Icon name="message" />
        </span>
        <em>
          Assistant projet<small>Qualifier mon besoin</small>
        </em>
      </button>
      {open && (
        <div className="assistant-panel" role="dialog" aria-label="Assistant projet">
          <div className="assistant-head">
            <Logo compact light />
            <div>
              <strong>Assistant CLIMATIS’EURE</strong>
              <span>
                <i /> Qualification de projet
              </span>
            </div>
            <button aria-label="Fermer" onClick={() => setOpen(false)}>
              <Icon name="x" />
            </button>
          </div>
          <div className="assistant-body">
            <div className="assistant-progress">
              <span style={{ width: `${Math.min((step + 1) * 20, 100)}%` }} />
            </div>
            {step < 3 && (
              <>
                <small>ÉTAPE {step + 1} SUR 4</small>
                <h3>{questions[step].title}</h3>
                <div className="assistant-options">
                  {questions[step].options.map((o) => (
                    <button key={o} onClick={() => choose(questions[step].key, o)}>
                      {o}
                      <Icon name="chevron" size={15} />
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 3 && (
              <form onSubmit={finish}>
                <small>DERNIÈRE ÉTAPE</small>
                <h3>Où et comment vous recontacter ?</h3>
                <label>
                  Votre commune
                  <input required name="city" list="communes-list" />
                </label>
                <label>
                  Téléphone ou e-mail
                  <input required name="contact" />
                </label>
                <label className="consent">
                  <input required type="checkbox" />
                  <span>J’accepte l’enregistrement local de ces informations.</span>
                </label>
                <button className="button" type="submit">
                  Préparer ma demande
                </button>
              </form>
            )}
            {step === 5 && (
              <div className="assistant-done">
                <span>
                  <Icon name="check" />
                </span>
                <h3>Votre demande est prête.</h3>
                <p>
                  Sans serveur connecté, elle reste sur cet appareil. Appelez-nous pour la
                  transmettre immédiatement.
                </p>
                <a href={`tel:${PHONE_1}`} className="button">
                  <Icon name="phone" /> {DISPLAY_PHONE_1}
                </a>
              </div>
            )}
          </div>
          <div className="assistant-foot">
            Cet assistant qualifie votre besoin sans générer de prix, délai ou disponibilité.
          </div>
        </div>
      )}
    </>
  );
}

function CallDock() {
  const [open, setOpen] = useState(false);
  return (
    <div className={`call-dock ${open ? "open" : ""}`}>
      {open && (
        <div className="call-options">
          <strong>Choisissez une ligne</strong>
          <small>Deux numéros commerciaux disponibles</small>
          <a
            href={`tel:${PHONE_1}`}
            onClick={() => track("phone_click", { phone: PHONE_1, placement: "floating" })}
          >
            <span>
              <Icon name="phone" />
            </span>
            <em>
              Ligne 1<strong>{DISPLAY_PHONE_1}</strong>
            </em>
          </a>
          <a
            href={`tel:${PHONE_2}`}
            onClick={() => track("phone_click", { phone: PHONE_2, placement: "floating" })}
          >
            <span>
              <Icon name="phone" />
            </span>
            <em>
              Ligne 2<strong>{DISPLAY_PHONE_2}</strong>
            </em>
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Choisir un numéro à appeler"
      >
        <Icon name={open ? "x" : "phone"} />
        <span>{open ? "Fermer" : "Appeler"}</span>
      </button>
    </div>
  );
}

function MotionEffects({ path }: { path: string }) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanUp = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
            const speed = Number(element.dataset.parallax || 0.1);
            gsap.fromTo(
              element,
              { yPercent: -speed * 30 },
              {
                yPercent: speed * 30,
                ease: "none",
                scrollTrigger: { trigger: element.parentElement || element, scrub: 0.7 },
              },
            );
          });
          const cards = gsap.utils.toArray<HTMLElement>(
            ".service-card, .listing-card, .article-grid article",
          );
          if (cards.length) {
            gsap.from(cards, {
              y: 28,
              opacity: 0,
              duration: 0.65,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: { trigger: cards[0], start: "top 88%" },
            });
          }
        });
        cleanUp = () => context.revert();
      },
    );
    return () => {
      cancelled = true;
      cleanUp();
    };
  }, [path]);
  return null;
}

function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Logo light />
          <p>
            Climatisation & pompes à chaleur
            <br />
            dans l’Eure (27), Normandie.
          </p>
          <div className="footer-phones">
            <a href={`tel:${PHONE_1}`}>{DISPLAY_PHONE_1}</a>
            <a href={`tel:${PHONE_2}`}>{DISPLAY_PHONE_2}</a>
          </div>
        </div>
        <div>
          <strong>Solutions</strong>
          {services.slice(0, 6).map((s) => (
            <Link key={s.slug} href={s.slug}>
              {s.short}
            </Link>
          ))}
        </div>
        <div>
          <strong>Informations</strong>
          <Link href="/zones-intervention">Zones d’intervention</Link>
          <Link href="/conseils">Conseils</Link>
          <Link href="/a-propos">À propos</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <strong>Votre projet</strong>
          <p>Un besoin d’installation, d’entretien ou de dépannage ?</p>
          <ButtonLink href="/demande-de-devis">Demander un devis</ButtonLink>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} CLIMATIS’EURE</span>
        <div>
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/politique-de-confidentialite">Confidentialité</Link>
          <button>Gérer les cookies</button>
        </div>
      </div>
    </footer>
  );
}

function Legal({ privacy = false }: { privacy?: boolean }) {
  return (
    <>
      <PageHero
        eyebrow="INFORMATIONS LÉGALES"
        title={privacy ? "Politique de confidentialité" : "Mentions légales"}
        text="Les informations administratives non confirmées restent volontairement absentes."
      />
      <main className="section container prose">
        <Breadcrumb items={[{ label: privacy ? "Confidentialité" : "Mentions légales" }]} />
        <h2>{privacy ? "Protection de vos données" : "Éditeur du site"}</h2>
        <p>
          {privacy
            ? "Les formulaires de cette version sans backend enregistrent les demandes uniquement dans le stockage local du navigateur. Aucun envoi à un serveur n’est effectué. Une politique complète devra être validée lors du branchement du service de collecte."
            : "Nom commercial : CLIMATIS’EURE. Zone d’intervention : département de l’Eure (27), Normandie. Téléphones : 06 59 84 13 01 et 07 43 46 21 01. L’adresse, la forme juridique, le numéro d’immatriculation, le responsable de publication et l’hébergeur devront être complétés après confirmation."}
        </p>
        <h2>Informations à compléter</h2>
        <p>
          Les données réglementaires et les coordonnées administratives ne sont pas inventées. Elles
          devront être ajoutées avant toute mise en production publique.
        </p>
      </main>
    </>
  );
}

function Seo({
  path,
  city,
  service,
  indexable = true,
}: {
  path: string;
  city?: Commune;
  service?: (typeof services)[number];
  indexable?: boolean;
}) {
  useEffect(() => {
    const title = city
      ? `${service?.title || "Climatisation"} à ${city.name} (27) | CLIMATIS'EURE`
      : service
        ? `${service.title} dans l'Eure (27) | CLIMATIS'EURE`
        : path === "/"
          ? `Climatisation & pompes à chaleur dans l'Eure | CLIMATIS'EURE`
          : `CLIMATIS'EURE | Climatisation & pompes à chaleur`;
    const description = city
      ? `CLIMATIS'EURE vous accompagne pour votre projet de ${service?.title.toLocaleLowerCase("fr") || "climatisation"} à ${city.name} et dans l’Eure. Étude, avantages et FAQ.`
      : service
        ? `${service.text} Découvrez l’accompagnement CLIMATIS'EURE dans le département de l’Eure.`
        : `CLIMATIS'EURE accompagne vos projets de climatisation et pompes à chaleur dans l’Eure. Installation, entretien et dépannage.`;
    document.title = title;
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!el) {
        el = document.createElement(attr === "href" ? "link" : "meta");
        if (attr === "href") el.setAttribute("rel", "canonical");
        else
          el.setAttribute(
            selector.includes("property=") ? "property" : "name",
            selector.match(/["'](.+?)["']/)?.[1] || "description",
          );
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", `${location.origin}${path === "/" ? "/" : path}`);
    setMeta('meta[name="robots"]', "content", indexable ? "index, follow" : "noindex, follow");
    const schema = document.getElementById("structured-data") || document.createElement("script");
    schema.id = "structured-data";
    schema.setAttribute("type", "application/ld+json");
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "CLIMATIS'EURE",
          telephone: [DISPLAY_PHONE_1, DISPLAY_PHONE_2],
          areaServed: { "@type": "AdministrativeArea", name: "Eure" },
        },
        { "@type": "WebSite", name: "CLIMATIS'EURE", url: location.origin },
        ...(service
          ? [
              {
                "@type": "Service",
                name: city ? `${service.title} à ${city.name}` : service.title,
                provider: { "@type": "Organization", name: "CLIMATIS'EURE" },
                areaServed: city
                  ? { "@type": "City", name: city.name }
                  : { "@type": "AdministrativeArea", name: "Eure" },
                description,
              },
            ]
          : []),
      ],
    });
    if (!schema.parentNode) document.head.appendChild(schema);
  }, [path, city, service, indexable]);
  return null;
}

export default function App() {
  const [path, setPath] = useState(location.pathname.replace(/\/+$/, "") || "/");
  useEffect(() => {
    const update = () => setPath(location.pathname.replace(/\/+$/, "") || "/");
    addEventListener("popstate", update);
    return () => removeEventListener("popstate", update);
  }, []);
  const service = services.find((s) => s.slug === path);
  const city = communesByLongestSlug.find((item) => path.endsWith(`-${item.slug}`));
  const localService = city
    ? services.find((item) => path === `${localPrefixes[item.slug]}-${city.slug}`)
    : undefined;
  const routeService = service || localService;
  let page: ReactNode;
  if (path === "/") page = <Home />;
  else if (service) page = <ServicePage service={service} />;
  else if (city && localService) page = <LocalPage city={city} service={localService} />;
  else if (path === "/climatisation") page = <GenericPage type="climatisation" />;
  else if (path === "/pompes-a-chaleur") page = <GenericPage type="pac" />;
  else if (path === "/entretien-depannage") page = <GenericPage type="maintenance" />;
  else if (path === "/zones-intervention") page = <Directory />;
  else if (path === "/demande-de-devis") page = <QuotePage />;
  else if (path === "/conseils") page = <Advice />;
  else if (path === "/contact" || path === "/a-propos") page = <ContactPage />;
  else if (path === "/politique-de-confidentialite") page = <Legal privacy />;
  else if (path === "/mentions-legales") page = <Legal />;
  else
    page = (
      <>
        <PageHero
          eyebrow="ERREUR 404"
          title={
            <>
              Cette page reste
              <br />
              <em>introuvable.</em>
            </>
          }
          text="Le contenu demandé n’existe pas ou n’est pas encore publié."
        />
        <section className="section container">
          <ButtonLink href="/">Retour à l’accueil</ButtonLink>
        </section>
      </>
    );
  return (
    <>
      <Seo
        path={path}
        city={localService ? city : undefined}
        service={routeService}
        indexable={!city || !localService || publishedSlugs.has(city.slug)}
      />
      <MotionEffects path={path} />
      <Header />
      <main id="main-content">{page}</main>
      <Footer />
      <Assistant />
      <CallDock />
      <div className="mobile-bar">
        <a href={`tel:${PHONE_1}`}>
          <Icon name="phone" /> Appeler
        </a>
        <Link href="/demande-de-devis">
          <Icon name="message" /> Devis
        </Link>
      </div>
    </>
  );
}
