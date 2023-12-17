<script>
</script>

<div class="d-grid galleryGrid rounded">
  <slot />
</div>

<style>
  :global(.d-grid) {
    display: grid;
  }
  .galleryGrid {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 40px;
    /* And other times this */
    @media (max-width: 750px) {
      grid-template-columns: 1fr 1fr;
    }
    /* @media (max-width: 650px) {
      grid-template-columns: 1fr;
    } */
    overflow: hidden;
  }
</style>
