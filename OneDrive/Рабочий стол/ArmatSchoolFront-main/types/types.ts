import type { ResourceItem } from "@/hooks/useResourceItems";
import type { InputHTMLAttributes, ReactNode, SVGProps } from "react";

export type RegisteringFor = "me" | "child" | "other";

export type ContactMethod = "email" | "whatsapp" | "instagram" | "phone";

export type ArmenianLevel =
  | "elementary"
  | "can-read-write"
  | "not-speak"
  | "cannot-read-write"
  | "cannot-read-write-speak"
  | "other";

export const ARMENIAN_LEVEL_LABELS: Record<ArmenianLevel, string> = {
  elementary: "Knows some words/phrases, can understand basic Armenian",
  "can-read-write": "Can read/write",
  "not-speak": "Does not speak Armenian",
  "cannot-read-write": "Cannot read, write",
  "cannot-read-write-speak": "Can't read/write and speak Armenian",
  other: "Other",
};

export const WEEKDAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;
export type Weekday = (typeof WEEKDAYS)[number];

export const TIME_SLOTS = [
  "5:00 AM",
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
];

/** One student being registered for a trial lesson (a form can list several). */
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  armenianLevel: ArmenianLevel | "";
}

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

export function createEmptyStudent(): Student {
  return {
    id: generateId(),
    firstName: "",
    lastName: "",
    birthDate: "",
    armenianLevel: "",
  };
}

export interface FreeLessonFormData {
  registeringFor: RegisteringFor;
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  country: string;
  countryId?: number | string; // <--- Ավելացրեք սա
  timezone: string;
  contactMethod: ContactMethod;
  instagramUsername: string;
  whatsappNumber: string;
  students: Student[];
  preferredDays: Weekday[];
  preferredTime: string;
  learningDisabilities: string;
  otherNotes: string;
  companyName: string;
  armenianLevel: string;
}

export const initialFreeLessonFormData: FreeLessonFormData = {
  registeringFor: "me",
  firstName: "",
  lastName: "",
  birthDate: "",
  phoneNumber: "",
  email: "",
  country: "",
  countryId: undefined, // <--- Ավելացրեք սա
  timezone: "", // Կարող եք դատարկ թողնել, որպեսզի ավտոմատ լցվի բեքենդից ստացվածով
  contactMethod: "email",
  instagramUsername: "",
  whatsappNumber: "",
  students: [createEmptyStudent()],
  preferredDays: [],
  preferredTime: "",
  learningDisabilities: "",
  otherNotes: "",
  companyName: "",
  armenianLevel: "",
};

export interface Article {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  liked?: boolean;
}

export interface Resource {
  id: string;
  category: string;
  level: string;
  age: string;
  title: string;
  description: string;
  image: string;
  format: "PDF" | "MP3" | "MP4";
  popular?: boolean;
  href: string;
}

export interface ExploreCategory {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: "alphabet" | "book" | "parents";
}

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface ArticleTag {
  id: string;
  label: string;
}

export interface RelatedArticle {
  slug: string;
  href: string;
  image: string;
  category: string;
  date: string;
  title: string;
}

export interface ArticleNavLink {
  href: string;
  title: string;
}

export interface ArticleDetails {
  slug: string;
  href: string;
  image: string;
  title: string;
  subtitle: string;
  sections: ArticleSection[];
  tags: ArticleTag[];
  previous?: ArticleNavLink;
  next?: ArticleNavLink;
  related: RelatedArticle[];
}

export interface EventsContent {
  hero: { title: string; description: string };
  featured: {
    category: string;
    format: string;
    title: string;
    description: string;
    dateLabel: string;
    date: string;
    timeLabel: string;
    time: string;
    durationLabel: string;
    duration: string;
    spotsLabel: string;
    spots: string;
    perkTitle: string;
    perkText: string;
    guestInfo: string;
    buyLabel: string;
    buyHref: string;
  };
  categories: {
    title: string;
    description: string;
    items: { label: string; text: string }[];
  };
  whyJoin: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; text: string }[];
  };
  access: {
    title: string;
    items: { badge: string; title: string; text: string }[];
  };
  past: {
    title: string;
    description: string;
    items: { id: string; category: string; title: string }[];
  };
}
export interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export type Format = "all" | "free" | "paid";

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface BookingResult {
  dateLabel: string;
  timeLabel: string;
}

export interface FreeTrialBookingPageProps {
  onConfirm?: (result: BookingResult) => void;
}

export interface AllSetScreenProps {
  dateLabel: string;
  timeLabel: string;
  onReturnHome: () => void;
}

