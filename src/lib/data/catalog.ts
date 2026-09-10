import type {
  ChecklistTemplate,
  Employee,
  Location,
  Module,
  Quiz,
  Role,
  RoleKey,
  SopDocument,
  TrainingPath,
} from "@/types/academy";

export const ORGANIZATION_NAME = "The Praguery";

export const locations: Location[] = [
  {
    id: "loc-lafarge",
    name: "Praguery Cafe — Lafarge Lake",
    shortName: "Lafarge Lake",
    type: "cafe",
    slug: "lafarge-lake",
    address: "1207 Pinetree Ave, Coquitlam",
    hours: "Mon–Thu 9am–9pm · Fri–Sun 9am–10pm",
    personality:
      "Our brick-and-mortar home by Lafarge Lake. Families come for weekend treats, birthdays, and after-school rewards. Guests sit down, enjoy, and take their time.",
  },
  {
    id: "loc-mcarthurglen",
    name: "Praguery Ice Cream Truck — McArthurGlen",
    shortName: "McArthurGlen",
    type: "food_truck",
    slug: "mcarthurglen",
    address: "Between west side parking lot & Polo Ralph Lauren, 1000-7899 Templeton Station Rd, Richmond, BC V7B 0B7",
    hours: "Monday to Sunday 12pm–8pm",
    personality:
      "High-traffic outlet and tourist stop. Many guests are discovering us for the first time — keep the experience quick, impressive, and memorable.",
  },
  {
    id: "loc-seatosky",
    name: "Praguery Ice Cream Truck — Sea-to-Sky Gondola",
    shortName: "Sea-to-Sky",
    type: "food_truck",
    slug: "sea-to-sky",
    address: "36800 BC-99, Squamish, BC",
    hours: "Mon–Fri 11am–5pm · Sat–Sun 11am–6pm",
    personality:
      "Outdoor adventurers and road-trippers. Praguery is often the sweet reward after a hike or gondola ride. Wi-Fi can be thin — work the offline checklists.",
  },
  {
    id: "loc-grouse",
    name: "Praguery Ice Cream Truck — Grouse Mountain",
    shortName: "Grouse Mountain",
    type: "food_truck",
    slug: "grouse-mountain",
    address: "North Vancouver · Grouse Mountain",
    hours: "Seasonal mountain hours — confirm with the lead before open",
    personality:
      "North Vancouver mountain guests. First impressions matter — many visitors will post about this stop and may not return.",
  },
  {
    id: "loc-catering",
    name: "Praguery Catering Truck",
    shortName: "Catering",
    type: "catering_truck",
    slug: "catering",
    address: "Service area: the entire Metro Vancouver",
    hours: "By booking — food truck, gelato bar, corporate, weddings, pickup & delivery",
    personality:
      "Private events and employee appreciation. Lead with making teams feel valued — this is an experience, not a food-delivery drop-off.",
  },
];

export const roles: Role[] = [
  {
    key: "barista",
    label: "Barista / Counter",
    subtitle: "Guest greetings, drinks, and the till",
    icon: "☕",
    color: "#00BFB3",
    lightBg: "#E0F7F5",
    sortOrder: 1,
  },
  {
    key: "cake_roller",
    label: "Cake Roller",
    subtitle: "Hand-rolled chimney cakes and cones",
    icon: "🥐",
    color: "#EAAA00",
    lightBg: "#FFF8E1",
    sortOrder: 2,
  },
  {
    key: "truck_lead",
    label: "Truck Lead",
    subtitle: "Run a truck shift from open to close",
    icon: "🚚",
    color: "#0F766E",
    lightBg: "#CCFBF1",
    sortOrder: 3,
  },
  {
    key: "supervisor",
    label: "Supervisor",
    subtitle: "Coach the floor and sign off the shift",
    icon: "⭐",
    color: "#1D6A8A",
    lightBg: "#E6F2F7",
    sortOrder: 4,
  },
  {
    key: "manager",
    label: "Manager",
    subtitle: "Content, roster, and location care",
    icon: "🏠",
    color: "#7C3AED",
    lightBg: "#F3E8FF",
    sortOrder: 5,
  },
];

export const employees: Employee[] = [
  {
    id: "emp-maya",
    fullName: "Maya Chen",
    primaryLocationId: "loc-lafarge",
    roleKey: "barista",
    hiredAt: "2026-03-02",
    employmentStatus: "active",
  },
  {
    id: "emp-jordan",
    fullName: "Jordan Lee",
    primaryLocationId: "loc-mcarthurglen",
    roleKey: "cake_roller",
    hiredAt: "2026-04-14",
    employmentStatus: "active",
  },
  {
    id: "emp-sam",
    fullName: "Sam Rivera",
    primaryLocationId: "loc-seatosky",
    roleKey: "truck_lead",
    hiredAt: "2025-11-08",
    employmentStatus: "active",
  },
  {
    id: "emp-alex",
    fullName: "Alex Park",
    primaryLocationId: "loc-lafarge",
    roleKey: "supervisor",
    hiredAt: "2024-06-01",
    employmentStatus: "active",
  },
  {
    id: "emp-priya",
    fullName: "Priya Shah",
    primaryLocationId: "loc-lafarge",
    roleKey: "manager",
    hiredAt: "2023-01-15",
    employmentStatus: "active",
  },
];

export const trainingPaths: TrainingPath[] = [
  {
    id: "path-barista",
    roleKey: "barista",
    title: "Barista / Counter — new hire path",
    description:
      "Learn the brand, the till, the drinks, and how we take care of guests.",
    isNewHireDefault: true,
  },
  {
    id: "path-cake",
    roleKey: "cake_roller",
    title: "Cake Roller — new hire path",
    description:
      "From dough to golden chimney cake: safety, rolling, baking, and quality.",
    isNewHireDefault: true,
  },
  {
    id: "path-truck",
    roleKey: "truck_lead",
    title: "Truck Lead — new hire path",
    description:
      "Lead a truck like a small cafe: guests, product, and a clean close.",
    isNewHireDefault: true,
  },
  {
    id: "path-supervisor",
    roleKey: "supervisor",
    title: "Supervisor — new hire path",
    description:
      "Coach the team, sign off checklists, and keep the shift calm.",
    isNewHireDefault: true,
  },
  {
    id: "path-manager",
    roleKey: "manager",
    title: "Manager — new hire path",
    description:
      "Own the roster, the library, and the standard guests feel at every site.",
    isNewHireDefault: true,
  },
];

