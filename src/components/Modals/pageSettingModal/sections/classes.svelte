<script>
  const { showIndex } = $$props;
  export let section;
  console.log("Rendering Classes ", { section });
</script>

{#if section}
  <li class="list-group-item" data-section-type="Classes" data-id={section.id}>
    <span>Classes {showIndex ? section.index : ""}</span>
    <i class="fa fa-cog"></i>
  </li>
{:else}
  <li class="list-group-item" data-section-type="Classes">
    <span>Classes</span>
    <i class="fa fa-cog"></i>
  </li>
{/if}
