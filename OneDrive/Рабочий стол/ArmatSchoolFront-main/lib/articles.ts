import { getDictionarySync } from "@/lib/dictionary";
import type { Locale } from "@/context/LanguageContext";
import type { ArticleDetails, ArticleSection, ArticleTag } from "@/types/types";

const articleImages: Record<string, string> = {
  "why-teaching-children-armenian-strengthens-identity": "/images/authentic-armenia.png",
  "how-to-maintain-armenian-at-home": "/images/maintain-armenian-at-home.jpg",
  "eastern-vs-western-armenian": "/images/eastern-vs-western-armenian.jpg",
  "science-behind-bilingual-education": "/images/bilingual-education-science.jpg",
};

const articleOrder = [
  "how-to-maintain-armenian-at-home",
  "eastern-vs-western-armenian",
  "science-behind-bilingual-education",
];

const featuredSlug = "why-teaching-children-armenian-strengthens-identity";

type LocaleContent = {
  tags: ArticleTag[];
  sections: ArticleSection[];
};

type ArticleContentMap = Record<string, Record<Locale, LocaleContent>>;

const articleContent: ArticleContentMap = {};

articleContent[featuredSlug] = {
  en: {
    tags: [
      { id: "culture", label: "Armenian Culture" },
      { id: "family", label: "Family" },
      { id: "identity", label: "Identity" },
    ],
    sections: [
      {
        id: "why-it-matters",
        heading: "Why It Matters",
        paragraphs: [
          "For diaspora families, language is often the clearest link a child has to their grandparents' stories, traditions, and homeland. Losing the language can mean losing access to that history.",
          "Children who grow up speaking Armenian, even at a basic level, tend to feel a stronger sense of belonging within their extended family and community.",
        ],
      },
      {
        id: "beyond-vocabulary",
        heading: "Beyond Vocabulary",
        paragraphs: [
          "Learning Armenian isn't only about words - it opens the door to music, literature, church traditions, and humor that don't fully translate into English.",
          "Children who understand the language can participate more fully in family gatherings, holidays, and conversations with older relatives.",
        ],
      },
      {
        id: "how-armat-helps",
        heading: "How Armat Helps",
        paragraphs: [
          "Armat pairs language instruction with cultural context, so children learn not just grammar and vocabulary, but the stories and values behind them.",
        ],
      },
    ],
  },
  hy: {
    tags: [
      { id: "culture", label: "Հայկական Մշակույթ" },
      { id: "family", label: "Ընտանիք" },
      { id: "identity", label: "Ինքնություն" },
    ],
    sections: [
      {
        id: "why-it-matters",
        heading: "Ինչու է սա կարևոր",
        paragraphs: [
          "Սփյուռքի ընտանիքների համար լեզուն հաճախ ամենապարզ կապն է, որ երեխան ունի իր պապերի պատմությունների, ավանդույթների ու հայրենիքի հետ։ Լեզուն կորցնելը կարող է նշանակել այդ պատմությունից հեռանալ։",
          "Երեխաները, ովքեր մեծանում են խոսելով հայերեն, նույնիսկ հիմնական մակարդակով, հակված են ավելի ուժեղ պատկանելության զգացում ունենալ իրենց ընդլայնված ընտանիքի և համայնքի մեջ։",
        ],
      },
      {
        id: "beyond-vocabulary",
        heading: "Ավելին քան բառապաշարը",
        paragraphs: [
          "Հայերենի ուսուցումը միայն բառերի մասին չէ, այն բացում է դուռը դեպի երաժշտություն, գրականություն, եկեղեցական ավանդույթներ և հումոր, որոնք ամբողջությամբ չեն թարգմանվում այլ լեզուներով։",
          "Երեխաները, ովքեր հասկանում են լեզուն, կարող են ավելի լիարժեք մասնակցել ընտանեկան հավաքներին, տոներին և ավագ ազգականների հետ խոսակցություններին։",
        ],
      },
      {
        id: "how-armat-helps",
        heading: "Ինչպես է Armat-ն օգնում",
        paragraphs: [
          "Armat-ը լեզվի ուսուցումը զուգակցում է մշակութային համատեքստի հետ, որպեսզի երեխաները սովորեն ոչ միայն քերականություն ու բառապաշար, այլև դրանց հետևում կանգնած պատմություններն ու արժեքները։",
        ],
      },
    ],
  },
};

