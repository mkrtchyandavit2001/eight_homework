import Link from "next/link";
import Container from "@/components/Container";
import type { PageHeroProps } from "@/types/types";



export default function PageHero({ breadcrumbs, title, description }: PageHeroProps) {
  return (
    <div className="bg-[#F7F7F7] py-5 mt-16">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-1 flex flex-wrap items-center gap-1.5 text-[13px]">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;

            return (
              <span key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span aria-hidden className="text-xs text-[#DDDDDD]">
                    /
                  </span>
                )}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="font-medium text-[#999999] transition-colors hover:text-[#2D2D2D]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-[#2D2D2D]">{crumb.label}</span>
                )}
              </span>
            );
          })}
        </nav>

        <h1 className="pt-1 text-[32px] font-medium leading-[1.15] tracking-[-1px] text-[#2D2D2D] sm:text-[48px] sm:leading-[64px] sm:tracking-[-1.5px]">
          {title}
        </h1>

        {description && (
          <p className="max-w-[600px] pt-2 text-base leading-[26px] text-[#666666]">{description}</p>
        )}
      </Container>
    </div>
  );
}