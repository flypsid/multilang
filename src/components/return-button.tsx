import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

interface ReturnButtonProps {
  href: string;
  label: string;
  className?: string;
}

export const ReturnButton = ({ href, label, className }: ReturnButtonProps) => {
  return (
    <Button size="sm" asChild className={className}>
      <Link href={href}>
        <ArrowLeftIcon /> <span>{label}</span>
      </Link>
    </Button>
  );
};