articleContent["how-to-maintain-armenian-at-home"] = {
  en: {
    tags: [
      { id: "language-tips", label: "Language Tips" },
      { id: "at-home", label: "At Home" },
      { id: "beginners", label: "For Beginners" },
    ],
    sections: [
      {
        id: "daily-habits",
        heading: "Small Daily Habits",
        paragraphs: [
          "Consistency matters more than duration. Ten minutes of Armenian conversation at breakfast, or narrating a bedtime routine in Armenian, reinforces vocabulary far better than one long weekly session.",
          "Labeling household objects, counting stairs, or naming colors in Armenian throughout the day keeps the language present without feeling like homework.",
        ],
      },
      {
        id: "media-and-music",
        heading: "Media and Music",
        paragraphs: [
          "Armenian children's songs, cartoons, and audiobooks give kids exposure to natural rhythm and pronunciation outside of formal lessons.",
          "Letting your child choose a favorite Armenian song or short video helps make the language feel fun rather than obligatory.",
        ],
      },
      {
        id: "involve-the-family",
        heading: "Involve the Whole Family",
        paragraphs: [
          "Even if only one parent speaks Armenian fluently, involving grandparents, cousins, or family friends in short video calls gives children more real-world practice.",
        ],
      },
    ],
  },
  hy: {
    tags: [
      { id: "language-tips", label: "Լեզվի Խորհուրդներ" },
      { id: "at-home", label: "Տանը" },
      { id: "beginners", label: "Սկսնակների Համար" },
    ],
    sections: [
      {
        id: "daily-habits",
        heading: "Փոքր Ամենօրյա Սովորույթներ",
        paragraphs: [
          "Հետևողականությունը ավելի կարևոր է, քան տևողությունը։ Տասը րոպե հայերեն խոսակցություն նախաճաշին, կամ քնելուց առաջ ամենօրյա ընթացակարգը հայերեն նկարագրելը, ամրապնդում է բառապաշարը շատ ավելի լավ, քան մեկ երկար շաբաթական դասը։",
          "Կենցաղային իրերի պիտակավորումը, աստիճանների հաշվելը կամ գույների անվանումը հայերեն ամբողջ օրվա ընթացքում պահում է լեզուն ներկա, առանց տնային աշխատանքի զգացողության։",
        ],
      },
      {
        id: "media-and-music",
        heading: "Մեդիա և Երաժշտություն",
        paragraphs: [
          "Հայկական մանկական երգերը, մուլտֆիլմերը և աուդիոգրքերը երեխաներին ծանոթացնում են բնական ռիթմին ու արտասանությանը, պաշտոնական դասերից դուրս։",
          "Ձեր երեխային թողնել ընտրել իր սիրելի հայկական երգը կամ կարճ տեսանյութը օգնում է լեզուն զգալ որպես զվարճալի, ոչ թե պարտադիր բան։",
        ],
      },
      {
        id: "involve-the-family",
        heading: "Ներգրավեք Ամբողջ Ընտանիքը",
        paragraphs: [
          "Նույնիսկ եթե միայն մեկ ծնող է վարժ խոսում հայերեն, պապիկ-տատիկների, զարմիկների կամ ընտանեկան ընկերների ներգրավումը կարճ վիդեոզանգերում երեխաներին ավելի իրական պրակտիկա է տալիս։",
        ],
      },
    ],
  },
};

