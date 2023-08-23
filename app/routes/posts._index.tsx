import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

export const loader = async () => {
    return json({
        posts: [
            {
                slug: "my-first-post",
                title: "My First Post, Hehehe"
            },
            {
                slug: "90s-mixtape",
                title: "I think I love Milcah"
            }
        ]
    })
}


export default function Posts() {
    const { posts } = useLoaderData<typeof loader>()
    return (
        <main>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li>
                        <Link
                            to={post.slug}
                            className="text-blue-600 underline"
                        >
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}