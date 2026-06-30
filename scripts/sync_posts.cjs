const fs = require('fs');
const path = require('path');
const vm = require('vm');

function run() {
  const newsPath = path.join(__dirname, '..', 'src', 'pages', 'News.jsx');
  if (!fs.existsSync(newsPath)) {
    console.error(`Error: News.jsx not found at ${newsPath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(newsPath, 'utf8');

  // Extract the const posts = [ ... ] declaration
  const postsStartIndex = fileContent.indexOf('const posts = [');
  if (postsStartIndex === -1) {
    console.error('Error: Could not find "const posts = [" in News.jsx');
    process.exit(1);
  }

  const topicsIndex = fileContent.indexOf('const topics =');
  if (topicsIndex === -1) {
    console.error('Error: Could not find "const topics =" in News.jsx');
    process.exit(1);
  }

  const postsSubstring = fileContent.substring(postsStartIndex, topicsIndex);
  const lastBracketIndex = postsSubstring.lastIndexOf(']');
  if (lastBracketIndex === -1) {
    console.error('Error: Could not find closing bracket for posts array');
    process.exit(1);
  }

  const arrayDeclaration = postsSubstring.substring(0, lastBracketIndex + 1) + ';';

  // Evaluate the JavaScript to get the actual array
  let posts = [];
  try {
    const sandbox = {};
    vm.createContext(sandbox);
    posts = vm.runInContext(arrayDeclaration + '\nposts;', sandbox);
  } catch (err) {
    console.error('Error evaluating posts array:', err);
    process.exit(1);
  }

  console.log(`Successfully parsed ${posts.length} posts from News.jsx`);

  // Analyze internal links and weaving
  // We'll map each post slug to its outgoing links and identify incoming links.
  const allSlugs = posts.map(p => p.slug);

  const postsData = posts.map(post => {
    // 1. Map category and tags
    const category = post.tag || 'Uncategorized';
    const tags = [category, 'UKMLA', 'Medical Licensing'].join(', ');

    // 2. Map source_full_url
    const source_full_url = post.sourceFullUrl || 'https://www.gmc-uk.org/';

    // 3. Generate HTML content
    let html_content = post.htmlContent || "";
    if (post.link) {
      const href = post.link.to ? `/news#${post.slug}` : post.link.href; // Internal link helper
      html_content += `\n<p><a href="${href}">${post.link.label}</a></p>`;
    }

    // 4. Get SEO and image details directly from post object
    const seo_title = post.seoTitle || post.title;
    const seo_description = post.seoDescription || post.summary;
    const primary_keyword = post.primaryKeyword || post.title;
    const featured_image_keyword = post.featuredImageKeyword || post.tag || 'Medical Study';
    const featured_image_url = post.featuredImageUrl || `https://higgsfield.ai/generated/${post.slug}-featured.webp`;
    const featured_image_title = post.featuredImageTitle || `${post.title} Featured Image`;
    const feature_image_alt_text = post.featuredImageAltText || `${primary_keyword} - ${post.title}`;

    // 5. Internal Link for this post on the site
    const internal_link = `/news#${post.slug}`;

    // 6. Analyze outgoing links (linking to other posts or system pages)
    const outgoing_links = [];
    if (post.link && post.link.to) {
      outgoing_links.push(post.link.to);
    }
    // Scan body text for mentions of other posts' titles or slugs
    const plainText = (post.htmlContent || "").replace(/<[^>]+>/g, '');
    allSlugs.forEach(otherSlug => {
      if (otherSlug !== post.slug && plainText.toLowerCase().includes(otherSlug.replace(/-/g, ' '))) {
        if (!outgoing_links.includes(`/news#${otherSlug}`)) {
          outgoing_links.push(`/news#${otherSlug}`);
        }
      }
    });

    return {
      post_type: post.tag === 'Milestone' || post.tag === 'Syllabus Update' ? 'Regulatory Update' : 'Blog Post',
      post_title: post.title,
      post_slug: post.slug,
      post_excerpt: post.summary,
      category,
      tags,
      source_full_url,
      seo_title,
      seo_description,
      primary_keyword,
      internal_link,
      html_content,
      featured_image_keyword,
      featured_image_url,
      featured_image_title,
      feature_image_alt_text,
      word_count: plainText.split(/\s+/).length,
      outgoing_links_list: outgoing_links
    };
  });

  // Calculate incoming links (weaving)
  postsData.forEach(post => {
    const incoming = [];
    postsData.forEach(otherPost => {
      if (otherPost.post_slug !== post.post_slug) {
        if (otherPost.outgoing_links_list.includes(post.internal_link) || 
            otherPost.outgoing_links_list.includes(post.post_slug)) {
          incoming.push(otherPost.post_slug);
        }
      }
    });
    post.incoming_links_list = incoming;
  });

  // Convert link arrays to string summaries for Excel
  postsData.forEach(post => {
    post.outgoing_links = post.outgoing_links_list.join(', ') || 'None';
    post.incoming_links = post.incoming_links_list.join(', ') || 'None';
    
    // Weaving reference description
    let weaving = '';
    if (post.incoming_links !== 'None') {
      weaving += `Linked from: ${post.incoming_links}. `;
    }
    if (post.outgoing_links !== 'None') {
      weaving += `Links to: ${post.outgoing_links}.`;
    }
    post.weaving_reference = weaving.trim() || 'No active links';

    // Delete temporary list properties
    delete post.outgoing_links_list;
    delete post.incoming_links_list;
  });

  // Make sure scratch directory exists
  const scratchDir = path.join(__dirname, '..', 'scratch');
  if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir, { recursive: true });
  }

  const outputPath = path.join(scratchDir, 'parsed_posts.json');
  fs.writeFileSync(outputPath, JSON.stringify(postsData, null, 2));
  console.log(`Successfully wrote parsed posts to ${outputPath}`);
}

run();
