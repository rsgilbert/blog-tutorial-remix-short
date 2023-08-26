import { Post } from "@prisma/client"
import { prisma } from "~/db.server"


export async function createPost(
    post: Pick<Post, 'slug' | 'title' | 'markdown'>
    ) {
    return prisma.post.create({ data: post })
}

export async function getPosts() : Promise<Post[]> {
    return prisma.post.findMany()
}

export async function getPost(slug: string) {
    return prisma.post.findUnique({ 
        where: {
            slug
        }
    })
}