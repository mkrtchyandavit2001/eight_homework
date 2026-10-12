export const getCartTicketPricing = (item) => {
  const quantity = Number(item?.quantity) || 0;
  const total = Number(item?.total_price) || 0;
  const std = item?.standard;

  const unitPrice = quantity > 0 ? total / quantity : 0;

  if (!std || !std.discount_type) {
    return { hasDiscount: false, unitPrice, total };
  }

  const oldTotal = Number(std.total_price) || 0;

  return {
    hasDiscount: true,
    unitPrice,
    oldUnitPrice: quantity > 0 ? oldTotal / quantity : 0,
    oldTotal,
    discountTotal: Number(std.discount_total) || 0,
    discountType: std.discount_type,
    discountValue: std.discount_value,
    total,
  };
};