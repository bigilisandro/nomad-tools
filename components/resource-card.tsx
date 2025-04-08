import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { categories } from "@/app/data/resources";

interface ResourceCardProps {
  id?: string;
  name: string;
  description: string;
  url: string;
  category: string;
  color: string;
  imageUrl?: string;
  featured?: boolean;
  logoPreview?: string;
  preview?: boolean;
}

export function ResourceCard({
  id,
  name,
  description,
  url,
  category,
  color,
  imageUrl,
  featured = false,
  logoPreview,
  preview = false,
}: ResourceCardProps) {
  const categoryName =
    categories.find((c) => c.id === category)?.name || category;

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (preview) {
      return <div>{children}</div>;
    }
    return (
      <Link href={url} target="_blank" className="block">
        {children}
      </Link>
    );
  };

  return (
    <CardWrapper>
      <Card
        className="overflow-hidden h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1 border-t-4"
        // style={{ borderTopColor: color }}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div
              className="w-12 h-12 rounded-md flex items-center justify-center overflow-hidden"
              //style={{ backgroundColor: color === "#FFFFFF" ? "#F8F9FA" : color }}
              style={{
                backgroundColor: "#FFFFFF",
              }}
            >
              {logoPreview ? (
                <Image
                  src={logoPreview || "/placeholder.svg"}
                  alt={`${name} logo`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              ) : imageUrl ? (
                <Image
                  src={
                    imageUrl ||
                    `/placeholder.svg?height=48&width=48&text=${name.charAt(0)}`
                  }
                  alt={`${name} logo`}
                  width={48}
                  height={48}
                  className="object-contain"
                  onError={(e) => {
                    // Fallback to first letter if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = `/placeholder.svg?height=48&width=48&text=${name.charAt(0)}`;
                  }}
                />
              ) : (
                <div className="text-white text-xl font-bold">
                  {name ? name.charAt(0) : "?"}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                {categoryName}
              </Badge>
              {featured && (
                <Star className="h-5 w-5 text-primary fill-primary" />
              )}
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
