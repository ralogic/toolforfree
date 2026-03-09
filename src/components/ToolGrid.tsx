import ToolCard from '@/components/ToolCard';

interface ToolGridProps {
  tools: {
    name: string;
    slug: string;
    icon: string;
    description: string;
    category: string;
  }[];
}

export default function ToolGrid({ tools }: ToolGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <ToolCard
          key={tool.slug}
          name={tool.name}
          slug={tool.slug}
          description={tool.description}
          icon={tool.icon}
          category={tool.category}
        />
      ))}
    </div>
  );
}