articleContent["eastern-vs-western-armenian"] = {
  en: {
    tags: [
      { id: "curriculum", label: "Curriculum" },
      { id: "armenian-culture", label: "Armenian Culture" },
      { id: "beginners", label: "For Beginners" },
    ],
    sections: [
      {
        id: "the-two-dialects",
        heading: "The Two Dialects",
        paragraphs: [
          "Armenian exists in two primary modern forms: Eastern Armenian, spoken predominantly in the Republic of Armenia and Iran, and Western Armenian, spoken by communities in the diaspora - primarily descendants of survivors of the 1915 genocide.",
          "Though mutually intelligible to a degree, the dialects differ significantly in pronunciation, some vocabulary, and subtle grammatical patterns.",
        ],
      },
      {
        id: "choosing-a-dialect",
        heading: "Choosing a Dialect",
        paragraphs: [
          "The most important factor is your family's heritage. If your roots lie in the diaspora - Lebanese, Syrian, American, or French-Armenian communities - Western Armenian connects your child to that specific cultural lineage.",
          "If your family is from Armenia itself or has strong ties there, Eastern Armenian is the natural choice. Both are beautiful, valid forms of the language.",
        ],
      },
      {
        id: "what-armat-teaches",
        heading: "What Armat Teaches",
        paragraphs: [
          "Armat School offers instruction in both dialects, with curriculum tailored to each. Our instructors are native speakers who understand the nuances of each.",
          "Upon enrollment, families are given a short conversation to identify the best dialect path for their child, ensuring lessons feel personally relevant from day one.",
        ],
      },
    ],
  },
  hy: {
    tags: [
      { id: "curriculum", label: "Ծրագիր" },
      { id: "armenian-culture", label: "Հայկական Մշակույթ" },
      { id: "beginners", label: "Սկսնակների Համար" },
    ],
    sections: [
      {
        id: "the-two-dialects",
        heading: "Երկու Բարբառները",
        paragraphs: [
          "Հայերենը գոյություն ունի երկու հիմնական ժամանակակից ձևերով. արևելահայերեն, որով հիմնականում խոսում են Հայաստանի Հանրապետությունում և Իրանում, և արևմտահայերեն, որով խոսում են սփյուռքի համայնքները, հիմնականում 1915 թ. ցեղասպանությունը վերապրածների ժառանգները։",
          "Թեև որոշակիորեն փոխըմբռնելի են, բարբառները զգալիորեն տարբերվում են արտասանությամբ, որոշ բառապաշարով և նուրբ քերականական օրինաչափություններով։",
        ],
      },
      {
        id: "choosing-a-dialect",
        heading: "Բարբառի Ընտրությունը",
        paragraphs: [
          "Ամենակարևոր գործոնը ձեր ընտանիքի ժառանգությունն է։ Եթե ձեր արմատները սփյուռքում են, լիբանանահայ, սիրիահայ, ամերիկահայ կամ ֆրանսահայ համայնքներում, արևմտահայերենը կապում է ձեր երեխային այդ կոնկրետ մշակութային ծագման հետ։",
          "Եթե ձեր ընտանիքը հենց Հայաստանից է կամ ունի ամուր կապեր այնտեղ, արևելահայերենը բնական ընտրություն է։ Երկուսն էլ լեզվի գեղեցիկ ու իրավացի ձևեր են։",
        ],
      },
      {
        id: "what-armat-teaches",
        heading: "Ինչ է Դասավանդում Armat-ը",
        paragraphs: [
          "Armat School-ն առաջարկում է ուսուցում երկու բարբառներով էլ, յուրաքանչյուրին հարմարեցված ծրագրով։ Մեր ուսուցիչները մայրենի լեզվակիրներ են, ովքեր հասկանում են յուրաքանչյուրի նրբությունները։",
          "Գրանցվելիս ընտանիքներին տրվում է կարճ զրույց, իրենց երեխայի համար լավագույն բարբառային ուղին բացահայտելու համար, ապահովելով, որ դասերը անձնական իմաստ ունենան հենց առաջին օրվանից։",
        ],
      },
    ],
  },
};

