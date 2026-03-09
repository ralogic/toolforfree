import { TOOLS_CATALOG, searchTools, type ToolItem } from '@/lib/tools-catalog';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const category = searchParams.get('category');

  try {
    let tools: ToolItem[] = TOOLS_CATALOG.allTools;

    // Validate and filter by search query
    if (query && query.trim()) {
      const sanitizedQuery = query.trim().slice(0, 100); // Limit query length
      tools = searchTools(sanitizedQuery);
    }

    // Validate and filter by category
    if (category && category !== 'all') {
      const validCategories = ['pdf', 'image', 'text', 'developer', 'utility'];
      
      if (!validCategories.includes(category)) {
        return Response.json(
          { success: false, error: 'Invalid category parameter' },
          { status: 400 }
        );
      }

      const categoryMap: Record<string, string> = {
        pdf: 'PDF Tools',
        image: 'Image Tools',
        text: 'Text Tools',
        developer: 'Developer Tools',
        utility: 'Utility Tools'
      };
      
      const categoryName = categoryMap[category];
      if (categoryName) {
        tools = tools.filter(tool => tool.category === categoryName);
      }
    }

    return Response.json({
      success: true,
      count: tools.length,
      tools,
      categories: {
        pdf: TOOLS_CATALOG.pdfTools.length,
        image: TOOLS_CATALOG.imageTools.length,
        text: TOOLS_CATALOG.textTools.length,
        developer: TOOLS_CATALOG.developerTools.length,
        utility: TOOLS_CATALOG.utilityTools.length
      }
    }, {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { 
        success: false, 
        error: 'Failed to fetch tools',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
