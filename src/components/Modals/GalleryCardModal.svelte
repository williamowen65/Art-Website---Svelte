<script>
  import { page } from "$app/stores";
  import { addPainting } from "$lib/writeData";
  import { isLoggedIn, thisPainting } from "../../stores";
  import Modal from "../General/modal.svelte";
  import CommonPaintingModalBody from "./commonPaintingModalBody.svelte";
  const { modalId, type, collectionType, slug } = $$props;

  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
</script>

<!-- <div class=" position-absolute"> -->
{#key $thisPainting}
  <div class="{ifLoggedInClass} position-absolute">
    <Modal id={modalId} showModal={false}>
      <span slot="headerText">
        <h3>
          Edit {$page.url.pathname.split("/")[1]}/<span class="collectionName"
            >{collectionType}</span
          >{slug ? "/" + slug : ""}
        </h3>
      </span>
      <span slot="body">
        <CommonPaintingModalBody />
      </span>
      <span slot="footer">
        <button class="btn btn-primary">Remove</button>
        <!-- {#key thisPainting} -->
        <button
          class="btn btn-primary saveBtn"
          on:click={() => addPainting(modalId, "edit", $page, $thisPainting)}
          >Save</button
        >
        <!-- {/key} -->
      </span>
    </Modal>
  </div>
{/key}
