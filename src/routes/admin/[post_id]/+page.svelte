<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";

  export let data : PageData;
  export let form : ActionData;

  const post = data.post;
  const categories = data.categories;

  let content : string;
</script>

<main class="flex flex-col w-full min-w-screen h-full min-h-screen p-16 gap-8">

<form method="POST" action="?/savePost" id="editForm" use:enhance>
<input name="id" type="hidden" value={post.id} />

<input 
  name="title" type="text" value={post.title} 
  class="input input-lg input-bordered w-full max-w-xl" 
/>

<button class="btn">Save</button>
<button class="btn" formaction="?/deletePost">Delete</button>

</form>

<textarea 
  name="content" form="editForm" bind:value={content} 
  class="textarea textarea-bordered bg-base-100 textarea-lg" 
></textarea>


</main>
