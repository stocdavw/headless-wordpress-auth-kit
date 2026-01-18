import { fetchGqlPostBySlug } from "@/lib/wp-graphql";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function PostPage(props: {
    params: Promise<{ slug: string }>;
}) {
    const params = await props.params; // Await params in Next.js 15+
    const post = await fetchGqlPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto py-8">
            <Link href="/" className="text-blue-400 hover:text-white mb-8 inline-block">
                &larr; Back to posts
            </Link>
            <article className="prose prose-invert lg:prose-xl">
                <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </div>
    );
}
