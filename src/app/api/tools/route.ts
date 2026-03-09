import { TOOLS_CATALOG, searchTools } from '@/lib/tools-catalog';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const category = searchParams.get('category');

  try {
    let tools = TOOLS_CATALOG.allTools;

    // Filter by search query
    if (query && query.trim()) {
      tools = searchTools(query);
    }

    // Filter by category
    if (category && category !== 'all') {
      const categoryMap = {
        pdf: 'PDF Tools',
        image: 'Image Tools',
        text: 'Text Tools',
        developer: 'Developer Tools',
        utility: 'Utility Tools'
      };
      const categoryName = categoryMap[category as keyof typeof categoryMap];
      if (categoryName) {
        tools = tools.filter(tool => tool.category === categoryName);
      }
    }

    return Response.json({
      success: true,
      count: tools.length,
      tools,
      categories: {
        pdf: 5,
        image: 5,
        text: 5,
        developer: 5,
        utility: 5
      }
    });
  } catch (error) {
    return Response.json(
      { success: false, error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}
