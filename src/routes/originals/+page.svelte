<script>
  import Gallery from "../../components/Gallery/gallery.svelte";
  import GalleryImage from "../../components/Gallery/ImageType.svelte";
  import TodoNote from "../../components/Dev/todoNote.svelte";

  const note = `
- All originals include shipping (increase prices by $20 for that)
`;
</script>

<TodoNote {note} />

<Gallery>
  <GalleryImage
    src="https://media.istockphoto.com/id/1153318151/photo/colorful-wedding-flower-arrangement.jpg?s=1024x1024&w=is&k=20&c=EdIHD3N8OozlOAnhE-jljzL0j-kTc2ikiEVfVmoyRww="
  />
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

<style>
</style>