export const modules: Module[] = [
  {
    id: "mod-barista-welcome",
    pathId: "path-barista",
    title: "Welcome to The Praguery",
    contentType: "step_guide",
    bodyMarkdown:
      "We bake every chimney cake fresh to order and fill it with house-made ice cream and sauces. That combination — warm pastry, cold cream, house-made sauces — is our signature.",
    steps: [
      {
        title: "Our purpose",
        body: "We make life just a little bit sweeter. Use that as your test: does this guest leave happier than they arrived?",
      },
      {
        title: "Our story, in one minute",
        body: "Jaroslav saw a crepe stand in London and wanted that freedom. In Prague he found chimney cakes with ice cream. That spark became The Praguery — a local Vancouver family business, not a factory line.",
      },
      {
        title: "How to describe a chimney cake",
        body: "If a guest asks: “It’s a European pastry we bake fresh right here, just for you. Crunchy on the outside, soft on the inside, and we fill it with our house-made ice cream and sauces. It’s our specialty.”",
      },
      {
        title: "Words we use",
        body: "Say guests, not customers, when you speak about the people we serve. Say house-made, freshly baked, hand-rolled. Never say “it’s just” about our food. Nothing here is “just” anything.",
      },
    ],
    sortOrder: 1,
    isDownloadableOffline: true,
    quizId: "quiz-brand",
  },
  {
    id: "mod-barista-basics",
    pathId: "path-barista",
    title: "Cafe basics and hygiene",
    contentType: "step_guide",
    bodyMarkdown:
      "Count on me. Don’t cut corners. Those values show up in how we wash our hands, label food, and put tools back.",
    steps: [
      {
        title: "Walk the floor",
        body: "Know production, cashier, serving, and storage. If you cannot find something in ten seconds, ask — never guess with food.",
      },
      {
        title: "Hands and hair",
        body: "Wash hands every time you come in from outside, after eating, after touching hair, and after blowing your nose. Hair tied back. Gloves when serving food. Apron off on breaks.",
      },
      {
        title: "House rules",
        body: "No personal food on the grill. Label everything. Return equipment to its spot. Do not move timers. Your initials on a checklist mean you did the step — never pre-tick.",
      },
      {
        title: "If something breaks",
        body: "Stop, keep guests safe, and tell a supervisor right away. Locate the first aid kit on day one.",
      },
    ],
    sortOrder: 2,
    prerequisiteModuleId: "mod-barista-welcome",
    isDownloadableOffline: true,
  },
  {
    id: "mod-barista-pos",
    pathId: "path-barista",
    title: "Greeting guests and the till",
    contentType: "step_guide",
    bodyMarkdown:
      "The first words set the tone. Warm and relaxed — like a friendly neighbour — then accurate on the order.",
    steps: [
      {
        title: "The greeting",
        body: "“Hello, how are you? What can I get for you?” No slang. Repeat the order back before payment.",
      },
      {
        title: "Square basics",
        body: "Log in and out with your trainer. Practice modifiers, 50/50 split, gift cards, and refunds (same method, name, reason). Sanitize hands after every cash transaction.",
      },
      {
        title: "Wait times",
        body: "Chimney cake about 7 minutes. Cone about 5 minutes. If something is sold out, tell the guest and tell the whole line so nobody promises it again.",
      },
      {
        title: "Loyalty",
        body: "Invite guests onto the loyalty program like a neighbour sharing a tip — never like a script you have to finish.",
      },
    ],
    sortOrder: 3,
    prerequisiteModuleId: "mod-barista-basics",
    isDownloadableOffline: true,
  },
  {
    id: "mod-barista-drinks",
    pathId: "path-barista",
    title: "The board: cones, drinks, espresso",
    contentType: "step_guide",
    bodyMarkdown:
      "The truck window is a chalkboard. Vanilla soft serve in freshly baked cinnamon cones. Premium cones wear the teal badge. Build what the photo promises.",
    steps: [
      {
        title: "Premium cones",
        body: "Salted Caramel Pecan, Strawberry Cheesecake, Pistachio, and Chocolate Brownie. House-made sauces. Pistachio is pistachio sauce and nuts — say that clearly for allergies.",
      },
      {
        title: "Mango Tango and Lemon Crumble",
        body: "Mango coulis, toasted coconut, dried mango. Lemon sauce and graham crackers. Same cone craft. No “just a cone.”",
      },
      {
        title: "Drinks on the truck",
        body: "Real fruit lemonade — freshly squeezed. Affogato — vanilla soft serve and a double shot of espresso. Classic Italian espresso blend: double espresso, cappuccino, Americano, latte, Praguery Latte with vanilla and whipped cream.",
      },
      {
        title: "Cafe extra (Lafarge Lake)",
        body: "If you are on cafe, also know matcha, hot chocolate, and seasonal drinks from the drink SOP. The truck board is the guest’s first photo. Match it.",
      },
    ],
    sortOrder: 4,
    prerequisiteModuleId: "mod-barista-pos",
    isDownloadableOffline: true,
  },
  {
    id: "mod-barista-service",
    pathId: "path-barista",
    title: "Guest care when things go wrong",
    contentType: "scenario",
    bodyMarkdown:
      "Empathy first. We never argue in public. We make it right, then we learn.",
    steps: [
      {
        title: "Zero Risk",
        body: "Listen. Apologize. Assess. Take responsibility. Offer a solution. Act quickly. Then tell a supervisor so the location can learn.",
      },
      {
        title: "What it sounds like",
        body: "“We’re really sorry to hear that — that’s not the experience we want for you. Let us make it right.” Then move to a private conversation if you are on social, or step aside on the floor.",
      },
      {
        title: "Allergies",
        body: "Always ask: preference, or allergy? If it is an allergy, do not guess. Use the allergen matrix. If cross-contact is a risk, say so clearly.",
      },
      {
        title: "Practice",
        body: "Role-play with your trainer: an upset guest, a sold-out chimney cake, and a rainy-day line. Warm voice. No discount language. Special offer only if a supervisor approves.",
      },
    ],
    sortOrder: 5,
    prerequisiteModuleId: "mod-barista-drinks",
    isDownloadableOffline: true,
    quizId: "quiz-service",
  },
  {
    id: "mod-cake-safety",
    pathId: "path-cake",
    title: "Production safety and the craft",
    contentType: "step_guide",
    bodyMarkdown:
      "The grill is hot. The mixer is strong. The pastry is hand-rolled. Safety and craft travel together.",
    steps: [
      {
        title: "Tour production",
        body: "Grill, mixer, proofing rack, prep counter, storage. Never put empty coating buckets back into full ones. Label everything.",
      },
      {
        title: "Gloves and mixer",
        body: "Gloves on when handling product. Never reuse. Never store in a pocket. Mixer: lift the cover to pause. The red button is for emergencies only.",
      },
      {
        title: "Grill",
        body: "The surface is extremely hot. Never leave product unattended on a running grill. Both knobs must match.",
      },
    ],
    sortOrder: 1,
    isDownloadableOffline: true,
  },
  {
    id: "mod-cake-dough",
    pathId: "path-cake",
    title: "Dough, scaling, and FIFO",
    contentType: "step_guide",
    bodyMarkdown:
      "Every number on the line comes from the reference document. We do not invent weights on shift.",
    steps: [
      {
        title: "Mix order",
        body: "Sanitize mixer boxes with paper towel only, then oil the bottom. Add: dough premix, water, yeast, lemon zest. Close the lid. Set the timer. Start.",
      },
      {
        title: "Temperature",
        body: "Target dough temperature is 24–26°C. If it is below 24°C, mix one more minute and check again.",
      },
      {
        title: "Scale",
        body: "960g large bun, 160g chimney, 80g cone. Four buns per box. Work fast — dough dries. Never leave it uncovered.",
      },
      {
        title: "FIFO",
        body: "First in, first out. After a one-hour proof, move boxes to Fridge #2 — older batch on top, new batch on the bottom.",
      },
    ],
    sortOrder: 2,
    prerequisiteModuleId: "mod-cake-safety",
    isDownloadableOffline: true,
  },
  {
    id: "mod-cake-roll",
    pathId: "path-cake",
    title: "Strips, rolling, and baking",
    contentType: "step_guide",
    bodyMarkdown:
      "Hand-rolled means your hands. Even rings. Closed cone bottoms. Golden, shiny sugar.",
    steps: [
      {
        title: "Cut on the white counter",
        body: "Never cut on marble. Flatten, degas, rectangle. Pizza cutter and stencil. Hands outside the cutting area.",
      },
      {
        title: "Roll",
        body: "Cone: at least 5 rings at 30°, closed bottom, even dough. Chimney: 5–6 rings at 30° — do not flatten the wide top. Brush a little oil. One sugar layer only.",
      },
      {
        title: "Bake",
        body: "Chimney 5:30–6 min. Cone 4:30–5 min. Bake until the outside is shiny and you see light steam. If pastry sticks to the stick, it is undercooked — discard. Never sell undercooked pastry.",
      },
      {
        title: "Coat and freshness",
        body: "Cinnamon sugar: one layer. Almond or coconut: about three layers. Compost leftover coating right away. Cone max 60 min. Chimney max 30 min.",
      },
    ],
    sortOrder: 3,
    prerequisiteModuleId: "mod-cake-dough",
    isDownloadableOffline: true,
    quizId: "quiz-production",
  },
  {
    id: "mod-truck-lead",
    pathId: "path-truck",
    title: "Leading a truck shift",
    contentType: "step_guide",
    bodyMarkdown:
      "A truck is not a smaller cafe. Space is tight, Wi-Fi can drop, and first-time guests need a clear, fast story.",
    steps: [
      {
        title: "Know your site",
        body: "McArthurGlen is discovery and speed. Sea-to-Sky is the post-hike reward. Grouse is a postcard moment. Catering is employee appreciation — lead with care, not with a pitch.",
      },
      {
        title: "Open ready",
        body: "Power, water, handwash, dough, ice cream, sauces, cash, and the opening checklist. If Wi-Fi is out, the checklist still happens — this app stores it until you reconnect.",
      },
      {
        title: "The line",
        body: "One person greets and takes money. One person rolls and bakes. Call wait times out loud. Never promise a chimney cake you cannot bake in time.",
      },
    ],
    sortOrder: 1,
    isDownloadableOffline: true,
    quizId: "quiz-truck",
  },
  {
    id: "mod-supervisor-lead",
    pathId: "path-supervisor",
    title: "Leading people, not only product",
    contentType: "step_guide",
    bodyMarkdown:
      "Freedom here belongs to people who can be counted on. Your job is to make the standard visible.",
    steps: [
      {
        title: "Sign-off is a privilege",
        body: "The person who completes a checklist is never the only verifier. You walk the floor. You look. Then you sign.",
      },
      {
        title: "Temperature twice a day",
        body: "Open and close. Write the reading, not the target. If it is out of range, write what you did and who you told.",
      },
      {
        title: "Trial shifts",
        body: "Use the scorecard. Score what you saw, not what you hoped. Hire for craft and for Count on Me.",
      },
      {
        title: "Complaints",
        body: "Every complaint is a learning opportunity. Warm public reply, private fix, then tell the manager the same day.",
      },
    ],
    sortOrder: 1,
    isDownloadableOffline: true,
    quizId: "quiz-supervisor",
  },
  {
    id: "mod-manager-cms",
    pathId: "path-manager",
    title: "Keeping the library true",
    contentType: "step_guide",
    bodyMarkdown:
      "One source per number. If two documents disagree, one is superseded the same day.",
    steps: [
      {
        title: "Author here",
        body: "Checklists, quizzes, and SOPs live in this app. Google Drive is no longer the source of truth.",
      },
      {
        title: "Versioning",
        body: "Every change gets a version and an effective date. After an incident we must know what staff actually saw that day.",
      },
      {
        title: "Voice",
        body: "Training copy stays warm. Milestone copy can celebrate. Never minimize the craft. Never put prices on guest-facing training screenshots.",
      },
    ],
    sortOrder: 1,
    isDownloadableOffline: true,
    quizId: "quiz-manager",
  },
];

