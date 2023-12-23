<script>
  import { onMount } from "svelte";

  let { contentType, modalId, buttonActionType, hideAction, setData } = $$props;

  onMount(() => {
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });
</script>

<i class="fa fa-eye"></i>