articleContent["science-behind-bilingual-education"] = {
  en: {
    tags: [
      { id: "research", label: "Research" },
      { id: "cognitive-development", label: "Cognitive Development" },
      { id: "early-childhood", label: "Early Childhood" },
    ],
    sections: [
      {
        id: "cognitive-benefits",
        heading: "Cognitive Benefits",
        paragraphs: [
          "Research consistently shows that early language exposure shapes cognitive development in lasting ways, strengthening working memory, attention control, and problem-solving skills.",
          "Bilingual children often demonstrate greater cognitive flexibility, switching between tasks and perspectives more easily than monolingual peers.",
        ],
      },
      {
        id: "the-critical-window",
        heading: "The Critical Window",
        paragraphs: [
          "The brain's capacity to acquire new sounds and grammatical structures is highest before age seven, making early exposure especially valuable.",
          "Starting later doesn't close the door on fluency, but early learners tend to develop more native-like pronunciation with less conscious effort.",
        ],
      },
      {
        id: "practical-takeaways",
        heading: "Practical Takeaways for Parents",
        paragraphs: [
          "Regular, low-pressure exposure - through conversation, songs, and stories - matters more than intensive but infrequent study sessions.",
        ],
      },
    ],
  },
  hy: {
    tags: [
      { id: "research", label: "Հետազոտություն" },
      { id: "cognitive-development", label: "Ճանաչողական Զարգացում" },
      { id: "early-childhood", label: "Վաղ Մանկություն" },
    ],
    sections: [
      {
        id: "cognitive-benefits",
        heading: "Ճանաչողական Օգուտները",
        paragraphs: [
          "Հետազոտությունները հետևողականորեն ցույց են տալիս, որ վաղ լեզվական ազդեցությունը ձևավորում է ճանաչողական զարգացումը երկարատև ձևով, ամրապնդելով աշխատանքային հիշողությունը, ուշադրության վերահսկումը և խնդիրներ լուծելու հմտությունները։",
          "Երկլեզու երեխաները հաճախ ցուցադրում են ավելի մեծ ճանաչողական ճկունություն, ավելի հեշտությամբ անցնելով առաջադրանքների ու տեսանկյունների միջև, քան միալեզու հասակակիցները։",
        ],
      },
      {
        id: "the-critical-window",
        heading: "Կրիտիկական Պատուհանը",
        paragraphs: [
          "Ուղեղի կարողությունը յուրացնելու նոր հնչյուններ և քերականական կառուցվածքներ ամենաբարձրն է մինչև յոթ տարեկանը, ինչը վաղ ազդեցությունը հատկապես արժեքավոր է դարձնում։",
          "Ուշ սկսելը չի փակում վարժության դուռը, սակայն վաղ սովորողները հակված են ձևավորել ավելի մայրենի լեզվին մոտ արտասանություն, ավելի քիչ գիտակցված ջանքով։",
        ],
      },
      {
        id: "practical-takeaways",
        heading: "Գործնական Խորհուրդներ Ծնողների Համար",
        paragraphs: [
          "Կանոնավոր, ցածր ճնշման ազդեցությունը, խոսակցության, երգերի և հեքիաթների միջոցով, ավելի կարևոր է, քան ինտենսիվ, բայց հազվադեպ ուսումնական նիստերը։",
        ],
      },
    ],
  },
};

export async function getArticleBySlug(
  slug: string,
  locale: string,
): Promise<ArticleDetails | null> {
  const loc: Locale = locale === "hy" ? "hy" : "en";
  const dict = getDictionarySync(loc);
  const t = dict.blog;

  const isFeatured = slug === featuredSlug;
  if (!isFeatured && !articleOrder.includes(slug)) {
    return null;
  }

  const dictEntry = isFeatured
    ? t.sampleArticles.featured
    : t.sampleArticles.items.find((item: any) => item.slug === slug);

  if (!dictEntry) {
    return null;
  }

  const content = articleContent[slug] ? articleContent[slug][loc] : undefined;
  if (!content) {
    return null;
  }

  function getDictItem(s: string) {
    if (s === featuredSlug) {
      return t.sampleArticles.featured;
    }
    return t.sampleArticles.items.find((item: any) => item.slug === s);
  }

  let previousSlug: string | undefined = undefined;
  let nextSlug: string | undefined = undefined;

  if (!isFeatured) {
    const index = articleOrder.indexOf(slug);
    if (index > 0) {
      previousSlug = articleOrder[index - 1];
    }
    if (index < articleOrder.length - 1) {
      nextSlug = articleOrder[index + 1];
    }
  }

  const allSlugs = [featuredSlug, ...articleOrder];
  const related = allSlugs
    .filter((s) => s !== slug)
    .slice(0, 3)
    .map((s) => {
      const d = getDictItem(s);
      return {
        slug: s,
        href: `/${locale}/blog/${s}`,
        image: articleImages[s],
        category: d.category,
        date: d.date,
        title: d.title,
      };
    });

  const previous = previousSlug
    ? {
        href: `/${locale}/blog/${previousSlug}`,
        title: getDictItem(previousSlug).title,
      }
    : undefined;

  const next = nextSlug
    ? {
        href: `/${locale}/blog/${nextSlug}`,
        title: getDictItem(nextSlug).title,
      }
    : undefined;

  return {
    slug: slug,
    href: `/${locale}/blog/${slug}`,
    image: articleImages[slug],
    title: dictEntry.title,
    subtitle: dictEntry.excerpt,
    sections: content.sections,
    tags: content.tags,
    previous: previous,
    next: next,
    related: related,
  };
}