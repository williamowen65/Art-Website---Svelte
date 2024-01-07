<script>
  import { afterUpdate, onMount } from "svelte";
  import { page } from "$app/stores";
  import { modalIds, websitePages } from "../../../../stores";
  import { addDoc, collection, doc, setDoc } from "firebase/firestore";
  import { db } from "../../../../firebase";
  import { initBootstrapConfirmation } from "$lib/common";

  let pages,
    drake,
    navTabs = [];
  $: {
    pages = Object.values($websitePages);
  }
  afterUpdate(() => {
    setDragula();
    initBootstrapConfirmation("#website-content-nav", {
      onConfirm: deletePage,
    });
  });

  const { pageSettingsModal } = modalIds;

  onMount(() => {
    jQuery(`#${pageSettingsModal}`).on("show.bs.modal", selectPage);

    setDragula(page);
    return () => {};
  });
  function selectPage() {
    const thisPage = $page.route.id == "/" ? "home" : $page.route.id?.slice(1);
    jQuery(`.tab-pane`).hide();
    jQuery(`#${thisPage}`).show();
  }

  function setDragula(page) {
    // const left = jQuery(`.dragzone`).get();
    const right = jQuery(`#sections`).get(0);
    console.count("setDragula");
    const selections = [right, ...jQuery(`.dragzone`).get()];
    console.log("setDragula", {
      //   left,
      selections,
      right,
    });
    if (drake) {
      drake.destroy();
    }
    drake = dragula(selections, {
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
    console.log("showTabContent", {});
    jQuery("#website-content-nav").find("button").removeClass("active");
    const target = jQuery(e.target).attr("data-target");
    jQuery(`#myTabContent`).children().hide();
    jQuery(`#myTabContent`).find(target).show();
  }

  function enableButton(e) {
    console.log("enableButton", {
      "e.target.value.trim()": e.target.value.trim(),
      "e.target.value.trim().length": e.target.value.trim().length,
      "jQuery(`#createNewPage`)": jQuery(`#createNewPage`),
    });
    if (e.target.value.trim().length) {
      jQuery(`#createNewPage`).removeAttr("disabled", false);
    } else {
      jQuery(`#createNewPage`).attr("disabled", true);
    }
  }

  function createPage() {
    const newPageName = jQuery("#newPageName").val();
    console.log("createPage", { newPageName });

    const newPageCol = collection(db, "pages");
    addDoc(newPageCol, {
      name: newPageName,
    }).then(() => {
      jQuery("#newPageName").val("");
      // Select new page
    });
  }

  function deletePage(e) {
    const isConfirmOpen = jQuery(this).attr("aria-describedby");
    if (isConfirmOpen) {
      const pageId = jQuery(this).attr("data-id");
      console.log("deletePage", { pageId });
    }
  }
</script>

<div class="card" id="website-content">
  <ul class="nav nav-tabs mt-1" id="website-content-nav" role="tablist">
    {#each pages as page, i (page)}
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="{page.name}-tab"
          data-toggle="tab"
          data-target="#{page.name}"
          on:click={showTabContent}
          type="button"
          role="tab"
          aria-controls={page.name}
          aria-selected="true"
          >{page.name[0].toUpperCase() + page.name.slice(1)}
          {#if page.name != "Home"}
            <!-- <span class="" style="translate: 12px -11px;"> -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <i
              data-id={page.id}
              data-toggle="confirmation"
              data-title="Are you sure?"
              data-value={i}
              bind:this={navTabs[i]}
              data-content="This might be dangerous. This will remove pictures."
              class="fa fa-times"
              style="translate: 12px -11px; scale: 0.7"
            ></i>
            <!-- </span> -->
          {/if}
        </button>
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
        on:click={showTabContent}
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
          class="tab-pane m-3"
          id={page.name}
          role="tabpanel"
          aria-labelledby="{page.name}-tab"
        >
          <div class="form-field">
            <label>Page Title</label>
            <input type="text" class="form-control" value={page.name} />
          </div>
          <div class="dragzone"></div>
        </div>
      {/each}
      <!-- style block is acceptable here as a workaround for editing this toolbar, always on is okay -->
      <div
        class="tab-pane m-3"
        id="addNewPage"
        role="tabpanel"
        style="display: block;"
        aria-labelledby="addNewPage-tab"
      >
        <div class="form-field">
          <label>New Page Name</label>
          <input
            type="text"
            class="form-control"
            id="newPageName"
            on:keyup={enableButton}
          />
        </div>
        <button
          class="btn btn-primary d-block ml-auto"
          disabled
          id="createNewPage"
          on:click={createPage}>Create</button
        >
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
