import { prisma } from "$lib/prisma";
import { redirect } from "@sveltejs/kit";
import type { Post, Category } from "@prisma/client";
import type { Actions, PageServerLoad } from "./$types";

export async function load({ cookies, params }) : PageServerLoad {
  const session = cookies.get("session");
  if (!session || session === "false") { throw redirect(303, "/admin"); }
  const id = parseInt(params.post_id);
  const response = await prisma.post.findUnique({
    where: { id: id },
    include: { categories: true } 
  });

  const post = { 
    id: response.id, 
    title: response.title,
    content: response.content,
    likes: response.likes
  } as Post;

  const categories = response.categories as Category[];
  return { post: post, categories: categories };
}


export const actions : Actions = {
  savePost: async ({ request }) => {
    const data = await request.formData();
    const title = data.get("title");
    const content = data.get("content");
    const id = data.get("id");

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title: title, content: content }
    });
  },
  deletePost: async ({ request }) => {

  }
}
