<script>
  const { onLayoutSelection } = $$props;
  export let layoutSelection;

  function selectStyle(e) {
    const style = jQuery(e.target).closest("button").attr("data-style");
    for (let style in layoutSelection) {
      layoutSelection[style] = false;
    }
    layoutSelection[style] = true;
    layoutSelection = layoutSelection;
    onLayoutSelection(style);
  }
</script>

<div class="d-inline-block rounded button-group">
  <button class="btn bg-transparent" on:click={selectStyle} data-style="list">
    <i class="fa fa-check {layoutSelection.list ? '' : 'text-transparent'}"></i>
    <i class="fa fa-th-list"></i>
  </button>
  <button class="btn bg-transparent" on:click={selectStyle} data-style="grid">
    <i class="fa fa-check {layoutSelection.grid ? '' : 'text-transparent'}"></i>
    <i class="fa fa-th-large"></i>
  </button>
</div>

<style>
  .text-transparent {
    color: transparent;
  }
  button:focus {
    box-shadow: none !important;
  }
</style>
