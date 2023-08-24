import { LoaderArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import { getPost } from "~/models/post.server"


export const loader = async ({ params }: LoaderArgs) => {
    invariant(params.slug, "params.slug is required")
    const post = await getPost(params.slug)
    invariant(post, `Post not found: ${params.slug}`)
    const html = post.markdown
    return json({ post, html })
}

export default function PostSlug() {
    const { post, html } = useLoaderData<typeof loader>()

    return (
        <main className="mx-auto max-w-4">
            <h1 className="my-6 border-b-2 text-center text-3xl">
                {post.title}
            </h1>
            <div dangerouslySetInnerHTML={{__html: html }} />
        </main>
    )
}