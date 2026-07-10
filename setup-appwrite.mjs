import { Client, Databases, ID, Permission, Role } from 'node-appwrite';

const PROJECT_ID = '6a4f8178002dec192690';
const API_KEY = 'standard_f639dd7f5382bebab83a85b1d679cae4c5aae30959dbee07fb663103792923d217625dc43c2de191c92169a90e80f2725cecf95f9816342afd30f258c0fbf0119161f2166196e94bd101afb9086324ff3a428eacbab23bad6464a1e4c66897cb905e02f3832733dd821bfa752e6c564c5b9c8e0c6741cd88aa89aa7b3dbab94e';
const ENDPOINT = 'https://sgp.cloud.appwrite.io/v1';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

const DB_ID = 'portfolioDB';
const COLLECTION_ID = 'pageContent';

const seedData = [
  {
    section: 'hero',
    data: JSON.stringify({
      pill: 'The Future of Web',
      title: 'Design the Unknown.',
      description: 'Pixelpeak engineers ultra-premium digital experiences. We merge data science with cyberpunk aesthetics to scale your brand.'
    })
  },
  {
    section: 'about',
    data: JSON.stringify({
      title: 'We don\'t follow trends.<br/><span class="text-teal-400">We code them.</span>',
      description: 'At Pixelpeak, we view marketing as an engineering discipline. By combining big data analytics with cutting-edge front-end architecture, we build digital ecosystems that consistently outmaneuver the competition.'
    })
  },
  {
    section: 'services',
    data: JSON.stringify([
      {
        "title": "NEURAL BRANDING",
        "description": "Algorithmic identity design and visual asset generation driven by data.",
        "icon": "Box",
        "colSpan": "md:col-span-1"
      },
      {
        "title": "WEBGL ARCHITECTURE",
        "description": "Immersive 3D web experiences pushing the limits of browser performance.",
        "icon": "Cpu",
        "colSpan": "md:col-span-2"
      },
      {
        "title": "QUANTUM SCALING",
        "description": "High-availability backend infrastructures capable of handling millions of concurrent connections.",
        "icon": "Database",
        "colSpan": "md:col-span-2"
      },
      {
        "title": "AI AUTOMATION",
        "description": "Intelligent workflow systems and custom LLM integrations for enterprise.",
        "icon": "Terminal",
        "colSpan": "md:col-span-1"
      }
    ])
  },
  {
    section: 'process',
    data: JSON.stringify([
      { "title": "TELEMETRY GATHERING", "description": "Deep-dive analysis into market data, user behavior, and competitor matrices." },
      { "title": "SYSTEM ARCHITECTURE", "description": "Mapping the technical foundation, wireframing user flows, and defining API endpoints." },
      { "title": "SYNTHESIS & BUILD", "description": "Executing the code. Agile sprints delivering production-ready modules." },
      { "title": "GLOBAL DEPLOYMENT", "description": "Pushing to edge networks with zero-downtime CI/CD pipelines." }
    ])
  },
  {
    section: 'projects',
    data: JSON.stringify([
      {
        "title": "AETHERIUS",
        "category": "AI BRAND PLATFORM",
        "description": "Generative brand asset creation portal scaling digital fashion marketing.",
        "metrics": [
          { "name": "ENGAGEMENT", "value": "+280%" },
          { "name": "GENERATED ASSETS", "value": "2.4M" },
          { "name": "MODEL LATENCY", "value": "85ms" }
        ],
        "tech": ["Next.js", "Stable Diffusion", "Tailwind CSS"],
        "color": "from-teal-500/20 to-teal-900/10",
        "borderColor": "group-hover:border-teal-500/50",
        "url": "https://github.com/aetherius-brand"
      },
      {
        "title": "NOVA ANALYTICS",
        "category": "REAL-TIME PIPELINE",
        "description": "High-throughput data ingestion pipeline handling 100k+ events/sec.",
        "metrics": [
          { "name": "INGEST RATE", "value": "120k/s" },
          { "name": "STABILITY", "value": "99.999%" },
          { "name": "QUERY TIME", "value": "8ms" }
        ],
        "tech": ["React", "Go", "Kafka", "ClickHouse"],
        "color": "from-lime-500/20 to-lime-900/10",
        "borderColor": "group-hover:border-lime-500/50",
        "url": "https://github.com/nova-analytics"
      },
      {
        "title": "ZEPHYR MATRIX",
        "category": "CAMPAIGN AUTOMATION",
        "description": "Predictive AI agent automating media buying and optimizing budget allocation.",
        "metrics": [
          { "name": "ROI IMPROVEMENT", "value": "+148%" },
          { "name": "AD SPEND MANAGED", "value": "$4.2M" },
          { "name": "DECISIONS/MIN", "value": "1,200" }
        ],
        "tech": ["Python", "TensorFlow", "FastAPI", "React"],
        "color": "from-teal-500/20 to-lime-500/10",
        "borderColor": "group-hover:border-teal-400/50",
        "url": "https://github.com/zephyr-matrix"
      },
      {
        "title": "HELIOS SUITE",
        "category": "CYBER-ASSETS STUDIO",
        "description": "Immersive WebGL repository and rendering sandbox for digital collectibles.",
        "metrics": [
          { "name": "RENDER RATE", "value": "90 FPS" },
          { "name": "ASSETS STORED", "value": "45k" },
          { "name": "WEBGL LOAD", "value": "0.6s" }
        ],
        "tech": ["Next.js", "Three.js", "React Three Fiber"],
        "color": "from-lime-500/20 to-teal-500/10",
        "borderColor": "group-hover:border-lime-400/50",
        "url": "https://github.com/helios-suite"
      }
    ])
  },
  {
    section: 'reviews',
    data: JSON.stringify([
      {
        "name": "Elena Rostova",
        "role": "VP of Growth",
        "company": "Cyberspace Labs",
        "quote": "Pixelpeak engineered our Web3 platform and drove a 340% increase in active users within 3 months. Their engineering is top-tier and their aesthetic sensibility is second to none.",
        "stars": 5,
        "metric": "340% Growth",
        "color": "text-teal-400 bg-teal-500/10",
        "avatarBg": "from-teal-500 to-emerald-600"
      },
      {
        "name": "Marcus Vance",
        "role": "Founder",
        "company": "Nova Technologies",
        "quote": "The 3D analytics dashboard they built is not just beautiful—it handles our real-time traffic without breaking a sweat. It has completely transformed how our stakeholders visualize backend data.",
        "stars": 5,
        "metric": "Sub-10ms Latency",
        "color": "text-lime-400 bg-lime-500/10",
        "avatarBg": "from-lime-500 to-green-600"
      },
      {
        "name": "Aria Chen",
        "role": "CMO",
        "company": "Aetherius",
        "quote": "Aesthetic precision combined with mathematical execution. Their digital campaign strategy optimized our CAC down to levels we thought impossible, while building a brand identity that commands attention.",
        "stars": 5,
        "metric": "-48% CAC",
        "color": "text-teal-400 bg-teal-500/10",
        "avatarBg": "from-cyan-500 to-teal-600"
      },
      {
        "name": "Kaelen Vance",
        "role": "Tech Lead",
        "company": "Helios Guild",
        "quote": "Their Next.js architecture is incredibly fast and clean. Working with their team felt like working with a high-performance special ops unit. The integration of 3D shaders is flawless.",
        "stars": 5,
        "metric": "90 FPS Render",
        "color": "text-lime-400 bg-lime-500/10",
        "avatarBg": "from-yellow-500 to-lime-600"
      }
    ])
  },
  {
    section: 'statistics',
    data: JSON.stringify([
      { "value": 99.9, "label": "UPTIME", "suffix": "%" },
      { "value": 240, "label": "SYSTEMS DEPLOYED", "suffix": "+" },
      { "value": 15, "label": "AWARDS WON", "suffix": "" },
      { "value": 0.5, "label": "AVG LATENCY", "suffix": "ms" }
    ])
  }
];

