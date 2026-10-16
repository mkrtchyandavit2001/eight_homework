import { getDictionarySync } from "@/lib/dictionary";
import type { Locale } from "@/context/LanguageContext";
import type { ArticleDetails, ArticleSection, ArticleTag } from "@/types/types";

// Static images, index-aligned with dict.courseGuidesPage.guides in both
// en.json and hy.json (slugs there must match the slugs below exactly).
const guideImages: Record<string, string> = {
  "beginner-armenian": "/images/beginner-armenian.jpg",
  "intermediate-armenian": "/images/intermediate-armenian.jpg",
  "advanced-armenian": "/images/advanced-armenian_guites.jpg",
  "individual-lessons": "/images/individual-lessons.jpg",
  "group-lessons": "/images/alphabet-practice-sheet.jpg",
  "choosing-the-right-course": "/images/maintain-armenian-at-home.jpg",
};

const guideOrder = [
  "beginner-armenian",
  "intermediate-armenian",
  "advanced-armenian",
  "individual-lessons",
  "group-lessons",
  "choosing-the-right-course",
];

// Long-form content per locale — not yet part of the dictionary's
// courseGuidesPage.guides items, so it's translated here directly.
const guideContent: Record
  string,
  Record<Locale, { tags: ArticleTag[]; sections: ArticleSection[] }>
