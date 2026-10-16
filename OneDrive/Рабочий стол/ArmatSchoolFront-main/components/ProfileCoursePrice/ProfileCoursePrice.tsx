interface CoursePriceProps {
  price: number;
  oldPrice?: number;
}

export default function ProfileCoursePrice({ price, oldPrice }: CoursePriceProps) {
  return (
    <div className="flex items-center justify-end gap-[5px]">
      <span className="text-base font-semibold leading-6 text-[#F15A22]">${price}</span>
      {oldPrice !== undefined && (
        <span className="text-[10px] leading-[15px] text-[#BBB] line-through">${oldPrice}</span>
      )}
    </div>
  );
}
