import { getCollection } from "astro:content";

export async function getAllPosts() {
  const posts = await getCollection("posts");

  return posts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );
}

export async function getPostFacets() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.data.category))];
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))];

  return { posts, categories, tags };
}