> = {
  "beginner-armenian": {
    en: {
      tags: [
        { id: "beginner", label: "Beginner" },
        { id: "curriculum", label: "Curriculum" },
      ],
      sections: [
        {
          id: "who-its-for",
          heading: "Who This Guide Is For",
          paragraphs: [
            "This guide is for families starting from zero — children or adults who have little to no prior exposure to spoken or written Armenian.",
          ],
        },
        {
          id: "whats-covered",
          heading: "What's Covered",
          paragraphs: [
            "Students learn the Armenian alphabet, basic greetings, numbers, and simple everyday phrases, building a foundation for conversation.",
            "Lessons combine reading, writing, and speaking practice so students progress on all fronts at once.",
          ],
        },
        {
          id: "what-to-expect",
          heading: "What to Expect",
          paragraphs: [
            "Classes are paced for absorption, not speed — expect steady, confidence-building progress over the first few months.",
          ],
        },
      ],
    },
    hy: {
      tags: [
        { id: "beginner", label: "Սկսնակ" },
        { id: "curriculum", label: "Ծրագիր" },
      ],
      sections: [
        {
          id: "who-its-for",
          heading: "Ում համար է այս ուղեցույցը",
          paragraphs: [
            "Այս ուղեցույցը նախատեսված է ընտանիքների համար, ովքեր սկսում են զրոյից՝ երեխաներ կամ մեծահասակներ, ովքեր քիչ կամ ընդհանրապես չունեն նախնական փորձ խոսակցական կամ գրավոր հայերենում։",
          ],
        },
        {
          id: "whats-covered",
          heading: "Ինչ է ընդգրկված",
          paragraphs: [
            "Ուսանողները սովորում են հայոց այբուբենը, հիմնական ողջույնները, թվերը և պարզ առօրյա արտահայտություններ՝ կառուցելով հիմք խոսակցության համար։",
            "Դասերը միավորում են կարդալու, գրելու և խոսելու պրակտիկան, որպեսզի ուսանողները զարգանան բոլոր ուղղություններով միաժամանակ։",
          ],
        },
        {
          id: "what-to-expect",
          heading: "Ինչի սպասել",
          paragraphs: [
            "Դասերի տեմպը հարմարեցված է յուրացման, ոչ թե արագության համար․ սպասեք հետևողական, վստահություն ամրապնդող առաջընթացի առաջին ամիսների ընթացքում։",
          ],
        },
      ],
    },
  },

  "intermediate-armenian": {
    en: {
      tags: [
        { id: "intermediate", label: "Intermediate" },
        { id: "curriculum", label: "Curriculum" },
      ],
      sections: [
        {
          id: "who-its-for",
          heading: "Who This Guide Is For",
          paragraphs: [
            "Students who can read and write basic Armenian and hold short, simple conversations are ready for the Intermediate track.",
          ],
        },
        {
          id: "whats-covered",
          heading: "What's Covered",
          paragraphs: [
            "Grammar deepens with verb tenses and sentence structure, vocabulary expands into everyday topics, and students begin reading short texts independently.",
          ],
        },
        {
          id: "what-to-expect",
          heading: "What to Expect",
          paragraphs: [
            "Conversations become longer and more natural, and students start expressing opinions and describing daily life with growing fluency.",
          ],
        },
      ],
    },
    hy: {
      tags: [
        { id: "intermediate", label: "Միջին" },
        { id: "curriculum", label: "Ծրագիր" },
      ],
      sections: [
        {
          id: "who-its-for",
          heading: "Ում համար է այս ուղեցույցը",
          paragraphs: [
            "Ուսանողները, ովքեր կարող են կարդալ ու գրել հիմնական հայերեն և պահել կարճ, պարզ խոսակցություններ, պատրաստ են Միջին մակարդակի համար։",
          ],
        },
        {
          id: "whats-covered",
          heading: "Ինչ է ընդգրկված",
          paragraphs: [
            "Քերականությունը խորանում է բայի ժամանակաձևերով և նախադասության կառուցվածքով, բառապաշարն ընդլայնվում է առօրյա թեմաներով, և ուսանողները սկսում են ինքնուրույն կարդալ կարճ տեքստեր։",
          ],
        },
        {
          id: "what-to-expect",
          heading: "Ինչի սպասել",
          paragraphs: [
            "Խոսակցություններն ավելի երկար ու բնական են դառնում, և ուսանողները սկսում են արտահայտել կարծիքներ և նկարագրել առօրյա կյանքը՝ աճող վարժությամբ։",
          ],
        },
      ],
    },
  },

  "advanced-armenian": {
    en: {
      tags: [
        { id: "advanced", label: "Advanced" },
        { id: "curriculum", label: "Curriculum" },
      ],
      sections: [
        {
          id: "who-its-for",
          heading: "Who This Guide Is For",
          paragraphs: [
            "This track suits students who already communicate comfortably in Armenian and want to refine grammar, vocabulary, and cultural fluency.",
          ],
        },
        {
          id: "whats-covered",
          heading: "What's Covered",
          paragraphs: [
            "Students engage with literature, news, and cultural texts, and work on nuanced expression, idioms, and formal versus casual register.",
          ],
        },
        {
          id: "what-to-expect",
          heading: "What to Expect",
          paragraphs: [
            "By the end of this track, students can hold complex conversations, write essays, and engage confidently with Armenian media and literature.",
          ],
        },
      ],
    },
    hy: {
      tags: [
        { id: "advanced", label: "Առաջադեմ" },
        { id: "curriculum", label: "Ծրագիր" },
      ],
      sections: [
        {
          id: "who-its-for",
          heading: "Ում համար է այս ուղեցույցը",
          paragraphs: [
            "Այս մակարդակը հարմար է ուսանողների համար, ովքեր արդեն հարմարավետ շփվում են հայերենով և ցանկանում են կատարելագործել քերականությունը, բառապաշարը և մշակութային վարժությունը։",
          ],
        },
        {
          id: "whats-covered",
          heading: "Ինչ է ընդգրկված",
          paragraphs: [
            "Ուսանողները ծանոթանում են գրականությանը, նորություններին և մշակութային տեքստերին, և աշխատում են նրբերանգային արտահայտության, դարձվածքների ու պաշտոնական/ոչ պաշտոնական ոճերի վրա։",
          ],
        },
        {
          id: "what-to-expect",
          heading: "Ինչի սպասել",
          paragraphs: [
            "Այս մակարդակի ավարտին ուսանողները կարող են վարել բարդ խոսակցություններ, գրել շարադրություններ և վստահորեն շփվել հայկական մեդիայի ու գրականության հետ։",
          ],
        },
      ],
    },
  },

  "individual-lessons": {
    en: {
      tags: [
        { id: "individual", label: "Individual" },
        { id: "format", label: "Lesson Format" },
      ],
      sections: [
        {
          id: "how-it-works",
          heading: "How It Works",
          paragraphs: [
            "One-to-one lessons are fully personalized: pacing, focus areas, and scheduling are built entirely around the student.",
          ],
        },
        {
          id: "scheduling",
          heading: "Scheduling and Flexibility",
          paragraphs: [
            "Families choose lesson times that fit their week, with the option to reschedule with reasonable notice.",
          ],
        },
        {
          id: "getting-started",
          heading: "Getting Started",
          paragraphs: [
            "New students begin with a short placement conversation so their instructor can tailor the first few lessons appropriately.",
          ],
        },
      ],
    },
    hy: {
      tags: [
        { id: "individual", label: "Անհատական" },
        { id: "format", label: "Դասի ձևաչափ" },
      ],
      sections: [
        {
          id: "how-it-works",
          heading: "Ինչպես է աշխատում",
          paragraphs: [
            "Անհատական դասերն ամբողջությամբ անհատականացված են՝ տեմպը, կենտրոնացման ոլորտները և ժամանակացույցը կառուցվում են ամբողջովին ուսանողի շուրջ։",
          ],
        },
        {
          id: "scheduling",
          heading: "Ժամանակացույց և ճկունություն",
          paragraphs: [
            "Ընտանիքներն ընտրում են իրենց շաբաթին հարմար դասերի ժամեր՝ ողջամիտ ծանուցումով վերաժամանակացման հնարավորությամբ։",
          ],
        },
        {
          id: "getting-started",
          heading: "Սկսելը",
          paragraphs: [
            "Նոր ուսանողները սկսում են կարճ տեղաբաշխման զրույցով, որպեսզի ուսուցիչը կարողանա հարմարեցնել առաջին դասերը համապատասխանաբար։",
          ],
        },
      ],
    },
  },

  "group-lessons": {
    en: {
      tags: [
        { id: "group", label: "Group" },
        { id: "for-parents", label: "For Parents" },
      ],
      sections: [
        {
          id: "how-it-works",
          heading: "How Group Classes Work",
          paragraphs: [
            "Small groups of similarly leveled students meet on a regular schedule, giving children the chance to practice with peers.",
          ],
        },
        {
          id: "what-to-expect",
          heading: "What to Expect",
          paragraphs: [
            "Classes combine instruction with interactive activities, encouraging children to speak up and learn from one another.",
          ],
        },
        {
          id: "preparing-your-child",
          heading: "Preparing Your Child",
          paragraphs: [
            "A quiet space, a working camera, and a few minutes of review before class help children get the most out of each session.",
          ],
        },
      ],
    },
    hy: {
      tags: [
        { id: "group", label: "Խմբակային" },
        { id: "for-parents", label: "Ծնողների համար" },
      ],
      sections: [
        {
          id: "how-it-works",
          heading: "Ինչպես են աշխատում խմբակային դասերը",
          paragraphs: [
            "Նման մակարդակի ուսանողների փոքր խմբեր հանդիպում են կանոնավոր ժամանակացույցով՝ երեխաներին տալով հասակակիցների հետ պրակտիկայի հնարավորություն։",
          ],
        },
        {
          id: "what-to-expect",
          heading: "Ինչի սպասել",
          paragraphs: [
            "Դասերը միավորում են ուսուցումը ինտերակտիվ գործունեության հետ՝ խրախուսելով երեխաներին խոսել և սովորել միմյանցից։",
          ],
        },
        {
          id: "preparing-your-child",
          heading: "Երեխայի նախապատրաստումը",
          paragraphs: [
            "Հանգիստ վայրը, աշխատող տեսախցիկը և դասից առաջ մի քանի րոպե կրկնությունը օգնում են երեխաներին առավելագույնս օգտվել յուրաքանչյուր դասից։",
          ],
        },
      ],
    },
  },

  "choosing-the-right-course": {
    en: {
      tags: [
        { id: "for-parents", label: "For Parents" },
        { id: "beginner", label: "Beginner" },
      ],
      sections: [
        {
          id: "assessing-level",
          heading: "Assessing Your Child's Level",
          paragraphs: [
            "Consider whether your child has any prior exposure to spoken or written Armenian — even passive exposure at home counts.",
          ],
        },
        {
          id: "individual-vs-group",
          heading: "Individual vs. Group",
          paragraphs: [
            "Children who thrive with personal attention often do better one-to-one, while social learners tend to enjoy group classes.",
          ],
        },
        {
          id: "next-steps",
          heading: "Next Steps",
          paragraphs: [
            "Armat offers a short placement conversation to help match your child with the right course and format from day one.",
          ],
        },
      ],
    },
    hy: {
      tags: [
        { id: "for-parents", label: "Ծնողների համար" },
        { id: "beginner", label: "Սկսնակ" },
      ],
      sections: [
        {
          id: "assessing-level",
          heading: "Ձեր երեխայի մակարդակի գնահատում",
          paragraphs: [
            "Մտածեք՝ արդյոք ձեր երեխան ունեցել է նախնական շփում խոսակցական կամ գրավոր հայերենի հետ — նույնիսկ պասիվ շփումը տանը նշանակություն ունի։",
          ],
        },
        {
          id: "individual-vs-group",
          heading: "Անհատական թե՞ խմբակային",
          paragraphs: [
            "Երեխաները, ովքեր լավ են զարգանում անհատական ուշադրության պայմաններում, հաճախ ավելի լավ արդյունքներ են ունենում անհատական դասերում, մինչդեռ հասարակական երեխաները սովորաբար հավանում են խմբակային դասերը։",
          ],
        },
        {
          id: "next-steps",
          heading: "Հաջորդ քայլերը",
          paragraphs: [
            "Armat-ն առաջարկում է կարճ տեղաբաշխման զրույց, որպեսզի օգնի ձեր երեխային համապատասխանեցնել ճիշտ դասընթացին և ձևաչափին հենց առաջին օրվանից։",
          ],
        },
      ],
    },
  },
};

