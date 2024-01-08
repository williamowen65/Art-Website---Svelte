<script>
  const { showIndex } = $$props;
  export let section;
  console.log("Rendering Gallery Grid ", { section });
</script>

{#if section}
  <li
    class="list-group-item"
    data-section-type="Gallery Grid"
    data-id={section.id}
  >
    <span>Gallery Grid {showIndex ? section.index : ""}</span>
    <small class="mr-3">settings: "data source: Collection > gallery"</small>
    <i class="fa fa-cog"></i>
  </li>
{:else}
  <li class="list-group-item" data-section-type="Gallery Grid">
    <span>Gallery Grid</span>
    <small class="mr-3">settings: "data source: Collection > gallery"</small>
    <i class="fa fa-cog"></i>
  </li>
{/if}
