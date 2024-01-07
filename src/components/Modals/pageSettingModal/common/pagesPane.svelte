<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { modalIds } from "../../../../stores";

  const pages = ["home", "commissions"];
  let drake;
  const { pageSettingsModal } = modalIds;

  onMount(() => {
    jQuery(`#${pageSettingsModal}`).on("show.bs.modal", selectPage);

    pages.forEach((page) => {
      setDragula(page);
    });
    return () => {};
  });
  function selectPage() {
    const thisPage = $page.route.id == "/" ? "home" : $page.route.id?.slice(1);
    jQuery(`.tab-pane`).hide();
    jQuery(`#${thisPage}`).show();
  }

  function setDragula(page) {
    const left = jQuery(`#home .dragzone`).get(0);
    const right = jQuery(`#sections`).get(0);
    console.log("setDragula", {
      left,
      right,
    });

    dragula([right, left], {
      moves: function (el, container, handle) {
        console.log("moves", { container, handle });
        return jQuery(handle).hasClass("list-group-item");
      },
      copy: function (el, source) {
        return jQuery(source).attr("id") == "sections";
      },
      accepts: function (el, target) {
        console.log("accepts", {
          'jQuery(target).hasClass("dragzone");':
            jQuery(target).hasClass("dragzone"),
          target,
        });
        return jQuery(target).hasClass("dragzone");
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

  function showTabContent(e) {
    const target = jQuery(e.target).attr("data-target");
    jQuery(`#myTabContent`).children().hide();
    jQuery(`#myTabContent`).find(target).show();
  }
</script>

<div class="card" id="website-content">
  <ul class="nav nav-tabs mt-1" id="myTab" role="tablist">
    {#each pages as page (page)}
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="{page}-tab"
          data-toggle="tab"
          data-target="#{page}"
          on:click={showTabContent}
          type="button"
          role="tab"
          aria-controls={page}
          aria-selected="true">{page[0].toUpperCase() + page.slice(1)}</button
        >
      </li>
    {/each}

    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="addNewPage-tab"
        data-toggle="tab"
        data-target="#addNewPage"
        type="button"
        role="tab"
        aria-controls="addNewPage"
        aria-selected="false"
      >
        <i class="fa fa-plus"></i>
        Add Page
      </button>
    </li>
  </ul>
  <div class="card-body">
    <div class="tab-content" id="myTabContent">
      {#each pages as page (page)}
        <div
          class="tab-pane"
          id={page}
          role="tabpanel"
          aria-labelledby="{page}-tab"
        >
          <div class="form-field">
            <label>Page Title</label>
            <input type="text" class="form-control" value={page} />
          </div>
          <div class="dragzone"></div>
        </div>
      {/each}
      <div
        class="tab-pane"
        id="addNewPage"
        role="tabpanel"
        aria-labelledby="addNewPage-tab"
      >
        <div class="form-field">
          <label>New Page Name</label>
          <input type="text" class="form-control" value="addNewPage" />
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  :global(.nav-item.websiteSettings) {
    cursor: pointer;
    padding-bottom: 0px;
    border-bottom: 1px solid #a1afbd;
    &:hover {
      border-bottom: 1px solid #d4d7db;
      background-color: #a1afbd;
    }
    :global(a),
    :global(a:hover) {
      border: 0px;
    }
  }
  .nav-item.websiteSettings .active {
    border-radius: 0;
    background-color: rgb(244, 228, 228);
    border-color: none;
  }
  :global(.dragzone) {
    min-height: 263px;
  }

  .form-field {
    display: flex;
    align-items: baseline;
    label {
      padding-right: 5px;
      white-space: nowrap;
    }
  }
</style>
