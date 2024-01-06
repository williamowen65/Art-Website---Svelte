<script>
  import { onMount } from "svelte";
  import { modalIds } from "../../../stores";
  import Modal from "../../General/modal.svelte";
  import PagesPane from "./common/pagesPane.svelte";
  // import dragula from "dragula";

  const { pageSettingsModal } = modalIds;
  console.log("srccomponentsModalspageSettingsModal.svelte");

  onMount(() => {
    setDragula();
    return () => {};
  });

  function setDragula() {
    console.log("setDragula", {
      dragula,
    });
    // const left = jQuery(``)
    // dragula([document.getElementById(left), document.getElementById(right)])
    //   .on("drag", function (el) {
    //     el.className = el.className.replace("ex-moved", "");
    //   })
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
      <ul class="list-group">
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
    <button>save</button>
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
