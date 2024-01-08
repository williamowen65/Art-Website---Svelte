<script>
  import { afterUpdate, onMount } from "svelte";
  import { page } from "$app/stores";
  import { modalIds, websitePages } from "../../../../stores";
  import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { db } from "../../../../firebase";
  import {
    getUid,
    initBootstrapConfirmation,
    mapId,
    orderByProp,
  } from "$lib/common";

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
        return jQuery(handle).closest(".list-group-item").get(0);
      },
      copy: function (el, source) {
        return jQuery(source).attr("id") == "sections";
      },
      accepts: function (el, target) {
        return jQuery(target).hasClass("dragzone");
      },
    })
      .off("drop")
      .on("drop", throttleSaveSectionOnDrop);
    // .on("drag", function (el) {
    //   console.log("dragging", { el });
    // })
    //   .on("over", function (el, container) {
    //     container.className += " ex-over";
    //   })
    //   .on("out", function (el, container) {
    //     container.className = container.className.replace("ex-over", "");
    //   });
  }

  var throttleSaveSectionOnDrop = throttle(function (
    el,
    target,
    source,
    sibling
  ) {
    if (target) {
      console.log("onDrop", {
        el,

        'jQuery(el).hasClass(".gu-transit")':
          jQuery(el).hasClass(".gu-transit"),
      });
      //   debugger;
      // Drag from either source or within container
      // Get targets sections by section Id (hardcoded)
      // Get the active page
      // Save sections
      // const sections = jQuery(target).children();
      //  Update indexes
      console.log("Add or move section");
      const activePageId = jQuery(".nav-link.active").attr("data-id");
      const pageSections = jQuery(
        `.tab-pane[data-id=${activePageId}] .dragzone`
      ).children();
      console.log({
        'pageSections.toArray().map((el) => jQuery(el).attr("data-id"))':
          pageSections.toArray().map((el) => ({
            id: jQuery(el).attr("data-id"),
            id: jQuery(el).text(),
          })),
      });
      let randomId;
      if (jQuery(source).attr("id") == "sections") {
        randomId = getUid();
        jQuery(el).attr("data-id", randomId);
      }
      console.log({
        "pageSections.toArray()": pageSections.toArray(),
      });
      const pageSectionIndexesPayload = pageSections
        .toArray()
        .reduce((acc, el, i) => {
          const sectionId = jQuery(el).attr("data-id");
          acc[sectionId] = {
            index: i,
          };
          return acc;
        }, {});

      const sectionType = jQuery(el).attr("data-section-type");
      const activePageName = jQuery(".nav-link.active").text().trim();
      const pagesDoc = doc(db, "pages", activePageId);

      //   debugger;

      // Perform indexing of surrounding sections
      console.log("Add or move section", { pageSections, activePageId });
      let payload = {
        sections: {},
      };
      if (jQuery(source).attr("id") == "sections") {
        payload = {
          name: activePageName,
          sections: {
            [randomId]: {
              sectionType,
            },
          },
        };
      }

      jQuery.extend(true, payload.sections, pageSectionIndexesPayload);

      console.log("save section to page", {
        sectionType,
        activePageId,
        payload,
        pageSectionIndexesPayload,
      });
      setDoc(pagesDoc, payload, { merge: true }).then(() => {
        // Remove original dragged item because a new item will render with
        if (jQuery(source).attr("id") == "sections") {
          jQuery(el).remove();
        }
      });
    }
  }, 1000);

  function throttle(cb, delay) {
    let wait = false;

    return (...args) => {
      if (wait) {
        return;
      }

      cb(...args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, delay);
    };
  }
  afterUpdate(() => {
    console.log("Setting index of sections", {});
    // const activePageId = jQuery(".nav-link.active").attr("data-id");
    // const activePageName = jQuery(".nav-link.active").text().trim();
    // const pagesDoc = doc(db, "pages", activePageId);
    // const sectionsIndexingPayload = {};
    // const target = ".dragzone";
    // console.log("settimeout", {
    //   target,
    //   "  jQuery(target).children()": jQuery(target).children(),
    // });
    // jQuery(target)
    //   .children()
    //   .each((i, el) => {
    //     const sectionId = jQuery(el).attr("data-id");
    //     if (sectionId) {
    //       sectionsIndexingPayload[sectionId] = {
    //         index: i,
    //       };
    //     }
    //   });
    // setDoc(
    //   pagesDoc,
    //   {
    //     sections: sectionsIndexingPayload,
    //   },
    //   { merge: true }
    // );
  });

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
      const pageDoc = doc(db, "pages", pageId);
      deleteDoc(pageDoc);
    }
  }

  function updatePageName(e) {
    const value = jQuery(e.target).val();
    const pageId = jQuery(e.target).closest("*[data-id]").attr("data-id");
    const pageDoc = doc(db, "pages", pageId);
    updateDoc(pageDoc, {
      name: value,
    }).then(() => {
      console.log("select new page");
    });
  }
</script>

<div class="card" id="website-content">
  <ul class="nav nav-tabs mt-1" id="website-content-nav" role="tablist">
    {#each pages as pagee, i (pagee.id)}
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="{pagee.name}-tab"
          data-toggle="tab"
          data-target="#{pagee.name}"
          on:click={showTabContent}
          type="button"
          data-id={pagee.id}
          role="tab"
          aria-controls={pagee.name}
          aria-selected="true"
        >
          <!-- {@debug pagee} -->
          {pagee.name[0].toUpperCase() + pagee.name.slice(1)}
          {#if pagee.name != "Home"}
            <!-- <span class="" style="translate: 12px -11px;"> -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <i
              data-id={pagee.id}
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
      {#each pages as pagee (pagee.id)}
        <div
          class="tab-pane m-3"
          id={pagee.name}
          data-id={pagee.id}
          role="tabpanel"
          aria-labelledby="{pagee.name}-tab"
        >
          {#if pagee.name != "Home"}
            <div class="form-field">
              <label>Page Title</label>
              <input
                type="text"
                class="form-control"
                value={pagee.name}
                on:change={updatePageName}
              />
            </div>
          {/if}

          <div class="dragzone">
            {#key pagee}
              {#each orderByProp(mapId(pagee.sections || {}), "index") as section (section.id)}
                <!-- <div>Section {section.sectionType}</div> -->
                <li
                  class="list-group-item d-flex align-content-baseline justify-content-between"
                  data-id={section.id}
                  data-section-type={section.sectionType}
                >
                  <span>{section.sectionType} {section.id} {section.index}</span
                  >
                  <i class="fa fa-cog"></i>
                </li>
              {/each}
            {/key}
          </div>
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
