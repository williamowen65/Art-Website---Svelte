<script>
  const { src } = $$props;
</script>

<div class="card">
  <img {src} alt="" />
  <div class="card-body d-flex flex-column">
    <div class="mt-2">
      <h5 class="card-title">Special title treatment</h5>
      <p class="card-text">
        With supporting text below as a natural lead-in to additional content.
      </p>
    </div>
    <a href="#" class="btn btn-primary mt-auto">Go somewhere</a>
  </div>
</div>

<style lang="scss">
  .card {
    /* width: 300px; */
    border-radius: 0;
    img {
      width: 100%;
    }
  }
</style>