export interface ArmenianLevelSelectProps {
  value: ArmenianLevel | "";
  onChange: (value: ArmenianLevel) => void;
}

export interface ArticleBodyProps {
  sections: ArticleSection[];
}

export interface ArticleCardProps {
  article: Article;
}

export interface ArticleGridProps {
  articles: Article[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export interface ArticleHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export interface ArticlePrevNextProps {
  previous?: ArticleNavLink;
  next?: ArticleNavLink;
  previousLabel: string;
  nextLabel: string;
}

export interface ArticleShareBarProps {
  shareLabel: string;
  likeAria: string;
  shareAria: string;
}

export interface ArticleSidebarProps {
  sections: ArticleSection[];
  tags: ArticleTag[];
  contentsLabel: string;
  tagsLabel: string;
}

export interface BackToBlogLinkProps {
  href?: string;
  label?: string;
}

export interface BookingFooterProps {
  t: any;
  year: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingWidgetProps {
  t: any;
  locale: string;
  year: number;
  month: number;
  monthLabel: string;
  weekdayLabels: string[];
  calendarCells: (number | null)[];
  selectedDay: number | null;
  selectedTime: string | null;
  slots: TimeSlot[];
  isCurrentMockMonth: boolean;
  selectedDateLabel: string | null;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDay: (day: number) => void;
  onSelectTime: (time: string) => void;
  onConfirm: () => void;
}

export interface ContactDetailsStepProps {
  data: FreeLessonFormData;
  onChange: (patch: Partial<FreeLessonFormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export interface ContactMethodSelectorProps {
  value: ContactMethod;
  onChange: (value: ContactMethod) => void;
}

export interface ContentCardProps {
  href: string;
  image: string;
  imageAlt?: string;
  imageHeight?: number;
  cornerBadge?: string;
  category: string;
  date?: string;
  tags?: string[];
  title: string;
  description: string;
  price?: string;
  ctaLabel?: string;
  liked?: boolean;
  onLikeToggle?: () => void;
  onShare?: () => void;
  padding?: 24 | 28;
  className?: string;
}

export interface CountrySelectProps {
  value: string;
  onChange: (code: string) => void;
  required?: boolean;
  icon?: ReactNode;
}

export interface DayChipsProps {
  value: Weekday[];
  onChange: (value: Weekday[]) => void;
}

export interface ExploreCardProps {
  category: ExploreCategory;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqSectionProps {
  faqItems: FaqItem[];
  openFaqIndex: number | null;
  onToggleFaq: (index: number) => void;
  imageAlt?: string;
}

export interface FeaturedArticleProps {
  article: Article;
  viewAllHref?: string;
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  onSearch?: (query: string) => void;
}

export interface FilterTabsProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  icon?: ReactNode;
}

export interface HeroSectionProps {
  titleLine1?: string;
  titleLine2?: string;
  badge?: string;
  subtitle?: string;
}

export interface InformationSavedScreenProps {
  onOpenCalendly: () => void;
}

export interface LearningInfoStepProps {
  data: FreeLessonFormData;
  onChange: (patch: Partial<FreeLessonFormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalContentProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export interface MoreToExploreProps {
  categories: ExploreCategory[];
}

export interface NavBarProps {
  isLoggedIn?: boolean;
  userName?: string;
  userInitial?: string;
}

export interface NavItemProps {
  href: string;
  label: string;
  isActive?: boolean;
}

type NavKey = "home" | "courses" | "blog" | "events" | "about" | "contact";

export interface NavMenuItem {
  href: string;
  key: NavKey;
}

export interface Breadcrumb {
  label: string;
  /** Բաց թողեք href-ը ընթացիկ (վերջին) էջի համար — այն չի ունենալու հղում */
  href?: string;
}

export interface PageHeroProps {
  /** Breadcrumb trail-ը՝ վերջին տարրը միշտ ընթացիկ էջն է (առանց հղման) */
  breadcrumbs: Breadcrumb[];
  title: string;
  description?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export interface PersonalInfoStepProps {
  data: FreeLessonFormData;
  onChange: (patch: Partial<FreeLessonFormData>) => void;
  onContinue: () => void;
}

export interface RegisteringForToggleProps {
  value: RegisteringFor;
  onChange: (value: RegisteringFor) => void;
}

export interface RelatedArticlesProps {
  title: string;
  items: RelatedArticle[];
}

export interface RelatedResourcesProps {
  items: ResourceItem[];
  pageSize?: number;
}

export interface ResourceCardProps {
  item: ResourceItem;
  href: string;
  ctaLabel: string;
}

export interface ResourcecardProps {
  resource: Resource;
}

export interface ResourceDetailProps {
  item: ResourceItem;
  /** Գնել / Ներբեռնել կոճակի գործողությունը (checkout, download և այլն) */
  onAction?: () => void;
}

export interface ResourcesSectionProps {
  resources: Resource[];
}

export interface SectionHeaderProps {
  title: string;
  description: string;
  viewAllLabel?: string;
  viewAllHref?: string;
}

export interface SelectFieldProps {
  label: string;
  required?: boolean;
  icon?: ReactNode;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  helperText?: string;
}

export type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  hasBottomBorder: boolean;
};

export interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
  completed?: boolean;
}

export interface StudentsStepProps {
  data: FreeLessonFormData;
  onChange: (patch: Partial<FreeLessonFormData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export interface TimezoneModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onContinue?: (selectedTimezone: string) => void;
}

export interface VerifyEmailCardProps {
  email?: string;
  userName?: string;
}

export interface WelcomeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onContinueLearning?: () => void;
  onViewCalendar?: () => void;
  userName?: string;
}

export type AdditionalInfoSectionProps = {
  data: FreeLessonFormData;
  onChange: (update: Partial<FreeLessonFormData>) => void;
  isForMe: boolean;
};

export type Rating = 1 | 2 | 3 | 4 | 5;

export type RatingFilterValue = "all" | Rating;

export interface Review {
  id: number;
  rating: Rating;
  text: string;
  name: string;
  location: string;
  /** Flag emoji, e.g. 🇩🇪 */
  flag: string;
}

export interface ReviewsLabels {
  title: string;
  writeReview: string;
  allRatings: string;
  readMore: string;
  showLess: string;
  fullReview: string;
  backToHome: string;
  reviews: string;
  empty: string;
}

export interface StarIconProps extends Omit<
  SVGProps<SVGSVGElement>,
  "width" | "height"
> {
  size?: number;
  filled?: boolean;
}

export interface RatingSummaryProps {
  average: number;
  count: number;
  countLabel: string;
}

export interface RatingFilterProps {
  value: RatingFilterValue;
  onChange: (value: RatingFilterValue) => void;
  allLabel: string;
  options?: Rating[];
}

export interface ReviewsGridProps {
  reviews: Review[];
  labels: Pick<ReviewsLabels, "readMore" | "showLess" | "fullReview" | "empty">;
  onOpenFull?: (review: Review) => void;
}

export interface ReviewCardProps {
  review: Review;
  labels: Pick<ReviewsLabels, "readMore" | "showLess" | "fullReview">;
  onOpenFull?: (review: Review) => void;
}

export type ReviewAuthorProps = Pick<Review, "name" | "location" | "flag">;

export interface StarRowProps {
  rating: number | Rating;
  size?: number;
  max?: number;
}

export interface BackLinkProps {
  href?: string;
  label: string;
}

type ReviewItemDict = {
  text: string;
  name: string;
  initials?: string;
  location: string;
};

export type ReviewsPageDict = Partial<ReviewsLabels> & {
  items?: ReviewItemDict[];
};

export interface AllReviewsPageProps {
  reviews?: Review[];
  labels?: ReviewsLabels;
  onWriteReview?: () => void;
  onOpenFull?: (review: Review) => void;
}

export interface ReviewsHeaderProps {
  average: number;
  count: number;
  labels: Pick<ReviewsLabels, "title" | "writeReview" | "reviews">;
  onWrite?: () => void;
}

export type ReviewFormData = {
  rating: number;
  firstName: string;
  lastName: string;
  location: string;
  review: string;
};

export type WriteReviewModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: ReviewFormData) => void;
};

export interface PurchasedItem {
  title: string;
  meta: string;
  image: string;
}

export interface PurchaseSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: PurchasedItem;
  openHref?: string;
  myResourcesHref?: string;
}

export interface Course {
  id: string;
  image?: string;
  title: string;
  description: string;
  lessons: string;
  level: string;
  format: string;
  price: string;
  oldPrice?: string;
  href: string;
}

export interface Course {
  id: string;
  image?: string;
  title: string;
  description: string;
  lessons: string;
  level: string;
  format: string;
  price: string;
  oldPrice?: string;
  href: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
}

export interface CoursesSectionProps {
  courses?: Course[];
  eyebrow?: string;
  title?: string;
  paymentNote?: string;
}

export interface CourseCardProps extends Omit<Course, 'id'> {
  ctaLabel?: string;
}