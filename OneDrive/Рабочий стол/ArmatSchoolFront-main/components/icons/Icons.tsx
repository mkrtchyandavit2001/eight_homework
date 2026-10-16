import type { ReactNode, SVGProps } from "react";
import type { StarIconProps } from "@/types/types";
import type { DashIcon } from "@/types/dashboard";
import type { SettingsIcon, SettingsIconProps } from "@/types/settings";

/* ───────────── Types ───────────── */
export type IconProps = SVGProps<SVGSVGElement>;
export type SizedIconProps = Omit<
  SVGProps<SVGSVGElement>,
  "width" | "height"
> & {
  size?: number;
};
export type ClassNameProps = { className?: string };

type Props = SVGProps<SVGSVGElement> & { size?: number };

/* ═════════════ Սկզբնական ֆայլ 1 (անունները մնում են) ═════════════ */

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 15" fill="none" {...props}>
      <circle cx="6.5" cy="6.5" r="4.5" stroke="#AAAAAA" strokeWidth="1.25" />
      <path
        d="M10.5 10.5L13.5 13.5"
        stroke="#AAAAAA"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" {...props}>
      <path
        d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface HeartIconProps extends SVGProps<SVGSVGElement> {
  filled?: boolean;
}

export function HeartIcon({ filled = false, ...props }: HeartIconProps) {
  return (
    <svg
      width="15"
      height="14"
      viewBox="-1 -1 17 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M7.5 14 L1.8 8.1 C0 6.2 0 3.3 1.8 1.5 C3.4 -0.1 5.9 -0.1 7.5 1.5 C9.1 -0.1 11.6 -0.1 13.2 1.5 C15 3.3 15 6.2 13.2 8.1 Z"
        fill={filled ? "#F15A22" : "none"}
        stroke="#F15A22"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1172_6935)">
        <path
          d="M7.49982 0.681641V9.54528M10.9089 3.40891L7.49982 0.681641L4.09073 3.40891M0.681641 7.49982V12.9544C0.681641 13.316 0.861226 13.6629 1.18089 13.9186C1.50056 14.1744 1.93411 14.318 2.38619 14.318H12.6135C13.0656 14.318 13.4991 14.1744 13.8187 13.9186C14.1385 13.6629 14.318 13.316 14.318 12.9544V7.49982"
          stroke="#999999"
          strokeWidth="1.36364"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1172_6935">
          <rect width="15" height="15" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13 13" fill="none" {...props}>
      <path
        d="M6.5 1.5V9M3.5 6 6.5 9 9.5 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 10.5V11.5H11.5V10.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M0.666016 8.66602L4.66602 4.66602L0.666016 0.666016"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AlphabetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M10 2.5C10 2.5 5.625 5 2.5 5V12.5C2.5 14.375 5.625 17.5 10 17.5C14.375 17.5 17.5 14.375 17.5 12.5V5C14.375 5 10 2.5 10 2.5Z"
        stroke="#F15A22"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 8.75V12.5"
        stroke="#F15A22"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 7.75C10.4142 7.75 10.75 7.41421 10.75 7C10.75 6.58579 10.4142 6.25 10 6.25C9.58579 6.25 9.25 6.58579 9.25 7C9.25 7.41421 9.58579 7.75 10 7.75Z"
        fill="#F15A22"
      />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <rect
        x="8"
        y="6"
        width="16"
        height="20"
        rx="3"
        stroke="#F15A22"
        strokeWidth="2.5"
      />
      <path
        d="M8 11.5H24"
        stroke="#F15A22"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M12 16H20"
        stroke="#F15A22"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M12 20H20"
        stroke="#F15A22"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M12 24H17"
        stroke="#F15A22"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ParentsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M10 10C10.4596 10 10.9148 9.90947 11.3394 9.73358C11.764 9.55769 12.1499 9.29988 12.4749 8.97487C12.7999 8.64987 13.0577 8.26403 13.2336 7.83939C13.4095 7.41475 13.5 6.95963 13.5 6.5C13.5 6.04037 13.4095 5.58525 13.2336 5.16061C13.0577 4.73597 12.7999 4.35013 12.4749 4.02513C12.1499 3.70012 11.764 3.44231 11.3394 3.26642C10.9148 3.09053 10.4596 3 10 3C9.07174 3 8.1815 3.36875 7.52513 4.02513C6.86875 4.6815 6.5 5.57174 6.5 6.5C6.5 7.42826 6.86875 8.3185 7.52513 8.97487C8.1815 9.63125 9.07174 10 10 10Z"
        stroke="#F15A22"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 17.5C2.5 14.186 5.858 11.5 10 11.5C14.142 11.5 17.5 14.186 17.5 17.5"
        stroke="#F15A22"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.334 1.33398H4.66732C2.82637 1.33398 1.33398 2.82637 1.33398 4.66732V11.334C1.33398 13.1749 2.82637 14.6673 4.66732 14.6673H11.334C13.1749 14.6673 14.6673 13.1749 14.6673 11.334V4.66732C14.6673 2.82637 13.1749 1.33398 11.334 1.33398Z"
      stroke="#F15A22"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6658 7.5802C10.7481 8.13503 10.6533 8.70168 10.395 9.19954C10.1367 9.69741 9.72792 10.1011 9.2269 10.3533C8.72589 10.6055 8.15812 10.6933 7.60434 10.6042C7.05057 10.515 6.53899 10.2536 6.14238 9.85697C5.74577 9.46036 5.48431 8.94878 5.3952 8.39501C5.30609 7.84124 5.39386 7.27346 5.64604 6.77245C5.89821 6.27144 6.30194 5.86269 6.79981 5.60436C7.29768 5.34603 7.86432 5.25126 8.41915 5.33353C8.9851 5.41746 9.50905 5.68118 9.91362 6.08574C10.3182 6.4903 10.5819 7.01425 10.6658 7.5802Z"
      stroke="#F15A22"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.666 4.33398H11.6723"
      stroke="#F15A22"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FacebookIcon = () => (
  <svg
    width="9"
    height="15"
    viewBox="0 0 9 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.83333 0.5H5.83333C4.94928 0.5 4.10143 0.851189 3.47631 1.47631C2.85119 2.10143 2.5 2.94928 2.5 3.83333V5.83333H0.5V8.5H2.5V13.8333H5.16667V8.5H7.16667L7.83333 5.83333H5.16667V3.83333C5.16667 3.65652 5.2369 3.48695 5.36193 3.36193C5.48695 3.2369 5.65652 3.16667 5.83333 3.16667H7.83333V0.5Z"
      stroke="#f97316"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LinkedInIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.14634 0C1.5771 0 1.03117 0.226132 0.628649 0.628649C0.226132 1.03117 0 1.5771 0 2.14634C0 2.71559 0.226132 3.26152 0.628649 3.66403C1.03117 4.06655 1.5771 4.29268 2.14634 4.29268C2.71559 4.29268 3.26152 4.06655 3.66403 3.66403C4.06655 3.26152 4.29268 2.71559 4.29268 2.14634C4.29268 1.5771 4.06655 1.03117 3.66403 0.628649C3.26152 0.226132 2.71559 0 2.14634 0ZM1.17073 2.14634C1.17073 1.88759 1.27352 1.63944 1.45648 1.45648C1.63944 1.27352 1.88759 1.17073 2.14634 1.17073C2.40509 1.17073 2.65324 1.27352 2.8362 1.45648C3.01916 1.63944 3.12195 1.88759 3.12195 2.14634C3.12195 2.40509 3.01916 2.65324 2.8362 2.8362C2.65324 3.01916 2.40509 3.12195 2.14634 3.12195C1.88759 3.12195 1.63944 3.01916 1.45648 2.8362C1.27352 2.65324 1.17073 2.40509 1.17073 2.14634ZM0 5.26829C0 5.11304 0.0616722 4.96415 0.17145 4.85438C0.281227 4.7446 0.430117 4.68293 0.585366 4.68293H3.70732C3.86257 4.68293 4.01146 4.7446 4.12123 4.85438C4.23101 4.96415 4.29268 5.11304 4.29268 5.26829V15.4146C4.29268 15.5699 4.23101 15.7188 4.12123 15.8286C4.01146 15.9383 3.86257 16 3.70732 16H0.585366C0.430117 16 0.281227 15.9383 0.17145 15.8286C0.0616722 15.7188 0 15.5699 0 15.4146V5.26829ZM1.17073 5.85366V14.8293H3.12195V5.85366H1.17073ZM5.46341 5.26829C5.46341 5.11304 5.52509 4.96415 5.63486 4.85438C5.74464 4.7446 5.89353 4.68293 6.04878 4.68293H9.17073C9.32598 4.68293 9.47487 4.7446 9.58465 4.85438C9.69442 4.96415 9.7561 5.11304 9.7561 5.26829V5.60702L10.0956 5.46107C10.681 5.21101 11.302 5.05431 11.936 4.99668C14.1019 4.8 16 6.50146 16 8.68683V15.4146C16 15.5699 15.9383 15.7188 15.8286 15.8286C15.7188 15.9383 15.5699 16 15.4146 16H12.2927C12.1374 16 11.9885 15.9383 11.8788 15.8286C11.769 15.7188 11.7073 15.5699 11.7073 15.4146V9.95122C11.7073 9.69247 11.6045 9.44432 11.4216 9.26136C11.2386 9.0784 10.9905 8.97561 10.7317 8.97561C10.473 8.97561 10.2248 9.0784 10.0418 9.26136C9.85888 9.44432 9.7561 9.69247 9.7561 9.95122V15.4146C9.7561 15.5699 9.69442 15.7188 9.58465 15.8286C9.47487 15.9383 9.32598 16 9.17073 16H6.04878C5.89353 16 5.74464 15.9383 5.63486 15.8286C5.52509 15.7188 5.46341 15.5699 5.46341 15.4146V5.26829ZM6.63415 5.85366V14.8293H8.58537V9.95122C8.58537 9.38197 8.8115 8.83604 9.21401 8.43353C9.61653 8.03101 10.1625 7.80488 10.7317 7.80488C11.301 7.80488 11.8469 8.03101 12.2494 8.43353C12.6519 8.83604 12.878 9.38197 12.878 9.95122V14.8293H14.8293V8.68683C14.8293 7.20078 13.5329 6.02693 12.0429 6.16273C11.531 6.20917 11.0296 6.33559 10.5569 6.53737L9.40176 7.03298C9.31266 7.07124 9.21545 7.08678 9.11887 7.07819C9.02228 7.0696 8.92935 7.03715 8.8484 6.98376C8.76746 6.93036 8.70105 6.8577 8.65514 6.77229C8.60923 6.68688 8.58525 6.59141 8.58537 6.49444V5.85366H6.63415Z"
      fill="#F15A22"
    />
  </svg>
);

export const MailIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
  >
    <rect
      x="1.5"
      y="3.5"
      width="13"
      height="9"
      rx="1.5"
      stroke="#F15A22"
      strokeWidth="1.2"
    />
    <path
      d="M2 5L8 9.5L14 5"
      stroke="#F15A22"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LinkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.66797 9.33233C6.94822 9.71634 7.30739 10.036 7.72135 10.2697C8.13531 10.5035 8.59449 10.646 9.06806 10.6877C9.54163 10.7293 10.0186 10.6692 10.4671 10.5113C10.9155 10.3535 11.325 10.1015 11.668 9.77233L13.668 7.77233C14.2931 7.14722 14.6443 6.29938 14.6443 5.41533C14.6443 4.53129 14.2931 3.68345 13.668 3.05833C13.0429 2.43322 12.195 2.08203 11.311 2.08203C10.4269 2.08203 9.57908 2.43322 8.95397 3.05833L7.80797 4.19833"
      stroke="#F15A22"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33372 6.66699C9.05347 6.28298 8.6943 5.96336 8.28034 5.7296C7.86638 5.49584 7.40721 5.35333 6.93363 5.31166C6.46006 5.26998 5.98305 5.3301 5.53463 5.48798C5.0862 5.64585 4.67674 5.89782 4.33372 6.22699L2.33372 8.22699C1.70861 8.8521 1.35742 9.69994 1.35742 10.584C1.35742 11.468 1.70861 12.3159 2.33372 12.941C2.95884 13.5661 3.80668 13.9173 4.69072 13.9173C5.57477 13.9173 6.42261 13.5661 7.04772 12.941L8.18772 11.801"
      stroke="#F15A22"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3333 4L6 11.3333L2.66667 8"
      stroke="orange"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ═════════════ Ֆայլ 2 ═════════════ */

// ՓՈԽՎԱԾ՝ InstagramIcon → InstagramLineIcon
export function InstagramLineIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ FacebookIcon → FacebookLineIcon
export function FacebookLineIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.33 1.33v2.67M10.67 1.33v2.67M2 6h12M3.33 2.67h9.34c.74 0 1.33.6 1.33 1.33v9.33c0 .74-.6 1.34-1.33 1.34H3.33c-.73 0-1.33-.6-1.33-1.34V4c0-.74.6-1.33 1.33-1.33Z"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ ArrowRightIcon → ArrowRightLongIcon
export function ArrowRightLongIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.33 4l4 4-4 4M13.33 8H2.67"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeftIcon({ style, ...props }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ transform: "rotate(180deg)", ...style }}
    >
      <path
        d="M9.33 4l4 4-4 4M13.33 8H2.67"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 2.67v10.66c0 .5.55.81.98.55l8.5-5.33a.65.65 0 0 0 0-1.1L4.98 2.12c-.43-.26-.98.05-.98.55Z"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GraduationCapIcon(props: IconProps) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 4.58 1.83 9.17 11 13.75l9.17-4.58L11 4.58Z"
        stroke="currentColor"
        strokeWidth="1.83"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 11.46v4.58c0 1.01 2.46 1.83 5.5 1.83s5.5-.82 5.5-1.83v-4.58"
        stroke="currentColor"
        strokeWidth="1.83"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.17 9.17v5.5"
        stroke="currentColor"
        strokeWidth="1.83"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VideoIcon({
  className = "w-[16px] h-[16px]",
  ...props
}: IconProps & { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M20.17 6.88 14.67 9.9v2.2l5.5 3.03V6.88Z"
        stroke="currentColor"
        strokeWidth="1.83"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1.83"
        y="5.5"
        width="12.83"
        height="11"
        rx="1.83"
        stroke="currentColor"
        strokeWidth="1.83"
      />
    </svg>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.67 18.33V9.17M11 18.33V3.67M18.33 18.33v-6.41"
        stroke="currentColor"
        strokeWidth="1.83"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GlobeIcon({
  className = "w-[16px] h-[16px]",
  ...props
}: IconProps & { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle
        cx="11"
        cy="11"
        r="9.17"
        stroke="currentColor"
        strokeWidth="1.83"
      />
      <path
        d="M1.83 11h18.34M11 1.83c2.29 2.51 3.58 5.78 3.67 9.17-.09 3.39-1.38 6.66-3.67 9.17-2.29-2.51-3.58-5.78-3.67-9.17.09-3.39 1.38-6.66 3.67-9.17Z"
        stroke="currentColor"
        strokeWidth="1.83"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.13 19.25v-1.83a3.67 3.67 0 0 0-3.67-3.67H4.58a3.67 3.67 0 0 0-3.67 3.67v1.83"
        stroke="currentColor"
        strokeWidth="1.83"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8.25"
        cy="6.42"
        r="3.67"
        stroke="currentColor"
        strokeWidth="1.83"
      />
      <path
        d="M21.42 19.25v-1.83a3.67 3.67 0 0 0-2.75-3.55M14.67 2.87a3.67 3.67 0 0 1 0 7.1"
        stroke="currentColor"
        strokeWidth="1.83"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ BookIcon → BookOpenIcon
export function BookOpenIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 5.83c0-1.84-1.49-3.33-3.33-3.33H1.67v13.33h5.83c1.38 0 2.5 1.12 2.5 2.5V5.83Z"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 5.83c0-1.84 1.49-3.33 3.33-3.33h5v13.33h-5.83c-1.38 0-2.5 1.12-2.5 2.5V5.83Z"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.33 1.67H5a2.5 2.5 0 0 0-2.5 2.5v11.66A2.5 2.5 0 0 0 5 18.33h10a2.5 2.5 0 0 0 2.5-2.5V6.67L13.33 1.67Z"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 1.67v5h5"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.67 9.17h6.66M6.67 12.5h6.66M6.67 15.83h4.16"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AwardIcon(props: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="10"
        cy="7.5"
        r="5.83"
        stroke="currentColor"
        strokeWidth="1.67"
      />
      <path
        d="M6.75 12.63 5.83 18.33 10 16.25l4.17 2.08-.92-5.7"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DesktopIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="2"
        y="3"
        width="16"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.67"
      />
      <path
        d="M7 17h6M10 15v2"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.75 10.6v1.88a1.25 1.25 0 0 1-1.36 1.25 12.36 12.36 0 0 1-5.39-1.92 12.19 12.19 0 0 1-3.75-3.75A12.36 12.36 0 0 1 1.28 2.66 1.25 1.25 0 0 1 2.52 1.3h1.88a1.25 1.25 0 0 1 1.25 1.07c.08.6.23 1.19.44 1.75a1.25 1.25 0 0 1-.28 1.32l-.8.8a10 10 0 0 0 3.75 3.75l.8-.8a1.25 1.25 0 0 1 1.32-.28c.56.21 1.15.36 1.75.44a1.25 1.25 0 0 1 1.08 1.26Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EmailIcon(props: IconProps) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="1.25"
        y="2.5"
        width="12.5"
        height="10"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M1.9 3.4 7.5 8l5.6-4.6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.9 2.1A6.9 6.9 0 0 0 1.9 10L1.25 13.75l3.83-.63a6.9 6.9 0 0 0 9.83-6.19 6.87 6.87 0 0 0-2.01-4.83Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClockIcon({
  className = "w-[11px] h-[11px]",
  ...props
}: IconProps & { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M8 4.5V8L10.5 9.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckCircleBig(props: IconProps) {
  return (
    <svg
      width="26"
      height="18"
      viewBox="0 0 26 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 9.5 9.5 15.5 23.5 2.5"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="1.5"
        y="4.5"
        width="8"
        height="5.5"
        rx="1"
        stroke="currentColor"
        strokeWidth="0.92"
      />
      <path
        d="M3.17 4.5V3a2.33 2.33 0 0 1 4.66 0v1.5"
        stroke="currentColor"
        strokeWidth="0.92"
      />
    </svg>
  );
}

export function CursorIcon(props: IconProps) {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24.6788 24.6769L20.9288 34.0519L13.4288 13.4269L34.0538 20.9269L24.6788 24.6769ZM24.6788 24.6769L34.0538 34.0519M10.0313 0.75L11.4881 6.18188M6.18375 11.4863L0.75 10.0294M22.71 4.14563L18.7313 8.12438M8.12438 18.7294L4.14938 22.7081"
        stroke="#F15A22"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LevelIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="8" width="2.5" height="5" rx="0.75" fill="currentColor" />
      <rect
        x="5.75"
        y="5"
        width="2.5"
        height="8"
        rx="0.75"
        fill="currentColor"
      />
      <rect
        x="10.5"
        y="1"
        width="2.5"
        height="12"
        rx="0.75"
        fill="currentColor"
      />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ ChevronIcon → ChevronToggleIcon
export function ChevronToggleIcon({
  open,
  ...props
}: IconProps & { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`w-[13px] h-[13px] text-gray-600 transition-transform ${open ? "rotate-180" : ""}`}
      {...props}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="w-[16px] h-[16px] text-orange-500 mt-[2px]"
      {...props}
    >
      <path
        d="M4 6.5C4 4 5.8 2.5 8 2.5C10.2 2.5 12 4 12 6.5V9L13 11H3L4 9V6.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 13.5C6.9 14.1 7.4 14.4 8 14.4C8.6 14.4 9.1 14.1 9.5 13.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronArrow({
  direction,
  ...props
}: IconProps & { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="w-[16px] h-[16px] text-gray-800"
      {...props}
    >
      <path
        d={
          direction === "left"
            ? "M10 3.5L5.5 8L10 12.5"
            : "M6 3.5L10.5 8L6 12.5"
        }
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ CheckIcon → CheckOrangeIcon
export function CheckOrangeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="w-[14px] h-[14px] text-orange-500"
      {...props}
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarEmptyIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      className="w-[26px] h-[26px]"
      {...props}
    >
      <path
        d="M8 3V7M18 3V7"
        stroke="#C0C0C5"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="5.5"
        width="18"
        height="17"
        rx="3"
        stroke="#C0C0C5"
        strokeWidth="2.2"
      />
      <path d="M4 11H22" stroke="#C0C0C5" strokeWidth="2.2" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 3.33v9.34M3.33 8h9.34"
        stroke="#666666"
        strokeWidth="1.33"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RemoveIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13 5 5 13M5 5l8 8"
        stroke="#666666"
        strokeWidth="1.33"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const SelectedCheckIcon = ({ className }: ClassNameProps) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2.9 7.3 5.7 10 11.1 3.7"
      stroke="#F15A22"
      strokeWidth="1.17"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DropdownChevronIcon = ({ className }: ClassNameProps) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TimezoneCheckIcon = ({ className }: ClassNameProps) => (
  <svg className={className} viewBox="0 0 10 7" fill="none" aria-hidden="true">
    <path
      d="M1 3.5L3.5 6L9 1"
      stroke="#F15A22"
      strokeWidth="1.16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ContinueArrowIcon = ({ className }: ClassNameProps) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3.333 8h9.334M8 3.333L12.667 8 8 12.667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ═════════════ Ֆայլ 3 (size prop-ով) ═════════════ */

// ՓՈԽՎԱԾ՝ BookIcon → BookFilledIcon
export function BookFilledIcon({ size = 16, ...props }: SizedIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M2 3.5C3.2 3 5 3 8 4.5V13C5 11.5 3.2 11.5 2 12V3.5Z" />
      <path d="M14 3.5C12.8 3 11 3 8 4.5V13C11 11.5 12.8 11.5 14 12V3.5Z" />
    </svg>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function MonitorIcon({ size = 16, ...props }: SizedIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      {...stroke}
      stroke="#F15A22"
      {...props}
    >
      <rect x="2" y="2.5" width="12" height="8.5" rx="1" />
      <path d="M6 14H10M8 11V14" />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ ArrowRightIcon → ArrowRightSizedIcon
export function ArrowRightSizedIcon({ size = 16, ...props }: SizedIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      {...stroke}
      {...props}
    >
      <path d="M3 8H13M9 4L13 8L9 12" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 16, ...props }: SizedIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.33}
      {...props}
    >
      <path d="M10 4L6 8L10 12" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 16, ...props }: SizedIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.33}
      {...props}
    >
      <path d="M6 4L10 8L6 12" />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ LevelIcon → LevelOutlineIcon
export function LevelOutlineIcon({ size = 12, ...props }: SizedIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="#F15A22"
      aria-hidden="true"
      {...props}
    >
      <path d="M3.3 12H0V7.2H3.3V12ZM1.2 10.8H2.1V8.4H1.2V10.8ZM7.5 12H4.2V3.6H7.5V12ZM5.4 10.8H6.3V4.8H5.4V10.8ZM12 12H8.7V0H12V12ZM9.9 10.8H10.8V1.2H9.9V10.8Z" />
    </svg>
  );
}

export function ShieldIcon({ size = 16, ...props }: SizedIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="#F15A22"
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 1.33398L2 4.00065V8.00065C2 11.2006 4.56 14.1873 8 15.334C11.44 14.1873 14 11.2006 14 8.00065V4.00065L8 1.33398Z" />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ CheckIcon → CheckSmallIcon
export function CheckSmallIcon({ size = 10, ...props }: SizedIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2 5.2 4.1 7.3 8 3"
        stroke="#F15A22"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Svg({ size = 16, children, ...props }: SizedIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ UsersIcon → UsersLineIcon
export const UsersLineIcon = (p: SizedIconProps) => (
  <Svg {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);

export const CertificateIcon = (p: SizedIconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </Svg>
);

// ՓՈԽՎԱԾ՝ ChevronDownIcon → ChevronDownSizedIcon
export const ChevronDownSizedIcon = (p: SizedIconProps) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const CloseIcon = (p: SizedIconProps) => (
  <Svg {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Svg>
);

/* ═════════════ Ֆայլ 4 ═════════════ */

// ՓՈԽՎԱԾ՝ DownloadIcon → DownloadOrangeIcon
export const DownloadOrangeIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 16 16"
    fill="none"
    stroke="#F15A22"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
  </svg>
);

// ՓՈԽՎԱԾ՝ ShareIcon → ShareNodesIcon
export const ShareNodesIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    stroke="#999"
    strokeWidth="1.27"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="4" cy="8" r="1.8" />
    <circle cx="12" cy="3.5" r="1.8" />
    <circle cx="12" cy="12.5" r="1.8" />
    <path d="M5.6 7.1 10.4 4.4M5.6 8.9l4.8 2.7" />
  </svg>
);

// ՓՈԽՎԱԾ՝ HeartIcon → HeartGrayIcon
export const HeartGrayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#999">
    <path d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 2.9 5 6.4 5c2 0 3.6 1.1 4.4 2.6h.4C12 6.1 13.6 5 15.6 5 19.1 5 21 8.6 19.6 11.8 19.5 11.9 12 21 12 21Z" />
  </svg>
);

export const ChevronLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="#666"
    strokeWidth="1.33"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 4 6 8l3.5 4" />
  </svg>
);

export const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="#666"
    strokeWidth="1.33"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6.5 4 10 8l-3.5 4" />
  </svg>
);

// ՓՈԽՎԱԾ՝ GlobeIcon → GlobeGrayIcon
export function GlobeGrayIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8.00065 14.6663C11.6825 14.6663 14.6673 11.6816 14.6673 7.99967C14.6673 4.31778 11.6825 1.33301 8.00065 1.33301C4.31875 1.33301 1.33398 4.31778 1.33398 7.99967C1.33398 11.6816 4.31875 14.6663 8.00065 14.6663Z"
        stroke="#999999"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33398 7.99967C5.33398 5.5175 6.28881 3.13044 8.00065 1.33301C9.71249 3.13044 10.6673 5.5175 10.6673 7.99967C10.6673 10.4818 9.71249 12.8689 8.00065 14.6663C6.28881 12.8689 5.33398 10.4818 5.33398 7.99967Z"
        stroke="#999999"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.33398 8H14.6673"
        stroke="#999999"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ ClockIcon → ClockGrayIcon
export function ClockGrayIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8.00065 14.6663C11.6825 14.6663 14.6673 11.6816 14.6673 7.99967C14.6673 4.31778 11.6825 1.33301 8.00065 1.33301C4.31875 1.33301 1.33398 4.31778 1.33398 7.99967C1.33398 11.6816 4.31875 14.6663 8.00065 14.6663Z"
        stroke="#999999"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 4V8L10.6667 9.33333"
        stroke="#999999"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ BookIcon → BookOpenOrangeIcon
export const BookOpenOrangeIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M8.5 5v9.5M1.42 4.25v9.4c2.4-1.1 5.05-.5 7.08 1.35 2.03-1.85 4.68-2.45 7.08-1.35v-9.4C13.15 3.15 10.5 3.75 8.5 5.6 6.5 3.75 3.85 3.15 1.42 4.25Z"
      stroke="#F15A22"
      strokeWidth="1.42"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ՓՈԽՎԱԾ՝ CloseIcon → CloseGrayIcon
export const CloseGrayIcon = ({ className }: ClassNameProps) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke="#999999"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ՓՈԽՎԱԾ՝ CheckIcon → CheckBoldIcon
export const CheckBoldIcon = ({ className }: ClassNameProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

/* ═════════════ Ֆայլ 5 (միայն յուրահատուկները) ═════════════ */

// ՓՈԽՎԱԾ՝ EmailIcon → EmailLargeIcon
export function EmailLargeIcon(props: IconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ WhatsAppIcon → WhatsAppLargeIcon
export function WhatsAppLargeIcon(props: IconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ PhoneIcon → PhoneLargeIcon
export function PhoneLargeIcon(props: IconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ ClockIcon → ClockBoldIcon
export function ClockBoldIcon(props: IconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="8" cy="8" r="6.67" stroke="currentColor" strokeWidth="1.33" />
      <path
        d="M8 4.67V8l2.33 1.33"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const GoogleIcon = ({ className }: ClassNameProps) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const SpinnerIcon = ({ className }: ClassNameProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle
      className="opacity-40"
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="3"
    />
    <path fill="currentColor" d="M12 3v9h9A9 9 0 0012 3z" />
  </svg>
);

export function StarIcon({
  size = 14,
  filled = true,
  className = "",
  ...props
}: StarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`shrink-0 ${filled ? "" : "opacity-20"} ${className}`}
      {...props}
    >
      <path
        d="M6.72332 1.33804C6.74888 1.28639 6.78837 1.24292 6.83733 1.21252C6.88629 1.18213 6.94277 1.16602 7.0004 1.16602C7.05803 1.16602 7.11451 1.18213 7.16347 1.21252C7.21243 1.24292 7.25192 1.28639 7.27748 1.33804L8.62498 4.06746C8.71375 4.2471 8.84479 4.40253 9.00685 4.52039C9.1689 4.63825 9.35714 4.71502 9.5554 4.74412L12.5689 5.18512C12.626 5.1934 12.6796 5.21748 12.7238 5.25466C12.7679 5.29183 12.8007 5.34061 12.8186 5.39548C12.8364 5.45034 12.8386 5.50911 12.8247 5.56513C12.8109 5.62115 12.7817 5.67218 12.7404 5.71246L10.5611 7.83462C10.4173 7.97468 10.3098 8.14757 10.2477 8.33841C10.1856 8.52924 10.1709 8.73231 10.2046 8.93012L10.7192 11.9285C10.7292 11.9855 10.7231 12.0443 10.7014 12.098C10.6797 12.1518 10.6433 12.1983 10.5964 12.2324C10.5495 12.2664 10.494 12.2866 10.4362 12.2907C10.3783 12.2947 10.3206 12.2824 10.2694 12.2551L7.57557 10.8388C7.39807 10.7456 7.20059 10.6969 7.00011 10.6969C6.79963 10.6969 6.60215 10.7456 6.42465 10.8388L3.7314 12.2551C3.68026 12.2822 3.62255 12.2944 3.56483 12.2903C3.50711 12.2862 3.4517 12.266 3.40491 12.2319C3.35811 12.1979 3.3218 12.1514 3.30012 12.0978C3.27843 12.0441 3.27223 11.9855 3.28223 11.9285L3.79615 8.93071C3.8301 8.7328 3.81539 8.52961 3.7533 8.33865C3.6912 8.1477 3.58359 7.97471 3.43973 7.83462L1.2604 5.71304C1.21875 5.67281 1.18923 5.62169 1.17521 5.5655C1.16119 5.50931 1.16324 5.45032 1.18111 5.39523C1.19899 5.34015 1.23197 5.2912 1.27631 5.25395C1.32065 5.2167 1.37456 5.19265 1.4319 5.18454L4.44482 4.74412C4.6433 4.71525 4.83179 4.63857 4.99407 4.5207C5.15635 4.40282 5.28756 4.24728 5.3764 4.06746L6.72332 1.33804Z"
        fill="#F15A22"
        stroke="#F15A22"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═════════════ Ֆայլ 6 ═════════════ */

// ՓՈԽՎԱԾ՝ ArrowRightIcon → ArrowRight24Icon
export function ArrowRight24Icon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ HeartIcon → HeartOutlineIcon
export function HeartOutlineIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
    </svg>
  );
}

export function LightbulbIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

// ՓՈԽՎԱԾ՝ StarIcon → StarSolidIcon
export function StarSolidIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" />
    </svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

/* ═════════════ Ֆայլ 7 (text-orange-500 wrapper-ով) ═════════════ */

function BaseIcon({
  size = 18,
  children,
  className,
  ...props
}: SizedIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`text-orange-500${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </svg>
  );
}

export const SendIcon = (p: SizedIconProps) => (
  <BaseIcon size={15} {...p}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </BaseIcon>
);

// ՓՈԽՎԱԾ՝ PhoneIcon → PhoneOrangeIcon
export const PhoneOrangeIcon = (p: SizedIconProps) => (
  <BaseIcon {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </BaseIcon>
);

// ՓՈԽՎԱԾ՝ MailIcon → MailOrangeIcon
export const MailOrangeIcon = (p: SizedIconProps) => (
  <BaseIcon {...p}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </BaseIcon>
);

// ՓՈԽՎԱԾ՝ ClockIcon → ClockOrangeIcon
export const ClockOrangeIcon = (p: SizedIconProps) => (
  <BaseIcon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </BaseIcon>
);

// ՓՈԽՎԱԾ՝ InstagramIcon → InstagramOrangeIcon
export const InstagramOrangeIcon = (p: SizedIconProps) => (
  <BaseIcon size={15} {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </BaseIcon>
);

// ՓՈԽՎԱԾ՝ FacebookIcon → FacebookOrangeIcon
export const FacebookOrangeIcon = (p: SizedIconProps) => (
  <BaseIcon size={15} {...p}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </BaseIcon>
);

// ՓՈԽՎԱԾ՝ YoutubeIcon → YoutubeOrangeIcon
export const YoutubeOrangeIcon = (p: SizedIconProps) => (
  <BaseIcon size={18} {...p}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </BaseIcon>
);

/* ═════════════ Dashboard icons ═════════════ */

function DashBase({
  size = 16,
  children,
  ...props
}: Props & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const DashLessonsIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </DashBase>
);

export const DashCalendarIcon = (p: Props) => (
  <DashBase {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </DashBase>
);

export const DashHomeworkIcon = (p: Props) => (
  <DashBase {...p}>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </DashBase>
);

export const DashMaterialsIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </DashBase>
);

export const DashMessagesIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </DashBase>
);

export const DashCoursesIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M22 10 12 5 2 10l10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5M22 10v6" />
  </DashBase>
);

export const DashProfileIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </DashBase>
);

export const DashSettingsIcon = (p: Props) => (
  <DashBase {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </DashBase>
);

export const DashBackIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 22V12h6v10" />
  </DashBase>
);

export const DashLogoutIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </DashBase>
);

export const DashBellIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </DashBase>
);

export const DashChevronDownIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="m6 9 6 6 6-6" />
  </DashBase>
);

export const DashChevronLeftIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="m15 18-6-6 6-6" />
  </DashBase>
);

export const DashChevronRightIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="m9 18 6-6-6-6" />
  </DashBase>
);

export const DashUploadIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m17 8-5-5-5 5" />
    <path d="M12 3v12" />
  </DashBase>
);

export const DashDownloadIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5" />
    <path d="M12 15V3" />
  </DashBase>
);

export const DashAlertCircleIcon = (p: Props) => (
  <DashBase {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </DashBase>
);

export const DashCheckCircleIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m22 4-10 10.01-3-3" />
  </DashBase>
);

export const DashClockIcon = (p: Props) => (
  <DashBase {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </DashBase>
);

export const DashCloseIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </DashBase>
);

export const DashEyeIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </DashBase>
);

export const DashVideoIcon = (p: Props) => (
  <DashBase {...p}>
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="m10 9 5 3-5 3z" />
  </DashBase>
);

export const DashPenIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
  </DashBase>
);

export const DashGlobeIcon = (p: Props) => (
  <DashBase {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </DashBase>
);

export const DashPaperclipIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </DashBase>
);

export const DashSendIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="m22 2-7 20-4-9-9-4z" />
    <path d="M22 2 11 13" />
  </DashBase>
);

export const DashMegaphoneIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </DashBase>
);

/* ═════════════ Course icons ═════════════ */

export const CourseSearchIcon: DashIcon = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    {...stroke}
    {...props}
    className={`block shrink-0 ${props.className ?? ""}`}
  >
    <circle cx="7" cy="7" r="4.5" />
    <path d="m13.5 13.5-3-3" />
  </svg>
);

export const CourseChevronDownIcon: DashIcon = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" {...stroke} {...props}>
    <path d="m4 6 4 4 4-4" />
  </svg>
);

export const CourseBookIcon: DashIcon = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" {...stroke} {...props}>
    <path d="M2 3.2c1.9-.5 3.9-.2 6 .9 2.1-1.1 4.1-1.4 6-.9v8.9c-1.9-.5-3.9-.2-6 .9-2.1-1.1-4.1-1.4-6-.9V3.2Z" />
    <path d="M8 4.1v8.9" />
  </svg>
);

export const CourseLevelIcon: DashIcon = ({ size = 12, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="#F15A22"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path d="M3.3 12H0V7.2H3.3V12ZM1.2 10.8H2.1V8.4H1.2V10.8ZM7.5 12H4.2V3.6H7.5V12ZM5.4 10.8H6.3V4.8H5.4V10.8ZM12 12H8.7V0H12V12ZM9.9 10.8H10.8V1.2H9.9V10.8Z" />
  </svg>
);

export const CourseMonitorIcon: DashIcon = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" {...stroke} {...props}>
    <rect x="2" y="2.67" width="12" height="8.67" rx="1" />
    <path d="M5.33 13.33h5.34M8 11.33v2" />
  </svg>
);

export const CourseMapPinIcon: DashIcon = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    {...stroke}
    strokeWidth={1}
    {...props}
  >
    <path d="M13.33 6.67c0 3.33-5.33 8-5.33 8s-5.33-4.67-5.33-8a5.33 5.33 0 1 1 10.66 0Z" />
    <circle cx="8" cy="6.67" r="1.67" />
  </svg>
);

export const DashCardIcon = (p: Props) => (
  <DashBase {...p}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </DashBase>
);

export const DashAwardIcon = (p: Props) => (
  <DashBase {...p}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" />
  </DashBase>
);

export const DashPackageIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
    <path d="m3 8 9 5 9-5M12 13v8" />
  </DashBase>
);

export const DashArrowRightIcon = (p: Props) => (
  <DashBase {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </DashBase>
);

export const DashHeartIcon = ({
  filled = false,
  ...p
}: Props & { filled?: boolean }) => (
  <DashBase {...p} fill={filled ? "currentColor" : "none"}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
  </DashBase>
);

export const DashShareIcon = (p: Props) => (
  <DashBase {...p}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
  </DashBase>
);

export const DashHelpCircleIcon = (p: Props) => (
  <DashBase {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </DashBase>
);

/* ═════════════ Settings icons ═════════════ */

function SettingsBase({ size = 16, children, ...props }: SettingsIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ───────────── Tab icons ───────────── */

export const SettingsUserIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </SettingsBase>
);

export const SettingsBellIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </SettingsBase>
);

export const SettingsShieldIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />
  </SettingsBase>
);

export const SettingsLanguageIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
  </SettingsBase>
);

/* ───────────── Field icons ───────────── */

export const SettingsMailIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </SettingsBase>
);

export const SettingsPhoneIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </SettingsBase>
);

export const SettingsGlobeIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </SettingsBase>
);

export const SettingsMapPinIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </SettingsBase>
);

export const SettingsClockIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </SettingsBase>
);

export const SettingsCalendarIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </SettingsBase>
);

/* ───────────── Actions ───────────── */

export const SettingsUploadIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m17 8-5-5-5 5" />
    <path d="M12 3v12" />
  </SettingsBase>
);

export const SettingsChevronDownIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <path d="m6 9 6 6 6-6" />
  </SettingsBase>
);

export const SettingsCheckIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <path d="M20 6 9 17l-5-5" />
  </SettingsBase>
);

export const SettingsLogoutIcon: SettingsIcon = (p) => (
  <SettingsBase {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </SettingsBase>
);
