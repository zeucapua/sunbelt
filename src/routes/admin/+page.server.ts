import { prisma } from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { ADMIN_SECRET } from "$env/static/private";
import type { Actions, PageServerLoad } from "./$types";

export async function load({ cookies }) : PageServerLoad {
  const session = cookies.get("session");
  if (!session || session === "fail") { return { session: session }; }
  const posts = await prisma.post.findMany();
  await prisma.$disconnect();
  return { session: session, posts: posts };
}

export const actions : Actions = {
  login: async ({ cookies, request }) => {
    const data = await request.formData();
    const secret = data.get("secret");
    
    cookies.set("session", secret === ADMIN_SECRET, {
      maxAge: 60 * 60,
    });
  },
  logout: async ({ cookies }) => {
    cookies.set("session", false);
  },
  newPost: async ({ request }) => {
    const data = await request.formData();
    const title = data.get("title");
    const response = await prisma.post.findUnique({
      where: { title: title }
    });
    if (response) { 
      await prisma.$disconnect();
      return fail(400, { title, invalid: true }); 
    }
    const post = await prisma.post.create({
      data: { title: title }
    });
    await prisma.$disconnect();
    throw redirect(302, "/admin");
  },
  deletePost: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");

    const response = await prisma.post.delete({
      where: { id: parseInt(id) }
    });
  }
}
