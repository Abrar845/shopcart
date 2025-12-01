import { cn } from "@/lib/utils";

interface Props {
  amount?: number;
  className?: string;
  symbolClassName?: string; // optional: style symbol separately
}

const PriceFormatter = ({ amount, className, symbolClassName }: Props) => {
  if (amount == null) return null;

  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(amount);

  return (
    <span className={cn("text-sm font-semibold text-darkColor", className)}>
      <span className={cn("mr-1", symbolClassName)}>৳</span>
      <span>{formattedNumber}</span>
    </span>
  );
};

export default PriceFormatter;