export async function getGuideBySlug(
  slug: string,
  locale: string,
): Promise<ArticleDetails | null> {
  const loc = (locale === "hy" ? "hy" : "en") as Locale;
  const dict = getDictionarySync(loc);
  const dictGuides = dict.courseGuidesPage.guides as {
    slug: string;
    category: string;
    title: string;
    description: string;
  }[];

  const index = guideOrder.indexOf(slug);
  if (index === -1) return null;

  const dictEntry = dictGuides.find((g) => g.slug === slug);
  if (!dictEntry) return null;

  const content = guideContent[slug]?.[loc];
  if (!content) return null;

  const getDictEntry = (s: string) => dictGuides.find((g) => g.slug === s);

  const previousSlug = index > 0 ? guideOrder[index - 1] : undefined;
  const nextSlug =
    index < guideOrder.length - 1 ? guideOrder[index + 1] : undefined;

  const related = guideOrder
    .filter((s) => s !== slug)
    .slice(0, 3)
    .map((s) => {
      const d = getDictEntry(s)!;
      return {
        slug: s,
        href: `/${locale}/blog/courses_guites/${s}`,
        image: guideImages[s],
        category: d.category,
        date: "",
        title: d.title,
      };
    });

  return {
    slug,
    href: `/${locale}/blog/courses_guites/${slug}`,
    image: guideImages[slug],
    title: dictEntry.title,
    subtitle: dictEntry.description,
    sections: content.sections,
    tags: content.tags,
    previous: previousSlug
      ? {
          href: `/${locale}/blog/courses_guites/${previousSlug}`,
          title: getDictEntry(previousSlug)!.title,
        }
      : undefined,
    next: nextSlug
      ? {
          href: `/${locale}/blog/courses_guites/${nextSlug}`,
          title: getDictEntry(nextSlug)!.title,
        }
      : undefined,
    related,
  };
}