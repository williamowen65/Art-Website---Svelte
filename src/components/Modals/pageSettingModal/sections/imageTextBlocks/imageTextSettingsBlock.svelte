<script>
  const { showIndex } = $$props;
  export let section;
  console.log("Rendering Classes ", { section });
</script>

{#if section}
  <li
    class="list-group-item"
    data-section-type="Pre-made image text blocks"
    data-id={section.id}
  >
    <span>Pre-made image text blocks {showIndex ? section.index : ""}</span>
    <i class="fa fa-cog"></i>
  </li>
{:else}
  <li class="list-group-item" data-section-type="Pre-made image text blocks">
    <span>Pre-made image text blocks</span>
    <i class="fa fa-cog"></i>
  </li>
{/if}
