import { ActionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createPost } from "~/models/post.server";


export const action = async ({ request }: ActionArgs) => {
    // slow it down
    await new Promise((res)=>setTimeout(res, 2000))
    const formData = await request.formData()
    const title = formData.get('title')
    const slug = formData.get('slug')
    const markdown = formData.get('markdown')

    const errors = {
        title: title ? null : 'Title is required' + typeof title,
        slug: slug ? null : 'Slug is required',
        markdown: markdown ? null : 'Markdown is required'
    }

    const hasErrors = Object.values(errors).some(errMsg => errMsg)
    if(hasErrors) {
        return json(errors)
    }

    invariant(typeof title === "string", "Title must be a string")
    invariant(typeof slug==="string", "slug must be a string")
    invariant(typeof markdown === "string", "markdown must be a string")
    await createPost({ title, slug, markdown })
    return redirect('/posts/admin')
}



const inputClassName =
    "w-full rounded border border-gray-500 px-2 py-1 text-lg";


export default function NewPost() {
    const errors = useActionData<typeof action>()
    const navigation = useNavigation()
    const isCreating = Boolean(navigation.state === 'submitting')

    return (
        <Form method="post">
            <p>
                <label>
                    Post Title:{" "}
                    { errors?.title ? (
                        <em className="text-red-600">{errors.title}</em>
                    ): null }
                    <input
                        type='text'
                        name='title'
                        className={inputClassName} />
                </label>
            </p>
            <p>
                <label>
                    Post Slug:{" "}
                    { errors?.slug ? (
                        <em className="text-red-600">{errors.slug}</em>
                    ): null }
                    <input
                        type='text'
                        name='slug'
                        className={inputClassName} />
                </label>
            </p>
            <p>
                <label htmlFor="markdown">
                    Markdown:&nbsp;
                </label>
                { errors?.markdown ? (
                        <em className="text-red-600">{errors.markdown}</em>
                    ): null }
                <br />
                <textarea
                    id='markdown'
                    rows={5}
                    name='markdown'
                    className={`${inputClassName} font-mono`}
                />
            </p>
            <p className="text-rightf">
                <button 
                    type="submit"
                    className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 disabled:bg-blue-300"
                    disabled={isCreating}
                >
                    {isCreating ? 'Creating...' : 'Create Post'}
                </button>
            </p>
        </Form >
        // <h2>New Post</h2>
    )
}