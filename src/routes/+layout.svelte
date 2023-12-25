<script>
  import { signInWithEmailAndPassword, signOut } from "firebase/auth";
  import "../app.scss";
  import Modal from "../components/General/modal.svelte";
  import Newsletter from "../components/Sections/newsletter.svelte";
  import { auth, db } from "../firebase";
  import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
  import {
    isLoggedIn,
    allPaintings,
    thisPainting,
    collectionDocData,
    collectionsData,
    reproductionPaintings,
    originalPaintings,
    newsletterData,
    originals,
    bannerData,
    classes,
    paintingsByType,
    images,
  } from "../stores";
  import { page } from "$app/stores";
  import ImagePreview from "../components/Modals/imagePreview.svelte";
  import { revealImage } from "$lib/common";
  import { onMount } from "svelte";
  import ImageBucketModal from "../components/ImageBucket/imageBucketModal.svelte";

  $: {
    console.log("log store", {
      $thisPainting,
      $collectionDocData,
      $allPaintings,
      $collectionsData,
      $reproductionPaintings,
      $originalPaintings,
      $newsletterData,
      $originals,
      $bannerData,
      $classes,
      $paintingsByType,
      $images,
    });
  }

  onMount(() => {
    // On clicking off the nav, close the menu
    jQuery(document).on("click", closeHamburgerMenu);
    // closing menu via the nav drop down is set via html
    return () => {};
  });

  function logout() {
    signOut(auth);
  }

  auth.onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      isLoggedIn.update(() => true);
    } else {
      // No user is signed in.
      isLoggedIn.update(() => false);
    }
  });

  function closeHamburgerMenu(e) {
    const isChildOfNav = jQuery(e.target).closest("nav").get(0);
    // console.log({ "e.target": e.target, isChildOfNav });
    if (!isChildOfNav) {
      jQuery("#navbarSupportedContent").collapse("hide");
    }
  }

  $: {
    console.log({ $allPaintings, $page, $thisPainting });
  }
</script>

<div class="body-container">
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <!-- <a class="navbar-brand" href="#">Navbar</a> -->
    <a href="/" class="logo-container navbar-brand">
      <img
        src="/Logos/Logo with black lettering and transparent background2.png"
        class="headerImg"
      />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Paintings
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a
              class="dropdown-item"
              href="/originals"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              ><a class="main d-block dropdown-item" href="/originals"
                >Originals</a
              >
              <span class="dropdown-header">Available as fine art giclee</span>
            </a>

            <div class="dropdown-divider"></div>
            <a class="dropdown-item main" href="/reproductions">Reproductions</a
            >
          </div>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="/commissions"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent">Commissions</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="/classes"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent">Classes</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="/about"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent">About</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="/contact"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent">Contact</a
          >
        </li>
        {#if $isLoggedIn}
          <li class="nav-item d-flex align-items-center ml-2">
            <i class="fa fa-sign-out logout clickable" on:click={logout}></i>
          </li>
        {/if}
      </ul>
    </div>
  </nav>

  {#if $page.route.id && $page.route.id.includes("/login")}
    <div>
      <slot />
    </div>
  {:else}
    <div>
      <slot />
    </div>
    <Newsletter />
  {/if}

  <footer class="bg-light">
    <div class="container d-flex justify-content-center align-items-center">
      <img src="/Logos/Watermark.png" alt="" />
    </div>
  </footer>
</div>

<ImagePreview />

<!-- ALL MODALS SHOULD BE DEFINED HERE SO THEY ARE ONLY MADE ONCE -->

<ImageBucketModal />

<style lang="scss">
  footer {
    .container {
      height: 100%;
    }
    img {
      width: 205px;
    }
  }
  .headerImg {
    width: 160px;
  }
  .body-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .nav-font {
    color: white;
  }
  .dropdown-item {
    padding: 2px;
    background-color: transparent;
  }
  .dropdown-toggle {
    margin-right: 7px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    &::after {
      /* opacity: 0 */
      display: none;
    }
  }
  nav {
    z-index: 2;
    height: fit-content;
    background: #000;
    position: sticky;
    top: 0px;
    /* translate: 0px 100%; */
    /* height: 100px; */
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .logout {
        padding: 10px;
        cursor: pointer;
      }
      .links {
        justify-content: right;
      }
      .main {
        margin: 0px 4px;
        text-decoration: none;
        &:hover:not(.logo-container) {
          text-decoration: underline;
        }
      }
      .logo-container {
        text-decoration: none;
      }
    }
  }
  .logo-container {
    font-style: italic;
  }
  footer {
    height: 50px;
    margin-top: auto;
    background-color: #000;
  }
</style>