async function setup() {
  try {
    console.log("Checking database...");
    let dbExists = false;
    try {
      await databases.get(DB_ID);
      dbExists = true;
      console.log("Database already exists.");
    } catch (e) {
      if (e.code === 404) {
        console.log("Creating database...");
        await databases.create(DB_ID, 'Pixelpeak Portfolio');
      } else {
        throw e;
      }
    }

    console.log("Checking collection...");
    let colExists = false;
    try {
      await databases.getCollection(DB_ID, COLLECTION_ID);
      colExists = true;
      console.log("Collection already exists.");
    } catch (e) {
      if (e.code === 404) {
        console.log("Creating collection...");
        // Provide Read access to Any, and write access to Users
        await databases.createCollection(DB_ID, COLLECTION_ID, 'PageContent', [
            Permission.read(Role.any()),
            Permission.write(Role.users())
        ]);
        
        console.log("Creating attributes...");
        await databases.createStringAttribute(DB_ID, COLLECTION_ID, 'section', 255, true);
        await databases.createStringAttribute(DB_ID, COLLECTION_ID, 'data', 100000, true);
        
        // Wait for attributes to be created (Appwrite processes this asynchronously)
        console.log("Waiting for attributes to be ready (5s)...");
        await new Promise(r => setTimeout(r, 5000));
      } else {
        throw e;
      }
    }

    // Seed Data
    console.log("Seeding documents...");
    for (const item of seedData) {
      try {
        // We can use the section name as the document ID for easy fetching
        await databases.createDocument(DB_ID, COLLECTION_ID, item.section, {
          section: item.section,
          data: item.data
        });
        console.log(`Seeded document: ${item.section}`);
      } catch (err) {
        if (err.code === 409) {
          console.log(`Document ${item.section} already exists. Skipping...`);
        } else {
          console.error(`Failed to seed ${item.section}:`, err.message);
        }
      }
    }

    console.log("Setup complete!");
  } catch (err) {
    console.error("Setup failed:", err);
  }
}

setup();
