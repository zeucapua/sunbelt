<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";

  export let data : PageData;
  export let form : ActionData;
  const session = data.session;
  const posts = data.posts;
</script>

<main class="font-nevis flex flex-col w-full min-w-screen h-full min-h-screen p-16 gap-8">

{#if !session || session === "false"}
  <p class="text-3xl font-bold text-center">What's the secret?</p>
  <form method="POST" action="?/login" class="flex flex-row gap-8 self-center"> 
    <input name="secret" type="password" required class="input input-bordered w-full max-w-xs"/>
    <button class="btn">Submit</button>
  </form>
{:else}
  <div class="navbar bg-base-300 rounded-xl p-4">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost normal-case text-xl">sunbelt</a>
    </div>
    <div class="flex-none gap-4">
      {#if form?.invalid} <p class="text-error">Error! Check if title is already taken!</p> {/if}
      <label for="newpost" class="btn btn-outline">
        New Post
      </label>
      <form method="POST" action="?/logout">
        <button class="btn">Logout</button>
      </form>
    </div>
  </div>

  {#each posts as post}
    <div class="card w-96 bg-base-300 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{post.title}</h2>
        {#if post.content} <p class="line-clamp-3">{post.content}</p> {/if}
        <div class="card-actions justify-end">
          <label for="deletepost" class="btn btn-outline btn-error">Delete</label>
          <a href={`/admin/${post.id}`}>
            <button class="btn btn-primary">Edit</button>
          </a>
        </div>
      </div>
    </div>
   
    <input type="checkbox" id="deletepost" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box relative">
        <label for="deletepost" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <form method="POST" action="?/deletePost"> 
          <h3 class="font-bold text-lg">Are you sure?</h3>
          <p>This deletion is permanent</p>
          <input name="id" type="hidden" value={post.id} />
          <div class="modal-action">
            <button class="btn btn-outline btn-error">Delete</button>
          </div>
        </form>
      </div>
    </div>
  {/each}


  <input type="checkbox" id="newpost" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label for="newpost" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <form method="POST" action="?/newPost">
        <h3 class="font-bold text-lg">Create New Post</h3>
        <label class="label"><span class="label-text">Title</span></label>
        <input 
          name="title" type="text" required
          class="input input-bordered w-full max-w-xs" 
          value={form?.title ? form?.title : ""}
        />
        <div class="modal-action">
          <button class="btn">Create</button>
        </div>
      </form>
    </div>
  </div>
{/if}

</main>
