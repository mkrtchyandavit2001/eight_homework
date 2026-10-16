import type { ArticleHeroProps } from "@/types/types";


export default function ArticleHero({ title, subtitle, image }: ArticleHeroProps) {
  return (
    <div className="flex w-full items-center gap-5 border-b-2 border-[#F15A22] pb-4 max-lg:flex-col">
      <div className="flex flex-1 flex-col justify-between gap-6 py-10">
        <h1 className="pl-5 text-[40px] font-semibold leading-[130%] tracking-[-1px] text-[#2D2D2D]">
          {title}
        </h1>
        <p className="pl-2.5 text-base font-medium leading-[162%] text-[#2D2D2D]">
          {subtitle}
        </p>
      </div>

      <div
        className="h-[296px] w-full max-w-[590px] flex-1 rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        role="img"
        aria-label={title}
      />
    </div>
  );
}