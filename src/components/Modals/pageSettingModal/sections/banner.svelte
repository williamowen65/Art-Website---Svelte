<script>
  export let section;
  console.log("Rendering banner ", { section });
</script>

{#if section}
  <li class="list-group-item" data-section-type="Banner" data-id={section.id}>
    <span>Banner {section.index}</span>
    <i class="fa fa-cog"></i>
  </li>
{:else}
  <li class="list-group-item" data-section-type="Banner">
    <span>Banner</span>
    <i class="fa fa-cog"></i>
  </li>
{/if}
