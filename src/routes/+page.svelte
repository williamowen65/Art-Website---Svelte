<script>
  import Banner from "../components/Sections/banner.svelte";
  import Gallery from "../components/Gallery/gallery.svelte";
  import GalleryImage from "../components/Gallery/ImageType.svelte";
</script>

<Banner />
<div class="container">
  <div class="galleryContainer">
    <h2>Originals</h2>
    <Gallery>
      <GalleryImage
        src="https://media.istockphoto.com/id/1150481340/vector/realistic-mountains-landscape-morning-wood-panorama-pine-trees-and-mountains-silhouettes.jpg?s=1024x1024&w=is&k=20&c=EAoY9ekkKfhIgNmAuCDhQuk-F7hDFhyhk0cixjF53ts="
      />
      <GalleryImage
        src="https://media.istockphoto.com/id/1125945611/vector/rural-landscape-mountains-hills-fields-nature-background.jpg?s=1024x1024&w=is&k=20&c=ZChyXDpqa-MkxZBQPzelykh834SkTbecVvmrjoZNdt8="
      />
      <GalleryImage
        src="https://media.istockphoto.com/id/1318863607/photo/multicolored-leaves.jpg?s=1024x1024&w=is&k=20&c=W4ndHjuo2zMfoi_ZQ55DYOvYOvNm4ZLAv0-r9EejnXg="
      />
    </Gallery>
  </div>
  <div class="galleryContainer">
    <h2>Reproductions</h2>
    <Gallery>
      <GalleryImage
        src="https://media.istockphoto.com/id/1150481340/vector/realistic-mountains-landscape-morning-wood-panorama-pine-trees-and-mountains-silhouettes.jpg?s=1024x1024&w=is&k=20&c=EAoY9ekkKfhIgNmAuCDhQuk-F7hDFhyhk0cixjF53ts="
      />
      <GalleryImage
        src="https://media.istockphoto.com/id/1125945611/vector/rural-landscape-mountains-hills-fields-nature-background.jpg?s=1024x1024&w=is&k=20&c=ZChyXDpqa-MkxZBQPzelykh834SkTbecVvmrjoZNdt8="
      />
      <GalleryImage
        src="https://media.istockphoto.com/id/1318863607/photo/multicolored-leaves.jpg?s=1024x1024&w=is&k=20&c=W4ndHjuo2zMfoi_ZQ55DYOvYOvNm4ZLAv0-r9EejnXg="
      />
    </Gallery>
  </div>
</div>

<style>
  .galleryContainer {
    margin: 100px 0px;
  }
</style>
