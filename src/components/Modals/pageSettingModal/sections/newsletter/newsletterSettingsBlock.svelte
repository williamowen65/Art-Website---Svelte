<script>
  const { showIndex } = $$props;
  export let section;
  console.log("Rendering Classes ", { section });
</script>

{#if section}
  <li
    class="list-group-item"
    data-section-type="Newsletter"
    data-id={section.id}
  >
    <span>Newsletter {showIndex ? section.index : ""}</span>
    <i class="fa fa-cog"></i>
  </li>
{:else}
  <li class="list-group-item" data-section-type="Newsletter">
    <span>Newsletter</span>
    <i class="fa fa-cog"></i>
  </li>
{/if}
