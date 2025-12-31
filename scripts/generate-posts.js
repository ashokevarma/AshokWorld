/**
 * Pre-build script to generate posts data as JSON
 * This runs before the Next.js build to create static posts data
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'lib', 'posts-data.json');

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function countWords(content) {
  return content.trim().split(/\s+/).length;
}

function getAllPosts() {
  const posts = [];
  const categories = ['ai', 'cloud', 'infra', 'database'];

  for (const category of categories) {
    const categoryPath = path.join(CONTENT_DIR, category);
    
    if (!fs.existsSync(categoryPath)) {
      console.log(`Category folder not found: ${category}`);
      continue;
    }

    const files = fs.readdirSync(categoryPath);
    
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;

      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      if (!data.published) continue;

      const slug = file.replace('.mdx', '');
      
      posts.push({
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category,
        tags: data.tags || [],
        image: data.image,
        published: data.published,
        featured: data.featured || false,
        readingTime: calculateReadingTime(content),
        wordCount: countWords(content),
        content: content, // Include content for individual post pages
      });
    }
  }

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

console.log('📝 Generating posts data...');

const posts = getAllPosts();

console.log(`Found ${posts.length} published posts`);

// Write to JSON file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));

console.log(`✅ Posts data written to ${OUTPUT_FILE}`);

