<script>
  const { imagesArray } = $$props;

  if (!imagesArray || !Array.isArray(imagesArray))
    throw new Error("imageShow component not being passed imagesArray");

  const mainImg = imagesArray[0];
  const subImages = imagesArray.slice(1);
  console.log({ mainImg, imagesArray, subImages });
</script>

<div class="col-4 pl-0">
  <img class="main-img" src={mainImg.url} alt="" />
  <div class="sub-images mt-1">
    {#each subImages as img}
      <img src={img.url} alt="" />
    {/each}
  </div>
</div>

<style lang="scss">
  .sub-images {
    display: flex;

    justify-content: space-between;
    img {
      width: 30%;
      cursor: pointer;
    }
  }
  img {
    &.main-img {
      width: 100%;
    }
  }
</style>
