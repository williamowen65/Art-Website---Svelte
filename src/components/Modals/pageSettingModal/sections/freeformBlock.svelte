<script>
  const { showIndex } = $$props;
  export let section;
  console.log("Rendering banner ", { section });
</script>

{#if section}
  <li
    class="list-group-item"
    data-section-type="Freeform block"
    data-id={section.id}
  >
    <span>Freeform block {showIndex ? section.index : ""}</span>
    <small class="mr-3">Dragula section (text and images)</small>
    <i class="fa fa-cog"></i>
  </li>
{:else}
  <li class="list-group-item" data-section-type="Freeform block">
    <span>Freeform block</span>
    <small class="mr-3">Dragula section (text and images)</small>
    <i class="fa fa-cog"></i>
  </li>
{/if}
