<script>
  const { onSearchImages } = $$props;
  function searchImages(e) {
    const value = e.target.value;
    onSearchImages(value);
  }
</script>

<span>
  <input
    type="text"
    class="form-control"
    placeholder="Search"
    on:keyup={searchImages}
  />
</span>
