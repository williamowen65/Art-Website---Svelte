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
    grid-gap: 10px;
    overflow: hidden;
  }
</style>
