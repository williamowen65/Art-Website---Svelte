<script>
  import { onMount } from "svelte";
  import { modalIds } from "../../../stores";
  import Modal from "../../General/modal.svelte";
  import PagesPane from "./common/pagesPane.svelte";
  // import dragula from "dragula";

  const { pageSettingsModal } = modalIds;
  console.log("srccomponentsModalspageSettingsModal.svelte");

  let drake;

  onMount(() => {
    setDragula();
    return () => {};
  });

  function setDragula() {
    const left = jQuery(`#home`).get(0);
    const right = jQuery(`#sections`).get(0);
    console.log("setDragula", {
      left,
      right,
    });

    drake = dragula([right, left], {
      moves: function (el, container, handle) {
        console.log("moves", { container, handle });
        return jQuery(handle).hasClass("list-group-item");
      },
      copy: true,
      accepts: function (el, target) {
        return jQuery(target).attr("id") == "home";
      },
    }).on("drag", function (el) {
      console.log("dragging", { el });
    });
    //   .on("drop", function (el) {
    //     el.className += " ex-moved";
    //   })
    //   .on("over", function (el, container) {
    //     container.className += " ex-over";
    //   })
    //   .on("out", function (el, container) {
    //     container.className = container.className.replace("ex-over", "");
    //   });
  }
</script>

<Modal
  showModal={true}
  id={pageSettingsModal}
  classes="fullScreenModal pageSettings"
>
  <span slot="headerText">Website Settings</span>
  <span slot="body" class="d-grid mt-0" style="grid-template-columns: 1fr 1fr;">
    <PagesPane />
    <div>
      <h3>Sections</h3>
      <ul class="list-group" id="sections">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
      </ul>
    </div>
  </span>
  <span
    slot="footer"
    class="d-flex align-items-baseline justify-content-between"
  >
    <p>stats</p>
    <button class="btn btn-primary">save</button>
  </span>
</Modal>

<style>
  :global(.pageSettings .modal-body) {
    padding-top: 0;
  }
  h3 {
    height: 37px;
  }
</style>