export const quizzes: Quiz[] = [
  {
    id: "quiz-brand",
    moduleId: "mod-barista-welcome",
    title: "Brand & chimney cake",
    passThresholdPct: 80,
    questions: [
      {
        id: "q-brand-1",
        prompt: "A guest asks what a chimney cake is. What do you say?",
        questionType: "scenario",
        sortOrder: 1,
        options: [
          {
            id: "a",
            label:
              "It’s a European pastry we bake fresh right here, just for you — crunchy outside, soft inside, filled with house-made ice cream and sauces.",
            isCorrect: true,
          },
          {
            id: "b",
            label: "It’s just a cone with ice cream.",
            isCorrect: false,
          },
          {
            id: "c",
            label: "It’s like a churro from a factory.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-brand-2",
        prompt: "Which words match The Praguery voice?",
        questionType: "multiple_choice",
        sortOrder: 2,
        options: [
          {
            id: "a",
            label: "House-made, freshly baked, hand-rolled, guests",
            isCorrect: true,
          },
          {
            id: "b",
            label: "Cheap, discount, fast food, customers",
            isCorrect: false,
          },
          {
            id: "c",
            label: "Store-bought, processed, chain",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-brand-3",
        prompt: "What is our purpose line?",
        questionType: "multiple_choice",
        sortOrder: 3,
        options: [
          {
            id: "a",
            label: "Make life just a little bit sweeter",
            isCorrect: true,
          },
          {
            id: "b",
            label: "Sell more dessert than anyone in the mall",
            isCorrect: false,
          },
          {
            id: "c",
            label: "Be the cheapest treat on the block",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-brand-4",
        prompt: "Who are we, in one line?",
        questionType: "multiple_choice",
        sortOrder: 4,
        options: [
          {
            id: "a",
            label:
              "A local Vancouver family business famous for hand-rolled chimney cakes filled with ice cream",
            isCorrect: true,
          },
          {
            id: "b",
            label: "A franchise chain pumping product from a central kitchen",
            isCorrect: false,
          },
          {
            id: "c",
            label: "A frozen yogurt shop",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-brand-5",
        prompt: "A rainy Wednesday Instagram caption should sound like:",
        questionType: "scenario",
        sortOrder: 5,
        options: [
          {
            id: "a",
            label:
              "Rainy Wednesday? We’ve got something warm, sweet, and freshly baked waiting for you. Come say hi.",
            isCorrect: true,
          },
          {
            id: "b",
            label: "50% OFF ALL CAKES TODAY ONLY",
            isCorrect: false,
          },
          {
            id: "c",
            label: "We’re slower than usual, sorry you came.",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    id: "quiz-service",
    moduleId: "mod-barista-service",
    title: "Guest care",
    passThresholdPct: 80,
    questions: [
      {
        id: "q-svc-1",
        prompt: "A guest is unhappy with a melted ice cream. What first?",
        questionType: "scenario",
        sortOrder: 1,
        options: [
          {
            id: "a",
            label:
              "“We’re really sorry — that’s not the experience we want for you. Let us make it right.”",
            isCorrect: true,
          },
          {
            id: "b",
            label: "Explain why they are wrong.",
            isCorrect: false,
          },
          {
            id: "c",
            label: "Ignore it and keep the line moving.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-svc-2",
        prompt: "Allergy vs preference — what do you do?",
        questionType: "multiple_choice",
        sortOrder: 2,
        options: [
          {
            id: "a",
            label: "Ask which it is. If allergy, use the matrix and speak clearly about cross-contact.",
            isCorrect: true,
          },
          {
            id: "b",
            label: "Leave off nuts and hope.",
            isCorrect: false,
          },
          {
            id: "c",
            label: "Tell them we cannot help anyone with allergies.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-svc-3",
        prompt: "Chimney cakes are sold out. You should:",
        questionType: "multiple_choice",
        sortOrder: 3,
        options: [
          {
            id: "a",
            label: "Tell the guest and tell the whole line so nobody promises one.",
            isCorrect: true,
          },
          {
            id: "b",
            label: "Keep taking chimney cake orders to avoid disappointing people.",
            isCorrect: false,
          },
          {
            id: "c",
            label: "Say nothing and let the baker deal with it.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-svc-4",
        prompt: "On social, after a public complaint, next step is:",
        questionType: "multiple_choice",
        sortOrder: 4,
        options: [
          {
            id: "a",
            label: "Warm public apology, then move to DMs, then tell the location manager.",
            isCorrect: true,
          },
          {
            id: "b",
            label: "Delete the comment.",
            isCorrect: false,
          },
          {
            id: "c",
            label: "Argue the facts in the thread.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-svc-5",
        prompt: "Freshness rule for a chimney cake after baking:",
        questionType: "multiple_choice",
        sortOrder: 5,
        options: [
          { id: "a", label: "30 minutes, then it is no longer served", isCorrect: true },
          { id: "b", label: "All day if it looks fine", isCorrect: false },
          { id: "c", label: "Until the truck closes", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "quiz-production",
    moduleId: "mod-cake-roll",
    title: "Dough and bake",
    passThresholdPct: 80,
    questions: [
      {
        id: "q-prod-1",
        prompt: "Target dough temperature after mixing?",
        questionType: "multiple_choice",
        sortOrder: 1,
        options: [
          { id: "a", label: "24–26°C", isCorrect: true },
          { id: "b", label: "18°C", isCorrect: false },
          { id: "c", label: "35°C", isCorrect: false },
        ],
      },
      {
        id: "q-prod-2",
        prompt: "Chimney cake dough weight?",
        questionType: "multiple_choice",
        sortOrder: 2,
        options: [
          { id: "a", label: "160g", isCorrect: true },
          { id: "b", label: "80g", isCorrect: false },
          { id: "c", label: "960g", isCorrect: false },
        ],
      },
      {
        id: "q-prod-3",
        prompt: "Pastry sticks to the stick. You:",
        questionType: "scenario",
        sortOrder: 3,
        options: [
          {
            id: "a",
            label: "Discard it. It is undercooked. Never sell it.",
            isCorrect: true,
          },
          {
            id: "b",
            label: "Scrape it off and serve with extra sauce.",
            isCorrect: false,
          },
          {
            id: "c",
            label: "Give it to staff as a “just a leftover.”",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-prod-4",
        prompt: "How many cinnamon-sugar coating layers?",
        questionType: "multiple_choice",
        sortOrder: 4,
        options: [
          { id: "a", label: "One layer only", isCorrect: true },
          { id: "b", label: "Keep coating until it looks heavy", isCorrect: false },
          { id: "c", label: "None — sugar is optional", isCorrect: false },
        ],
      },
      {
        id: "q-prod-5",
        prompt: "Both grill knobs should:",
        questionType: "multiple_choice",
        sortOrder: 5,
        options: [
          { id: "a", label: "Always match", isCorrect: true },
          { id: "b", label: "Be set at random for speed", isCorrect: false },
          { id: "c", label: "Stay on the highest setting all day", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "quiz-truck",
    moduleId: "mod-truck-lead",
    title: "Truck leadership",
    passThresholdPct: 80,
    questions: [
      {
        id: "q-trk-1",
        prompt: "Wi-Fi drops at Sea-to-Sky. Opening checklist?",
        questionType: "scenario",
        sortOrder: 1,
        options: [
          {
            id: "a",
            label: "Complete it in the app. It saves on the iPad and syncs later.",
            isCorrect: true,
          },
          {
            id: "b",
            label: "Skip it until you have signal.",
            isCorrect: false,
          },
          {
            id: "c",
            label: "Text HQ instead of recording the work.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-trk-2",
        prompt: "McArthurGlen guests are often:",
        questionType: "multiple_choice",
        sortOrder: 2,
        options: [
          {
            id: "a",
            label: "First-time visitors who need a clear, fast, memorable experience",
            isCorrect: true,
          },
          {
            id: "b",
            label: "Regulars who already know the dough formula",
            isCorrect: false,
          },
          {
            id: "c",
            label: "Only catering clients",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-trk-3",
        prompt: "Catering bookings are mostly:",
        questionType: "multiple_choice",
        sortOrder: 3,
        options: [
          {
            id: "a",
            label: "Employee appreciation — make teams feel valued",
            isCorrect: true,
          },
          {
            id: "b",
            label: "Late-night club service",
            isCorrect: false,
          },
          {
            id: "c",
            label: "Grocery wholesale",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    id: "quiz-supervisor",
    moduleId: "mod-supervisor-lead",
    title: "Supervisor standards",
    passThresholdPct: 80,
    questions: [
      {
        id: "q-sup-1",
        prompt: "Who verifies a closing checklist?",
        questionType: "multiple_choice",
        sortOrder: 1,
        options: [
          {
            id: "a",
            label: "A shift lead or manager who is not the person who completed it",
            isCorrect: true,
          },
          {
            id: "b",
            label: "The same person, twice",
            isCorrect: false,
          },
          {
            id: "c",
            label: "Nobody if the shift was busy",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-sup-2",
        prompt: "Temperature log entries should record:",
        questionType: "multiple_choice",
        sortOrder: 2,
        options: [
          {
            id: "a",
            label: "The actual reading, and the action if it is out of range",
            isCorrect: true,
          },
          {
            id: "b",
            label: "The target number so the sheet looks clean",
            isCorrect: false,
          },
          {
            id: "c",
            label: "A tick mark only",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-sup-3",
        prompt: "A trial-shift scorecard should reflect:",
        questionType: "multiple_choice",
        sortOrder: 3,
        options: [
          {
            id: "a",
            label: "What you observed on that shift, including craft and Count on Me",
            isCorrect: true,
          },
          {
            id: "b",
            label: "Whether you personally like the candidate",
            isCorrect: false,
          },
          {
            id: "c",
            label: "Whoever showed up first",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    id: "quiz-manager",
    moduleId: "mod-manager-cms",
    title: "Library governance",
    passThresholdPct: 80,
    questions: [
      {
        id: "q-mgr-1",
        prompt: "If two documents list different dough weights:",
        questionType: "multiple_choice",
        sortOrder: 1,
        options: [
          {
            id: "a",
            label: "Keep one source. Mark the other SUPERSEDED the same day.",
            isCorrect: true,
          },
          {
            id: "b",
            label: "Leave both “for now.”",
            isCorrect: false,
          },
          {
            id: "c",
            label: "Let each truck pick a favourite.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q-mgr-2",
        prompt: "Where should a manager fix a typo in a closing checklist?",
        questionType: "multiple_choice",
        sortOrder: 2,
        options: [
          {
            id: "a",
            label: "In the Academy admin CMS, with a new version and date",
            isCorrect: true,
          },
          {
            id: "b",
            label: "In a personal Google Doc",
            isCorrect: false,
          },
          {
            id: "c",
            label: "On a sticky note on the iPad",
            isCorrect: false,
          },
        ],
      },
    ],
  },
];

const cafeOpeningItems = [
  "Walk the floor: chairs, tables, and guest path are clean and safe",
  "Handwash station stocked: soap, paper towel, and hot water",
  "Fridge and freezer temperatures recorded at open (actual reading)",
  "Espresso machine startup and group-head wipe — photo of the clean group head",
  "Ice cream cabinet wiped; house-made sauces labelled with date",
  "Dough and pastry plan for the first two hours is on the board",
  "Till counted and Square logged in",
  "First aid kit location confirmed",
];

const cafeClosingItems = [
  "Last chimney cakes and cones past freshness window are composted — never stored",
  "Grill off, knobs matching, surface cleaned",
  "Conti shutdown and group-head clean — photo of the cleaned group head",
  "Fridge and freezer temperatures recorded at close",
  "All checklists initialled; nothing pre-ticked",
  "Cash reconciled; discrepancy noted if any",
  "Lights, water, and doors checked",
  "Shift notes left for the morning team",
];

const truckOpeningItems = [
  "Truck level, power, and water confirmed",
  "Handwash station ready before any food work",
  "Fridge temperatures recorded (actual reading)",
  "Dough, ice cream, and house-made sauces dated and FIFO",
  "Service window glass clean; menu without prices facing guests as trained",
  "iPad on Academy, offline banner checked so you know the state of sync",
];

const truckClosingItems = [
  "Product past freshness window composted",
  "Grill and rollers cleaned; never leave sugar burned on overnight",
  "Temperatures recorded at close",
  "Cash and Square closed",
  "Grey water and trash handled per site rules",
  "Truck locked; keys with the named closer",
];

function itemsFrom(prefix: string, labels: string[], photoIndex?: number): ChecklistTemplate["items"] {
  return labels.map((label, index) => ({
    id: `${prefix}-${index + 1}`,
    label,
    requiresPhoto: photoIndex === index,
    sortOrder: index + 1,
  }));
}

const fridgeTemps = [
  { id: "fridge", label: "Fridge temperature", range: "Quote CORE-SAFE-R002" },
  { id: "freezer", label: "Freezer temperature", range: "Quote CORE-SAFE-R002" },
];

export const checklistTemplates: ChecklistTemplate[] = [
  {
    id: "chk-cafe-opening",
    type: "opening",
    title: "Cafe morning opening",
    documentNumber: "CAFE-OPEN-C001",
    appliesTo: "Cafe — Lafarge Lake",
    roles: "Completes: Barista / Cake Roller. Verifies: Supervisor or Manager (never the same person).",
    owner: "Cafe manager",
    retention: "Food safety records: 12 months, filed by location and month — never in the training library.",
    relatedSops: ["CORE-OPEN-S001", "CORE-SAFE-R002"],
    locationType: "cafe",
    cadence: "daily",
    version: 1,
    effectiveDate: "2026-09-01",
    items: itemsFrom("cafe-open", cafeOpeningItems, 3),
    measurements: fridgeTemps,
  },
  {
    id: "chk-cafe-closing",
    type: "closing",
    title: "Cafe evening closing",
    documentNumber: "CAFE-CLOSE-C001",
    appliesTo: "Cafe — Lafarge Lake",
    roles: "Completes: closing staff. Verifies: Supervisor or Manager (never the same person).",
    owner: "Cafe manager",
    retention: "Food safety records: 12 months, filed by location and month.",
    relatedSops: ["CORE-CLOSE-S001", "CORE-SAFE-R002"],
    locationType: "cafe",
    cadence: "daily",
    version: 1,
    effectiveDate: "2026-09-01",
    items: itemsFrom("cafe-close", cafeClosingItems, 2),
    measurements: fridgeTemps,
  },
  {
    id: "chk-cafe-preclose",
    type: "pre-close",
    title: "Cafe pre-close",
    documentNumber: "CAFE-CLOSE-C002",
    appliesTo: "Cafe — Lafarge Lake",
    roles: "Completes: floor staff. Verifies: shift lead.",
    owner: "Cafe manager",
    retention: "12 months with shift records.",
    relatedSops: ["CAFE-CLOSE-S002"],
    locationType: "cafe",
    cadence: "per_shift",
    version: 1,
    effectiveDate: "2026-09-01",
    items: itemsFrom("cafe-pre", [
      "Start pre-close 30–45 minutes before close",
      "Restock sauces, cups, and spoons without blocking guests",
      "Sweep guest path; keep the line looking cared for",
      "Confirm remaining dough vs last-hour demand",
    ]),
    measurements: [],
  },
  {
    id: "chk-cafe-clean",
    type: "cleaning",
    title: "Cafe weekly deep clean",
    documentNumber: "CAFE-CLEAN-C001",
    appliesTo: "Cafe — Lafarge Lake",
    roles: "Completes: assigned closer. Verifies: Supervisor.",
    owner: "Cafe manager",
    retention: "12 months.",
    relatedSops: ["CORE-CLOSE-S001"],
    locationType: "cafe",
    cadence: "weekly",
    version: 1,
    effectiveDate: "2026-09-01",
    items: itemsFrom("cafe-clean", [
      "Pull and clean behind espresso machine",
      "Sanitize mixer boxes with paper towel only",
      "Check coating buckets — never pour leftovers back into full buckets",
      "Wipe storage shelves and check labels",
    ]),
    measurements: [],
  },
  {
    id: "chk-truck-opening",
    type: "opening",
    title: "Truck opening",
    documentNumber: "TRLR-OPEN-C001",
    appliesTo: "Food trucks — McArthurGlen, Sea-to-Sky, Grouse Mountain",
    roles: "Completes: Truck Lead or opener. Verifies: Supervisor (never the same person).",
    owner: "Operations manager",
    retention: "Food safety records: 12 months, filed by truck and month.",
    relatedSops: ["CORE-OPEN-S001", "CORE-SAFE-R002"],
    locationType: "food_truck",
    cadence: "daily",
    version: 1,
    effectiveDate: "2026-09-01",
    items: itemsFrom("trk-open", truckOpeningItems, 1),
    measurements: [{ id: "fridge", label: "Fridge temperature", range: "Quote CORE-SAFE-R002" }],
  },
  {
    id: "chk-truck-closing",
    type: "closing",
    title: "Truck closing",
    documentNumber: "TRLR-CLOSE-C001",
    appliesTo: "Food trucks — McArthurGlen, Sea-to-Sky, Grouse Mountain",
    roles: "Completes: named closer. Verifies: Supervisor (never the same person).",
    owner: "Operations manager",
    retention: "Food safety records: 12 months.",
    relatedSops: ["CORE-CLOSE-S001", "CORE-SAFE-R002"],
    locationType: "food_truck",
    cadence: "daily",
    version: 1,
    effectiveDate: "2026-09-01",
    items: itemsFrom("trk-close", truckClosingItems),
    measurements: [{ id: "fridge", label: "Fridge temperature", range: "Quote CORE-SAFE-R002" }],
  },
  {
    id: "chk-truck-clean",
    type: "cleaning",
    title: "Truck cleaning",
    documentNumber: "TRLR-CLEAN-C001",
    appliesTo: "Food trucks",
    roles: "Completes: closer. Verifies: Truck Lead or Supervisor.",
    owner: "Operations manager",
    retention: "12 months.",
    relatedSops: ["CORE-CLOSE-S001"],
    locationType: "food_truck",
    cadence: "daily",
    version: 1,
    effectiveDate: "2026-09-01",
    items: itemsFrom("trk-clean", [
      "Service window and handles sanitized",
      "Floor swept and degreased as needed",
      "Handwash restocked for the next opener",
      "Photo of the cleaned handwash sink",
    ], 3),
    measurements: [],
  },
  {
    id: "chk-cater-opening",
    type: "opening",
    title: "Catering truck event open",
    documentNumber: "TRLR-OPEN-C002",
    appliesTo: "Catering truck — Metro Vancouver",
    roles: "Completes: event lead. Verifies: Manager.",
    owner: "Catering manager",
    retention: "12 months with the event file.",
    relatedSops: ["CORE-OPEN-S001"],
    locationType: "catering_truck",
    cadence: "per_shift",
    version: 1,
    effectiveDate: "2026-09-01",
    items: itemsFrom("cat-open", [
      "Confirm event host name and headcount",
      "Set the truck as an experience, not a drop-off table",
      "Handwash and temperatures recorded before service",
      "Brief the team: employee appreciation tone, no price talk with guests",
    ]),
    measurements: [{ id: "fridge", label: "Fridge temperature", range: "Quote CORE-SAFE-R002" }],
  },
];

export const sopDocuments: SopDocument[] = [
  {
    id: "sop-opening",
    category: "Daily Operations",
    title: "Morning opening — how to run the checklist",
    summary: "A checklist records the work. This SOP teaches the method.",
    documentNumber: "CORE-OPEN-S001",
    version: 1,
    effectiveDate: "2026-09-01",
    bodyMarkdown: `## What this is for
Use this when you open a Praguery Cafe or Praguery Ice Cream Truck. The checklist is the record. This page is the method.

## Before food
1. Handwash first.
2. Record fridge temperatures as actual numbers.
3. If a reading is out of range, write the action and who you told. Empty exception boxes are not allowed — write “none” if there were none.

## Guest path
Walk the floor the way a family would walk it. Chairs, spills, sandwich boards, and the first thing a guest sees.

## Related
- CAFE-OPEN-C001 Cafe morning opening
- TRLR-OPEN-C001 Truck opening`,
  },
  {
    id: "sop-checklist-record",
    category: "Daily Operations",
    title: "How to complete a checklist (record, not a lesson)",
    summary:
      "A checklist is a dated record. Teach from SOPs. Never pre-tick. Write actual readings. If nothing went wrong, write none.",
    documentNumber: "CORE-OPS-R010",
    version: 1,
    effectiveDate: "2026-09-01",
    bodyMarkdown: `## What a checklist is
A checklist is a **record of work done on a date**. It is not a lesson. Teach from the SOP with the matching number. One source of truth per document number.

## Header (every run)
Location, date, shift or time, who completed it. Initial each line **as you complete it**. Never pre-tick a line you have not done.

## Measurements
Write the **actual** reading (for example fridge °C). Do not copy the target range onto the record. The range lives on CORE-SAFE-R002.

## Exceptions
Empty boxes are not allowed. If nothing went wrong, write **none**. If something did, write what happened and who you told.

## Verification
The person who completes the list cannot verify it. A supervisor or manager signs after a real look.

## Filing
Food safety records stay **12 months**, filed by location and month. They do not live in the training library.

## Numbering
Checklists use \`SCOPE-AREA-CNNN\` (example CAFE-CLOSE-C001). Lookup documents use \`SCOPE-AREA-RNNN\`. SOPs use \`SCOPE-AREA-SNNN\`.`,
  },
  {
    id: "sop-closing",
    category: "Daily Operations",
    title: "Evening closing",
    summary: "Close with the same care we bake with.",
    documentNumber: "CORE-CLOSE-S001",
    version: 1,
    effectiveDate: "2026-09-01",
    bodyMarkdown: `## Freshness
Compost pastry that is past the window. Cone 60 minutes. Chimney cake 30 minutes. We do not save “pretty much fine” product overnight.

## Machines
Grill knobs match and are off. Espresso group head cleaned. Photo proof when the checklist asks.

## Verification
The closer completes. A supervisor or manager verifies. Never the same person.`,
  },
  {
    id: "sop-preclose",
    category: "Daily Operations",
    title: "Pre-close tasks",
    summary: "Start 30–45 minutes before close without rushing guests.",
    documentNumber: "CAFE-CLOSE-S002",
    version: 1,
    effectiveDate: "2026-09-01",
    locationId: "loc-lafarge",
    bodyMarkdown: `Pre-close is quiet care, not a shutdown in front of guests. Restock, sweep, and plan the last bake so nobody is promised a chimney cake you cannot finish well.`,
  },
  {
    id: "sop-allergens",
    category: "Food Safety",
    title: "Allergen matrix",
    summary: "Ask preference vs allergy. This table is the source of truth.",
    documentNumber: "CORE-SAFE-R001",
    version: 1,
    effectiveDate: "2026-09-01",
    bodyMarkdown: `## How to use
If a guest names an allergy, stop and read this table. Do not guess. If cross-contact is possible, say so.

| Product | Contains | May contain |
| --- | --- | --- |
| Chimney cake dough | Wheat, milk, egg | Tree nuts (shared coating area) |
| Cinnamon sugar coating | — | Tree nuts |
| Almond coating | Tree nuts (almond) | Other nuts |
| Coconut coating | Coconut | Tree nuts |
| Dairy gelato (Vanilla Bean, Chocolate, Tiramisu, Caramel) | Milk | Egg, nuts depending on flavour |
| Chocolate Nutella Brownies | Milk, wheat, hazelnut | Other nuts |
| Pistachio | Tree nuts (pistachio), milk | Other nuts |
| Strawberry Cheesecake | Milk, wheat | Egg |
| House-made chocolate / caramel sauces | Milk | Soy |
| House-made strawberry / mango sauces | — | — |
| Vegan sorbets (Raspberry, Mango) | — | Milk (shared scoop area unless specified) |

Review this document every 3 months. Any menu change is a major version the same day.`,
  },
  {
    id: "sop-shelf",
    category: "Food Safety",
    title: "Shelf life — toppings and product",
    summary: "Every number lives here. Checklists quote this page.",
    documentNumber: "CORE-SAFE-R002",
    version: 1,
    effectiveDate: "2026-09-01",
    bodyMarkdown: `## Source of truth
Change a number here, then check every checklist the same day.

| Item | Window | Notes |
| --- | --- | --- |
| Chimney cake after bake | 30 minutes | Compost after. Never serve. |
| Cone after bake | 60 minutes | Compost after. |
| House-made strawberry sauce | 3 days refrigerated | Label the date you made it. |
| House-made chocolate sauce | 5 days refrigerated | |
| House-made caramel sauce | 5 days refrigerated | |
| Whipped cream | Same day | Follow the posted recipe. |
| Open dairy gelato pan | Per cabinet log | FIFO. |
| Dough after mix | Follow Fridge #2 FIFO | Cover at all times. |`,
  },
  {
    id: "sop-drinks",
    category: "Recipes",
    title: "Drink recipes — core menu",
    summary: "Follow the card. Do not freestyle a guest’s cup.",
    documentNumber: "CAFE-PROD-R010",
    version: 1,
    effectiveDate: "2026-09-01",
    locationId: "loc-lafarge",
    bodyMarkdown: `## Espresso drinks
Americano, Latte, Cappuccino, Flat White, Vanilla Latte, Honey Latte, Caramel Macchiato, Mocha.

## Also know
Hot chocolate (Classic, Ferrero, Orange, Marshmallow), matcha (Latte, Vanilla, Iced Strawberry), iced shaken mocha, iced strawberry latte, iced strawberry lemonade, Chai Latte, London Fog, Birthday Cake Latte.

Steam milk to the texture the drink needs. Clean the group head like it is part of the recipe.`,
  },
  {
    id: "sop-icecream",
    category: "Recipes",
    title: "The board — cones, sauces, espresso",
    summary: "What guests point at on the truck window.",
    documentNumber: "TRLR-PROD-R003",
    version: 2,
    effectiveDate: "2026-09-01",
    bodyMarkdown: `## Vanilla soft serve in freshly baked cinnamon cones
Premium: Salted Caramel Pecan, Strawberry Cheesecake, Pistachio, Chocolate Brownie.
Also on the board: Mango Tango, Lemon Crumble. Cup instead of cone when asked.

## Drinks
Real fruit lemonade (freshly squeezed). Affogato. Classic Italian espresso blend — double espresso, cappuccino, Americano, latte, Praguery Latte.

## Take-home
Cinnamon cone, coconut cone, cone box with whipped cream and a house-made dip. Ice cream is not included unless added.

## Dips
Mango, salted caramel, strawberry, lemon, chocolate.

## Allergy
Milk, eggs, wheat, peanuts, tree nuts — cross-contact is possible. Ask, then build.

Never describe this as “just ice cream.” Never put prices on a guest photo.`,
  },
  {
    id: "sop-jobs",
    category: "Team & Management",
    title: "Job responsibilities",
    summary: "Barista / Counter, Cake Roller, Truck Lead, Supervisor.",
    documentNumber: "CORE-ADMIN-S010",
    version: 1,
    effectiveDate: "2026-09-01",
    bodyMarkdown: `## Barista / Counter
Greet, take payment, make drinks, keep the guest path kind.

## Cake Roller
Dough through bake. Quality is the product. Never sell undercooked pastry.

## Truck Lead
Own the truck shift. Offline checklists still count.

## Supervisor
Coach, verify, escalate. Sign-off is looking, not hoping.`,
  },
  {
    id: "sop-manager",
    category: "Team & Management",
    title: "Manager responsibilities",
    summary: "Scheduling, discipline, inventory, operations.",
    documentNumber: "CORE-ADMIN-S011",
    version: 1,
    effectiveDate: "2026-09-01",
    bodyMarkdown: `Schedule with a two-week lens. Inventory sits 10–20% above a week of expected use. Progressive discipline: verbal, written, then termination. Brand copy in this app follows the Brand Book. Franchise partners get the same standard, not a lighter one.`,
  },
  {
    id: "sop-trainer",
    category: "Team & Management",
    title: "Trainer lesson plan",
    summary: "Walk new hires through the path, then the quiz, then the floor.",
    documentNumber: "CORE-ADMIN-S012",
    version: 1,
    effectiveDate: "2026-09-01",
    bodyMarkdown: `1. Brand and chimney cake language until they can say it without a card.
2. Hygiene and allergens.
3. Role modules in order — do not skip a lock.
4. Side-by-side shift.
5. Quiz at 80% or higher.
6. Sign-off only when you would let them serve your own family.`,
  },
  {
    id: "sop-trial",
    category: "Team & Management",
    title: "Trial shift SOP",
    summary: "Score what you saw. Hire for craft and Count on Me.",
    documentNumber: "CORE-ADMIN-S013",
    version: 1,
    effectiveDate: "2026-09-01",
    bodyMarkdown: `Use the supervisor scorecard. Categories: punctuality, hygiene, guest warmth, following a recipe, asking for help, and pace.

Recommend hire, a second shift, or a pass. Write notes a future manager can read. Do not invent a private scale.`,
  },
];

export const announcements = [
  {
    id: "ann-pistachio",
    title: "Pistachio is a Premium cone",
    body: "House-made pistachio sauce and pistachios. If a guest has a tree-nut allergy, stop and use the matrix — do not guess.",
  },
  {
    id: "ann-seatosky",
    title: "Sea-to-Sky is the post-hike reward",
    body: "Many guests found us on Maps after the gondola. First bite has to look like the photo. Wi-Fi can drop — checklists still save.",
  },
];

export function roleByKey(key: RoleKey) {
  return roles.find((role) => role.key === key);
}

export function locationById(id: string) {
  return locations.find((location) => location.id === id);
}

export function locationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}

export function employeeById(id: string) {
  return employees.find((employee) => employee.id === id);
}

export function pathForRole(roleKey: RoleKey) {
  return trainingPaths.find((path) => path.roleKey === roleKey);
}

export function modulesForPath(pathId: string) {
  return modules
    .filter((module) => module.pathId === pathId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function quizById(id: string) {
  return quizzes.find((quiz) => quiz.id === id);
}

export function moduleById(id: string) {
  return modules.find((module) => module.id === id);
}

export function sopById(id: string) {
  return sopDocuments.find((doc) => doc.id === id);
}

export function checklistsForLocation(location: Location) {
  return checklistTemplates.filter(
    (template) =>
      template.locationType === "all" ||
      template.locationType === location.type ||
      template.locationId === location.id,
  );
}
