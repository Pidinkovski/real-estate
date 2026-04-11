'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'bg' | 'en';

export const translations = {
  en: {
    nav: {
      projects: 'Projects',
      services: 'Services',
      process: 'Process',
      about: 'About',
      blog: 'Blog',
      requestQuote: 'Request a Quote',
    },
    hero: {
      tagline: 'Est. 2014 · Vienna · Dubai · Monaco',
      headline1: 'Turnkey',
      headline2: 'Construction.',
      sub1: 'From',
      sub2: 'Concept',
      sub3: 'to',
      sub4: 'Completion.',
      description: 'Design, build, and furnish — all in one place.',
      viewProjects: 'View Projects',
      requestQuote: 'Request a Quote',
    },
    trust: {
      projectsDelivered: 'Projects Delivered',
      processControl: 'Process control',
      processControlSub: 'Precision in every detail',
      citiesOfOperation: 'Cities of Operation',
      servicesProvided: 'Services Provided',
      endToEnd: 'End-to-end',
    },
    projects: {
      label: 'Our Work',
      title1: 'Selected',
      title2: 'Projects',
      description: 'From private residences in Monaco to commercial towers in Vienna — each project reflects our commitment to precision and permanence.',
      viewAll: 'View All Projects',
    },
    services: {
      label: 'What We Do',
      title1: 'Every Discipline.',
      title2: 'One Team.',
      description: 'We eliminate the friction of managing multiple vendors. Design, construction, and furnishing — all coordinated under a single contract.',
      items: [
        {
          title: 'Turnkey Construction',
          description: 'Full lifecycle delivery from foundation to final certificate. We manage every contractor, timeline, and material — so you never have to.',
          tags: ['Structural', 'MEP', 'Facade', 'Finishing'],
        },
        {
          title: 'Interior & Furnishing',
          description: 'Curated spaces with bespoke furniture, premium materials, and lighting design. Every room delivered move-in ready.',
          tags: ['FF&E', 'Lighting', 'Joinery', 'Art Curation'],
        },
        {
          title: 'Architectural Design',
          description: 'Award-winning design aligned to your vision and local regulations. From concept sketches through BIM-ready permit drawings.',
          tags: ['Concept', 'BIM', 'Permits', '3D Rendering'],
        },
        {
          title: 'Project Management',
          description: 'One dedicated senior PM as your single point of contact. Real-time reporting, risk management, and budget control.',
          tags: ['Cost Control', 'Scheduling', 'Reporting', 'QA/QC'],
        },
      ],
    },
    beforeAfter: {
      label: 'The Transformation',
      title: 'Before & After',
      description: 'Browse our transformations. Hover a card and click View to reveal the full before & after.',
      before: 'Before',
      after: 'After',
      view: 'View',
      viewTransformation: 'View Transformation',
      weeks: 'Weeks',
      rooms: 'Rooms',
      floors: 'Floors',
      desks: 'Desks',
    },
    process: {
      label: 'How We Work',
      title1: 'From Inquiry to',
      title2: 'Key Handover',
      timelineTitle: 'Typical project timeline:',
      timelineRange: '12–36 weeks',
      timelineDescription: 'From first meeting to key handover — we provide fixed timelines in every contract. No ambiguity, no delays without notice.',
      designPhase: 'Design Phase',
      designPhaseValue: '2–6 wks',
      permits: 'Permits',
      permitsValue: '4–8 wks',
      build: 'Build',
      buildValue: '8–24 wks',
      steps: [
        { title: 'Inquiry', description: 'Share your vision, timeline, and requirements with our team.' },
        { title: 'Site Inspection', description: 'We visit the property and conduct a full feasibility assessment.' },
        { title: 'Concept Design', description: 'Architects develop a tailored concept with 3D renders and material boards.' },
        { title: 'Budget & Contract', description: 'Detailed cost breakdown and fixed-price contract for full transparency.' },
        { title: 'Execution', description: 'Our teams build on schedule with weekly client reports and site access.' },
        { title: 'Delivery', description: 'Final walkthrough, snag list completion, and handover of keys.' },
      ],
    },
    whyUs: {
      label: 'Why Virtus Decora',
      title1: 'Built on',
      title2: 'Four Pillars',
      description:
        'Although we are a new company, we work with partners, craftspeople, and suppliers with many years of practical experience. For us, every project is built on clear communication, quality execution, careful material selection, and full transparency.',
      pillars: [
        {
          title: 'Experienced partners and craftspeople',
          description:
            'We work with proven contractors and specialists with long-term experience across many types of projects. That lets us pair a fresh, client-first approach with real expertise on site.',
        },
        {
          title: 'Curated materials',
          description:
            'Every material and every detail is chosen with care to match the concept, budget, and durability our clients expect.',
        },
        {
          title: 'One clear point of contact',
          description:
            'Communication stays organized, clear, and on time. Clients always know whom to reach and get fast, concrete feedback.',
        },
        {
          title: 'Full Transparency',
          description:
            'We work with clearly defined phases, budgets, and timelines so the whole process stays calm, traceable, and built on trust.',
        },
      ],
    },
    blog: {
      label: 'Editorial',
      title1: 'Insights &',
      title2: 'Perspectives',
      allArticles: 'All Articles',
      readArticle: 'Read article',
      minRead: 'min read',
      min: 'min',
    },
    cta: {
      label: 'Start Your Project',
      title1: 'Have a project',
      title2: 'in mind?',
      subtitle: "Let's build it together.",
      description:
        "A good project starts with the right conversation.\nSend an inquiry and let's turn your idea into a real plan together.",
      requestConsultation: 'Request a Consultation',
      emailUs: 'or email us directly',
      euLabel: 'Licensed in Austria, Germany, France, Croatia',
      uaeLabel: 'RERA & Dubai Municipality Registered',
      mcLabel: 'Monaco Principality Certified',
    },
    footer: {
      description: 'Premium turnkey construction and architectural design. From first concept to final key — across Europe and the Middle East.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      links: ['Projects', 'Services', 'Our Process', 'Why Us', 'Blog', 'Contact'],
      servicesList: ['Turnkey Construction', 'Architectural Design', 'Interior & Furnishing', 'Project Management', 'Structural Engineering', 'Renovation Works'],
      address: 'Vienna, Austria\nDubai, UAE\nMonaco',
      copyright: 'Virtus Decora Construction Group. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      imprint: 'Imprint',
    },
    modal: {
      title: 'Request a Consultation',
      subtitle: 'We respond within 24 hours',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      projectType: 'Project Type',
      budget: 'Estimated Budget',
      description: 'Project Description',
      selectRange: 'Select a range',
      send: 'Send Inquiry',
      sending: 'Sending...',
      successTitle: 'Thank you',
      successMessage: 'Your inquiry has been received. A member of our team will be in touch within 24 hours.',
      close: 'Close',
      error: 'Something went wrong. Please try again.',
      projectTypes: ['Residential', 'Commercial', 'Hospitality', 'Renovation', 'Architectural Design', 'Other'],
      placeholder: {
        name: 'Alexander Schmidt',
        email: 'hello@example.com',
        phone: 'Include country code',
        description: 'Tell us about your project — location, scale, timeline, any specific requirements...',
      },
    },
  },
  bg: {
    nav: {
      projects: 'Проекти',
      services: 'Услуги',
      process: 'Процес',
      about: 'За нас',
      blog: 'Блог',
      requestQuote: 'Запитване',
    },
    hero: {
      tagline: 'Осн. 2014 · Виена · Дубай · Монако',
      headline1: 'Строителство',
      headline2: 'до ключ.',
      sub1: 'От',
      sub2: 'Концепция',
      sub3: 'до',
      sub4: 'Завършване.',
      description: 'Дизайн, строителство и обзавеждане — на едно място.',
      viewProjects: 'Вижте проектите',
      requestQuote: 'Запитване',
    },
    trust: {
      projectsDelivered: 'Завършени проекта',
      processControl: 'Контрол на процеса',
      processControlSub: 'Прецизност във всеки детайл',
      citiesOfOperation: 'Градове на дейност',
      servicesProvided: 'Предоставени услуги',
      endToEnd: 'Край-до-край',
    },
    projects: {
      label: 'Нашата работа',
      title1: 'Избрани',
      title2: 'Проекти',
      description: 'От частни резиденции в Монако до търговски кули във Виена — всеки проект отразява нашия ангажимент към прецизност и трайност.',
      viewAll: 'Всички проекти',
    },
    services: {
      label: 'Какво правим',
      title1: 'Всяка дисциплина.',
      title2: 'Един екип.',
      description: 'Елиминираме трудностите при управление на множество изпълнители. Дизайн, строителство и обзавеждане — всичко координирано по един договор.',
      items: [
        {
          title: 'Строителство до ключ',
          description: 'Пълен жизнен цикъл от основи до финален сертификат. Управляваме всеки изпълнител, срок и материал — за да не се налага вие.',
          tags: ['Конструктивно', 'МЕП', 'Фасада', 'Довършване'],
        },
        {
          title: 'Интериор и обзавеждане',
          description: 'Обмислени пространства с изработено по поръчка обзавеждане, премиум материали и осветителен дизайн. Всяка стая готова за нанасяне.',
          tags: ['FF&E', 'Осветление', 'Дограма', 'Арт куриране'],
        },
        {
          title: 'Архитектурен дизайн',
          description: 'Отличен дизайн, съобразен с вашата визия и местните наредби. От концептуални скици до разрешителни чертежи.',
          tags: ['Концепция', 'BIM', 'Разрешения', '3D визуализация'],
        },
        {
          title: 'Управление на проекти',
          description: 'Един посветен старши ПМ като ваш единствен контакт. Актуално отчитане, управление на риска и контрол на бюджета.',
          tags: ['Контрол на разходите', 'Планиране', 'Отчитане', 'QA/QC'],
        },
      ],
    },
    beforeAfter: {
      label: 'Трансформацията',
      title: 'Преди и след',
      description: 'Разгледайте нашите трансформации. Задръжте върху карта и натиснете Виж, за да разкриете пълното преди и след.',
      before: 'Преди',
      after: 'След',
      view: 'Виж',
      viewTransformation: 'Виж трансформацията',
      weeks: 'Седмици',
      rooms: 'Стаи',
      floors: 'Етажа',
      desks: 'Бюра',
    },
    process: {
      label: 'Как работим',
      title1: 'От запитване до',
      title2: 'Предаване на ключове',
      timelineTitle: 'Типичен срок на проекта:',
      timelineRange: '12–36 седмици',
      timelineDescription: 'От първата среща до предаване на ключовете — предоставяме фиксирани срокове във всеки договор. Без неяснота, без закъснения без предизвестие.',
      designPhase: 'Фаза дизайн',
      designPhaseValue: '2–6 сед.',
      permits: 'Разрешения',
      permitsValue: '4–8 сед.',
      build: 'Строеж',
      buildValue: '8–24 сед.',
      steps: [
        { title: 'Запитване', description: 'Споделете вашата визия, срокове и изисквания с нашия екип.' },
        { title: 'Оглед на обекта', description: 'Посещаваме имота и извършваме пълна оценка за осъществимост.' },
        { title: 'Концептуален дизайн', description: 'Архитектите разработват индивидуална концепция с 3D визуализации и материални табла.' },
        { title: 'Бюджет и договор', description: 'Детайлна разбивка на разходите и договор с фиксирана цена за пълна прозрачност.' },
        { title: 'Изпълнение', description: 'Нашите екипи строят по график с ежеседмични клиентски доклади и достъп до обекта.' },
        { title: 'Предаване', description: 'Финален оглед, отстраняване на забележки и предаване на ключовете.' },
      ],
    },
    whyUs: {
      label: 'Защо Virtus Decora',
      title1: 'Изградени върху',
      title2: 'Четири стълба',
      description:
        'Макар да сме нова компания, работим с партньори, майстори и доставчици с дългогодишен практически опит. За нас всеки проект се гради върху ясна комуникация, качествено изпълнение, внимателен подбор на материали и пълна прозрачност.',
      pillars: [
        {
          title: 'Опитни партньори и майстори',
          description:
            'Работим с доказани изпълнители и специалисти с дългосрочен опит в различни типове проекти. Така съчетаваме ново отношение към клиента с реална експертиза на терен.',
        },
        {
          title: 'Подбрани материали',
          description:
            'Всеки материал и всеки детайл се избират внимателно според концепцията, бюджета и дълготрайността, която клиентът очаква.',
        },
        {
          title: 'Един ясен контакт',
          description:
            'Комуникацията е организирана, ясна и навременна. Клиентът знае към кого да се обърне и получава бърза и конкретна обратна връзка.',
        },
        {
          title: 'Пълна прозрачност',
          description:
            'Работим с ясно разписани етапи, бюджет и срокове, така че през целия процес да има спокойствие, проследимост и доверие.',
        },
      ],
    },
    blog: {
      label: 'Редакционно',
      title1: 'Прозрения и',
      title2: 'перспективи',
      allArticles: 'Всички статии',
      readArticle: 'Прочети статията',
      minRead: 'мин четене',
      min: 'мин',
    },
    cta: {
      label: 'Стартирайте проекта си',
      title1: 'Имате проект',
      title2: 'на ум?',
      subtitle: 'Нека го изградим заедно.',
      description:
        'Добрият проект започва с точния разговор.\nИзпратете запитване и нека заедно превърнем идеята ви в реален план.',
      requestConsultation: 'Заявете консултация',
      emailUs: 'или ни пишете директно',
      euLabel: 'Лицензиран в Австрия, Германия, Франция, Хърватия',
      uaeLabel: 'Регистриран в RERA и Дубайска община',
      mcLabel: 'Сертифициран в Монако',
    },
    footer: {
      description: 'Премиум строителство до ключ и архитектурен дизайн. От първата концепция до финалния ключ — из цяла Европа и Близкия изток.',
      quickLinks: 'Бързи връзки',
      services: 'Услуги',
      contact: 'Контакт',
      links: ['Проекти', 'Услуги', 'Нашият процес', 'Защо ние', 'Блог', 'Контакт'],
      servicesList: ['Строителство до ключ', 'Архитектурен дизайн', 'Интериор и обзавеждане', 'Управление на проекти', 'Конструктивно инженерство', 'Ремонтни работи'],
      address: 'Виена, Австрия\nДубай, ОАЕ\nМонако',
      copyright: 'Virtus Decora Construction Group. Всички права запазени.',
      privacy: 'Политика за поверителност',
      terms: 'Условия за ползване',
      imprint: 'Импресум',
    },
    modal: {
      title: 'Заявете консултация',
      subtitle: 'Отговаряме в рамките на 24 часа',
      fullName: 'Пълно име',
      email: 'Имейл',
      phone: 'Телефон',
      projectType: 'Тип проект',
      budget: 'Приблизителен бюджет',
      description: 'Описание на проекта',
      selectRange: 'Изберете диапазон',
      send: 'Изпратете запитване',
      sending: 'Изпращане...',
      successTitle: 'Благодарим ви',
      successMessage: 'Вашето запитване е получено. Член на нашия екип ще се свърже с вас в рамките на 24 часа.',
      close: 'Затвори',
      error: 'Нещо се обърка. Моля, опитайте отново.',
      projectTypes: ['Жилищен', 'Търговски', 'Хотелиерство', 'Ремонт', 'Архитектурен дизайн', 'Друго'],
      placeholder: {
        name: 'Александър Иванов',
        email: 'hello@example.com',
        phone: 'С код на държавата',
        description: 'Разкажете ни за проекта си — местоположение, мащаб, срокове, специфични изисквания...',
      },
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'bg',
  setLang: () => {},
  t: translations['bg'],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('bg');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
