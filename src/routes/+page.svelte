<script>
  import GalleryImage from "../components/galleryImage.svelte";
</script>

<!-- <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap" />
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div> -->

<div class="d-grid galleryGrid rounded">
  <GalleryImage
    src="https://media.istockphoto.com/id/1150481340/vector/realistic-mountains-landscape-morning-wood-panorama-pine-trees-and-mountains-silhouettes.jpg?s=1024x1024&w=is&k=20&c=EAoY9ekkKfhIgNmAuCDhQuk-F7hDFhyhk0cixjF53ts="
  />
  <GalleryImage
    src="https://media.istockphoto.com/id/1125945611/vector/rural-landscape-mountains-hills-fields-nature-background.jpg?s=1024x1024&w=is&k=20&c=ZChyXDpqa-MkxZBQPzelykh834SkTbecVvmrjoZNdt8="
  />
  <GalleryImage
    src="https://media.istockphoto.com/id/1318863607/photo/multicolored-leaves.jpg?s=1024x1024&w=is&k=20&c=W4ndHjuo2zMfoi_ZQ55DYOvYOvNm4ZLAv0-r9EejnXg="
  />
  <GalleryImage
    src="https://media.istockphoto.com/id/1153318151/photo/colorful-wedding-flower-arrangement.jpg?s=1024x1024&w=is&k=20&c=EdIHD3N8OozlOAnhE-jljzL0j-kTc2ikiEVfVmoyRww="
  />
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
