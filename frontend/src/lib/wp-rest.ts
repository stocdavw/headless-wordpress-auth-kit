export type RestPost = {
    id: number;
    date: string;
    slug: string;
    title: { rendered: string };
    excerpt: { rendered: string };
};

export type WpRestIndex = {
    name: string;
    description: string;
};

export function getWordPressSiteBaseUrl() {
    return process.env.NEXT_PUBLIC_WORDPRESS_REST_URL?.replace("/wp-json", "") || "";
}

export async function fetchSiteInfo(): Promise<WpRestIndex> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_REST_URL}/`);
    if (!res.ok) throw new Error("Failed to fetch site info");
    return res.json();
}

export async function fetchPosts(perPage = 6): Promise<RestPost[]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_REST_URL}/wp/v2/posts?per_page=${perPage}&_fields=id,date,slug,title,excerpt`
    );
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
}
