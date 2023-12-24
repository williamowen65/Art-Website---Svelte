<script>
  import { onMount } from "svelte";
  import ActionsContainer from "../../components/General/actionsContainer.svelte";
  import EditButton from "../../components/General/buttons/editButton.svelte";
  import IsPublicButton from "../../components/General/buttons/isPublicButton.svelte";
  import ImageShow from "../../components/General/imageShow.svelte";
  import { isLoggedIn, modalIds } from "../../stores";
  import PreviewImage from "../../components/General/dropzone/previewImage.svelte";
  import { classToggleIsPublic, getUid } from "$lib/common";

  // const { classData } = $$props;
  export let classData;
  const { editClassModalId: modalId } = modalIds;
  const imagesArray = Object.entries(classData.pictures || []).map(
    ([id, el]) => {
      el.id = id;
      return el;
    }
  );

  onMount(() => {
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  function setData(modal$) {
    modal$.data(classData);
  }
</script>

{#if (classData.isPublic && !$isLoggedIn) || $isLoggedIn}
  {#key classData}
    <div class="class-container">
      <div class="row class position-relative">
        <ImageShow {imagesArray} />
        <div class="classInfo col-8">
          <h3 class="className">{classData.title}</h3>
          <div class="description">
            {classData.description}
          </div>
          <div
            class="info d-flex flex-row justify-content-around w-100 mt-auto"
          >
            <div class="dates d-flex flex-column justify-content-center">
              <div>{classData.dateString}</div>
            </div>
            <div class="payment d-flex flex-column align-items-center">
              <div class="cost">${classData.cost}</div>
              <button class="btn paypal btn-primary btn-sm">paypal</button>
            </div>
          </div>
        </div>

        {#if $isLoggedIn}
          <ActionsContainer>
            <IsPublicButton
              isPublic={classData.isPublic}
              toggleIsPublic={classToggleIsPublic}
              dataSource={classData}
            />
            <EditButton {modalId} {setData} />
          </ActionsContainer>
        {/if}
        <!-- <div class="action-buttons">
      <i class="fa fa-pencil icon-btn"></i>
      <i class="fa fa-times icon-btn"></i>
    </div> -->
      </div>
    </div>
  {/key}
{/if}

<style lang="scss">
  .classInfo {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
  }
  .action-buttons {
    position: absolute;
    right: 0px;
  }
</style>
